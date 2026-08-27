"use client";

import IconImage from "@/components/ui/IconImage";
import { copyToClipboard } from "@/lib/clipboard";

export default function ProjectCard({ project }) {
  const {
    name,
    description,
    iconType,
    iconUrl,
    iconName,
    liveUrl,
    liveCopyValue,
    githubUrl,
    githubCopyValue,
  } = project;

  const hasLive = Boolean(liveUrl || liveCopyValue);
  const hasGithub = Boolean(githubUrl || githubCopyValue);

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

      <div className="mt-auto flex flex-col gap-2">
        {hasLive && (
          <LinkRow
            label="Live"
            copyValue={liveCopyValue || liveUrl}
            url={liveUrl}
            copyLabel={`${name} live link`}
          />
        )}
        {hasGithub && (
          <LinkRow
            label="GitHub"
            copyValue={githubCopyValue || githubUrl}
            url={githubUrl}
            copyLabel={`${name} GitHub link`}
          />
        )}
        {!hasLive && !hasGithub && (
          <p className="text-xs text-(--color-muted)">No links added yet</p>
        )}
      </div>
    </article>
  );
}

function LinkRow({ label, copyValue, url, copyLabel }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-[0.65rem] font-medium uppercase tracking-wide text-(--color-muted)">
        {label}
      </span>
      <button
        type="button"
        onClick={() => copyToClipboard(copyValue, copyLabel)}
        className={`inline-flex h-(--size-btn-h-sm) items-center justify-center gap-1.5 rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 text-xs font-medium text-(--color-text) transition-colors hover:border-(--color-blue) hover:text-(--color-blue) active:scale-[0.97] ${
          url ? "flex-1" : "w-full"
        }`}
      >
        <i className="ri-file-copy-line text-sm" aria-hidden="true" />
        Copy
      </button>
      {url && (
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
  );
}
