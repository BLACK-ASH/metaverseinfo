// app/products/[id]/page.jsx
import DisplayImages from "@/components/DisplayImages";
import ProductAction from "@/components/ProductAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductsByIds } from "@/lib/products";
import { notFound } from "next/navigation";


// Optional: Set revalidate to refresh static cache for popular products
export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductsByIds([slug]);
    if (!product || !product[0]) {
        return { title: "Product not found", description: "This product does not exist" };
    }

    return {
        title: `${product[0].name} - Metaverse Info`,
        description: product[0].desc,
        openGraph: {
            images: product[0].img,
        },
    };
}

export default async function Page({ params }) {
    // replace with slug
    const { slug } = await params;
    let product;

    try {
        // replace the id with slug
        product = await getProductsByIds([slug]);
        if (!product || !product[0]) {
            notFound();
        }
    } catch (error) {
        console.error("Error in Page:", error);
        notFound();
    }

    return (
        <section className="container overflow-hidden box-border mx-auto px-4 md:p-6 min-h-[calc(80vh-60px)] grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
                <DisplayImages w={500} h={400} duration={6000} ratio={5 / 4} images={product[0].img} />
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{product[0].name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{product[0].desc}</p>
                    <p className="text-lg font-bold">&#8377; {product[0].price}</p>
                </CardContent>
                <ProductAction id={product[0]._id} />
            </Card>
        </section>
    );
}
