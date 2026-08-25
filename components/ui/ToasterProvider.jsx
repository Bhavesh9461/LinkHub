"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="bottom-center"
      gutter={8}
      toastOptions={{
        duration: 2200,
        style: {
          background: "#0e1120",
          color: "#f3f4f6",
          border: "1px solid #232842",
          borderRadius: "0.75rem",
          padding: "0.6rem 0.9rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
        },
        success: {
          iconTheme: { primary: "#38bdf8", secondary: "#0e1120" },
        },
        error: {
          iconTheme: { primary: "#ec4899", secondary: "#0e1120" },
        },
      }}
    />
  );
}
