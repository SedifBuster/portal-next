"use client"

import { Skeleton } from "@/components/ui/skeleton"

export
  function DashSkeleton({
  }: {
  }) {

  return (
    <div>
      <div  className="flex items-center space-x-4"> 
        <Skeleton className="h-[72px] w-full rounded-full m-2" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-[350px] w-1/2" />
        <Skeleton className="h-[350px] w-1/2" />
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <Skeleton className="h-[473px] w-full" />
      </div>
    </div>
  )
}