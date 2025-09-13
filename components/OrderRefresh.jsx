"use client"
import React from 'react'
import { Button } from './ui/button'
import { invalidateOrderCache } from '@/lib/order.action'

const OrderRefresh = () => {
    return (
        <Button onClick={() => invalidateOrderCache()}>Refresh</Button>
    )
}

export default OrderRefresh