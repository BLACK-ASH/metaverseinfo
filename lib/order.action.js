"use server";
import connectDB from "@/db/connect";
import Order from "@/models/orders.model";
import { orderCache } from "./cache/orderCache";
import { revalidatePath } from "next/cache";
import { ca } from "zod/v4/locales";


export async function getAllOrders() {
  const cached = orderCache.get("allOrders");
  if (cached) return cached;

  try {
    await connectDB();
    const orders = await Order.find().lean();
    const data = JSON.parse(JSON.stringify(orders));
    orderCache.set("allOrders", data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function getOrderByUser(email) {
  const cacheKey = email.toString().trim();
  const cached = orderCache.get(cacheKey);
  if (cached) return cached;
  try {
    await connectDB();
    const orders = await Order.find({ email }).lean();
    const data = JSON.parse(JSON.stringify(orders));
    orderCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function getSingleOrder(id) {
  const cacheKey = id.toString().trim();
  const cached = orderCache.get(cacheKey);
  if (cached) return cached;
  try {
    await connectDB();
    const order = await Order.findById(id).populate("items.product").lean();
    const data = JSON.parse(JSON.stringify(order));
    orderCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

export async function invalidateOrderCache(key = "allOrders") {
  key = key.toString().trim()

  if (key === "allOrders") {
    orderCache.clear(); // clear all entries
    revalidatePath("/orders");
  } else {
    orderCache.delete(key); // clear only that user's cache
    revalidatePath("/my-orders");
  }
}
