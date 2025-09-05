"use client"
import {
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
    img: z.coerce.string().min(2, {
        message: "Product image must be at least 2 characters.",
    }),
    category: z.enum(categoryList),
})

const AddProduct = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            desc: "",
            price: 0,
            img: "http://dummyimage.com/192x100.png/dddddd/000000",
            category: "other",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit (values) {
        const res = await addProduct(values.name, values.desc, values.price, values.img, values.category);
        if (res.status === "success") {
            form.reset();
            toast.success("Product added successfully");
        }
    }
    return (
        <DialogContent>
            <DialogTitle>Add Product</DialogTitle>
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
                                    <Input placeholder="Product Description" {...field} />
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


                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </DialogContent>

    )
}

export default AddProduct