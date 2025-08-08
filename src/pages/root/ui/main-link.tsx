import Link from "next/link";

export
  function MainLink(
    {
      href,
      target,
      text
    }: {
      href: string
      target: '_self' | 'blank'
      text: string
    }
) {
  return <Link href={href} target={target}
    className="
      border
      h-[13vh]
      rounded-md
      flex
      w-[33.9vh]
      justify-center
      content-center
      shadow-md
      hover:bg-green-100
    "
  >
    <p className="p-2 text-[clamp(0.9rem,10vw,1.2rem)] font-semibold">{text}</p>
  </Link>
}//basis-[25%]