import React from 'react'
import { Skeleton } from './ui/skeleton'

const DisplayCardSkeleton = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '>
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
        </div>
    )
}

export default DisplayCardSkeleton