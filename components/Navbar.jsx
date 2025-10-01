import Image from 'next/image'
import React, { Suspense } from 'react'
import { ModeToggle } from './ThemeController'
import SearchBar from './SearchBar'
import CartButton from './CartButton'
import NavbarMenu from './NavbarMenu'
import AuthComponent from './auth/AuthComponent'


const Navbar = async () => {
    return (
        <nav className='flex flex-col gap-4 items-center justify-between px-4 py-2 min-w-full'>
            <div className='flex items-center gap-8 justify-between min-w-full'>
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="logo" width={30} height={30} />
                    <p className="font-bold max-sm:hidden md:text-2xl">Metaverse <span className="text-red-500">Info</span></p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <SearchBar className={"max-w-[clamp(300px,50%,70%)] flex-1 hidden md:block"} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className='flex items-center gap-2 '>
                        <CartButton />
                        <ModeToggle />
                        <AuthComponent />
                    </div>
                </Suspense>

            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchBar className={"w-full flex-1 md:hidden block"} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <NavbarMenu />
            </Suspense>
        </nav>
    )
}

export default Navbar