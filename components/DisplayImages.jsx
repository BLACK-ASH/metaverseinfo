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
 * - w: width of each image/item (default 300)
 * - h: height of each image/item (default 200)
 * - ratio: optional aspect ratio (default w/h)
 * - className: optional classes for CarouselItem
 * - carouselClassName: optional classes for Carousel wrapper
 * - autoplayDelay: autoplay speed in ms (default 2500)
 */
const DisplayImages = ({
  images = [],
  w = 300,
  h = 200,
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
          <CarouselItem
            className={cn("relative", className)}
            key={i}
            style={{ width: `${w}px`, height: `${h}px` }}
          >
            <AspectRatio ratio={ratio || w / h} className="w-full h-full">
              <IKImage
                className="object-cover"
                urlEndpoint="https://ik.imagekit.io/ashif"
                src={`${url}?tr=w-${w},h-${h}`}
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
