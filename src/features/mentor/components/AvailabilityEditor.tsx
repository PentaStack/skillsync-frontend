import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarClock, Plus, Save, Trash2 } from "lucide-react";
import { Button, Card, EmptyState, SkeletonLine } from "@/components/ui";
import { useI18n } from "@/i18n/i18n";
import {
  useCreateWindow,
  useDeleteWindow,
  useUpdateWindow,
  useWindows,
} from "../hooks/useAvailability";
import type { ApiError } from "@/lib/types";
import type { AvailabilityWindow, DayOfWeek } from "../types";

const DAYS: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const inputClass =
  "rounded bg-surface px-3 py-2 text-body-md text-text-primary border-b-2 border-text-secondary/30 outline-none focus:border-ember";

const toInput = (time: string) => time.slice(0, 5);
const errorMessage = (err: unknown, fallback: string) =>
  (err as ApiError)?.message || fallback;

interface AvailabilityEditorProps {
  mentorId: number;
}

export function AvailabilityEditor({ mentorId }: AvailabilityEditorProps) {
  const { t } = useI18n();
  const { data, isLoading } = useWindows(mentorId);
  const createWindow = useCreateWindow(mentorId);

  const [day, setDay] = useState<DayOfWeek>("MONDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:45");

  const windows = data ?? [];
  const activeDays = DAYS.filter((d) => windows.some((w) => w.dayOfWeek === d));

  const handleAdd = () => {
    if (endTime <= startTime) {
      toast.error(t("availability.invalidTime"));
      return;
    }
    createWindow.mutate(
      { dayOfWeek: day, startTime, endTime },
      {
        onSuccess: () => toast.success(t("availability.added")),
        onError: (err) =>
          toast.error(errorMessage(err, t("availability.addError"))),
      },
    );
  };

  return (
    <Card>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          {t("availability.day")}
          <select
            value={day}
            onChange={(e) => setDay(e.target.value as DayOfWeek)}
            className={inputClass}
          >
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {t(`day.${d}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          {t("availability.from")}
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          {t("availability.to")}
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={inputClass}
          />
        </label>
        <Button onClick={handleAdd} isLoading={createWindow.isPending}>
          <Plus className="h-4 w-4" />
          {t("availability.addWindow")}
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <>
            <SkeletonLine />
            <SkeletonLine className="w-2/3" />
          </>
        ) : windows.length === 0 ? (
          <EmptyState
            icon={<CalendarClock className="h-8 w-8" />}
            title={t("availability.emptyTitle")}
            description={t("availability.emptyDesc")}
          />
        ) : (
          activeDays.map((d) => (
            <div key={d}>
              <div className="text-sm font-semibold text-text-primary">
                {t(`day.${d}`)}
              </div>
              <div className="mt-2 space-y-2">
                {windows
                  .filter((w) => w.dayOfWeek === d)
                  .map((w) => (
                    <WindowRow key={w.id} mentorId={mentorId} window={w} />
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

function WindowRow({
  mentorId,
  window: w,
}: {
  mentorId: number;
  window: AvailabilityWindow;
}) {
  const { t } = useI18n();
  const updateWindow = useUpdateWindow(mentorId);
  const deleteWindow = useDeleteWindow(mentorId);
  const [start, setStart] = useState(toInput(w.startTime));
  const [end, setEnd] = useState(toInput(w.endTime));

  const dirty = start !== toInput(w.startTime) || end !== toInput(w.endTime);

  const handleSave = () => {
    if (end <= start) {
      toast.error(t("availability.invalidTime"));
      return;
    }
    updateWindow.mutate(
      {
        windowId: w.id,
        payload: { dayOfWeek: w.dayOfWeek, startTime: start, endTime: end },
      },
      {
        onSuccess: () => toast.success(t("availability.updated")),
        onError: (err) =>
          toast.error(errorMessage(err, t("availability.updateError"))),
      },
    );
  };

  const handleDelete = () => {
    deleteWindow.mutate(w.id, {
      onSuccess: () => toast.success(t("availability.removed")),
      onError: (err) =>
        toast.error(errorMessage(err, t("availability.removeError"))),
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className={inputClass}
      />
      <span className="text-text-secondary">–</span>
      <input
        type="time"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className={inputClass}
      />
      <Button
        variant="secondary"
        size="sm"
        onClick={handleSave}
        disabled={!dirty || updateWindow.isPending}
      >
        <Save className="h-4 w-4" />
        {t("common.save")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={deleteWindow.isPending}
      >
        <Trash2 className="h-4 w-4" />
        {t("availability.remove")}
      </Button>
    </div>
  );
}
