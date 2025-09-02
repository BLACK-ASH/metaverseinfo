"use server"

import connectDB from "@/db/connect"
import Products from "@/models/products.model"

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// get Products
export async function getProducts(query, category, sort = "asc", max = 100000) {

    const dbQuery = {};

    // Search by product name (case-insensitive)
    if (query) {
        dbQuery.name = { $regex: query, $options: "i" };
    }

    // Filter by category only if provided
    if (category && category !== "all") {
        dbQuery.category = category;
    }

    // Filter by price if provided
    if (max) {
        dbQuery.price = { $lte: Number(max) };
    }

    await connectDB();
    let res = await Products.find(dbQuery).sort({ price: sort });
    return res
}

export async function getProductsByCategory(category) {
    await connectDB();
    let res = await Products.find({ category: category }).limit(8).lean();
    return res
}

export async function getProductsById(id) {
    await connectDB();
    let res = await Products.findById(JSON.parse(id));
    return res
}

export async function getProductsByName(query, sort = "asc", max = 100000) {
    await connectDB();
    let res = await Products.find({ name: { $regex: query, $options: "i" } }).sort({ price: sort }).where({ price: { $lte: max } });
    return res

}

export async function addProduct(name, desc, price, img, category) {
    await connectDB();
    const res = await Products.create({ name: name, desc: desc, price: price, img: img, category: category })
    return { status: "success", data: res }
}