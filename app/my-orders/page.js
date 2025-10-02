import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/auth.action';
import { getOrderByUser, invalidateOrderCache } from '@/lib/order.action';
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import OrderRefresh from '@/components/OrderRefresh';



const myOrder = async () => {

  const { name, email } = await getUser();
  const myOrders = await getOrderByUser(email);

  return (
    <section className="container overflow-hidden box-border mx-auto px-4 md:p-6 min-h-[calc(100vh-110px)]" id='myOrders'>
      <div>
        <div>
          <h1 className='text-2xl font-bold'>My Orders</h1>
        </div>
        <h3 className='text-lg'>hi, <span className='font-bold'>{name}</span> here are your orders </h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          myOrders?.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <CardTitle>
                  <p>Order Id : {order._id}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>

                <Table>
                  <TableCaption>Order Items</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      order.items.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.name.slice(0, 20)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
              <CardContent>
                <p className='text-sm font-bold'>Total Items : {order.items.length}</p>
                <p className='text-sm font-bold'>Total Price : {order.totalPrice}</p>
              </CardContent>

              <Separator />
              <div className='px-4 flex justify-between'>
                <p className='text-sm font-bold'> {new Date(order.createdAt).toDateString()}</p>
                <Badge variant={order.orderStatus}>{order.orderStatus}</Badge>
              </div>
            </Card>
          ))
        }
      </div>
    </section>
  )
}

export default myOrder