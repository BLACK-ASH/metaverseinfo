import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // Or a custom loading skeleton component
    return (<div>
        <div className='py-3'>
            <Skeleton className={"w-full h-16"} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '>
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
            <Skeleton className={"w-full h-72"} />
        </div>
    </div>)
}