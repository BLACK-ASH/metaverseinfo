import connectDB from "@/db/connect";
import Orders from "@/models/orders.model";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
    } = await req.json();

    // Use server-only secret
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generated_signature === razorpay_signature) {
        try {
            await connectDB();
            const order = await Orders.findOne({ orderID: razorpay_order_id });

            if (!order) {
                return NextResponse.json({ error: "Order not found." }, { status: 404 });
            }

            order.paymentStatus = "paid";
            order.paymentId = razorpay_payment_id;
            order.orderStatus = "processing";
            await order.save();

            return NextResponse.json(
                { message: "Payment successfully.", status: "confirmed" },
                { status: 200 }
            );
        } catch (error) {
            console.error("Error verifying payment:", error);
            return NextResponse.json({ error: "Error verifying payment." }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }
}
