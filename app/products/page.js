import FilterItem from '@/components/FilterItem';
import ItemCard from '@/components/ItemCard';
import { getProducts } from '@/lib/products';

const products = async ({ searchParams }) => {

    const { query, category, sort, max } = await searchParams
    const data = await getProducts(query, category, sort, max)

    return (
        <div className='w-full'>
            {category &&
                (<div className='py-3 flex gap-4 flex-col lg:flex-row justify-between'>
                    <h1 className='text-2xl font-bold'>{category.toUpperCase()}s</h1>
                    <FilterItem />
                </div>)
            }
            <h1 className='text-muted-foreground  font-bold'> search results for {query}</h1>
            <p className='text-muted-foreground my-3'>{data?.length} results found</p>
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
        </div>
    )
}

export default products