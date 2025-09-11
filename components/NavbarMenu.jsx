import { getUser } from '@/lib/auth.action';
import Link from 'next/link';
import React from 'react'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const items = ["office", "gaming", "refurbished"]

const productCategories = [
    {
        title: "Processors",
        url: "/products?category=processor",
    },
    {
        title: "Graphics Cards",
        url: "/products?category=graphics-card",
    },
    {
        title: "Motherboards",
        url: "/products?category=motherboard",
    },
    {
        title: "Storage",
        url: "/products?category=storage",
    },
    {
        title: "RAM",
        url: "/products?category=RAM",
    },
    {
        title: "Power Supplies",
        url: "/products?category=power-supply",
    },
    {
        title: "Cooler",
        url: "/products?category=cooler",
    },
    {
        title: "Cabinets",
        url: "/products?category=cabinet",
    },
    {
        title: "Monitors",
        url: "/products?category=monitor",
    },
]

const peripheralCategories = [

    {
        title: "Keyboards",
        url: "products?category=keyboard",
    },
    {
        title: "Mouses",
        url: "/products?category=mouse",
    },
    {
        title: "Headsets",
        url: "/products?category=headset",
    },
    {
        title: "Microphones",
        url: "/products?category=microphone",
    },
    {
        title: "Webcams",
        url: "/products?category=webcam",
    },
    {
        title: "Speakers",
        url: "/products?category=speaker",
    },
    {
        title: "Others",
        url: "/products?category=other",
    },
]

const adminRoute = [
    {
        title:"Admin",
        url: "/admin",

    },
    {
        title: "Inventory",
        url: "/inventory",
    },
    {
        title: "Orders",
        url: "/orders",
    },
]

const NavbarMenu = async () => {
    const user = await getUser();
    return (
        <NavigationMenu className="z-50" viewport={false}>

            <NavigationMenuList className={"flex flex-wrap"}>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>


                <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {productCategories.map((item) => (
                            <NavigationMenuLink key={item.title} asChild>
                                <Link href={item.url} className={navigationMenuTriggerStyle()}>
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuContent>
                </NavigationMenuItem>



                <NavigationMenuItem>
                    <NavigationMenuTrigger>Peripherals</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {peripheralCategories.map((item) => (
                            <NavigationMenuLink key={item.title} asChild>
                                <Link href={item.url} className={navigationMenuTriggerStyle()}>
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuContent>
                </NavigationMenuItem>


                <NavigationMenuItem>
                    <NavigationMenuTrigger>Laptops</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {items.map((item) => (
                            <NavigationMenuLink key={item} asChild>
                                <Link href={`/laptops?category=${item}`} className={navigationMenuTriggerStyle()}>
                                    {item}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuContent>
                </NavigationMenuItem>



                <NavigationMenuItem>
                    <NavigationMenuTrigger>Prebuild PCs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {items.map((item) => (
                            <NavigationMenuLink key={item} asChild>
                                <Link href={`/prebuild-pc?category=${item}`} className={navigationMenuTriggerStyle()}>
                                    {item}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuContent>
                </NavigationMenuItem>


                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/my-orders">My Orders</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {user?.role === "admin" && adminRoute.map((item) => (
                    <NavigationMenuItem key={item.title}>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={item.url}>{item.title}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>

        </NavigationMenu>
    )
}

export default NavbarMenu