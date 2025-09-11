"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import useCartStore from '@/stores/cartStore'
import { AspectRatio } from './ui/aspect-ratio'
import { toast } from 'sonner'
import DisplayImages from './DisplayImages'
import Link from 'next/link'

export const LoadingImg = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className="w-10 h-10 border-b-2 border-current rounded-full animate-spin"></div>
        </div>
    )
}

const ItemCard = ({ name, id, price, img, catgory, desc }) => {
    const { addProduct } = useCartStore();
    return (
        <Card className={'relative'} >
            <DisplayImages duration={5000} className='w-full h-full' images={img} />
            <CardHeader>
                <Badge variant="outline">{catgory}</Badge>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardFooter className={"flex items-center justify-between"}>
                <div>
                    <p className='font-bold text-lg px-3'>
                        &#8377; {price}
                    </p>
                    <Button variant={"link"} className={"cursor-pointer"}>
                        <Link href={`/products/${id}`}>View Details</Link>
                    </Button>
                </div>
                <div>
                    <Button onClick={() => {
                        addProduct(id)
                        toast.success("Product added to cart.");
                    }} className={"cursor-pointer"}><ShoppingCart /> Add to Cart</Button>
                </div>
            </CardFooter>

        </Card >
    )
}

export default ItemCard