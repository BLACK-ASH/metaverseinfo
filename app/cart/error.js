'use client'
import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cartStore";

 // Error boundaries must be Client Components
 
export default function Error({
  error,
  reset,
}) {
  console.log(error);

  const {clearCart} = useCartStore();

 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <div>
        <h2>If Error Is Related To Cart Try Clearing The Cart</h2>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </div>

      <pre>{error.message}</pre>
   
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}