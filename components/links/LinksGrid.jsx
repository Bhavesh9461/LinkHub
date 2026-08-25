import LinkCard from "@/components/links/LinkCard";
import { links } from "@/data/links";

export default function LinksGrid() {
  const visibleLinks = links.filter((link) => link.show);

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-4">
      {visibleLinks.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </section>
  );
}
