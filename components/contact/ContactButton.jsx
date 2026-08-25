"use client";

import { useState } from "react";
import ContactModal from "@/components/contact/ContactModal";

export default function ContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass inline-flex h-10 items-center gap-2 rounded-(--radius-pill) px-4 text-sm font-medium text-(--color-text) transition-colors hover:border-(--color-blue) hover:text-(--color-blue) active:scale-[0.97]"
      >
        <i className="ri-chat-3-line text-base" aria-hidden="true" />
        <span className="hidden sm:inline">Contact</span>
      </button>

      {open && <ContactModal onClose={() => setOpen(false)} />}
    </>
  );
}
