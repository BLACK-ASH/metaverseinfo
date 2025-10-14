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
import { Badge } from "@/components/ui/badge"

// _id: '68dcf6de3f1272f4ddc1b886',
//     username: 'Anime Vault',
//     email: 'animevault21@gmail.com',
//     addressState: 'Maharashtra',
//     addressCity: 'Mumbai',
//     addresszip: '400040',
//     fullAddress: 'address',
//     items: [ [Object] ],
//     totalPrice: 1149,
//     paymentOrderId: 'order_ROA8DwSsQEupbt',
//     paymentStatus: 'paid',
//     receipt: 'receipt_1759311582081',
//     orderStatus: 'processing',
//     createdAt: '2025-10-01T09:39:42.739Z',
//     updatedAt: '2025-10-01T09:40:12.024Z',
//     __v: 0,
//     paymentId: 'pay_ROA8RV6IW0rhUb'


export const columns = [
    {
        accessorKey: "paymentStatus",
        header: "Status",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <Badge variant={payment.paymentStatus}>{payment.paymentStatus}</Badge>
            )
        },
    },
    {
        accessorKey: "orderStatus",
        header: "Order Status",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <Badge variant={payment.orderStatus}>{payment.orderStatus}</Badge>
            )
        },
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div>
                    {payment.username}
                </div>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div>
                    {payment.email}
                </div>
            )
        }
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div>
                    {payment.totalPrice}
                </div>
            )
        }
    },
    {
        accessorKey: "addressState",
        header: "State",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div>
                    {payment.addressState}
                </div>
            )
        }
    },
    {
        accessorKey: "addressCity",
        header: "City",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div>
                    {payment.addressCity}
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div>
                    {new Date(payment.createdAt).toDateString()}
                </div>
            )
        }
    }
    ,
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