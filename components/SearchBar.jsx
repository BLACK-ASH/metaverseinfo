"use client"
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
const SearchBar = ({ className }) => {
    const query = useRef(null)
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleSearch = (e) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        params.set("query", query.current.value)
        router.push(`/products?${params.toString()}`)
    }
    return (
        <form onSubmit={handleSearch} className={cn('w-full flex gap-2', className)}>
            <Input ref={query} type="text" placeholder="Search..." />
            <Button type={"submit"} >
                <p className="sr-only">search</p>
                <Search />
            </Button>
        </form>
    )
}

export default SearchBar