import TopBar from "@/components/layout/TopBar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import LinksGrid from "@/components/links/LinksGrid";
import Footer from "@/components/layout/Footer";
import { getPublicLinks } from "@/lib/getLinks";

export default async function HomePage() {
  const links = await getPublicLinks();

  return (
    <main className="flex min-h-dvh flex-col">
      <TopBar />
      <ProfileHeader />
      <LinksGrid links={links} emptyMessage="No links yet." />
      <Footer />
    </main>
  );
}
