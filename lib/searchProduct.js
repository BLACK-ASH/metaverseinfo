import connectDB from "@/db/connect";
import Products from "@/models/products.model";
import { productCache } from "@/lib/cache/productCache";

async function searchProducts(query) {
  await connectDB();

  const { keyword, category, brand, sort, max, page = 1, limit = 12 } = query;

  const filter = {};

  // Apply text search on name and brand
  if (keyword) {
    filter.$text = { $search: keyword };
  }

  // Apply category filter only if a specific category is provided
  if (category && category.trim() !== "" && category.toLowerCase() !== "all") {
    filter.category = category;
  }

  // Filter by brand if provided
  if (brand) {
    filter.brand = brand;
  }

  // Filter by max price if provided
  if (max) {
    filter.price = { $lte: Number(max) };
  }

  const cacheKey = JSON.stringify({ filter, sort, page, limit });
  const cached = productCache.get(cacheKey);
  if (cached) {
    console.log("Returning cached products");
    return cached;
  }

  // Define sorting
  let sortOption = {};
  if (keyword) {
    sortOption = { score: { $meta: "textScore" } };
  } else if (sort === "asc") {
    sortOption = { price: 1 };
  } else if (sort === "desc") {
    sortOption = { price: -1 };
  } else {
    sortOption = { createdAt: -1 };
  }

  const products = await Products.find(filter, keyword ? { score: { $meta: "textScore" } } : {})
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const data = JSON.parse(JSON.stringify(products));
  const count = await Products.countDocuments(filter);

  productCache.set(cacheKey, { data, count });

  return { data, count };
}

export default searchProducts;

export async function getProductSuggestions(keyword) {
  await connectDB();
  try {
    // Search by name, brand, or category using case-insensitive regex
    const regex = new RegExp(query, 'i');

    const products = await Products.find({
      $or: [
        { name: { $regex: regex } },
        { brand: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    })
      .limit(5); // Return top 5 suggestions

    const suggestions = products.map(product => ({
      name: product.name,
      brand: product.brand,
      category: product.category,
      slug: product.slug
    }));

    return suggestions;
  } catch (error) {
    return [];
  }
}




