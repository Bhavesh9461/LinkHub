import PrivateLinksHeader from "@/components/links/PrivateLinksHeader";
import ProjectsGrid from "@/components/links/ProjectsGrid";
import ManageLinksButton from "@/components/links/ManageLinksButton";
import { getPrivateProjects } from "@/lib/getLinks";

export default async function PrivateProjectsPage() {
  const projects = await getPrivateProjects();

  return (
    <main className="flex min-h-dvh flex-col">
      <PrivateLinksHeader backHref="/private-links" centerAction={<ManageLinksButton />} />

      <div className="px-4 pb-2 pt-6 text-center sm:px-8">
        <h1 className="font-(family-name:--font-display) text-xl font-semibold text-(--color-text)">
          Private Projects
        </h1>
      </div>

      <ProjectsGrid projects={projects} emptyMessage="No private projects yet — add one from Manage links." />
    </main>
  );
}