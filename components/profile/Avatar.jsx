"use client";

import { useState } from "react";
import Image from "next/image";
import { useAppReady } from "@/lib/AppReadyContext";

export default function Avatar({ src, name, online }) {
  const [errored, setErrored] = useState(false);
  const { reportAvatar } = useAppReady();

  return (
    <div className="relative shrink-0">
      <div className="avatar-ring flex h-24 w-24 items-center justify-center rounded-full p-[3px] sm:h-28 sm:w-28">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-(--color-surface)">
          {errored ? (
            <i className="ri-user-3-line text-4xl text-(--color-muted)" aria-hidden="true" />
          ) : (
            <Image
              src={src}
              alt={name}
              width={112}
              height={112}
              priority
              className="h-full w-full object-cover object-top"
              onLoad={() => reportAvatar("ready")}
              onError={() => {
                setErrored(true);
                reportAvatar("error");
              }}
            />
          )}
        </div>
      </div>
      {online && (
        <span
          className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-(--color-bg) bg-(--color-online) sm:h-5 sm:w-5"
          aria-label="Online"
        >
          <span className="block h-full w-full animate-ping rounded-full bg-(--color-online) opacity-60" />
        </span>
      )}
    </div>
  );
}
