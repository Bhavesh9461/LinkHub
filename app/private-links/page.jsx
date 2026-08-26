import LinksGrid from "@/components/links/LinksGrid";
import PrivateLinksHeader from "@/components/links/PrivateLinksHeader";
import ManageLinksButton from "@/components/links/ManageLinksButton";
import { getPrivateVisibleLinks } from "@/lib/getLinks";

export default async function PrivateLinksPage() {
  const links = await getPrivateVisibleLinks();

  return (
    <main className="flex min-h-dvh flex-col">
      <PrivateLinksHeader backHref="/" centerAction={<ManageLinksButton />} />
      <LinksGrid
        links={links}
        emptyMessage="No private links yet — add one from Manage links."
      />
    </main>
  );
}
