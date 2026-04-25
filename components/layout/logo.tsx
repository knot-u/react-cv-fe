"use client";

import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="fixed left-4 top-4 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={192}
        height={160}
        priority
        className="h-[20vh] w-auto"
      />
    </Link>
  );
}
