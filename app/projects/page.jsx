import Link from "next/link";
import SearchableProjectsGrid from "@/components/links/SearchableProjectsGrid";
import { getPublicProjects } from "@/lib/getLinks";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="glass-nav fixed inset-x-0 top-0 z-40 flex h-14 items-center px-4 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="inline-flex h-9 items-center gap-1.5 rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-2) px-2.5 text-xs text-(--color-text) sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
        >
          <i className="ri-arrow-left-line" aria-hidden="true" />
          <span className="hidden sm:inline">Back</span>
        </Link>
      </header>
      <div className="h-20 sm:h-24" aria-hidden="true" />

      <div className="px-4 pb-2 text-center sm:px-8">
        <h1 className="font-(family-name:--font-display) text-xl font-semibold text-(--color-text)">Projects</h1>
      </div>

      <SearchableProjectsGrid projects={projects} emptyMessage="No projects yet." />
    </main>
  );
}