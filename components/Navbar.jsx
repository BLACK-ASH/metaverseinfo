import Image from 'next/image'
import React, { Suspense } from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { ModeToggle } from './ThemeController'
import SearchBar from './SearchBar'
import CartButton from './CartButton'
import { Button } from './ui/button'
import { getUser } from '@/lib/auth.action'
import Link from 'next/link'


const Navbar = async () => {
    const user = await getUser();
    return (
        <nav className='flex md:items-center gap-4 justify-between px-4 py-2 sticky top-0 z-50 bg-primary-foreground w-full'>
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Image src="/logo.png" alt="logo" width={30} height={30} />
                <p className="font-bold text-lg md:text-2xl">Metaverse <span className="text-red-500">Info</span></p>
            </div>
            <div className="flex justify-end items-center gap-2 flex-1  lg:max-w-1/3" >
                <Suspense>
                    <SearchBar className={"hidden md:flex"} />
                </Suspense>
                <CartButton />
                <ModeToggle />
                <Suspense>
                    {!user &&
                        <Button asChild><Link href="/login">Login</Link></Button>
                    }
                </Suspense>
            </div>
        </nav>
    )
}

export default Navbar