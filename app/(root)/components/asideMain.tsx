"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NewsTable } from "./newsTable";

export
  default function AsideMain(
) {
  return <aside className="basis-2/5">
    <div className="h-[7vh] p-2 flex gap-6">
      <Link href={'/newComers'}><Button variant={'secondary'}>Новым сотрудникам</Button></Link>
      <Link href={'/bdNumbers'}><Button variant={'secondary'}>База номеров</Button></Link>
    </div>
    <NewsTable />
  </aside>
}