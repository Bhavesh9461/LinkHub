import LinkCard from "@/components/links/LinkCard";

export default function LinksGrid({ links, emptyMessage = "No links here yet." }) {
  const visibleLinks = (links ?? []).filter((link) => link.show);

  if (visibleLinks.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-16 text-center">
        <i className="ri-links-line text-3xl text-(--color-muted)" aria-hidden="true" />
        <p className="text-sm text-(--color-muted)">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-4">
      {visibleLinks.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </section>
  );
}