import LinksGrid from "@/components/links/LinksGrid";
import PrivateLinksHeader from "@/components/links/PrivateLinksHeader";
import ManageLinksButton from "@/components/links/ManageLinksButton";
import { getPrivateLinks } from "@/lib/getPrivateLinks";

export default async function PrivateLinksPage() {
  const privateLinks = await getPrivateLinks();

  return (
    <main className="flex min-h-dvh flex-col">
      <PrivateLinksHeader />
      <LinksGrid overrideLinks={privateLinks} />
      <div className="pb-10">
        <ManageLinksButton />
      </div>
    </main>
  );
}