"use client"
import React from 'react'
import { Button } from './ui/button'
import { invalidateProductCache } from '@/lib/products'

const InventoryRefresh = ({key}) => {
    return (
        <Button onClick={() => invalidateProductCache()}>Refresh</Button>
    )
}

export default InventoryRefresh