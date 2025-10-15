"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

export default function HomeCarousel() {
    const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

    const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    ]

  return (
    <Carousel className="w-full" plugins={[plugin.current]}>
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="w-full">
              <Card className={"w-full h-[90vh] rounded-none p-0"}>
                <CardContent className="flex items-center justify-center w-full h-full p-0">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}