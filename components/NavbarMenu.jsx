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
import { componentCategories, peripheralCategories, subCategories } from '@/lib/catagories.data';

const items = subCategories;

const productCategories = componentCategories;


const adminRoute = [
    {
        title: "Admin",
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
    {
        title:"Add Product",
        url:"/add-product",
    }
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
                            <NavigationMenuLink key={item.id} asChild>
                                <Link href={`/laptops/${item.slug}`} className={navigationMenuTriggerStyle()}>
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuContent>
                </NavigationMenuItem>



                <NavigationMenuItem>
                    <NavigationMenuTrigger>Prebuild PCs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {items.map((item) => (
                            <NavigationMenuLink key={item.id} asChild>
                                <Link href={`/prebuild-pc/${item.slug}`} className={navigationMenuTriggerStyle()}>
                                    {item.title}
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


                {user?.role === "admin" && 
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Admins</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {adminRoute.map((item) => (
                            <NavigationMenuLink key={item.title} asChild>
                                <Link href={item.url} className={navigationMenuTriggerStyle()}>
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuContent>
                </NavigationMenuItem>
                }
            </NavigationMenuList>

        </NavigationMenu>
    )
}

export default NavbarMenu