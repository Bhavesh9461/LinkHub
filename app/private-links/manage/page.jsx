"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateLinksHeader from "@/components/links/PrivateLinksHeader";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  url: "",
  copyValue: "",
  hasLink: true,
  show: true,
};

export default function ManagePrivateLinksPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  async function loadLinks() {
    setLoading(true);
    try {
      const res = await fetch("/api/private-links");
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
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.id.trim() || !form.name.trim() || !form.copyValue.trim()) {
      toast.error("id, name, and copy value are required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/private-links", {
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
    } catch {
      toast.error("Network error creating link");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/private-links/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Link deleted");
        setLinks((prev) => prev.filter((link) => link.id !== id));
      } else {
        toast.error(data.message || "Couldn't delete link");
      }
    } catch {
      toast.error("Network error deleting link");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <PrivateLinksHeader />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pb-10 sm:px-8">
        <h1 className="font-(family-name:--font-display) text-lg font-semibold text-(--color-text)">
          Manage private links
        </h1>

        {/* Create form */}
        <form onSubmit={handleCreate} className="glass flex flex-col gap-4 rounded-(--radius-card) p-5">
          <h2 className="text-sm font-semibold text-(--color-text)">Add a new link</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="ID (slug)" value={form.id} onChange={handleChange("id")} placeholder="e.g. staging-site" />
            <TextField label="Name" value={form.name} onChange={handleChange("name")} placeholder="e.g. Staging Site" />
          </div>

          <TextField
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Short description"
          />
          <TextField label="URL" value={form.url} onChange={handleChange("url")} placeholder="https://…" />
          <TextField
            label="Copy value"
            value={form.copyValue}
            onChange={handleChange("copyValue")}
            placeholder="What gets copied when Copy is clicked"
          />

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-(--color-muted)">
              <input type="checkbox" checked={form.hasLink} onChange={handleChange("hasLink")} className="h-4 w-4 accent-(--color-blue)" />
              Show Visit button
            </label>
            <label className="flex items-center gap-2 text-sm text-(--color-muted)">
              <input type="checkbox" checked={form.show} onChange={handleChange("show")} className="h-4 w-4 accent-(--color-blue)" />
              Visible
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-(--size-btn-h) items-center justify-center gap-2 self-start rounded-lg bg-gradient-to-r from-(--color-violet) to-(--color-blue) px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <i className={`${saving ? "ri-loader-4-line animate-spin" : "ri-add-line"} text-base`} aria-hidden="true" />
            {saving ? "Adding…" : "Add link"}
          </button>
        </form>

        {/* Existing links list */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-(--color-text)">Existing links</h2>

          {loading ? (
            <p className="text-sm text-(--color-muted)">Loading…</p>
          ) : links.length === 0 ? (
            <p className="text-sm text-(--color-muted)">No private links yet — add one above.</p>
          ) : (
            links.map((link) => (
              <div key={link.id} className="glass flex items-center justify-between gap-3 rounded-lg px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-(--color-text)">{link.name}</p>
                  <p className="truncate text-xs text-(--color-muted)">{link.description || link.copyValue}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(link.id)}
                  disabled={deletingId === link.id}
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-(--color-border) px-3 text-xs font-medium text-(--color-pink) transition-colors hover:bg-(--color-pink)/10 disabled:opacity-60"
                >
                  <i className={`${deletingId === link.id ? "ri-loader-4-line animate-spin" : "ri-delete-bin-line"} text-sm`} aria-hidden="true" />
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function TextField({ label, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-(--color-muted)">{label}</label>
      <input
        {...props}
        className="h-(--size-btn-h) w-full rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue)"
      />
    </div>
  );
}