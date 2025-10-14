// app/products/[id]/page.jsx
import DisplayImages from "@/components/DisplayImages";
import ProductAction from "@/components/ProductAction";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import { Ca } from "zod/v4/locales";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (product) {
        return {
            title: `${product?.name} - Metaverse Info`,
            description: product?.desc,
            openGraph: {
                images: product?.img,
            },
        };
    }
    return { title: "Product not found", description: "This product does not exist" };
}

export default async function Page({ params }) {
    // replace with slug
    const { slug } = await params;
    let product;

    try {
        product = await getProductBySlug(slug)

        if (!product) {
            notFound();
        }
    } catch (error) {
        console.error("Error in Page:", error);
        notFound();
    }

    return (
        <section className="container overflow-hidden box-border mx-auto px-4 md:p-6 min-h-[calc(80vh-60px)] grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
                <DisplayImages w={500} h={400} duration={6000} ratio={5 / 4} images={product?.images} />
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{product?.name}</CardTitle>
                    <CardDescription className="text-muted-foreground flex gap-2">
                        <Badge variant={"outline"}>{product?.category}</Badge>
                        <Badge variant={"outline"}>{product?.brand}</Badge>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{product?.description}</p>

                    <Table>
                        <TableBody>
                            {Object.entries(product?.specs).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">{key}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className='font-bold text-lg px-3'>
                        &#8377; {product?.offeredPrice || product?.actualPrice} <span className='line-through text-sm'>&#8377; {product?.actualPrice} </span>
                    </p>
                </CardContent>
                <ProductAction inStock={product?.inStock} id={product._id} />
            </Card>
        </section>
    );
}
