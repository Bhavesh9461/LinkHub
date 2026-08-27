import Link from "next/link";

export default function ManageLinksButton() {
  return (
    <div className="mb-10 flex justify-center px-4">
      <Link
        href="/private-links/manage"
        className="glass inline-flex h-(--size-btn-h-sm) items-center gap-2 rounded-(--radius-pill) px-4 text-xs font-medium text-(--color-muted) transition-colors hover:border-(--color-blue) hover:text-(--color-blue)"
      >
        <i className="ri-settings-3-line text-sm" aria-hidden="true" />
        Manage links
      </Link>
    </div>
  );
}