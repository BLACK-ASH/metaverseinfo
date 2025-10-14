import DisplayCategory from '@/components/DisplayCategory';
import InventoryRefresh from '@/components/InventoryRefresh';
import CustomPagination from '@/components/PageFooter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { getProducts } from '@/lib/products';
import { Trash2 } from 'lucide-react';
import { Edit2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'

const Inventory = async ({ searchParams }) => {
  const { query, category, sort, max, page, limit } = await searchParams
  const { data, count } = await getProducts(query, category, sort, max, page, limit)

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center m-2'>
        <div>
          <h1 className='text-2xl font-bold'>Inventory</h1>
          <p className='text-muted-foreground my-3'>{count} results found</p>
        </div>
        <div>
          <InventoryRefresh />
          <Button asChild>
            <Link href="/add-product">Add Product</Link>
          </Button>
        </div>
      </div>
      <Suspense>
        <DisplayCategory />
      </Suspense>

      <div className='grid grrid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-3'>
        {data?.map((product) => (
          <div className='flex relative bg-card text-card-foreground gap-6 rounded-xl border p-4 shadow-sm' key={product._id}>
            <Image src={product?.images[0]} alt={product.name} height={5 * 25} width={4 * 25} className='object-contain' />
            <div>
              <Badge>{product.category}</Badge>
              <p className='font-bold text-lg'>{product.name.slice(0, 20)}</p>
              <div>
                {
                  product.offeredPrice > 0 ?
                    <p className='font-bold text-lg px-3'>
                      &#8377;{product.offeredPrice} <span className='line-through text-destructive text-sm'>&#8377;{product.actualPrice} </span>
                    </p>
                    :
                    <p className='font-bold text-lg px-3'>
                      &#8377;{product.actualPrice}
                    </p>
                }
              </div>
              <Badge variant={'outline'}>{product.inStock}</Badge>
            </div>
            <div className={'absolute top-2 right-2'}>
              <Button variant={'ghost'} asChild>
                <Link href={`/edit-product?slug=${product.slug}`}><Edit2 className='w-6 h-6' /></Link>
              </Button>
              <Button variant={'ghost'}>
                <Trash2 className='w-6 h-6 text-destructive' />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Suspense>
        <CustomPagination count={count} limit={12} />
      </Suspense>

    </div>
  )
}

export default Inventory