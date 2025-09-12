import Image from 'next/image'
import React, { Suspense } from 'react'
import { ModeToggle } from './ThemeController'
import SearchBar from './SearchBar'
import CartButton from './CartButton'
import NavbarMenu from './NavbarMenu'
import AuthComponent from './AuthComponent'


const Navbar = async () => {
    return (
        <nav suppressHydrationWarning={true}  className='flex max-md:flex-col md:items-center gap-4 justify-between px-4 py-2 bg-primary-foreground w-full'>
            <div className='flex items-center justify-between '>
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="logo" width={30} height={30} />
                    <p className="font-bold text-lg md:text-2xl">Metaverse <span className="text-red-500">Info</span></p>
                </div>
                <div className='flex items-center gap-2 md:hidden'>
                    <CartButton />
                    <ModeToggle />
                </div>
            </div>
            <NavbarMenu />
            <div className="flex justify-end items-center gap-2 flex-1  lg:max-w-1/4" >
                <Suspense>
                    <SearchBar />
                </Suspense>
                <div className='flex items-center gap-2 max-md:hidden'>
                    <CartButton />
                    <ModeToggle />
                    <Suspense>
                        <AuthComponent />
                    </Suspense>
                </div>
            </div>
        </nav>
    )
}

export default Navbar