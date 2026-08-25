import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 pb-8 text-center sm:px-8">
      <p className="flex items-center gap-1.5 font-mono text-xs text-(--color-muted)">
        Made with <i className="ri-heart-3-fill text-(--color-pink)" aria-hidden="true" /> by{" "}
        <span className="text-(--color-text)">{profile.name}</span>
      </p>
      <p className="text-[0.7rem] text-(--color-muted)/70">
        © {year} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
