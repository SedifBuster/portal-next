import Link from "next/link";
import { Button } from "@/src/shared/ui/button";
import { NewsAside } from "./news-aside";

export
  function AsideMain(
) {
  return <aside className="mt-4">
    <div className="h-[7vh] p-2 flex gap-6 ">
      <Link href={'/newComers'}>
        <Button variant={'secondary'} className="text-[clamp(0.3rem,9vw,0.9rem)]">
          Новым сотрудникам
        </Button>
      </Link>
      <Link href={'/bdNumbers'}>
        <Button variant={'secondary'} className="text-[clamp(0.3rem,9vw,0.9rem)]">
          База номеров
        </Button>
      </Link>
    </div>
    <NewsAside />
  </aside>
}