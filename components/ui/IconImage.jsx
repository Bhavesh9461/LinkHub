"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Renders a link's icon: an uploaded ImageKit image, a Remix Icon class
 * name, or — if neither is set, or the image fails to load — a generic
 * fallback glyph. Nothing here depends on filesystem icon files anymore.
 */
export default function IconImage({ iconType, iconUrl, iconName, size = 22, className = "" }) {
  const [errored, setErrored] = useState(false);

  if (iconType === "upload" && iconUrl && !errored) {
    return (
      <Image
        src={iconUrl}
        alt=""
        width={size}
        height={size}
        className={`object-contain ${className}`}
        onError={() => setErrored(true)}
      />
    );
  }

  if (iconType === "remix" && iconName) {
    return <i className={`${iconName} text-(--color-text) ${className}`} style={{ fontSize: size }} aria-hidden="true" />;
  }

  return <i className={`ri-links-line text-(--color-text) ${className}`} style={{ fontSize: size }} aria-hidden="true" />;
}