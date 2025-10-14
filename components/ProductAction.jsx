"use client"
import React, { useState } from 'react'
import { CardFooter } from './ui/card'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import useCartStore from '@/stores/cartStore'
import { toast } from 'sonner'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { MinusIcon, PlusIcon } from 'lucide-react'

const ProductAction = ({ id,inStock }) => {
    const { addProduct } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    return (
        <CardFooter className={"flex items-center justify-between"}>
            <ToggleGroup type="single" variant="outline">
                <ToggleGroupItem aria-label="Decrease Quantity" onClick={() => setQuantity((prev) => prev - 1)} ><MinusIcon className='size-3' /></ToggleGroupItem>
                <ToggleGroupItem aria-label="Product Quantity" disabled>{quantity}</ToggleGroupItem>
                <ToggleGroupItem aria-label="Increase Quantity" onClick={() => setQuantity((prev) => prev + 1)} ><PlusIcon className='size-3' /></ToggleGroupItem>
            </ToggleGroup>

            <p>In Stock: {inStock}</p>


            <Button onClick={() => {
                addProduct(id, quantity)
                toast.success("Product added to cart.");
            }} className={"cursor-pointer"}><ShoppingCart /> Add to Cart</Button>

        </CardFooter>
    )
}

export default ProductAction