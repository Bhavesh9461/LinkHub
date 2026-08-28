import PrivateLinksHeader from "@/components/links/PrivateLinksHeader";
import ManageLinksButton from "@/components/links/ManageLinksButton";
import ProjectsNavButton from "@/components/links/ProjectsNavButton";
import SearchableLinksGrid from "@/components/links/SearchableLinksGrid";
import { getPrivateVisibleLinks } from "@/lib/getLinks";

export const dynamic = "force-dynamic";

export default async function PrivateLinksPage() {
  const links = await getPrivateVisibleLinks();

  return (
    <main className="flex min-h-dvh flex-col">
      <PrivateLinksHeader
        backHref="/"
        centerAction={
          <div className="flex flex-wrap justify-center gap-2">
            <ManageLinksButton />
            <ProjectsNavButton href="/private-links/projects" />
          </div>
        }
      />
      <SearchableLinksGrid links={links} emptyMessage="No private links yet — add one from Manage links." />
    </main>
  );
}