import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Modal } from "@/components/ui";
import { formatDate, formatTime } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { useBookSession } from "@/features/session/hooks/useSessions";
import type { ApiError } from "@/lib/types";
import type { AvailableSlot } from "../types";

const MAX_DESCRIPTION = 2000;

interface BookingConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorId: number;
  mentorName: string;
  slot: AvailableSlot | null;
  onBooked: (slot: AvailableSlot) => void;
}

export function BookingConfirmModal({
  isOpen,
  onClose,
  mentorId,
  mentorName,
  slot,
  onBooked,
}: BookingConfirmModalProps) {
  const { t } = useI18n();
  const [description, setDescription] = useState("");
  const book = useBookSession();

  const handleClose = () => {
    setDescription("");
    onClose();
  };

  const handleSubmit = () => {
    if (!slot || !description.trim()) return;
    const bookedSlot = slot;
    book.mutate(
      { mentorId, startTime: bookedSlot.startTime, description: description.trim() },
      {
        onSuccess: () => {
          toast.success(t("booking.success"));
          onBooked(bookedSlot);
          handleClose();
        },
        onError: (err) => {
          const apiError = err as unknown as ApiError;
          if (apiError.status === 409) {
            toast.error(t("booking.conflict"));
            onBooked(bookedSlot);
            handleClose();
          } else {
            toast.error(apiError.message || t("booking.error"));
          }
        },
      },
    );
  };

  if (!slot) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("booking.confirmTitle")}>
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-surface-container-high p-4">
          <p className="text-body-md text-text-primary">{mentorName}</p>
          <p className="mt-1 text-sm text-text-secondary">
            {formatDate(slot.startTime)} · {formatTime(slot.startTime)} –{" "}
            {formatTime(slot.endTime)}
          </p>
        </div>

        <div>
          <label
            htmlFor="booking-description"
            className="text-sm text-text-secondary"
          >
            {t("booking.descriptionLabel")}
          </label>
          <textarea
            id="booking-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={MAX_DESCRIPTION}
            placeholder={t("booking.descriptionPlaceholder")}
            className="mt-2 min-h-[120px] w-full resize-y rounded bg-surface px-4 py-3 font-body text-body-md text-text-primary border-b-2 border-text-secondary/30 outline-none transition-all placeholder:text-text-secondary/50 focus:border-ember"
          />
          <div className="mt-1 text-end text-xs text-text-secondary">
            {description.length}/{MAX_DESCRIPTION}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={book.isPending}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!description.trim()}
            isLoading={book.isPending}
          >
            {t("booking.confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
