"use client";

import { useMemo, useState } from "react";
import ProjectsGrid from "@/components/links/ProjectsGrid";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { SearchInput } from "@/components/links/SearchableLinksGrid";

export default function SearchableProjectsGrid({ projects, emptyMessage }) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 250);

  const filteredProjects = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return projects;

    const terms = query.split(/[,\s]+/).map((t) => t.trim()).filter(Boolean);
    return (projects ?? []).filter((project) => terms.some((term) => project.name.toLowerCase().includes(term)));
  }, [projects, debouncedSearch]);

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-8">
        <SearchInput value={searchInput} onChange={setSearchInput} placeholder="Search projects…" />
      </div>

      <ProjectsGrid
        projects={filteredProjects}
        emptyMessage={isSearching ? "No matches found." : emptyMessage}
      />
    </>
  );
}