import Image from 'next/image';
import { Badge } from './ui/badge';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useCartStore from '@/stores/cartStore';
import { Separator } from './ui/separator';

const CartItemCard = ({ data }) => {
    const { increaseProduct, decreaseProduct, removeProduct } = useCartStore();

    return (
        <div>
            <div className='flex gap-3'>
                {data.img && (
                    <Image src={data.img} alt={data.name} width={100} height={100} />
                )}
                <div className='relative flex-1'>
                    <div className='flex justify-between  gap-2 items-center'>
                        <h3 className='font-bold text-lg'>{data.name}</h3>
                        <Badge>{data.category}</Badge>
                    </div>
                    <div className='text-muted-foreground text-sm'>
                        <p> Product ID : {data._id}</p>
                        <p> Price : <span className='font-bold'>&#8377; {data.price}</span> </p>
                        <p> Quantity : {data.quantity}</p>
                    </div>
                    <div className='flex absolute bottom-0 right-0 gap-2 mt-2'>
                        <ToggleGroup type="single" variant="outline">
                            <ToggleGroupItem aria-label="Increase Quantity" onClick={() => increaseProduct(JSON.stringify(data._id))} ><PlusIcon className='size-3' /></ToggleGroupItem>
                            <ToggleGroupItem aria-label="Decrease Quantity" onClick={() => decreaseProduct(JSON.stringify(data._id))} ><MinusIcon className='size-3' /></ToggleGroupItem>
                            <ToggleGroupItem aria-label="Remove Product" onClick={() => removeProduct(JSON.stringify(data._id))} ><Trash2Icon color='red' className='size-3 ' /></ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </div>
            <Separator className="my-2"/>
        </div>
    )
}

export default CartItemCard