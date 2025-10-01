// app/products/[id]/page.jsx
import DisplayImages from "@/components/DisplayImages";
import ProductAction from "@/components/ProductAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";

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
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{product?.description}</p>
                    <p className='font-bold text-lg px-3'>
                        &#8377; {product?.offeredPrice || product?.actualPrice} <span className='line-through text-sm'>&#8377; {product?.actualPrice} </span>
                    </p>
                </CardContent>
                <ProductAction id={product._id} />
            </Card>
        </section>
    );
}
