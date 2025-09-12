"use client";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image as IKImage } from "@imagekit/next";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * Reusable DisplayImages component
 *
 * Props:
 * - images: array of image URLs
 * - w: base width of each image (default 300)
 * - h: base height of each image (default 200)
 * - maxW: max width for large screens (default 800)
 * - maxH: max height for large screens (default 600)
 * - ratio: aspect ratio (default w/h)
 * - className: additional classes for CarouselItem
 * - carouselClassName: additional classes for Carousel container
 * - autoplayDelay: autoplay speed in ms (default 2500)
 */
const DisplayImages = ({
  images = [],
  w = 300,
  h = 200,
  maxW = 800,
  maxH = 600,
  ratio,
  className = "",
  carouselClassName = "",
  autoplayDelay = 2500,
}) => {
  const plugin = useRef(Autoplay({ delay: autoplayDelay }));

  if (!images || images.length === 0) {
    return <p className="text-muted-foreground">No images to display</p>;
  }

  return (
    <Carousel
      className={carouselClassName}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {images.map((url, i) => (
          <CarouselItem className={cn("relative", className)} key={i}>
            <AspectRatio ratio={ratio || w / h} className="w-full h-full">
              <IKImage
                className="object-cover"
                urlEndpoint="https://ik.imagekit.io/ashif"
                src={`${url}?tr=w-${maxW},h-${maxH},c-fill`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                fill
                alt={`Image ${i + 1}`}
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DisplayImages;
