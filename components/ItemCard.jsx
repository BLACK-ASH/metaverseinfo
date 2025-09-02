"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import useCartStore from '@/stores/cartStore'

export const LoadingImg = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className="w-10 h-10 border-b-2 border-current rounded-full animate-spin"></div>
        </div>
    )
}

const ItemCard = ({ name,id, price, img, catgory, desc }) => {
    const {addProduct} = useCartStore();
    return (
        <Card className={'relative'} >
            <CardContent className={"relative w-full h-52 p-2"}>
                <Image
                    src={img}
                    alt={name}
                    fill
                    sizes='w-[90%]'
                    loading='lazy'
                    quality={75}
                    className='p-2'
                    style={{ objectFit: "cover" }}
                />

            </CardContent>
            <CardHeader>
               
                <Badge variant="outline">{catgory}</Badge>
                <CardTitle>{name} </CardTitle>
            </CardHeader>
            <CardFooter className={"flex justify-between"}>
                <div className='font-bold'>
                    &#8377; {price}
                </div>
                <div>
                    <Button onClick={() => addProduct({ id,quantity:1 })} className={"cursor-pointer"}><ShoppingCart /> Add to Cart</Button>
                </div>
            </CardFooter>

        </Card >
    )
}

export default ItemCard