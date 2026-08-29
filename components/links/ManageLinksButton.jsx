import Link from "next/link";

export default function ManageLinksButton() {
  return (
    <Link
      href="/private-links/manage"
      className="inline-flex h-9 items-center gap-1.5 rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-2) px-2.5 text-xs font-medium text-(--color-text) transition-colors hover:border-(--color-blue) hover:text-(--color-blue) sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
    >
      <i className="ri-settings-3-line text-base" aria-hidden="true" />
      <span className="hidden sm:inline">Manage links</span>
    </Link>
  );
}