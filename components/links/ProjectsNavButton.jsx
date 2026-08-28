import Link from "next/link";

export default function ProjectsNavButton({ href }) {
  return (
    <Link
      href={href}
      className="glass inline-flex h-10 items-center gap-2 rounded-(--radius-pill) px-4 text-sm font-medium text-(--color-text) transition-colors hover:border-(--color-blue) hover:text-(--color-blue)"
    >
      <i className="ri-folder-line text-base" aria-hidden="true" />
      Projects
    </Link>
  );
}