"use client";

import { useState } from "react";
import Image from "next/image";
import { iconFallbacks, DEFAULT_ICON_FALLBACK } from "@/lib/iconFallbacks";

/**
 * Renders /public/icons/{id}.png at a fixed square size. If that file is
 * missing or errors, swaps to a Remix Icon glyph so the UI never shows a
 * broken-image icon.
 */
export default function IconImage({ id, size = 22, className = "" }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    const iconClass = iconFallbacks[id] ?? DEFAULT_ICON_FALLBACK;
    return (
      <i
        className={`${iconClass} text-(--color-text) ${className}`}
        style={{ fontSize: size }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={`/icons/${id}.png`}
      alt=""
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
