import Link from "next/link";
import SearchableProjectsGrid from "@/components/links/SearchableProjectsGrid";
import { getPublicProjects } from "@/lib/getLinks";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="flex items-center px-4 pt-5 sm:px-8 sm:pt-8">
        <Link
          href="/"
          className="glass inline-flex h-10 items-center gap-2 rounded-(--radius-pill) px-4 text-sm text-(--color-text)"
        >
          <i className="ri-arrow-left-line" aria-hidden="true" />
          Back
        </Link>
      </header>

      <div className="px-4 pb-2 pt-6 text-center sm:px-8">
        <h1 className="font-(family-name:--font-display) text-xl font-semibold text-(--color-text)">Projects</h1>
      </div>

      <SearchableProjectsGrid projects={projects} emptyMessage="No projects yet." />
    </main>
  );
}