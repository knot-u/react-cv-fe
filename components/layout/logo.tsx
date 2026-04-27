"use client";

import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="fixed left-0 top-0 z-25 sm:w-60"
    >
      <Image
        src="/colored_logo.svg"
        alt="Logo"
        width={192}
        height={160}
        priority
        className="block h-auto w-full"
      />
    </Link>
  );
}
