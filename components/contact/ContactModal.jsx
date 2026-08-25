"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { validateContactForm, LIMITS } from "@/lib/validation";
import { countryCodes, DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { config } from "@/data/config";

const initialForm = {
  name: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  phone: "",
  message: "",
  preference: "", // "whatsapp" | "callback"
};

export default function ContactModal({ onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleChange(field) {
    return (e) => {
      let { value } = e.target;
      if (field === "phone")
        value = value.replace(/\D/g, "").slice(0, LIMITS.PHONE_MAX_LEN);
      if (field === "name") value = value.slice(0, LIMITS.NAME_MAX_LEN);
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function selectPreference(value) {
    setForm((prev) => ({ ...prev, preference: value }));
    setErrors((prev) => ({ ...prev, preference: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { isValid, errors: nextErrors, cleaned } = validateContactForm(form);
    setErrors(nextErrors);
    if (!isValid) return;

    setSending(true);
    try {
      const formData = new FormData();
      formData.append("access_key", config.web3formsKey);
      formData.append(
        "subject",
        `New ${cleaned.preference === "whatsapp" ? "WhatsApp" : "callback"} request from ${cleaned.name}`,
      );
      formData.append("from_name", "LinkHub");
      formData.append("name", cleaned.name);
      formData.append("phone", cleaned.fullPhone);
      formData.append(
        "preferred_contact",
        cleaned.preference === "whatsapp"
          ? "WhatsApp message"
          : "Phone callback",
      );
      formData.append("message", cleaned.message || "(no message)");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Request sent — I'll reach out soon");
        setForm(initialForm);
        onClose();
      } else {
        toast.error("Couldn't send — please try again");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="glass w-full max-w-md rounded-t-2xl rounded-b-none p-6 shadow-2xl sm:rounded-(--radius-card) sm:rounded-b-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="contact-modal-title"
            className="font-(family-name:--font-display) text-lg font-semibold text-(--color-text)"
          >
            Get in touch
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-(--color-muted) transition-colors hover:bg-(--color-surface-2) hover:text-(--color-text)"
          >
            <i className="ri-close-line text-lg" aria-hidden="true" />
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="contact-name"
                className="text-xs font-medium text-(--color-muted)"
              >
                Name
              </label>
              <span className="text-[0.65rem] text-(--color-muted)/70">
                {form.name.length}/{LIMITS.NAME_MAX_LEN}
              </span>
            </div>
            <input
              id="contact-name"
              ref={firstFieldRef}
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              maxLength={LIMITS.NAME_MAX_LEN}
              placeholder="Your name"
              className={`h-(--size-btn-h) w-full rounded-lg border bg-(--color-surface-2) px-3 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue) ${
                errors.name
                  ? "border-(--color-pink)"
                  : "border-(--color-border)"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-(--color-pink)">{errors.name}</p>
            )}
          </div>

          {/* Country code + phone */}
          <div>
            <label
              htmlFor="contact-phone"
              className="mb-1.5 block text-xs font-medium text-(--color-muted)"
            >
              Phone number
            </label>
            <div className="flex gap-2">
              <select
                id="contact-country-code"
                value={form.countryCode}
                onChange={handleChange("countryCode")}
                aria-label="Country code"
                className={`h-(--size-btn-h) w-24 shrink-0 rounded-lg border bg-(--color-surface-2) px-2 text-sm text-(--color-text) outline-none transition-colors focus:border-(--color-blue) ${
                  errors.countryCode
                    ? "border-(--color-pink)"
                    : "border-(--color-border)"
                }`}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                id="contact-phone"
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={handleChange("phone")}
                maxLength={LIMITS.PHONE_MAX_LEN}
                placeholder="10-digit number"
                className={`h-(--size-btn-h) w-full rounded-lg border bg-(--color-surface-2) px-3 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue) ${
                  errors.phone
                    ? "border-(--color-pink)"
                    : "border-(--color-border)"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-(--color-pink)">{errors.phone}</p>
            )}
          </div>

          {/* Message (optional) */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="contact-message"
                className="text-xs font-medium text-(--color-muted)"
              >
                Message{" "}
                <span className="text-(--color-muted)/60">(optional)</span>
              </label>
              <span className="text-[0.65rem] text-(--color-muted)/70">
                {form.message.length}/{LIMITS.MESSAGE_MAX_LEN}
              </span>
            </div>
            <textarea
              id="contact-message"
              rows={3}
              value={form.message}
              onChange={handleChange("message")}
              maxLength={LIMITS.MESSAGE_MAX_LEN}
              placeholder="What would you like to talk about?"
              className={`w-full resize-none rounded-lg border bg-(--color-surface-2) px-3 py-2.5 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/60 focus:border-(--color-blue) ${
                errors.message
                  ? "border-(--color-pink)"
                  : "border-(--color-border)"
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-(--color-pink)">
                {errors.message}
              </p>
            )}
          </div>

          {/* Preferred contact method */}
          <div>
            <p className="mb-1.5 text-xs font-medium text-(--color-muted)">
              How should I reach you?
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <PreferenceOption
                active={form.preference === "whatsapp"}
                onClick={() => selectPreference("whatsapp")}
                icon="ri-whatsapp-line"
                label="WhatsApp"
              />
              <PreferenceOption
                active={form.preference === "callback"}
                onClick={() => selectPreference("callback")}
                icon="ri-phone-line"
                label="Callback"
              />
            </div>
            {errors.preference && (
              <p className="mt-1 text-xs text-(--color-pink)">
                {errors.preference}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-1 inline-flex h-(--size-btn-h) items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-(--color-violet) to-(--color-blue) px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          >
            <i
              className={`${sending ? "ri-loader-4-line animate-spin" : "ri-send-plane-2-line"} text-base`}
              aria-hidden="true"
            />
            {sending ? "Sending…" : "Send request"}
          </button>
        </form>
      </div>
    </div>
  );
}

function PreferenceOption({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-(--size-btn-h) items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors active:scale-[0.98] ${
        active
          ? "border-(--color-blue) bg-(--color-surface-2) text-(--color-blue)"
          : "border-(--color-border) bg-(--color-surface-2) text-(--color-muted) hover:border-(--color-blue)/50 hover:text-(--color-text)"
      }`}
    >
      <i className={`${icon} text-base`} aria-hidden="true" />
      {label}
    </button>
  );
}
