import ContactButton from "@/components/contact/ContactButton";

export default function TopBar() {
  return (
    <>
      <header className="glass-nav fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-x-0 border-t-0 px-4 sm:h-16 sm:px-8">
        <div className="flex h-9 items-center gap-2 rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-2) px-3 sm:h-10 sm:px-4">
          <i className="ri-links-line text-(--color-blue)" aria-hidden="true" />
          <span className="font-mono text-xs text-(--color-text) sm:text-sm">
            <span className="hidden sm:inline">All My </span>
            <span className="text-(--color-violet)">Links</span>
          </span>
        </div>

        <ContactButton />
      </header>

      {/* Spacer — reserves the space the fixed header occupies, so content isn't hidden underneath it */}
      <div className="h-20 sm:h-24" aria-hidden="true" />
    </>
  );
}