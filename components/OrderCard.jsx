import React from 'react'
import { Badge } from './ui/badge'

const OrderCard = ({ order }) => {
    return (
        <div className='ring-2-muted ring-2 p-2 rounded-md'>
            <div className='flex flex-wrap-reverse justify-between '>
                <div className='flex flex-wrap gap-2'>
                    <p>{order.user.name}</p>
                    <p>{order.user.email}</p>
                </div>
                <div className='flex gap-2'>
                    <Badge>{order.orderStatus}</Badge>
                    <Badge>{order.paymentStatus}</Badge>
                </div>
            </div>
            <p>Order ID : {order.orderID}</p>
            <p>Payment ID : {order.paymentId}</p>
            <p className='font-bold text-sm'>Order Value : &#8377; {order.totalPrice}</p>
            <p className='text-xs text-muted-foreground' >{new Date(order.createdAt).toLocaleString()}</p>
        </div>
    )
}

export default OrderCard