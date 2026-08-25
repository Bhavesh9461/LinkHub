import Avatar from "@/components/profile/Avatar";
import { profile } from "@/data/profile";

export default function ProfileHeader() {
  return (
    <section className="flex flex-col items-center gap-5 px-4 pb-10 pt-8 text-center sm:pt-10">
      <Avatar src={profile.avatarSrc} name={profile.name} online={profile.online} />

      <div className="flex flex-col items-center gap-2.5">
        <h1 className="flex items-center gap-2 font-(family-name:--font-display) text-2xl font-bold tracking-wide text-(--color-text) sm:text-3xl">
          {profile.name}
          {profile.verified && (
            <i
              className="ri-verified-badge-fill text-xl text-(--color-blue) sm:text-2xl"
              aria-label="Verified"
              title="Verified"
            />
          )}
        </h1>

        <p className="text-sm text-(--color-muted) sm:text-base">{profile.role}</p>

        <code className="rounded-lg border border-(--color-border) bg-(--color-surface-2)/70 px-3 py-1.5 font-(family-name:--font-mono) text-xs text-(--color-blue) sm:text-sm">
          <span className="text-(--color-muted)">{profile.codeLine.prefix}</span>
          <span className="text-(--color-violet)">{profile.codeLine.value}</span>
        </code>

        <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-(--color-text)">
          {profile.status}
          <span aria-hidden="true">{profile.statusEmoji}</span>
        </span>
      </div>
    </section>
  );
}
