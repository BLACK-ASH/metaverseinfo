import { getProductsByCategory } from '@/lib/products'
import React from 'react'
import ItemCard from './ItemCard'
import Link from 'next/link'

const DisplayProducts = async ({ searchParams }) => {
    const { category} = await searchParams
    const  data  = await getProductsByCategory(category||"processor");
    return (
        <section >
            <div className='flex justify-between items-center' >
                {category &&<h2 className='text-lg font-bold py-3'>{category?.toUpperCase()}s</h2>}
                <Link href={`/products/${category}`} className='text-primary underline-offset-4 hover:underline'>View All</Link>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '>
                {data?.map((product) => (
                    <ItemCard
                        key={product._id}
                        id={product._id}
                        slug={product.slug}
                        name={product.name}
                        desc={product.desc}
                        actualPrice={product.actualPrice}
                        offeredPrice={product.offeredPrice}
                        images={product.images}
                        category={product.category}
                    />
                ))}
            </div>
        </section>
    )
}

export default DisplayProducts