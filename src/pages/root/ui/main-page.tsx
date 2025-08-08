import { AsideMain } from "./aside-main"
import { AsideNews } from "./aside-news"
import { MainCards } from "./main-cards"

export
  function MainPage() {

  return <div className="flex flex-col w-full">
      <MainCards />
      <AsideMain >
        <AsideNews />
      </AsideMain>
  </div>
}