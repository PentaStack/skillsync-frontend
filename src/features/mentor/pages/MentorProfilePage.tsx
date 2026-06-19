import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { Card, EmptyState, Modal, SkeletonCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { useMentorProfile } from "../hooks/useMentors";
import { useBookSession } from "../../session/hooks/useSessions";
import BookingCalendar from "../components/BookingCalendar";
import type { TimeSlot } from "../types";

const bookingSchema = z.object({
  description: z.string().min(1, "Description is required"),
});
type BookingForm = z.infer<typeof bookingSchema>;

function formatTime(iso: string) {
  return iso.slice(11, 16);
}

export default function MentorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const mentorId = Number(id);
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const { data: mentor, isLoading, isError } = useMentorProfile(mentorId);
  const bookSession = useBookSession();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({ resolver: zodResolver(bookingSchema) });

  function closeModal() {
    setSelectedSlot(null);
    reset();
  }

  function onConfirm({ description }: BookingForm) {
    if (!selectedSlot) return;
    bookSession.mutate(
      { mentorId, startTime: selectedSlot.startTime, description },
      {
        onSuccess: () => {
          toast.success("Session booked!");
          queryClient.invalidateQueries({ queryKey: ["mentors", mentorId, "availability", date] });
          closeModal();
        },
        onError: (err) => {
          if (isAxiosError(err) && err.response?.status === 409) {
            toast.error("Slot just got taken");
            queryClient.invalidateQueries({ queryKey: ["mentors", mentorId, "availability", date] });
          } else {
            toast.error("Booking failed");
          }
        },
      },
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-container px-gutter py-8 space-y-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (isError || !mentor) {
    return (
      <div className="mx-auto max-w-container px-gutter py-8">
        <EmptyState title="Mentor not found" description="This profile doesn't exist or was removed." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container px-gutter py-8 space-y-8">
      <Card>
        <div className="space-y-2">
          <h1 className="font-display text-headline-md italic text-text-primary">
            {mentor.name}
          </h1>
          {mentor.title && (
            <p className="font-body text-body-md text-text-secondary">{mentor.title}</p>
          )}
          {mentor.bio && (
            <p className="font-body text-body-md text-text-primary">{mentor.bio}</p>
          )}
          {mentor.stacks?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {mentor.stacks.map((s) => (
                <span
                  key={s.id}
                  className="rounded border border-border px-2 py-0.5 font-body text-code-sm text-text-secondary"
                >
                  {s.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="mb-6 font-display text-headline-sm italic text-text-primary">
          Book a Session
        </h2>
        <BookingCalendar
          mentorId={mentorId}
          date={date}
          onDateChange={setDate}
          onSelectSlot={setSelectedSlot}
        />
      </Card>

      <Modal
        isOpen={!!selectedSlot}
        onClose={closeModal}
        title={selectedSlot ? `Book ${formatTime(selectedSlot.startTime)} – ${formatTime(selectedSlot.endTime)}` : ""}
      >
        <form onSubmit={handleSubmit(onConfirm)} className="space-y-4">
          <div>
            <label className="mb-1 block font-body text-label-caps uppercase tracking-widest text-text-secondary">
              What do you want to work on?
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full rounded border border-border bg-canvas px-3 py-2 font-body text-body-md text-text-primary outline-none focus:border-ember resize-none"
              placeholder="Describe what you'd like to cover in this session…"
            />
            {errors.description && (
              <p className="mt-1 font-body text-body-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={bookSession.isPending}>
              {bookSession.isPending ? "Booking…" : "Confirm"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
