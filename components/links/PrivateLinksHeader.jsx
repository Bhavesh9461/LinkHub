"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function PrivateLinksHeader({
  backHref = "/",
  centerAction = null,
}) {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("welcome")) {
      toast.success(
        `Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`,
      );
      router.replace("/private-links");
    }
  }, [searchParams, user, router]);

  return (
    <>
      <header className="glass-nav fixed inset-x-0 top-0 z-40 grid h-14 grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:h-16 sm:grid-cols-3 sm:px-8">
        <div className="justify-self-start">
          <Link
            href={backHref}
            className="inline-flex h-9 items-center gap-1.5 rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-2) px-2.5 text-xs text-(--color-text) sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <i className="ri-arrow-left-line" aria-hidden="true" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </div>

        <div className="flex min-w-0 justify-self-center">{centerAction}</div>

        <div className="justify-self-end">
          <SignOutButton redirectUrl="/">
            <button
              type="button"
              className="inline-flex h-9 items-center gap-1.5 rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-2) px-2.5 text-xs font-medium text-(--color-text) transition-colors hover:border-(--color-pink) hover:text-(--color-pink) sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <i className="ri-logout-box-line text-base" aria-hidden="true" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </SignOutButton>
        </div>
      </header>

      <div className="h-22 sm:h-22" aria-hidden="true" />
    </>
  );
}
