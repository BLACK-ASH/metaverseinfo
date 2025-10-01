import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    category: String,
    brand: String,
    subCategory: String,
    actualPrice: Number,
    offeredPrice: Number,
    description: String,
    inStock:{
        type: Number,
        default: 1
    },
    images: [String],
    specs: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug before saving
productSchema.pre("save", async function (next) {
  if (!this.isModified("name")) {
    return next();
  }

  const baseSlug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  // Use dynamic model reference
  while (await this.constructor.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.slug = slug;
  next();
});

// Text index for name and brand (global search)
productSchema.index({
  name: "text",
  brand: "text",
  category: "text",
});

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
