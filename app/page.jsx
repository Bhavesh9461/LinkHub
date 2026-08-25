import TopBar from "@/components/layout/TopBar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import LinksGrid from "@/components/links/LinksGrid";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <TopBar />
      <ProfileHeader />
      <LinksGrid />
      <Footer />
    </main>
  );
}
