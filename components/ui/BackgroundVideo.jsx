"use client";

import { useEffect, useRef, useState } from "react";
import { useAppReady } from "@/lib/AppReadyContext";

export default function BackgroundVideo() {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const { reportVideo } = useAppReady();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      reportVideo("ready");
    };

    const handleError = () => {
      setFailed(true);
      reportVideo("error");
    };

    video.addEventListener("canplaythrough", handleReady);
    video.addEventListener("error", handleError);

    if (video.readyState >= 3) {
      handleReady();
    }

    return () => {
      video.removeEventListener("canplaythrough", handleReady);
      video.removeEventListener("error", handleError);
    };
  }, [reportVideo]);

  return (
    <div
      className="
        fixed
        inset-x-0
        top-0
        z-0
        h-[100lvh]
        w-full
        overflow-hidden
        bg-(--color-bg)
        pointer-events-none
      "
    >
      {/* Base background */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_top,_#151a34_0%,_#05060a_60%)]
        "
      />

      {!failed && (
        <video
          ref={videoRef}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/bg-poster.jpg"
        >
          <source src="/video/bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Main scrim */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(180deg,rgba(5,6,10,0.55)_0%,rgba(5,6,10,0.75)_45%,rgba(5,6,10,0.92)_100%)]
        "
      />

      {/* Ambient colors */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_15%_10%,rgba(139,92,246,0.18),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(56,189,248,0.16),transparent_45%)]
        "
      />
    </div>
  );
}