import HomeCarousel from "@/components/HomeCarousel";
import Image from "next/image";

export default function VisiMisi() {
  return (
    <>
      <div>
        <HomeCarousel />
        <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-11/12 mx-auto">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 w-full border-b-2 border-black pb-2">
            Visi Misi
          </h2>
          <div className="flex w-full gap-5">
            <div className="relative w-1/2 h-96 sm:h-96">
              <Image
                src="/auth.png"
                alt="sejarah"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p>Visi</p>
              <p>Misi</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
