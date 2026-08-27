"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function IconUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }

    setUploading(true);
    try {
      const authRes = await fetch("/api/imagekit-auth");
      const auth = await authRes.json();
      if (!auth.success) {
        toast.error("Couldn't start upload — check ImageKit config");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", auth.publicKey);
      formData.append("signature", auth.signature);
      formData.append("expire", auth.expire);
      formData.append("token", auth.token);
      formData.append("folder", "/linkhub-icons");

      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });
      const uploaded = await uploadRes.json();

      if (uploaded.url) {
        onChange({ iconType: "upload", iconUrl: uploaded.url, iconName: "" });
        toast.success("Icon uploaded");
      } else {
        toast.error(uploaded.message || "Upload failed");
      }
    } catch {
      toast.error("Network error during upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-(--color-muted)">Icon</p>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface-2)">
          {value.iconType === "upload" && value.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.iconUrl} alt="" className="h-8 w-8 object-contain" />
          ) : value.iconType === "remix" && value.iconName ? (
            <i className={`${value.iconName} text-xl text-(--color-text)`} aria-hidden="true" />
          ) : (
            <i className="ri-image-line text-xl text-(--color-muted)" aria-hidden="true" />
          )}
        </div>

        <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 text-xs font-medium text-(--color-text) transition-colors hover:border-(--color-blue)">
          <i className={`${uploading ? "ri-loader-4-line animate-spin" : "ri-upload-2-line"} text-sm`} aria-hidden="true" />
          {uploading ? "Uploading…" : "Upload PNG"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-(--color-muted)">
          Or use a Remix Icon name instead
        </label>
        <input
          type="text"
          value={value.iconType === "remix" ? value.iconName : ""}
          onChange={(e) =>
            onChange({ iconType: e.target.value ? "remix" : "none", iconName: e.target.value, iconUrl: "" })
          }
          placeholder="e.g. ri-github-line"
          className="h-(--size-btn-h) w-full rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue)"
        />
        <p className="mt-1 text-[0.7rem] text-(--color-muted)/70">
          Browse names at remixicon.com — typing one here clears any uploaded image, and uploading an image clears this.
        </p>
      </div>
    </div>
  );
}