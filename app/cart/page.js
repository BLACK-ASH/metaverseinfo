"use client"
import CartItemCard from '@/components/CartItemCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProductsById } from '@/lib/products';
import useCartStore from '@/stores/cartStore';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';

const cartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (cart.length === 0) {
        setItems([]);
        return;
      }

      try {
        const results = await Promise.all(
          cart.map(async (item) => {
            const product = await getProductsById(item.id); // plain object
            return { ...product, quantity: item.quantity };
          })
        );
        setItems(results);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    }

    fetchData();
  }, [cart]);


  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

      <ScrollArea className={"flex-1 col-span-2 h-[80vh] border p-4 rounded-md box-border"} >
        {items?.map((item) => (<CartItemCard key={JSON.stringify(item._id)} data={item} />))}
      </ScrollArea>


      <Card>
        <CardHeader>
          <h1 className='text-2xl font-bold'>Cart Summary </h1>
          <div className='flex justify-between'>
            <p className='font-bold'>Total Items</p>
            <p className='font-bold'>{items.length}</p>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 && <p className='text-muted-foreground'>Your cart is empty</p>}
          {items?.map((item) => {
            return (
              <div key={JSON.stringify(item._id)} className='flex justify-between'>
                <p className='text-muted-foreground'>{item.name} x {item.quantity}</p>
                <p className='font-bold'> {item.price * item.quantity}</p>
              </div>
            )
          })}
          <div className='flex justify-between'>
            <p className='text-foreground'>delivery charge</p>
            <p className='font-bold'> 150</p>
          </div>
          <Separator className='my-2 ' />
          <div className='flex justify-between'>
            <p className='font-bold'>Total Price</p>
            <p className='font-bold'>{items.reduce((acc, item) => acc + item.price * item.quantity, 0) + 150}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Checkout</Button>
        </CardFooter>

      </Card>
    </div>
  )
}

export default cartPage