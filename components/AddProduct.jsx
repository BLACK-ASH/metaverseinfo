"use client"
import {
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

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
import { category } from "./DisplayCategory"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addProduct } from "@/lib/products"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { Label } from "./ui/label";
import DisplayImages from "./DisplayImages";
import { Card } from "./ui/card";


const categoryList = category.map((item) => item.value)


const formSchema = z.object({
    name: z.coerce.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    desc: z.coerce.string().min(2, {
        message: "Product description must be at least 2 characters.",
    }),
    price: z.coerce.number().min(2, {
        message: "Product price must be at least 2 characters.",
    }),
    img: z.array(z.string()).nonempty("Please add at least one image"),
    category: z.enum(categoryList),
})

const AddProduct = () => {
    const [open, setOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            desc: "",
            price: 0,
            img: [],
            category: "other",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {
        const res = await addProduct(values.name, values.desc, values.price, values.img, values.category);
        if (res.status === "success") {
            form.reset();
            toast.success("Product added successfully");
        }
        else {
            toast.error(res.message);
        }
        setOpen(false);
    }
    const img = form.watch("img");
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className={"min-w-2/3"}>
                <DialogTitle>Add Product</DialogTitle>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <aside>
                        <Label>Product Images</Label>

                        <Card className={"p-2 my-4"}>
                            {img?.length > 0 ? <DisplayImages images={img} h={400} w={400} /> : <p className="text-center text-muted-foreground text-2xl">"No image added"</p>}
                        </Card>

                        <Label>No of images: {img?.length}</Label>

                    </aside>
                    <section>

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
                                            <FormDescription>
                                                This is your Product name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="desc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Product Description" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your Product description.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Price</FormLabel>
                                            <FormControl>
                                                <Input type={"number"} placeholder="Product Price" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your Product price.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Category</FormLabel>
                                            <FormControl>
                                                <Select defaultValue="other" onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {category.map((item) => (
                                                            <SelectItem key={item.value} value={item.value}>{item.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                This is your Product  category.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="img"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Image</FormLabel>
                                            <FormControl>
                                                <ImageUpload imageUrls={field.value} setImageUrls={field.onChange} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your Product image.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <Button type="submit">Add Product</Button>
                            </form>
                        </Form>
                    </section>
                </section>
            </DialogContent>
        </Dialog>
    )
}

export default AddProduct