"use client"

import { Button } from "@/components/ui/button"

export
  function CustomLoading(
) {
  return (
    <div
      className="
        absolute
        w-screen
        h-screen
        z-10
        top-0
        left-0
        bg-blue-300/75
        flex
        justify-center
        items-center
        gap-4
        flex-col
        text-white
      "
    >
        <p>любой текст загрузки</p>
    <Button>окей</Button>

    </div>
  )
}

