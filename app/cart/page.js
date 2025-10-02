"use client";
import { useAuth } from '@/components/auth/auth.context';
import CartItemCard from '@/components/CartItemCard';
import CartItemSkeleton from '@/components/skeleton/CartItemSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProductsByIds } from '@/lib/products';
import useCartStore from '@/stores/cartStore';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';


const CartPage = () => {
  const { cart, clearCart } = useCartStore();
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const totalAmount = items.reduce((total, item) => {
    if (item.offeredPrice > 0) {
      const price = item.offeredPrice
      return total + price * item.quantity
    }
    const price = item.actualPrice
    return total + price * item.quantity
  }, 0) + 150;

  const router = useRouter();

  const handleCheckout = async () => {
    let orderData;
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
        body: JSON.stringify({ cart, userId: user.id, name: user.name, email: user.email, }),
      });
      orderData = await res.json();

      if (orderData.error) {
        toast.error(orderData.error);
        return;
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err);
    }
    finally {
      setIsProcessing(false);
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: orderData.paymentOrderId,
      amount: Math.round(totalAmount * 100),
      handler: async function (response) {
        try {
          setIsVerifying(true);
          const res = await fetch("/api/orders/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          })
          const verifyPaymentData = await res.json();
          if (verifyPaymentData.status === "confirmed") {
            clearCart();
            toast.success("Payment successful.");
            router.push("/my-orders");
            return;
          }
          else {
            toast.error(
              verifyPaymentData.error
            );
          }
        }
        catch (err) {
          console.log(err);
          toast.error(err);
        }
        finally {
          setIsVerifying(false);
        }

      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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
        const products = await getProductsByIds(ids);

        const merged = products?.map((product) => {
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

    fetchData();
  }, [cart]);

  return (
    <div className='relative'>
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
                <p className="font-bold">₹{
                  item.offeredPrice > 0 ? item.offeredPrice * item.quantity : item.actualPrice * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between">
              <p className="text-foreground">Delivery Charge</p>
              <p className="font-bold">₹150</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <p className="font-bold">Total Price</p>
              <p className="font-bold">₹{totalAmount}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={items.length === 0 || isProcessing || isVerifying}
              onClick={handleCheckout}
              className="w-full"
            >
              {(isProcessing || isVerifying) && (
                <Loader2 className="size-4 mr-2 animate-spin" />
              )}
              {isProcessing
                ? "Creating Order..."
                : isVerifying
                  ? "Verifying Payment..."
                  : "Checkout"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
