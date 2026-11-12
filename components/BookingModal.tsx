"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useBooking } from "@/lib/booking";
import { track } from "@/lib/track";
import LeadForm from "./LeadForm";

/* Pop-up copy of the booking form, opened by every "Book" button on the page.
   Phones: a sheet rising from the bottom edge. Larger screens: a centred dialog. Exits along the same path. */
export default function BookingModal() {
  const { open, openCount, presetBranch, closeModal } = useBooking();
  const lastFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("lock");
    track("popup_open", { branch: presetBranch });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("lock");
      lastFocus.current?.focus?.();
    };
  }, [open, openCount, presetBranch, closeModal]);

  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 48 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 48 } };

  return (
    <AnimatePresence>
      {open && (
        <div
          key="booking"
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
          className="fixed inset-0 z-[100] grid items-end justify-items-center min-[560px]:place-items-center min-[560px]:p-4"
        >
          <motion.div
            onClick={closeModal}
            className="absolute inset-0 bg-[rgba(30,8,8,.6)] backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            key={openCount}
            {...panel}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
            className="relative max-h-[calc(100dvh-24px)] w-full overflow-auto rounded-t-[24px] min-[560px]:w-[min(460px,100%)] min-[560px]:rounded-[24px] [&>div]:rounded-b-none min-[560px]:[&>div]:rounded-b-[24px]"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeModal}
              className="absolute top-4 right-4 z-[2] grid h-10 w-10 cursor-pointer place-items-center rounded-full border-0 bg-ivory text-crimson ring-1 ring-line transition-colors hover:bg-crimson hover:text-white active:scale-95"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
            <LeadForm variant="modal" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
