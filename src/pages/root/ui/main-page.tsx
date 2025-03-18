
import { AsideMain } from "./aside-main"
import { LinkMain } from "./link-main"

export
  type mainPageLinktype = {
    href: string
    target: 'blank' | '_self'
    text: string
}
const mainPageLinks: mainPageLinktype[] = [
  {
    href: "/zhus/table",
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
    target: "blank",
    text: "База знаний"
  },
]

export
  function MainPage() {

  return <>
    <div className="flex flex-col">
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
            return <LinkMain href={link.href} key={link.href}
                             target={link.target} text={link.text}/>
          })
        }
      </div>
      <AsideMain />
    </div>
  </>
}