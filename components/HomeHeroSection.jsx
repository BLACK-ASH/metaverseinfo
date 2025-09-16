import Image from "next/image";
import DisplayImages from "./DisplayImages";
const HomeHeroSection = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="w-full h-72 relative md:h-full md:row-span-2 md:col-span-2">
                <DisplayImages
                    className='w-full h-full'
                    images={["hero-image1.png", "hero-image2.png", "hero-image3.png", "hero-image4.png", "hero-image5.png", "hero-image6.png","hero-image7.png"]}
                    ratio={3/2}
                    autoplayDelay={3000}
                />
            </div>
            <div className="w-full relative h-72">
                  <DisplayImages
                    className='w-full h-full'
                    images={["hero-image1.png", "hero-image2.png", "hero-image3.png", "hero-image4.png", "hero-image5.png", "hero-image6.png","hero-image7.png"]}
                    ratio={3/2}
                    autoplayDelay={2500}
                />
            </div>
            <div className="w-full relative h-72">
                     <DisplayImages
                    className='w-full h-full'
                    images={["hero-image1.png", "hero-image2.png", "hero-image3.png", "hero-image4.png", "hero-image5.png", "hero-image6.png","hero-image7.png"]}
                    ratio={3/2}
                    autoplayDelay={2000}
                />
            </div>

        </section>
    )
}

export default HomeHeroSection