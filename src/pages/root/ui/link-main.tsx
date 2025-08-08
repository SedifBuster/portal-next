import Link from "next/link";

export
  function LinkMain(
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
      h-[15vh]
      rounded-md
      flex
      basis-[32%]
      justify-center
      content-center
      shadow-md
      hover:bg-green-100
    "
  >
    <p className="p-2 text-[clamp(0.9rem,10vw,1.2rem)] font-semibold">{text}</p>
  </Link>
}