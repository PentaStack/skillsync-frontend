import { useState } from "react";
import { CalendarX } from "lucide-react";
import { EmptyState, Skeleton } from "@/components/ui";
import { cn, formatTime } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { useAvailableSlots } from "../hooks/useAvailability";
import type { AvailableSlot } from "../types";
import { BookingConfirmModal } from "./BookingConfirmModal";

const todayISO = () => new Date().toISOString().slice(0, 10);

interface SlotPickerProps {
  mentorId: number;
  mentorName: string;
  canBook?: boolean;
}

export function SlotPicker({ mentorId, mentorName, canBook = true }: SlotPickerProps) {
  const { t } = useI18n();
  const [date, setDate] = useState(todayISO);
  const [activeSlot, setActiveSlot] = useState<AvailableSlot | null>(null);
  const [removed, setRemoved] = useState<Set<string>>(() => new Set());
  const { data, isLoading, isError, refetch } = useAvailableSlots(mentorId, date);

  const visibleSlots = (data?.availableSlots ?? []).filter(
    (slot) => !removed.has(slot.startTime),
  );

  const handlePick = (slot: AvailableSlot) => {
    if (!canBook) return;
    setActiveSlot(slot);
  };

  const handleBooked = (slot: AvailableSlot) => {
    setRemoved((prev) => new Set(prev).add(slot.startTime));
    setActiveSlot(null);
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="slot-date" className="text-sm text-text-secondary">
          {t("booking.pickDate")}
        </label>
        <input
          id="slot-date"
          type="date"
          value={date}
          min={todayISO()}
          onChange={(e) => {
            setDate(e.target.value);
            setActiveSlot(null);
            setRemoved(new Set());
          }}
          className="rounded bg-surface px-3 py-2 text-body-md text-text-primary border-b-2 border-text-secondary/30 outline-none focus:border-ember"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          icon={<CalendarX className="h-10 w-10" />}
          title={t("booking.loadErrorTitle")}
          description={t("booking.loadErrorDesc")}
        />
      ) : visibleSlots.length === 0 ? (
        <EmptyState
          icon={<CalendarX className="h-10 w-10" />}
          title={t("booking.noSlotsTitle")}
          description={t("booking.noSlotsDesc")}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {visibleSlots.map((slot) => {
            const active = activeSlot?.startTime === slot.startTime;
            return (
              <button
                key={slot.startTime}
                type="button"
                onClick={() => handlePick(slot)}
                disabled={!canBook}
                className={cn(
                  "rounded border px-3 py-2 text-sm font-body transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                  active
                    ? "border-ember bg-ember text-canvas"
                    : "border-text-secondary/30 text-text-primary enabled:hover:border-ember enabled:hover:text-ember",
                )}
              >
                {formatTime(slot.startTime)}
              </button>
            );
          })}
        </div>
      )}

      <BookingConfirmModal
        isOpen={activeSlot !== null}
        onClose={() => setActiveSlot(null)}
        mentorId={mentorId}
        mentorName={mentorName}
        slot={activeSlot}
        onBooked={handleBooked}
      />
    </div>
  );
}
