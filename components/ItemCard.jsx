"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import useCartStore from '@/stores/cartStore'
import { AspectRatio } from './ui/aspect-ratio'
import { toast } from 'sonner'

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
            <AspectRatio ratio={16 / 9}>
                <Image
                    src={img}
                    alt={name}
                    fill
                    loading='lazy'
                    quality={75}
                    className="rounded-md object-cover px-2"
                />
            </AspectRatio>
            <CardHeader>

                <Badge variant="outline">{catgory}</Badge>
                <CardTitle>{name} </CardTitle>
            </CardHeader>
            <CardFooter className={"flex justify-between"}>
                <div className='font-bold'>
                    &#8377; {price}
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