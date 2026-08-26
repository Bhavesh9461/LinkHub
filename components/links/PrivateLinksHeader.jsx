"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function PrivateLinksHeader() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("welcome")) {
      toast.success(`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`);
      router.replace("/private-links"); // strip the query param so it doesn't refire on refresh
    }
  }, [searchParams, user, router]);

  return (
    <header className="flex items-center justify-between px-4 pt-5 sm:px-8 sm:pt-8">
      <Link
        href="/"
        className="glass inline-flex h-10 items-center gap-2 rounded-(--radius-pill) px-4 text-sm text-(--color-text)"
      >
        <i className="ri-arrow-left-line" aria-hidden="true" />
        Back
      </Link>

      <SignOutButton redirectUrl="/">
        <button
          type="button"
          className="glass inline-flex h-10 items-center gap-2 rounded-(--radius-pill) px-4 text-sm font-medium text-(--color-text) transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
        >
          <i className="ri-logout-box-line text-base" aria-hidden="true" />
          Logout
        </button>
      </SignOutButton>
    </header>
  );
}