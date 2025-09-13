"use server";
import connectDB from "@/db/connect";
import Order from "@/models/orders.model";
import { orderCache } from "./cache/orderCache";


export async function getAllOrders(userId = null) {
  const cacheKey = userId || "allOrders";
  
  const cached = orderCache.get(cacheKey);
  if (cached) return cached;

  await connectDB();

  let query = {};
  if (userId) query.user = userId;

  const orders = await Order.find(query)
    .populate("user", "_id name email phoneNumber address")
    .populate("items.product", "_id name price") // now Mongoose knows Product
    .lean();

  const formatted = orders.map(order => ({
    orderId: order._id,
    orderID: order.orderID,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    status: order.orderStatus,
    totalAmount: order.totalPrice,
    paymentStatus: order.paymentStatus,
    paymentId: order.paymentId ,
    receipt: order.receipt,
    shippingAddress: order.shippingAddress,
    username: order.user ? order.user.name : "Guest",
    phoneNumber: order.user ? order.user.phoneNumber : "",
    address: order.user ? order.user.address : "",
    products: order.items.map(i => ({
      productId: i.product._id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity
    }))
  }));

  orderCache.set(cacheKey, JSON.parse(JSON.stringify(formatted)));

  return JSON.parse(JSON.stringify(formatted)); // formatted;
}

  export async function invalidateOrderCache() {
    orderCache.clear('allOrders');
  }