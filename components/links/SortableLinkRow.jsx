"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import IconImage from "@/components/ui/IconImage";

export default function SortableLinkRow({ link, index, onEdit, onDelete, busy }) {
  const { ref, isDragging } = useSortable({ id: link.id, index });

  return (
    <div
      ref={ref}
      className={`glass flex cursor-grab items-center justify-between gap-3 rounded-lg px-4 py-3 transition-opacity active:cursor-grabbing ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-(--color-border) bg-(--color-surface-2)">
          <IconImage iconType={link.iconType} iconUrl={link.iconUrl} iconName={link.iconName} size={18} />
        </span>

        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-1.5 truncate text-sm font-medium text-(--color-text)">
            {link.name}
            <Badge tone={link.kind === "project" ? "violet" : "default"}>{link.kind || "link"}</Badge>
            <Badge tone={link.visibility === "private" ? "pink" : "blue"}>{link.visibility}</Badge>
            {!link.show && <span className="text-[0.65rem] text-(--color-muted)">(hidden)</span>}
          </p>
          <p className="truncate text-xs text-(--color-muted)">{link.description || link.copyValue}</p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onEdit(link)}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-(--color-border) px-3 text-xs font-medium text-(--color-text) transition-colors hover:border-(--color-blue) hover:text-(--color-blue)"
        >
          <i className="ri-edit-line text-sm" aria-hidden="true" />
          Edit
        </button>
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(link.id)}
          disabled={busy}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-(--color-border) px-3 text-xs font-medium text-(--color-pink) transition-colors hover:bg-(--color-pink)/10 disabled:opacity-60"
        >
          <i className={`${busy ? "ri-loader-4-line animate-spin" : "ri-delete-bin-line"} text-sm`} aria-hidden="true" />
          Delete
        </button>
      </div>
    </div>
  );
}

function Badge({ tone = "default", children }) {
  const toneClasses = {
    default: "bg-(--color-surface-2) text-(--color-muted)",
    blue: "bg-(--color-blue)/15 text-(--color-blue)",
    pink: "bg-(--color-pink)/15 text-(--color-pink)",
    violet: "bg-(--color-violet)/15 text-(--color-violet)",
  };
  return <span className={`rounded px-1.5 py-0.5 text-[0.65rem] font-medium ${toneClasses[tone]}`}>{children}</span>;
}