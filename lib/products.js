"use server";

import connectDB from "@/db/connect";
import Products from "@/models/products.model";
import mongoose from "mongoose";
import { productCache } from "@/lib/cache/productCache";

// Get products by IDs with cache
export async function getProductsByIds(ids) {
    const cacheKey = ids.sort().join(","); // consistent key
    const cached = productCache.get(cacheKey);
    if (cached) return cached;

    try {
        await connectDB();
        await connectDB();
        // id should be passed as a plain string array
        const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
        const res = await Products.find({ _id: { $in: objectIds } }).lean();
        const result = JSON.parse(JSON.stringify(res));
        productCache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }


}

// Get products by query/category/etc.
export async function getProducts(query, category, sort = "asc", max, page, limit) {
    const cacheKey = JSON.stringify({ query, category, sort, max, page, limit });
    const cached = productCache.get(cacheKey);
    if (cached) return cached;

    try{

        await connectDB();
        const dbQuery = {};
        if (query) dbQuery.name = { $regex: query, $options: "i" };
        if (category && category !== "all") dbQuery.category = category;
        if (max) dbQuery.price = { $lte: Number(max) };
        
        const data = await Products.find(dbQuery)
        .sort({ price: sort })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
        
        const count = await Products.countDocuments(dbQuery);
        const result = { data: JSON.parse(JSON.stringify(data)), count };
        productCache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { data: [], count: 0 };
    }
}

export async function getProductsCached(query, category, sort = "asc", max, page = 1, limit = 8) {
    const cacheKey = `${category}|${query}|${sort}|${max}|${page}|${limit}`;
    const cached = productCache.get(cacheKey);
    if (cached) {
        console.log("Returning cached products");
        return cached;
    }

    try {
        await connectDB();

        const dbQuery = {};
        if (query) dbQuery.name = { $regex: query, $options: "i" };
        if (category && category !== "all") dbQuery.category = category;
        if (max) dbQuery.price = { $lte: Number(max) };

        const data = await Products.find(dbQuery)
            .sort({ price: sort })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const count = await Products.countDocuments(dbQuery);
        const result = { data: JSON.parse(JSON.stringify(data)), count };

        productCache.set(cacheKey, result); // cache result
        return result;

    } catch (err) {
        console.log(err);
        return { data: [], count: 0 };
    }
}

// Get product by category
export async function getProductsByCategory(category) {
    const cacheKey = `category:${category}`;
    const cached = productCache.get(cacheKey);
    if (cached) return cached;

    try {
        await connectDB();
        const res = await Products.find({ category }).limit(12).lean();
        const result = JSON.parse(JSON.stringify(res));
        productCache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
    
}

// Get products by name
export async function getProductsByName(query, sort = "asc", max = 100000) {
    const cacheKey = `name:${query}:sort:${sort}:max:${max}`;
    const cached = productCache.get(cacheKey);
    if (cached) return cached;

    try{
        await connectDB();
        const res = await Products.find({ name: { $regex: query, $options: "i" } })
        .sort({ price: sort })
        .where({ price: { $lte: max } })
        .lean();
        
        const result = JSON.parse(JSON.stringify(res));
        productCache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// Invalidate cache after adding/updating product
export async function invalidateProductCache() {
    productCache.clear();
}

// Add a new product and invalidate relevant caches
export async function addProduct(name, desc, price, img, category) {
    try {
        await connectDB();
        const res = await Products.create({ name, desc, price, img, category });

        // Invalidate cache after mutation
        console.log("Clearing cache due to addProduct");
        productCache.clear();

        return { status: "success", data: res.name };
    } catch (err) {
        console.log(err);
        return { status: "error", message: err.message };
    }
}
