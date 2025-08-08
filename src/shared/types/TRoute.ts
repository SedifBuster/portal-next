import { StaticImageData } from "next/image"
import { IconType } from "react-icons/lib"

export type routesType = {
  label: string,
  group: 'main' | 'journals' | 'inner' | 'outer',
  href: string,
  active: boolean,
  target: 'blank' | '_self',
  icon: StaticImageData | IconType
}