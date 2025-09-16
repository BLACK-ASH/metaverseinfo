
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { componentCategories, peripheralCategories, subCategories } from '@/lib/catagories.data'

const items = subCategories;

const productCategories = componentCategories;

const Footer = () => {
    return (
        <footer className='mt-10 p-4 border-t-2  rounded-none shadow bg-muted' >
            <CardContent className={"grid gap-8 text-left grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
                <div className='flex flex-col max-md:col-span-2 items-center gap-4'>
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <CardTitle className="font-bold  text-lg md:text-2xl">Metaverse <span className="text-red-500">Info</span></CardTitle>
                    <CardDescription>
                        Metaverse Info ,Shop no.2, Laxmi Building, 390, Lamington Rd, opp. vasant bhuvan, Charni Road East, Shapur Baug, Grant Road, Mumbai, Maharashtra 400004
                    </CardDescription>
                    <h3 className='font-bold text-lg'>Follow Us</h3>
                    <CardContent className={"flex mt-2 gap-8 items-center justify-around"}>
                        <Link name="instagram" href="https://www.instagram.com/metaverseinfo_2022/" target='_blank'>
                            <span className='sr-only'>Instagram Account Link</span>
                            <FaInstagram className="size-6" />
                        </Link>
                        <Link name="whatsapp" href={"https://wa.me/917738101235"} target='_blank'>
                            <span className='sr-only'>Chat on Whatsapp</span>
                            <FaWhatsapp className="size-6" />
                        </Link>
                        <Link name="youtube" href="https://youtube.com/@metaverseinfo4002?si=dQlXTsuRJQl3YSK6" target='_blank'>
                            <span className='sr-only'>Youtube Channel Link</span>
                            <FaYoutube className="size-6" />
                        </Link>
                    </CardContent>

                    <iframe title='Shop Location' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4475.964818258497!2d72.8171551!3d18.9592159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfd15a77c117%3A0x847de22499f57d5d!2sMetaverse%20Info!5e1!3m2!1sen!2sin!4v1757691705088!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" height={200} width={300}></iframe>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 col-span-2 justify-around'>

                    <div>
                        <h3 className='font-bold text-lg text-center'>All Categories</h3>
                        <ul className='text-start' >
                            {productCategories.map((category) => (
                                <li key={category.title} >
                                    <Button variant={"link"} className="w-full text-start text-muted-foreground hover:text-foreground" asChild>
                                        <Link className='text-start' href={category.url}>{category.title}</Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold text-lg text-center'>Peripherals</h3>
                        <ul className='text-start' >
                            {peripheralCategories.map((category) => (
                                <li key={category.title} >
                                    <Button variant={"link"} className="w-full text-start text-muted-foreground hover:text-foreground" asChild>
                                        <Link href={category.url}>{category.title}</Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold text-lg text-center'>Laptops</h3>
                        <ul>
                            {items.map((item) => (
                                <li key={item.id} >
                                    <Button variant={"link"} className="w-full text-start text-muted-foreground hover:text-foreground" asChild>
                                        <Link href={`/laptops/${item.slug}`}>{item.title}</Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='!!!text-left'>
                        <h3 className='font-bold text-lg text-center'>Prebuilds</h3>
                        <ul>
                            {items.map((item) => (
                                <li key={item.id} >
                                    <Button variant={"link"} className="w-full !!!text-left text-muted-foreground hover:text-foreground" asChild>
                                        <Link href={`/prebuild-pc/${item.slug}`}>{item.title}</Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
            <Separator className="bg-border my-2" />
            <CardFooter className="flex max-md:gap-2 justify-between items-center max-md:flex-col">
                <div>
                    <p className="text-muted-foreground text-sm text-balance">
                        &copy; 2025 BlackAsh. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-4 items-center justify-between">
                    <a href="https://github.com/BLACK-ASH" target='_blank'>
                        <FaGithub className="size-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/ashif-shaikh-ash" target='_blank'>
                        <FaLinkedin className="size-6" />
                    </a>
                </div>
            </CardFooter>
        </footer>
    )
}

export default Footer