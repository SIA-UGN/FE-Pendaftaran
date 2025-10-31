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
import { Button } from "@/components/ui/button"

export default function HomeCarousel() {
    const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  const images = [{
      url: "/image1.jpg",
    heading: "Selamat Datang,",
      subheading: "Calon Mahasiswa Baru Universitas Global Nusantara!"
  }, 
    {
      url: "/image2.jpg",
    heading: "Universitas Global Nusantara",
      subheading: "Awal dari langkah besar, saatnya menatap masa depan dengan keyakinan dan kesiapan untuk meraih cita-cita demi masa depan lebih cerah."
    },
    {
      url: "/image3.jpg",
    heading: "",
      subheading: ""
    }
    ]

  return (
    <Carousel className="w-full" plugins={[plugin.current]}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full">
              <Card className={"w-full h-[90vh] rounded-none p-0"}>
                <CardContent className="flex items-center justify-center w-full h-full p-0 relative">
                  <img
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex bg-black/40 text-white px-24">
                    <div className="flex flex-col justify-center items-start my-auto">
                      <p className="text-6xl font-bold mb-2 w-xl">{image.heading}</p>
                      <p className="text-md w-2xl text-white/80">{image.subheading}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}