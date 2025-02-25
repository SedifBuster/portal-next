"use client"


import Image from "next/image";
import logoImage from "../../../public/logoVKB.png"
import { Label } from "../../shared/ui/label";

export
  default function MainHeader(
) {
  return <header>
    <div className="flex p-6 gap-6">
      <Image src={logoImage} alt="logo image" width={283}/>
      <Label
        className="
          text-6xl
          block
          subpixel-antialiased
          tracking-wide
          p-4
        "
      >
        корпоративный портал
      </Label>
    </div>
  </header>
}