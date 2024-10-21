'use client'
import Link from "next/link";


export
  default function LinkMain(
    {
      href,
      target,
      text
    }: {
      href: string
      target: 'blank' | 'self'
      text: string
    }
) {
  return <Link href={href} target={target}
    className="
      border
      h-[15vh]
      rounded-md
      p-4
      flex
      justify-center
      content-center
      shadow-md
      hover:bg-green-100 
    "
  >
    <p className="p-2 text-lg font-semibold">{text}</p>
  </Link>
}