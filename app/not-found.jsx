import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <i className="ri-map-pin-line text-4xl text-(--color-blue)" aria-hidden="true" />
      <h1 className="font-(family-name:--font-display) text-xl font-semibold text-(--color-text)">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-(--color-muted)">
        This link doesn't exist. Head back and pick one from the list.
      </p>
      <Link
        href="/"
        className="inline-flex h-(--size-btn-h) items-center gap-2 rounded-lg bg-gradient-to-r from-(--color-violet) to-(--color-blue) px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <i className="ri-arrow-left-line" aria-hidden="true" />
        Back to links
      </Link>
    </div>
  );
}
