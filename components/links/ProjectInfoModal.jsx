"use client";

import { useEffect } from "react";
import { parseNumberedList } from "@/lib/parseNumberedList";

export default function ProjectInfoModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const memberList = (project.members || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  const formattedStart = formatDate(project.startDate);
  const formattedCompletion = formatDate(project.completionDate);
  const listItems = parseNumberedList(project.description);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-info-title"
        className="glass flex w-full max-w-md flex-col rounded-t-2xl rounded-b-none shadow-2xl sm:max-h-[80vh] sm:rounded-(--radius-card) sm:rounded-b-2xl"
      >
        <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
          <h2
            id="project-info-title"
            className="font-(family-name:--font-display) text-base font-semibold text-(--color-text)"
          >
            {project.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-(--color-muted) transition-colors hover:bg-(--color-surface-2) hover:text-(--color-text)"
          >
            <i className="ri-close-line text-lg" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          {project.description && (
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-(--color-muted)">Description</p>
              {listItems ? (
                <ol className="list-inside list-decimal space-y-1.5 text-sm leading-relaxed text-(--color-text)">
                  {listItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-(--color-text)">
                  {project.description}
                </p>
              )}
            </div>
          )}

          {memberList.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-(--color-muted)">
                {memberList.length === 1 ? "Member" : "Members"}
              </p>
              <p className="text-sm text-(--color-text)">{memberList.join(", ")}</p>
            </div>
          )}

          {(formattedStart || formattedCompletion) && (
            <div className="grid grid-cols-2 gap-4">
              {formattedStart && (
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-(--color-muted)">Started</p>
                  <p className="text-sm text-(--color-text)">{formattedStart}</p>
                </div>
              )}
              {formattedCompletion && (
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-(--color-muted)">Completed</p>
                  <p className="text-sm text-(--color-text)">{formattedCompletion}</p>
                </div>
              )}
            </div>
          )}

          {!project.description && memberList.length === 0 && !formattedStart && !formattedCompletion && (
            <p className="text-sm text-(--color-muted)">No additional info added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}