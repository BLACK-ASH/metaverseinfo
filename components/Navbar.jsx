import Image from 'next/image'
import React, { Suspense } from 'react'
import { ModeToggle } from './ThemeController'
import SearchBar from './SearchBar'
import CartButton from './CartButton'
import NavbarMenu from './NavbarMenu'


const Navbar = async () => {
    return (
        <nav className='flex flex-col gap-4 md:flex-row items-center justify-between px-4 py-2 w-full'>
            <div className='flex items-center justify-between max-md:w-full'>
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="logo" width={30} height={30} />
                    <p className="font-bold text-lg md:text-2xl">Metaverse <span className="text-red-500">Info</span></p>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className='flex items-center gap-2 md:hidden'>
                        <CartButton />
                        <ModeToggle />
                    </div>
                </Suspense>
            </div>
            <NavbarMenu />
            <div className="flex justify-end items-center gap-2 flex-1 lg:max-w-1/4" >
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchBar className={"w-full flex-1"} />
                </Suspense>
                <div className='flex items-center gap-2 max-md:hidden'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CartButton />
                        <ModeToggle />
                    </Suspense>
                </div>
            </div>
        </nav>
    )
}

export default Navbar