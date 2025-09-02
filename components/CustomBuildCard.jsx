import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { ArrowUpRight, ShoppingCart } from "lucide-react"
import Image from "next/image"

const CustomBuildCard = ({ name, price, img, processor, motherboard, ram, storage, gpu }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardAction>
                    <Button variant='outline'><ArrowUpRight className="size-4" /> Configure</Button>
                </CardAction>
            </CardHeader>
            <CardContent >
                <div className={"relative w-full h-52"}>
                    <Image
                        src={img}
                        alt={name}
                        fill
                        sizes='w-[90%]'
                        loading='lazy'
                        quality={75}
                        className='p-2'
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <CardDescription>
                    <p>{processor}</p>
                    <p>{motherboard}</p>
                    <p>{ram}</p>
                    <p>{storage}</p>
                    <p>{gpu}</p>
                </CardDescription>
            </CardContent>
            <CardFooter className={"flex justify-between"}>
                <p className='font-bold'> &#8377; {price}</p>
                <Button className={"cursor-pointer"}><ShoppingCart /> Add to Cart</Button>
            </CardFooter>
        </Card>




    )
}

export default CustomBuildCard