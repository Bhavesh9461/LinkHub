"use client";

import { createContext, useContext } from "react";

/**
 * Lets any asset (background video, avatar image) report back to the
 * top-level loader so it knows when it's safe to reveal the page.
 * status values: "loading" | "ready" | "error"
 */
export const AppReadyContext = createContext({
  reportVideo: () => {},
  reportAvatar: () => {},
});

export function useAppReady() {
  return useContext(AppReadyContext);
}
