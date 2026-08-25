"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { AppReadyContext } from "@/lib/AppReadyContext";

const MAX_WAIT_MS = 4500;

export default function AppLoader({ children }) {
  const [videoStatus, setVideoStatus] = useState("loading");
  const [avatarStatus, setAvatarStatus] = useState("loading");
  const [timedOut, setTimedOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setTimedOut(true), MAX_WAIT_MS);
    return () => clearTimeout(timerRef.current);
  }, []);

  const ready =
    timedOut || (videoStatus !== "loading" && avatarStatus !== "loading");

  // Small extra delay so the fade-out reads as intentional, not a flicker.
  useEffect(() => {
    if (ready && !hidden) {
      const t = setTimeout(() => setHidden(true), 250);
      return () => clearTimeout(t);
    }
  }, [ready, hidden]);

  const reportVideo = useCallback((status) => setVideoStatus(status), []);
  const reportAvatar = useCallback((status) => setAvatarStatus(status), []);

  const ctxValue = useMemo(() => ({ reportVideo, reportAvatar }), [reportVideo, reportAvatar]);

  return (
    <AppReadyContext.Provider value={ctxValue}>
      {!hidden && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-(--color-bg) transition-opacity duration-500 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={ready}
          role="status"
          aria-label="Loading page"
        >
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-2 border-(--color-border)" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-(--color-blue) border-r-(--color-violet)" />
          </div>
          <p className="font-mono text-xs tracking-[0.3em] text-(--color-muted) uppercase">
            Loading experience
          </p>
        </div>
      )}
      {children}
    </AppReadyContext.Provider>
  );
}
