"use client";
import CartItemCard from '@/components/CartItemCard';
import CartItemSkeleton from '@/components/CartItemSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getUser } from '@/lib/auth.action';
import { getProductsById } from '@/lib/products';
import useCartStore from '@/stores/cartStore';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';


const CartPage = () => {
  const { cart, clearCart } = useCartStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0) + 150;

  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout.");
      return;
    }
    try {
      setIsProcessing(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, userId: user._id }),
      });
      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.orderID,
        amount: Math.round(totalPrice * 100),
        handler: async function (response) {
          const res = await fetch("/api/orders/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          })
          const data = await res.json();
          if (data.status === "confirmed") {
            clearCart();
            toast.success("Payment successful.");
            router.push("/my-orders");
            return;
          }
          else {
            toast.error(
              data.error
            );
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
    catch (err) {
      console.log(err);
      toast.error(err);
    }
    finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (cart.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const ids = cart.map((item) => item.id);
        const products = await getProductsById(ids);

        const merged = products.map((product) => {
          const cartItem = cart.find((c) => c.id === product._id.toString());
          return { ...product, quantity: cartItem?.quantity || 1 };
        });

        setItems(merged);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
    fetchUser();
  }, [cart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ScrollArea className="flex-1 col-span-2 h-[80vh] border p-4 rounded-md box-border">
        {cart.length === 0 && !loading && <p className="text-muted-foreground">Your cart is empty</p>}
        {loading && <CartItemSkeleton />}
        {items.map((item) => (
          <CartItemCard key={item._id} data={item} />
        ))}
      </ScrollArea>

      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Cart Summary</h1>
          <div className="flex justify-between">
            <p className="font-bold">Total Items</p>
            <p className="font-bold">{items.length}</p>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 && <p className="text-muted-foreground">Your cart is empty</p>}
          {items.map((item) => (
            <div key={item._id} className="flex justify-between">
              <p className="text-muted-foreground">{item.name} x {item.quantity}</p>
              <p className="font-bold">₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between">
            <p className="text-foreground">Delivery Charge</p>
            <p className="font-bold">₹150</p>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <p className="font-bold">Total Price</p>
            <p className="font-bold">₹{totalPrice}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={items.length === 0|| isProcessing} onClick={handleCheckout} className="w-full"><ArrowUpRight className="size-4" /> Proceed to Checkout</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartPage;
