"use client"

import { Button } from "@/src/shared/ui/button"
import clsx from "clsx"
import Image from 'next/image'
import { Dispatch, SetStateAction } from "react"

export
  function CustomLoading({
    statusText,
    loading,
    setSending,
  }: {
    statusText: string,
    loading: boolean,
    setSending: Dispatch<SetStateAction<boolean>>,
  }
) {
  return (
    <div
      className="
        absolute
        w-full
        h-full
        z-10
        top-0
        left-0
        bg-gray-800/75
        flex
        justify-center
        items-center
        gap-4
        flex-col
        border
        rounded-lg
      "
    >
      <Image
        src="/cogwheel.svg"
        width={60}
        height={60}
        alt="status wheel"
        className={
          clsx(`
          `,
          loading && 'animate-spin-slow'
          )
        }
      />
      <p
        className="
          text-xl
          text-white
        "
      >
        {statusText}
      </p>
      {
        !loading
        && 
        <Button onClick={() => setSending(false)}>
          закрыть
        </Button>
      }
    </div>
  )
}