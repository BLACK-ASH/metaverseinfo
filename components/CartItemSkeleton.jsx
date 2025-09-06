import React from 'react'
import { Skeleton } from './ui/skeleton'

const CartItemSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-3'>
        <Skeleton className={"w-full h-20"} />
        <Skeleton className={"w-full h-20"} />
        <Skeleton className={"w-full h-20"} />
        <Skeleton className={"w-full h-20"} />
        <Skeleton className={"w-full h-20"} />
        <Skeleton className={"w-full h-20"} />
        <Skeleton className={"w-full h-20"} />
        <Skeleton className={"w-full h-20"} />
    </div>
  )
}

export default CartItemSkeleton