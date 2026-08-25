import ContactButton from "@/components/contact/ContactButton";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 pt-5 sm:px-8 sm:pt-8">
      <div className="glass flex h-10 items-center gap-2 rounded-(--radius-pill) px-4">
        <i className="ri-links-line text-(--color-blue)" aria-hidden="true" />
        <span className="font-mono text-sm text-(--color-text)">
          All My <span className="text-(--color-violet)">Links</span>
        </span>
      </div>

      <ContactButton />
    </header>
  );
}
