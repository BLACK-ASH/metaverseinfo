import FilterItem from '@/components/FilterItem';
import ItemCard from '@/components/ItemCard';
import CustomPagination from '@/components/PageFooter';
import { getProducts } from '@/lib/products';
import { Suspense } from 'react';

const products = async ({ searchParams }) => {

    const { query, category, sort, max, page, limit } = await searchParams
    const { data, count } = await getProducts(query, category, sort, max, page || 1, limit || 8)

    return (
        <div className='w-full'>
            {category &&
                (<div className='py-3 flex gap-4 flex-col lg:flex-row justify-between'>
                    <h1 className='text-2xl font-bold'>{category.toUpperCase()}s</h1>
                    <Suspense>
                        <FilterItem />
                    </Suspense>
                </div>)
            }
            <h1 className='text-muted-foreground  font-bold'> search results for {query}</h1>
            <p className='text-muted-foreground my-3'>{count} results found</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '>
                {data?.map((product) => (
                    <ItemCard
                        key={product._id}
                        id={JSON.stringify(product._id)}
                        name={product.name}
                        desc={product.desc}
                        price={product.price}
                        img={product.img}
                        catgory={product.category}
                    />
                ))}
            </div>
            <Suspense>
                <CustomPagination count={count} limit={8} />
            </Suspense>
        </div>
    )
}

export default products