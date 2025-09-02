import { getProductsByCategory } from '@/lib/products'
import React from 'react'
import ItemCard from './ItemCard'
import Link from 'next/link'

const DisplayProducts = async ({ category }) => {
    const data = await getProductsByCategory(category)
    return (
        <section >
            <div className='flex justify-between items-center' >
                <h2 className='text-lg font-bold py-3'>{category.toUpperCase()}s</h2>
                <Link href={`/products?category=${category}`} className='text-primary underline-offset-4 hover:underline'>View All</Link>
            </div>
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
        </section>
    )
}

export default DisplayProducts