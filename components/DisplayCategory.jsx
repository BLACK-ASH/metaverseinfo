"use client"
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
const category = ["processor", "graphics-card", "motherboard", "storage", "RAM", "power-supply", "cooler", "monitor", "cabinet"]



const DisplayCategory = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleClick = (item) => () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("category", item)
        router.push(`/?${params.toString()}`, { scroll: false })
    }
    return (
        <div className='my-10'>
            <h2 className='text-2xl font-bold py-3'>Products By Category</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 '>
                {category.map((item) => (
                    <p onClick={handleClick(item)} className={cn('text-muted-foreground ring-2 p-2 cursor-pointer ring-muted text-center rounded-md', searchParams.get("category") === item && "bg-muted text-muted-foreground")} key={item}>{item}</p>
                ))}
            </div>
        </div>
    )
}

export default DisplayCategory