import connectDB from "@/db/connect";
import Products from "@/models/products.model";
import { NextResponse } from "next/server";
import { id } from "zod/v4/locales";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword") || "";

    await connectDB();
    try {
        // Search by name, brand, or category using case-insensitive regex
        const regex = new RegExp(keyword, 'i');

        const products = await Products.find({
            $or: [
                { name: { $regex: regex } },
                { brand: { $regex: regex } },
                { category: { $regex: regex } }
            ]
        })
            .limit(5); // Return top 5 suggestions

        const suggestions = products.map(product => ({
            id: product._id.toString(),
            name: product.name,
            brand: product.brand,
            category: product.category,
            slug: product.slug
        }));

        return NextResponse.json(suggestions);
    } catch (error) {
        console.error("Error in suggestions API:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}