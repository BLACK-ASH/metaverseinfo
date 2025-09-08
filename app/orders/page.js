import OrderCard from '@/components/OrderCard';
import { getOrders } from '@/lib/order.action';
import React from 'react'

const OrderPage = async () => {
    const orders = await getOrders();

    return (
        <div className='min-h-[calc(100vh-160px)]'>
            <h1>Orders</h1>
            <div className='flex flex-col gap-2'>
                {orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                ))}
            </div>
        </div>
    )
}

export default OrderPage