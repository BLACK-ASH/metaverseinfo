"use client"
import React from 'react'
import { Button } from './ui/button'
import { invalidateOrderCache } from '@/lib/order.action'

const OrderRefresh = ({key}) => {
    return (
        <Button onClick={() => invalidateOrderCache(key||"allOrders")}>Refresh</Button>
    )
}

export default OrderRefresh