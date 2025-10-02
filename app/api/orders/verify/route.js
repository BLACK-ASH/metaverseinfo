import connectDB from "@/db/connect";
import Orders from "@/models/orders.model";
import Products from "@/models/products.model"; // import products
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";
import { invalidateOrderCache } from "@/lib/order.action";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    await req.json();

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");


  if (generated_signature !== razorpay_signature) {
    return NextResponse.json(
      { error: "Payment verification failed." },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const order = await Orders.findOne({ paymentOrderId: razorpay_order_id }).populate("items.product");;

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // ✅ update order status
    order.paymentStatus = "paid";
    order.paymentId = razorpay_payment_id;
    order.orderStatus = "processing";

    // ✅ update product quantities
    await Promise.all(
      order.items.map((item) => {
        const productId = item.product._id || item.product;
        return Products.findOneAndUpdate(
          { _id: productId },
          { $inc: { inStock: -Number(item.quantity) } },
          { new: true }
        );
      })
    );

    await order.save();

    const orderItemsData = order.items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.actualPrice,
    }));

    // ✅ return success response
    try {
      await sendEmail(order.username, order.email, "order", orderItemsData);
      await sendEmail(
        order.username,
        "ashifshaikh9a@gmail.com",
        "order_received",
        orderItemsData
      );
    }
    catch (err) {
      console.error("Error sending email:", err);
    }


    await invalidateOrderCache(order.email);
    revalidatePath(`/my-orders`);

    return NextResponse.json(
      { message: "Payment verified & stock updated.", status: "confirmed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Error verifying payment." },
      { status: 500 }
    );
  }
}
