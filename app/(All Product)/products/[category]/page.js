import FilterItem from '@/components/FilterItem';
import ItemCard from '@/components/ItemCard';
import CustomPagination from '@/components/PageFooter';
import { componentCategories } from '@/lib/catagories.data';
import searchProducts from '@/lib/searchProduct';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
    const { category } = await params;
    return {
        title: category,
        description: `${category} - Best Deals in Metaverse info store all over the India.`,
    };
}

export async function generateStaticParams() {
    return componentCategories.map((category) => ({
        category:category.slug
    }))
}

const page = async ({ params, searchParams }) => {
    const { category } = await params;
    const { keyword, brand, sort, max, page, limit = 8 } = await searchParams;
    const { data, count } = await searchProducts({ category, keyword, brand, sort, max, page, limit });

    return (
        <div className='w-full'>
            <h1 className='text-2xl font-bold'>Products</h1>
            {category && (
                <div className='py-3 flex gap-4 flex-col lg:flex-row justify-between'>
                    <h1 className='text-2xl font-bold'>{category.toUpperCase()}s</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FilterItem />
                    </Suspense>
                </div>
            )}
            <h1 className='text-muted-foreground font-bold'>
                search results for {category}, {keyword}
            </h1>
            <p className='text-muted-foreground my-3'>{count} results found</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                {data?.map((product) => (
                    <ItemCard
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        desc={product.desc}
                        price={product.price}
                        img={product.img}
                        catgory={product.category}
                    />
                ))}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CustomPagination count={count} limit={limit} />
            </Suspense>
        </div>
    )
}

export default page