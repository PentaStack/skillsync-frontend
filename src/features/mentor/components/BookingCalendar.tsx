import { Button, EmptyState, SkeletonCard } from "@/components/ui";
import { useMentorAvailability } from "../hooks/useMentors";
import type { TimeSlot } from "../types";

interface BookingCalendarProps {
  mentorId: number;
  date: string;
  onDateChange: (date: string) => void;
  onSelectSlot?: (slot: TimeSlot) => void;
}

function formatTime(iso: string) {
  return iso.slice(11, 16); // "HH:MM" from "YYYY-MM-DDTHH:MM:SS"
}

export default function BookingCalendar({ mentorId, date, onDateChange, onSelectSlot }: BookingCalendarProps) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, isLoading } = useMentorAvailability(mentorId, date);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <label className="font-body text-label-caps uppercase tracking-widest text-text-secondary">
          Date
        </label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="rounded border-b-2 border-text-secondary/30 bg-surface px-3 py-2 font-body text-body-md text-text-primary outline-none focus:border-ember"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : !data?.slots.length ? (
        <EmptyState
          title="No available slots"
          description="No free 45-minute slots on this date. Try another day."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-3">
          {data.slots.map((slot) => (
            <Button
              key={slot.id}
              variant="secondary"
              onClick={() => onSelectSlot?.(slot)}
              className="w-full justify-center"
            >
              {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
