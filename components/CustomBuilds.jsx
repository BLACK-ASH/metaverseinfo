"use client"
import  { useRef } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CustomBuildCard from './CustomBuildCard'
import Autoplay from "embla-carousel-autoplay"

//dummy data
const data = [
    {
        id: 1,
        name: "Custom PC 1",
        desc: "Custom PC description 1",
        price: 10000,
        img: "/pcImg1.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 2,
        name: "Custom PC 2",
        desc: "Custom PC description 2",
        price: 12000,
        img: "/pcImg2.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 3,
        name: "Custom PC 3",
        desc: "Custom PC description 3",
        price: 13000,
        img: "/pcImg3.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 4,
        name: "Custom PC 4",
        desc: "Custom PC description 4",
        price: 14000,
        img: "/pcImg1.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 5,
        name: "Custom PC 5",
        desc: "Custom PC description 5",
        price: 15000,
        img: "/pcImg2.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 6,
        name: "Custom PC 6",
        desc: "Custom PC description 6",
        price: 16000,
        img: "/pcImg3.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 7,
        name: "Custom PC 7",
        desc: "Custom PC description 7",
        price: 17000,
        img: "/pcImg1.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 8,
        name: "Custom PC 8",
        desc: "Custom PC description 8",
        price: 18000,
        img: "/pcImg2.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 9,
        name: "Custom PC 9",
        desc: "Custom PC description 9",
        price: 19000,
        img: "/pcImg3.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 10,
        name: "Custom PC 10",
        desc: "Custom PC description 10",
        price: 20000,
        img: "/pcImg1.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 11,
        name: "Custom PC 11",
        desc: "Custom PC description 11",
        price: 21000,
        img: "/pcImg2.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
    {
        id: 12,
        name: "Custom PC 12",
        desc: "Custom PC description 12",
        price: 22000,
        img: "/pcImg3.jpg",
        processor: "Intel Core i7-10700K",
        motherboard: "ASUS ROG Strix Z390E",
        ram: "16GB",
        storage: "1TB SSD",
        gpu: "RTX 3080"
    },
]

const CustomBuilds = () => {
    const plugin = useRef(
        Autoplay({ delay: 2500 })
    );
    return (
        <div className='my-10'>
            <h2 className='text-2xl font-bold py-3'>Custom Builds</h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >

                <CarouselContent>
                    {data.map((item) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={item.id}>
                            <CustomBuildCard
                                name={item.name}
                                price={item.price}
                                img={item.img}
                                processor={item.processor}
                                motherboard={item.motherboard}
                                ram={item.ram}
                                storage={item.storage}
                                gpu={item.gpu}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>


        </div>
    )
}

export default CustomBuilds