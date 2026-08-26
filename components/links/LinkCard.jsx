"use client";

import IconImage from "@/components/ui/IconImage";
import { copyToClipboard } from "@/lib/clipboard";

export default function LinkCard({ link }) {
  const {
    name,
    description,
    hasLink,
    url,
    copyValue,
    iconType,
    iconUrl,
    iconName,
  } = link;

  return (
    <article className="card-sheen glass relative flex h-full flex-col gap-4 rounded-(--radius-card) p-5 transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <span className="flex h-(--size-icon) w-(--size-icon) shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface-2)">
          <IconImage
            iconType={iconType}
            iconUrl={iconUrl}
            iconName={iconName}
            size={22}
          />
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-(family-name:--font-display) text-[0.95rem] font-semibold text-(--color-text)">
            {name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-(--color-muted)">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => copyToClipboard(copyValue, name)}
          className={`inline-flex h-(--size-btn-h-sm) items-center justify-center gap-1.5 rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 text-xs font-medium text-(--color-text) transition-colors hover:border-(--color-blue) hover:text-(--color-blue) active:scale-[0.97] ${
            hasLink ? "flex-1" : "w-full"
          }`}
        >
          <i className="ri-file-copy-line text-sm" aria-hidden="true" />
          Copy
        </button>

        {hasLink && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-(--size-btn-h-sm) flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-(--color-violet) to-(--color-blue) px-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.97]"
          >
            <i className="ri-external-link-line text-sm" aria-hidden="true" />
            Visit
          </a>
        )}
      </div>
    </article>
  );
}
