import CustomBuilds from "@/components/CustomBuilds";
import DisplayCategory from "@/components/DisplayCategory";
import DisplayProducts from "@/components/DisplayProducts";
import HomeHeroSection from "@/components/HomeHeroSection";
import { Suspense } from "react";



export default async function Home({ searchParams }) {
  const { category } = await searchParams
  return (
    <div className="w-full box-border">
      <HomeHeroSection />
      <CustomBuilds />
      <DisplayCategory />
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayProducts category={category||"processor"} />
      </Suspense>
    </div>
  );
}
