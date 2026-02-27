"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const images = [
    {
      url: "/image1.jpg",
      heading: "Selamat Datang,",
      subheading: "Calon Mahasiswa Baru Universitas Global Nusantara!",
    },
    {
      url: "/image2.jpg",
      heading: "Universitas Global Nusantara",
      subheading:
        "Awal dari langkah besar, saatnya menatap masa depan dengan keyakinan dan kesiapan untuk meraih cita-cita demi masa depan lebih cerah.",
    },
    {
      url: "/image3.jpg",
      heading: "",
      subheading: "",
    },
  ];

  return (
    <Carousel className="w-full" plugins={[plugin.current]}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full">
              <Card className="w-full h-[90vh] rounded-none p-0">
                <CardContent className="flex items-center justify-center w-full h-full p-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex bg-black/40 text-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
                    <div className="flex flex-col justify-center items-start my-auto max-w-4xl">
                      <p className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 leading-tight text-[var(--cream)]">
                        {image.heading}
                      </p>
                      <p className="text-xsm sm:text-base md:text-md lg:text-lg text-white/80 leading-relaxed">
                        {image.subheading}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
