import Link from "next/link";
import { NewsTable } from "./components/newsTable";
import { Button } from "@/components/ui/button";
import LinkMain from "./components/linkMain";
import MainHeader from "@/components/ui/headers/mainHeader";
import AsideMain from "./components/asideMain";

export type mainPageLinktype = {
  href: string
  target: 'blank' | '_self'
  text: string
}

const mainPageLinks: mainPageLinktype[] = [
  {
    href: "http://192.168.0.148:3000/table",
    target: "blank",
    text: "Журнал нежелательных случаев"
  },
  {
    href: "http://192.168.0.148:5006/",
    target: "blank",
    text: "Система учета заявок"
  },
  {
    href: "http://192.168.0.148:5010/",
    target: "blank",
    text: "Журнал БРНС"
  },
  {
    href: "/priemnoe",
    target: "blank",
    text: "Панель мониторинга приемного отделения"
  },
  {
    href: "/bdKnowledge",
    target: "_self",
    text: "База знаний"
  },
]
//news table change
export
  default function Home(
) {
  return (
    <>
      <MainHeader />
      <div className="flex flex-row p-4 gap-2 ">
        <div
          className="
            basis-3/5
            rounded-md
            overflow-auto
            p-4
            grid
            grid-cols-3
            gap-4
            h-[40vh]
          "
        >
          {
            mainPageLinks.map((link) => {
              return <LinkMain href={link.href} target={link.target} text={link.text}/>
            })
          }
        </div>
        <AsideMain />
      </div>
    </>
  )
}