"use client";

import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import PrivateLinksHeader from "@/components/links/PrivateLinksHeader";
import IconUploader from "@/components/links/IconUploader";
import SortableLinkRow from "@/components/links/SortableLinkRow";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import StaticLinkRow from "@/components/links/StaticLinkRow";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  kind: "link",
  url: "",
  copyValue: "",
  hasLink: true,
  liveUrl: "",
  liveCopyValue: "",
  githubUrl: "",
  githubCopyValue: "",
  show: true,
  visibility: "public",
  iconType: "none",
  iconUrl: "",
  iconName: "",
};

export default function ManageLinksPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  async function loadLinks() {
    setLoading(true);
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      if (data.success) setLinks(data.links);
      else toast.error("Couldn't load links");
    } catch {
      toast.error("Network error loading links");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLinks();
  }, []);

  function handleChange(field) {
    return (e) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  function startEdit(link) {
    setEditingId(link.id);
    setForm({
      id: link.id,
      name: link.name,
      description: link.description || "",
      kind: link.kind || "link",
      url: link.url || "",
      copyValue: link.copyValue || "",
      hasLink: link.hasLink ?? true,
      liveUrl: link.liveUrl || "",
      liveCopyValue: link.liveCopyValue || "",
      githubUrl: link.githubUrl || "",
      githubCopyValue: link.githubCopyValue || "",
      show: link.show,
      visibility: link.visibility,
      iconType: link.iconType || "none",
      iconUrl: link.iconUrl || "",
      iconName: link.iconName || "",
    });
    document
      .getElementById("app-scroll-container")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.id.trim() || !form.name.trim()) {
      toast.error("id and name are required");
      return;
    }
    if (form.kind === "link" && !form.copyValue.trim()) {
      toast.error("copy value is required for a Link");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/links/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Link updated");
          cancelEdit();
          loadLinks();
        } else {
          toast.error(data.message || "Couldn't update link");
        }
      } else {
        const res = await fetch("/api/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            id: form.id.trim().toLowerCase().replace(/\s+/g, "-"),
          }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Link created");
          setForm(emptyForm);
          loadLinks();
        } else {
          toast.error(data.message || "Couldn't create link");
        }
      }
    } catch {
      toast.error("Network error saving link");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Link deleted");
        setLinks((prev) => prev.filter((link) => link.id !== id));
        if (editingId === id) cancelEdit();
      } else {
        toast.error(data.message || "Couldn't delete link");
      }
    } catch {
      toast.error("Network error deleting link");
    } finally {
      setBusyId(null);
    }
  }

  // Optimistically reorder during drag, then persist the final order once dropped.
  function handleDragEnd(event) {
    if (event.canceled) return;

    setLinks((current) => {
      const reordered = move(current, event);
      persistOrder(reordered);
      return reordered;
    });
  }

  async function persistOrder(orderedLinks) {
    const order = orderedLinks.map((link, index) => ({
      id: link.id,
      order: index + 1,
    }));
    try {
      const res = await fetch("/api/links/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
      const data = await res.json();
      if (!data.success) {
        toast.error("Couldn't save new order");
        loadLinks();
      }
    } catch {
      toast.error("Network error saving order");
      loadLinks();
    }
  }

  const filteredLinks = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return links;

    // Comma or space separated terms — matches if the name contains ANY term.
    // "github, instagram" → matches names containing "github" OR "instagram".
    const terms = query
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    return links.filter((link) => {
      const name = link.name.toLowerCase();
      return terms.some((term) => name.includes(term));
    });
  }, [links, debouncedSearch]);

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <main className="flex min-h-dvh flex-col">
      <PrivateLinksHeader backHref="/private-links" />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pb-10 sm:px-8">
        <h1 className="font-(family-name:--font-display) text-lg font-semibold text-(--color-text)">
          Manage links
        </h1>

        <form
          onSubmit={handleSubmit}
          className="glass flex flex-col gap-4 rounded-(--radius-card) p-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-(--color-text)">
              {editingId ? `Editing "${editingId}"` : "Add new"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-xs text-(--color-muted) hover:text-(--color-text)"
              >
                Cancel edit
              </button>
            )}
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-(--color-muted)">
              What is this?
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <TypeOption
                active={form.kind === "link"}
                onClick={() => setForm((prev) => ({ ...prev, kind: "link" }))}
                icon="ri-link"
                label="Link"
              />
              <TypeOption
                active={form.kind === "project"}
                onClick={() =>
                  setForm((prev) => ({ ...prev, kind: "project" }))
                }
                icon="ri-folder-code-line"
                label="Project"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="ID (slug)"
              value={form.id}
              onChange={handleChange("id")}
              placeholder="e.g. staging-site"
              disabled={!!editingId}
            />
            <TextField
              label="Name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="e.g. Staging Site"
            />
          </div>

          <TextField
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Short description"
          />

          {form.kind === "link" ? (
            <>
              <TextField
                label="URL"
                value={form.url}
                onChange={handleChange("url")}
                placeholder="https://…"
              />
              <TextField
                label="Copy value"
                value={form.copyValue}
                onChange={handleChange("copyValue")}
                placeholder="What gets copied when Copy is clicked"
              />
              <label className="flex items-center gap-2 text-sm text-(--color-muted)">
                <input
                  type="checkbox"
                  checked={form.hasLink}
                  onChange={handleChange("hasLink")}
                  className="h-4 w-4 accent-(--color-blue)"
                />
                Show Visit button
              </label>
            </>
          ) : (
            <div className="flex flex-col gap-4 rounded-lg border border-(--color-border) p-4">
              <p className="text-xs font-medium text-(--color-muted)">
                Both groups below are optional
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TextField
                  label="Live URL"
                  value={form.liveUrl}
                  onChange={handleChange("liveUrl")}
                  placeholder="https://…"
                />
                <TextField
                  label="Live copy value"
                  value={form.liveCopyValue}
                  onChange={handleChange("liveCopyValue")}
                  placeholder="Defaults to Live URL if left blank"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TextField
                  label="GitHub URL"
                  value={form.githubUrl}
                  onChange={handleChange("githubUrl")}
                  placeholder="https://github.com/…"
                />
                <TextField
                  label="GitHub copy value"
                  value={form.githubCopyValue}
                  onChange={handleChange("githubCopyValue")}
                  placeholder="Defaults to GitHub URL if left blank"
                />
              </div>
            </div>
          )}

          <IconUploader
            value={{
              iconType: form.iconType,
              iconUrl: form.iconUrl,
              iconName: form.iconName,
            }}
            onChange={(icon) => setForm((prev) => ({ ...prev, ...icon }))}
          />

          <div>
            <p className="mb-1.5 text-xs font-medium text-(--color-muted)">
              Where should this appear?
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <TypeOption
                active={form.visibility === "public"}
                onClick={() =>
                  setForm((prev) => ({ ...prev, visibility: "public" }))
                }
                icon="ri-earth-line"
                label={
                  form.kind === "project" ? "Public (/projects)" : "Public (/)"
                }
              />
              <TypeOption
                active={form.visibility === "private"}
                onClick={() =>
                  setForm((prev) => ({ ...prev, visibility: "private" }))
                }
                icon="ri-lock-line"
                label="Private"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-(--color-muted)">
            <input
              type="checkbox"
              checked={form.show}
              onChange={handleChange("show")}
              className="h-4 w-4 accent-(--color-blue)"
            />
            Visible
          </label>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-(--size-btn-h) items-center justify-center gap-2 self-start rounded-lg bg-gradient-to-r from-(--color-violet) to-(--color-blue) px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <i
              className={`${saving ? "ri-loader-4-line animate-spin" : editingId ? "ri-save-line" : "ri-add-line"} text-base`}
              aria-hidden="true"
            />
            {saving ? "Saving…" : editingId ? "Save changes" : "Add"}
          </button>
        </form>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-(--color-text)">
              All entries
            </h2>
            {links.length > 1 && !isSearching && (
              <p className="text-[0.7rem] text-(--color-muted)">
                Drag anywhere on a card to reorder
              </p>
            )}
          </div>

          <div className="relative">
            <i
              className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--color-muted)"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name — e.g. github, instagram"
              className="h-(--size-btn-h) w-full rounded-lg border border-(--color-border) bg-(--color-surface-2) pl-9 pr-9 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue)"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-muted) hover:text-(--color-text)"
              >
                <i className="ri-close-line" aria-hidden="true" />
              </button>
            )}
          </div>

          {isSearching && (
            <p className="text-[0.7rem] text-(--color-muted)">
              {filteredLinks.length} result
              {filteredLinks.length === 1 ? "" : "s"} — reordering is disabled
              while searching
            </p>
          )}

          {loading ? (
            <p className="text-sm text-(--color-muted)">Loading…</p>
          ) : filteredLinks.length === 0 ? (
            <p className="text-sm text-(--color-muted)">
              {isSearching
                ? "No matches found."
                : "Nothing yet — add one above."}
            </p>
          ) : isSearching ? (
            <div className="flex flex-col gap-2">
              {filteredLinks.map((link) => (
                <StaticLinkRow
                  key={link.id}
                  link={link}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                  busy={busyId === link.id}
                />
              ))}
            </div>
          ) : (
            <DragDropProvider onDragEnd={handleDragEnd}>
              <div className="flex flex-col gap-2">
                {filteredLinks.map((link, index) => (
                  <SortableLinkRow
                    key={link.id}
                    link={link}
                    index={index}
                    onEdit={startEdit}
                    onDelete={handleDelete}
                    busy={busyId === link.id}
                  />
                ))}
              </div>
            </DragDropProvider>
          )}
        </div>
      </div>
    </main>
  );
}

function TextField({ label, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-(--color-muted)">
        {label}
      </label>
      <input
        {...props}
        className="h-(--size-btn-h) w-full rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue) disabled:opacity-50"
      />
    </div>
  );
}

function TypeOption({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-(--size-btn-h) items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${
        active
          ? "border-(--color-blue) bg-(--color-surface-2) text-(--color-blue)"
          : "border-(--color-border) bg-(--color-surface-2) text-(--color-muted) hover:text-(--color-text)"
      }`}
    >
      <i className={`${icon} text-base`} aria-hidden="true" />
      {label}
    </button>
  );
}
