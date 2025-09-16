"use client"
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import debounce from 'lodash.debounce'
import { Input } from './ui/input'
import Link from 'next/link'


const SearchBar = ({ className }) => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const containerRef = useRef(null)

    const fetchSuggestions = debounce(async (q) => {
        if (!q) {
            setSuggestions([])
            setOpen(false)
            return
        }
        const data = await fetch(`/api/products/suggestion?keyword=${encodeURIComponent(q)}`)
            .then(res => res.json())
        setSuggestions(data)
        setOpen(true)
    }, 300)

    useEffect(() => {
        fetchSuggestions(query)
        return () => fetchSuggestions.cancel()
    }, [query])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/products/all?keyword=${query}`)
    }

    return (
        <form onSubmit={handleSearch} className={cn("w-full relative", className)} ref={containerRef}>
            <div className="flex gap-2">
                <Input
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (suggestions.length > 0) setOpen(true)
                    }}
                    className="outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button type="submit">
                    <p className="sr-only">search</p>
                    <Search />
                </Button>
            </div>

            {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                    <div className="p-2 text-sm text-muted-foreground">
                        Suggestions for "{query}"
                    </div>
                    <hr />
                    {suggestions.length > 0 ? (
                        suggestions?.map((suggestion) => (
                            <Link href={`/products/all?keyword=${suggestion?.slug}`} key={suggestion?.slug}>
                                <div className="px-4 py-2 hover:bg-gray-100 text-sm text-muted-foreground cursor-pointer">
                                    {suggestion.name.slice(0, 50)}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-500">No suggestions found</div>
                    )}
                </div>
            )}
        </form>
    )
}

export default SearchBar
