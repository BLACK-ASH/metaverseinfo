import DisplayImages from "@/components/DisplayImages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductsById } from "@/lib/products"


export default async function Page({ params }) {
    const { id } = await params
    const product = await getProductsById([id])
    console.log(product[0]);


    return (
        <section className="container overflow-hidden box-border mx-auto px-4 md:p-6 min-h-[calc(80vh-60px)] grid grid-cols-1 md:grid-cols-2 gap-4">
            <DisplayImages className="w-full h-full" h={800} ratio={5/4} images={product[0].img} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{product[0].name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{product[0].desc}</p>
                    <p className="text-lg font-bold"> &#8377; {product[0].price}</p>
                </CardContent>
             

            </Card>

        </section>
    )
}