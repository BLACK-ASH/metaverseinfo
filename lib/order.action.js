"use server"

import connectDB from "@/db/connect";
import Order from "@/models/orders.model";

export async function getOrders() {
    try {
        await connectDB();
        const res = await Order.find({}).populate("user", "name email address").lean();
        return JSON.parse(JSON.stringify(res));
    }
    catch (err) {
        console.log(err)
    }
}