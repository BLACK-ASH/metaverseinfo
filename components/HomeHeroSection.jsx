import Image from "next/image";
const HomeHeroSection = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="w-full h-72 relative md:h-full md:row-span-2 md:col-span-2">
                <Image src="/main.jpg" loading="lazy" alt="metaverse" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="w-full relative h-72">
                <Image src="/side1.jpg" loading="lazy" alt="metaverse" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="w-full relative h-72">
                <Image src="/side2.jpg" loading="lazy" alt="metaverse" fill style={{ objectFit: "cover" }} />
            </div>
        
        </section>
    )
}

export default HomeHeroSection