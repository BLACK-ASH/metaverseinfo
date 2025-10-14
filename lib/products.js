"use server";

import connectDB from "@/db/connect";
import Products from "@/models/products.model";
import mongoose from "mongoose";
import { productCache } from "@/lib/cache/productCache";

async function getProductsById(id) {
    id = new mongoose.Types.ObjectId(id);
    const cacheKey = id;
    const cached = productCache.get(cacheKey);
    if (cached) return cached;
    try {
        await connectDB();
        const res = await Products.findById(id).lean();
        const result = JSON.parse(JSON.stringify(res));
        productCache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

// Get products by IDs with cache
export async function getProductsByIds(ids) {
    const cacheKey = ids.sort().join(","); // consistent key
    const cached = productCache.get(cacheKey);
    if (cached) return cached;

    try {
        const res = await Promise.all(ids.map(id => getProductsById(id)));
        const result = JSON.parse(JSON.stringify(res));
        productCache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// Get products by query/category/etc.
export async function getProducts(query, category, sort = "asc", max, page = 1, limit = 12) {
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
        const res = await Products.find({ category }).limit(8).lean();
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

export async function getProductBySlug(slug) {
    const cached = productCache.get(slug);
    if (cached) return cached;

    try {
        await connectDB();
        const res = await Products.findOne({ slug }).lean();
        const result = JSON.parse(JSON.stringify(res));
        productCache.set(slug, result);
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
export async function addProduct(values) {
    console.log(values);
    
    try {
        await connectDB();
        const res = await Products.create({ ...values });

        // Invalidate cache after mutation
        console.log("Clearing cache due to addProduct");
        productCache.clear();

        return { status: "success", data: res.slug, };
    } catch (err) {
        console.log(err);
        return { status: "error", message: err.message };
    }
}

export async function updateProduct(slug, values) {
    try {
        await connectDB();
        const res = await Products.findOneAndUpdate({ slug }, { ...values }, { new: true });

        console.log("Clearing cache due to updateProduct");
        productCache.clear();

        return { status: "success", data: res.slug, };
    } catch (err) {
        console.log(err);
        return { status: "error", message: err.message };
    }
    
}
