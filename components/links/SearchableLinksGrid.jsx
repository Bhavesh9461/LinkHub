"use client";

import { useMemo, useState } from "react";
import LinksGrid from "@/components/links/LinksGrid";
import { useDebouncedValue } from "@/lib/useDebouncedValue";

export default function SearchableLinksGrid({ links, emptyMessage }) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 250);

  const filteredLinks = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return links;

    const terms = query.split(/[,\s]+/).map((t) => t.trim()).filter(Boolean);
    return (links ?? []).filter((link) => terms.some((term) => link.name.toLowerCase().includes(term)));
  }, [links, debouncedSearch]);

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-8">
        <SearchInput value={searchInput} onChange={setSearchInput} placeholder="Search links…" />
      </div>

      <LinksGrid
        links={filteredLinks}
        emptyMessage={isSearching ? "No matches found." : emptyMessage}
      />
    </>
  );
}

export function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative mx-auto max-w-md">
      <i
        className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--color-muted)"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-(--size-btn-h) w-full rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-2) pl-9 pr-9 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue)"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-muted) hover:text-(--color-text)"
        >
          <i className="ri-close-line" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}