"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <i className="ri-error-warning-line text-4xl text-(--color-pink)" aria-hidden="true" />
      <h1 className="font-(family-name:--font-display) text-xl font-semibold text-(--color-text)">
        Something broke
      </h1>
      <p className="max-w-sm text-sm text-(--color-muted)">
        This page hit an unexpected error. Try again — if it keeps happening, refresh the page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex h-(--size-btn-h) items-center gap-2 rounded-lg bg-gradient-to-r from-(--color-violet) to-(--color-blue) px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <i className="ri-refresh-line" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
