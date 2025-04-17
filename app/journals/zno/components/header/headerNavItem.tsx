"use client"

import Link from "next/link";

export
  default function HeaderNavItem(
    {
      route
    }: {
      route: {
        label: string;
        href: string;
        active: boolean;
      }
    }
  ) {

  return <Link
    href={route.href}
    className="
      group
      rounded-lg
      border
      border-transparent
      px-5 py-4
      transition-colors
      hover:border-primary
    hover:bg-green-100
    hover:dark:border-neutral-700
    hover:dark:bg-neutral-800/30
    "
  >
    <h2 className="text-xl">
      {route.label}{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
  </Link>
}