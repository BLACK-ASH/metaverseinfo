"use client"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import useCartStore from "@/stores/cartStore"

const CartButton = () => {
  const cartCount = useCartStore((state) => state.cartCount())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative">
      <Button variant="ghost" asChild>
        <Link href="/cart" className="hidden md:flex">
          <ShoppingCart className="size-4" />
        </Link>
      </Button>
      {mounted && cartCount > 0 && (
        <Badge className="absolute text-[8px] rounded-full -top-1 -right-1">
          {cartCount}
        </Badge>
      )}
    </div>
  )
}

export default CartButton
