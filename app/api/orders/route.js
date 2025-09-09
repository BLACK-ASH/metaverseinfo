import connectDB from "@/db/connect";
import { getProductsById } from "@/lib/products";
import Orders from "@/models/orders.model";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    try {
        const { cart, userId } = await req.json();

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
        }

        const ids = cart.map((item) => item.id);
        await connectDB();

        const products = await getProductsById(ids); // ensure it accepts array of IDs

        const merged = products.map((product) => {
            const cartItem = cart.find((c) => c.id === product._id.toString());
            return { ...product, quantity: cartItem?.quantity || 1 };
        });

        const totalAmount = merged.reduce((total, item) => total + item.price * item.quantity, 0) + 150;

        const options = {
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        const dbOrder = await Orders.create({
            user: userId,
            orderID: order.id,
            items: merged.map((item) => ({
                product: item._id,      // ✅ correct field name
                quantity: item.quantity,
            })),
            totalPrice: order.amount/100,
            receipt: order.receipt,
            paymentStatus: "pending",
        });


        return NextResponse.json(dbOrder);
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
