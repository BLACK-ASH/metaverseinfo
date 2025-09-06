"use client"
import CartItemCard from '@/components/CartItemCard';
import CartItemSkeleton from '@/components/CartItemSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProductsById } from '@/lib/products';
import useCartStore from '@/stores/cartStore';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';


const cartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (cart.length === 0) {
        setItems([]);
        return;
      }

      try {
        const ids = cart.map((item) => item.id);
        const products = await getProductsById(ids);
        console.log(products);


        const merged = products.map((product) => {
          const cartItem = cart.find((c) => c.id === product._id.toString());
          return { ...product, quantity: cartItem?.quantity || 1 };
        });

        setItems(merged);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, [cart]);


  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      <ScrollArea className={"flex-1 col-span-2 h-[80vh] border p-4 rounded-md box-border"} >
        {(cart.length === 0 && !loading) && <p className='text-muted-foreground'>Your cart is empty</p>}
        {loading && <CartItemSkeleton />}
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