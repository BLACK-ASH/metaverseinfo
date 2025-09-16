"use client"
import { ArrowDownIcon, ArrowUp } from 'lucide-react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const FilterItem = () => {
    const [value, setvalue] = useState([100000])
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    // Price Filter
    const priceFilter = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("max", value[0])
        router.push(`${pathname}?${params.toString()}`)
    }

    const sortAsc = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort", "asc")
        router.push(`${pathname}?${params.toString()}`)
    }

    const sortDesc = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort", "desc")
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='flex flex-col md:flex-row w-full lg:w-2/3 gap-2 justify-end'>
            <div className='flex gap-2 w-full items-center'>
                <p className='font-semibold text-sm text-center w-1/3 md:w-1/4 al'>0 - &#8377;{value[0]}</p>
                <span className='sr-only'>Price Fliter</span>
                <Slider value={value} aria-label="Price Filter" onValueChange={setvalue} min={0} max={100000} step={1000} />
            </div>
            <div className='flex gap-2 max-md:justify-end'>
                <Button onClick={priceFilter} >Apply</Button>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={sortAsc} variant="ghost" >
                            <p className="sr-only">sort by Ascending</p>
                            <ArrowDownIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Filter price by Ascending</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={sortDesc} variant="ghost" >
                            <p className="sr-only">sort by Descending</p>
                            <ArrowUp />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Filter price by Descending</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}

export default FilterItem