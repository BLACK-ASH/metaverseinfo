import CustomBuilds from "@/components/CustomBuilds";
import DisplayCardSkeleton from "@/components/DisplayCardSkeleton";
import DisplayCategory from "@/components/DisplayCategory";
import DisplayProducts from "@/components/DisplayProducts";
import HomeHeroSection from "@/components/HomeHeroSection";
import { Suspense } from "react";



export default async function Home({ searchParams }) {
  const { category } = await searchParams
  return (
    <div className="container overflow-hidden box-border mx-auto px-4 md:p-6 ">
      <HomeHeroSection />
      <CustomBuilds />
      <div className='my-10 w-full'>
        <h2 className='text-2xl font-bold py-3'>Products By Category</h2>
        <Suspense>
          <DisplayCategory />
        </Suspense>
      </div>

      <Suspense fallback={<DisplayCardSkeleton />}>
        <DisplayProducts category={category || "processor"} />
      </Suspense>
    </div>
  );
}
