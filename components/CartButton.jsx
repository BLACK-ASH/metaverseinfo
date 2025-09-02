"use client"
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import useCartStore from '@/stores/cartStore'
const CartButton = () => {
    const { cart } = useCartStore();
    return (
        <div className='relative'>
            <Button variant="ghost" asChild>
                <Link href="/cart" className="hidden md:flex" >
                    <ShoppingCart className='size-4' />
                </Link>
            </Button>
            <Badge className='absolute text-[8px] rounded-full -top-1 -right-1'>{cart.length}</Badge>
        </div>
    )
}

export default CartButton