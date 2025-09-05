import AddProduct from '@/components/AddProduct';
import DisplayCategory from '@/components/DisplayCategory';
import CustomPagination from '@/components/PageFooter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { getProducts } from '@/lib/products';
import Image from 'next/image';
import React, { Suspense } from 'react'

const Inventory = async ({ searchParams }) => {
  const { query, category, sort, max, page, limit } = await searchParams
  const { data, count } = await getProducts(query, category, sort, max, page || 1, limit || 18)

  return (
    <div>
      <Suspense>
        <DisplayCategory />
      </Suspense>
      <div className='flex justify-between items-center m-2'>
        <div>
          <h1 className='text-2xl font-bold'>Inventory</h1>
          <p className='text-muted-foreground my-3'>{count} results found</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add Product
            </Button>
          </DialogTrigger>
          <AddProduct />
        </Dialog>
      </div>

      <div className='grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-3'>
        {data?.map((product) => (
          <div className='flex gap-3 ring-2 ring-primary-foreground  p-2 rounded' key={JSON.stringify(product._id)}>
            <Image src={product.img} alt={product.name} width={100} height={100} />
            <div>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <Badge>{product.category}</Badge>
            </div>
          </div>
        ))}
      </div>
      <Suspense>
        <CustomPagination count={count} limit={18} />
      </Suspense>

    </div>
  )
}

export default Inventory