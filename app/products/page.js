import ProductsPageClient from '@/components/ProductPageClient';
import { getProducts } from '@/lib/products';

export async function generateMetadata({ searchParams }) {
    const { category } = await searchParams;
    return {
        title: `Products - ${category}s`,
        description: `Metaverse Info deals in - ${category}s`,
    };
}

const products = async ({ searchParams }) => {
    const { query, category, sort, max, page, limit } = await searchParams;
    const { data, count } = await getProducts(query, category, sort, max, page || 1, limit || 8);

    return (
        <ProductsPageClient
            data={data}
            count={count}
            category={category || ""}
            query={query || ""}
        />
    );
};

export default products;
