"use client"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns = [
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => {
            const status = row.getValue("paymentStatus")
            switch (status) {
                case "pending":
                    return <div className="text-yellow-700 bg-yellow-50 dark:bg-yellow-700 dark:text-yellow-50 w-fit px-3 rounded-full">{status}</div>
                case "paid":
                    return <div className="text-green-700 bg-green-50 dark:bg-green-700 dark:text-green-50 w-fit px-3 rounded-full">{status}</div>
                case "failed":
                    return <div className="text-red-700 bg-red-50 dark:bg-red-700 dark:text-red-50 w-fit px-3 rounded-full">{status}</div>
                default:
                    return <div className="text-gray-700 bg-gray-50 w-fit px-3 rounded-full">{status}</div>
            }
        },

    },
    {
        accessorKey: "status",
        header: "Order Status",
        cell: ({ row }) => {
            switch (row.getValue("status")) {
                case "processing":
                    return <div className="text-yellow-700 bg-yellow-50 dark:bg-yellow-700 dark:text-yellow-50 w-fit px-3 rounded-full">{row.getValue("status")}</div>
                case "shipped":
                    return <div className="text-blue-700 bg-blue-50 dark:bg-blue-700 dark:text-blue-50 w-fit px-3 rounded-full">{row.getValue("status")}</div>
                case "delivered":
                    return <div className="text-green-700 bg-green-50 dark:bg-green-700 dark:text-green-50 w-fit px-3 rounded-full">{row.getValue("status")}</div>
                case "cancelled":
                    return <div className="text-red-700 bg-red-50 dark:bg-red-700 dark:text-red-50 w-fit px-3 rounded-full">{row.getValue("status")}</div>
                default:
                    return <div className="text-gray-700 bg-gray-50 w-fit px-3 rounded-full">{row.getValue("status")}</div>
            }
        }
    },
    {
        accessorKey: "username",
        header: "Name",
    },
    {
        accessorKey: "orderID",
        header: "Order ID",
    },
    {
        accessorKey: "paymentId",
        header: "Payment ID",
    },
    {
        accessorKey: "receipt",
        header: "Receipt ",
    },
    {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalAmount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.paymentId)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]