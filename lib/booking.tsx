"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Ctx = {
  open: boolean;
  /** increments on every open so the pop-up form can reset itself */
  openCount: number;
  presetBranch: string;
  openModal: (branch?: string) => void;
  closeModal: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const [presetBranch, setPresetBranch] = useState("");

  const openModal = useCallback((branch?: string) => {
    setPresetBranch(branch || "");
    setOpenCount((c) => c + 1);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <BookingContext.Provider value={{ open, openCount, presetBranch, openModal, closeModal }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const c = useContext(BookingContext);
  if (!c) throw new Error("useBooking must be used inside BookingProvider");
  return c;
}
