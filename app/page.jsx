import TopBar from "@/components/layout/TopBar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SearchableLinksGrid from "@/components/links/SearchableLinksGrid";
import Footer from "@/components/layout/Footer";
import { getPublicLinks } from "@/lib/getLinks";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const links = await getPublicLinks();

  return (
    <main className="flex min-h-dvh flex-col">
      <TopBar />
      <ProfileHeader />
      <SearchableLinksGrid links={links} emptyMessage="No links yet." />
      <Footer />
    </main>
  );
}