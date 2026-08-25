export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-(--color-border)" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-(--color-blue) border-r-(--color-violet)" />
      </div>
      <p className="font-mono text-xs tracking-[0.3em] text-(--color-muted) uppercase">Loading</p>
    </div>
  );
}
