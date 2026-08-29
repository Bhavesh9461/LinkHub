import Link from "next/link";

export default function ProjectsNavButton({ href }) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center gap-1.5 rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-2) px-2.5 text-xs font-medium text-(--color-text) transition-colors hover:border-(--color-blue) hover:text-(--color-blue) sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
    >
      <i className="ri-folder-line text-base" aria-hidden="true" />
      <span className="hidden sm:inline">Projects</span>
    </Link>
  );
}