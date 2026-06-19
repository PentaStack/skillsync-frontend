import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button, Card, EmptyState, Input, SkeletonCard } from "@/components/ui";
import {
  useAvailabilityWindows,
  useCreateAvailabilityWindow,
  useDeleteAvailabilityWindow,
  useMyMentorId,
  useUpdateAvailabilityWindow,
} from "../hooks/useMentors";
import type { AvailabilityWindow } from "../types";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] as const;

const schema = z
  .object({
    dayOfWeek: z.string().min(1, "Day is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine((d) => d.endTime > d.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

type FormValues = z.infer<typeof schema>;

export default function AvailabilityEditor() {
  const { data: myId, isLoading: loadingId } = useMyMentorId();
  const mentorId = myId?.mentorId;

  const { data: windows = [], isLoading } = useAvailabilityWindows(mentorId!);
  const createMutation = useCreateAvailabilityWindow(mentorId!);
  const updateMutation = useUpdateAvailabilityWindow(mentorId!);
  const deleteMutation = useDeleteAvailabilityWindow(mentorId!);

  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    const body = { dayOfWeek: values.dayOfWeek, startTime: values.startTime, endTime: values.endTime };
    if (editingId != null) {
      updateMutation.mutate(
        { windowId: editingId, ...body },
        {
          onSuccess: () => { toast.success("Window updated"); reset(); setEditingId(null); },
          onError: (err: any) => toast.error(err?.response?.data?.message ?? "Failed to update window"),
        },
      );
    } else {
      createMutation.mutate(body, {
        onSuccess: () => { toast.success("Window added"); reset(); },
        onError: (err: any) => toast.error(err?.response?.data?.message ?? "Failed to add window"),
      });
    }
  };

  const startEdit = (w: AvailabilityWindow) => {
    setEditingId(w.id);
    reset({ dayOfWeek: w.dayOfWeek, startTime: w.startTime.slice(0, 5), endTime: w.endTime.slice(0, 5) });
  };

  const handleDelete = (windowId: number) => {
    deleteMutation.mutate(windowId, {
      onSuccess: () => toast.success("Window removed"),
      onError: (err: any) => toast.error(err?.response?.data?.message ?? "Failed to remove window"),
    });
  };

  if (loadingId) return <SkeletonCard />;
  if (!mentorId) return null;

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-text-primary">Availability Windows</h2>

      {isLoading ? (
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : windows.length === 0 ? (
        <EmptyState
          title="No availability windows"
          description="Add your weekly windows below — students will see 45-minute slots from them."
          className="mb-6 py-8"
        />
      ) : (
        <div className="mb-6 grid gap-3 md:grid-cols-2">
          {windows.map((w) => (
            <Card key={w.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="font-medium capitalize text-text-primary">
                  {w.dayOfWeek.charAt(0) + w.dayOfWeek.slice(1).toLowerCase()}
                </div>
                <div className="text-sm text-text-secondary">
                  {w.startTime.slice(0, 5)} – {w.endTime.slice(0, 5)}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => startEdit(w)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDelete(w.id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-end gap-4 md:grid-cols-[180px_1fr_1fr_auto]"
      >
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-caps uppercase tracking-widest text-text-secondary">
            Day
          </label>
          <select
            {...register("dayOfWeek")}
            className="w-full rounded border-b-2 border-text-secondary/30 bg-surface px-4 py-3 font-body text-body-md text-text-primary outline-none focus:border-ember"
          >
            <option value="">Select day</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d.charAt(0) + d.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          {errors.dayOfWeek && (
            <span className="font-body text-code-sm text-error">{errors.dayOfWeek.message}</span>
          )}
        </div>

        <Input label="Start time" type="time" {...register("startTime")} error={errors.startTime?.message} />
        <Input label="End time" type="time" {...register("endTime")} error={errors.endTime?.message} />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending} isLoading={isPending}>
            {editingId != null ? "Update" : "Add"}
          </Button>
          {editingId != null && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => { setEditingId(null); reset(); }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
