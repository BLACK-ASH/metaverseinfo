"use client"

import { componentCategories, peripheralCategories, subCategories } from "@/lib/data/catagories.data";
import { Button } from '@/components/ui/button';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { brands } from "@/lib/data/brand.data";
import { Textarea } from "@/components/ui/textarea";
import DisplayImages from "@/components/DisplayImages";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";
import { categorySpecMap } from "@/lib/data/categoryMap";
import { getProductBySlug, updateProduct } from "@/lib/products";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const category = [...componentCategories.map((item) => item.slug), ...peripheralCategories.map((item) => item.slug), "laptop", "pre-built"]
const brandsList = [...brands.map((item) => item.name)]

const formSchema = z.object({
    name: z.coerce.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    category: z.enum(category),
    brand: z.enum(brandsList),
    subCategory: z.string().optional(),
    actualPrice: z.coerce.number().min(0, "Price must be positive"),
    offeredPrice: z.coerce.number().min(0, "Price must be positive").optional(),
    description: z.coerce.string().min(2, {
        message: "Product description must be at least 2 characters.",
    }),
    inStock: z.coerce.number().min(0, "Stock must be positive"),
    images: z.array(z.string()).nonempty("Please add at least one image"),
    specs: z
        .record(z.string(), z.any())
        .transform((specs) => {
            const normalized = {}
            for (const [key, value] of Object.entries(specs)) {
                const normalizedKey = key.trim().toLowerCase()
                if (typeof value === "string") {
                    normalized[normalizedKey] = value.trim().toLowerCase()
                } else {
                    normalized[normalizedKey] = String(value).trim().toLowerCase()
                }
            }
            return normalized
        })
})

const Page = () => {
    const [data, setData] = useState({});
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    useEffect(() => {
        const fetchData = async () => {
            if (slug) {
                const res = await getProductBySlug(slug);
                setData(res);
            }
        };
        fetchData();
    }, [slug]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "other",
            brand: "",
            subCategory: "",
            actualPrice: 0,
            offeredPrice: 0,
            description: "",
            inStock: 1,
            images: [],
            specs: {},
        },
    });

    // Reset form when data is loaded
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            form.reset({
                name: data.name || "",
                category: data.category || "other",
                brand: data.brand || "",
                subCategory: data.subCategory || "",
                actualPrice: data.actualPrice || 0,
                offeredPrice: data.offeredPrice || 0,
                description: data.description || "",
                inStock: data.inStock || 0,
                images: data.images || [],
                specs: data.specs || {},
            });
        }
    }, [data, form]);

    const router = useRouter();

    async function onSubmit(values) {
        const res = await updateProduct(data.slug, values);

        if (res.status === "success") {
            form.reset();
            toast.success("Product added successfully");
            router.push("/products/all/" + res.data);
        }
        else {
            toast.error(res.message);
        }
    }

    const images = form.watch("images");

    return (
        <main className="container mx-auto py-10">
            <h2>Add Product</h2>
            <div className="flex gap-4">
                <aside className="w-1/3 space-y-4">
                    {/* Heading */}
                    <div>
                        <Label className="text-base font-semibold">Product Images</Label>
                    </div>

                    {/* Image Preview Card */}
                    <Card className="p-4 min-h-[150px] flex items-center justify-center">
                        {Array.isArray(images) && images.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 w-full">
                                {images.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <AspectRatio ratio={16 / 9}>
                                            <Image
                                                src={url}
                                                alt={`Product Image ${index + 1}`}
                                                className="w-full h-28 object-cover rounded-md border"
                                                fill
                                            />
                                            {/* Remove button */}
                                            <Button
                                                type="button"
                                                className={"absolute top-2 right-2 opacity-0 group-hover:opacity-100"}
                                                onClick={() => {
                                                    const currentImages = form.getValues("images") || [];
                                                    form.setValue(
                                                        "images",
                                                        currentImages.filter((_, i) => i !== index),
                                                        { shouldValidate: true }
                                                    );
                                                }}

                                            >
                                                <X className="h-4 w-4 " />
                                            </Button>
                                        </AspectRatio>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground text-lg">
                                No images added
                            </p>
                        )}
                    </Card>

                    {/* Image Count */}
                    <Label className="block">
                        No. of images: {Array.isArray(images) ? images.length : 0}
                    </Label>

                    {/* Image Upload */}
                    <ImageUpload
                        imageUrls={Array.isArray(images) ? images : []}
                        setImageUrls={(newImages) =>
                            form.setValue("images", newImages, { shouldValidate: true })
                        }
                    />
                </aside>

                <div className="w-2/3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Product Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Category</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-60">
                                                        {category.map((item) => (
                                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                This is your Product category.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="subCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Sub Category</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Sub Category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-60">
                                                        {[...subCategories.map(e => e.slug), "other"].map((item) => (
                                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                This is your Product sub category (Optional).
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Brand</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Brand" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-60">
                                                        {brandsList.map((item) => (
                                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                This is your Product brand.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="actualPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Actual Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Product Actual Price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="offeredPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Offered Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Product Offered Price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="inStock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product In Stock</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Product In Stock" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Specifications</h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categorySpecMap[form.watch("category")]?.map((field) => (
                                        <FormField
                                            key={field.key}
                                            control={form.control}
                                            name={`specs.${field.key}`}
                                            render={({ field: specField }) => (
                                                <FormItem>
                                                    <FormLabel>{field.label}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={`Enter ${field.label}`} {...specField} value={specField.value || ""} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Button type="submit">Update Product</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Page
