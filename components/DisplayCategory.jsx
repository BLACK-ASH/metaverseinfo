"use client"
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { componentCategories, peripheralCategories } from '@/lib/data/catagories.data'
export const category = [
    ...componentCategories,
    ...peripheralCategories
]


const DisplayCategory = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleClick = (item) => () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("category", item)
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <ScrollArea className="w-full rounded-md border whitespace-nowrap">
            <div className='flex items-center gap-2 p-2 pb-4'>
                {category.map((item) => (
                    <div onClick={handleClick(item.slug)} className={cn('p-3 w-40 ring-2 ring-muted rounded-md cursor-pointer', searchParams.get("category") === item.slug && "bg-muted text-muted-foreground")}
                        key={item.slug}
                    >
                        <p>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default DisplayCategory