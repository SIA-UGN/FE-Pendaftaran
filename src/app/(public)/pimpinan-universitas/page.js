import HomeCarousel from "@/components/HomeCarousel";
import Image from "next/image";

const pimpinan = [
  {
    posisi: "Rektor",
    nama: "Faradis Yulianto",
    deskripsi: "Test ini deskripsinya.......",
    nomor: "nomor",
    email: "email",
    website: "website",
  },
  {
    posisi: "Wakil Rektok",
    nama: "Faradis Yulianto",
    deskripsi: "Test ini deskripsinya.......",
    nomor: "nomor",
    email: "email",
    website: "website",
  },

  {
    posisi: "Dekan",
    nama: "Faradis Yulianto",
    deskripsi: "Test ini deskripsinya.......",
    nomor: "nomor",
    email: "email",
    website: "website",
  },
];

export default function Pimpinan() {
  return (
    <div>
      <HomeCarousel />
      <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-11/12 mx-auto">
        <h2 className="text-xl sm:text-2xl font-medium mb-4 w-full border-b-2 border-black pb-2">
          Pimpinan Universitas
        </h2>
        <div className="flex flex-col gap-5 w-full">
          {pimpinan.map((item) => (
            <div
              className="flex w-full gap-5 flex-col md:flex-row"
              key={item.nama}
            >
              <div className="relative w-full md:w-1/2 h-96 sm:h-96">
                <Image
                  src="/auth.png"
                  alt="sejarah"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="flex flex-col gap2 w-full">
                <span className="text-2xl font-semibold">{item.nama}</span>
                <span className="text-lg font-semibold">{item.posisi}</span>

                <span>{item.deskripsi}</span>
                <span>{item.nomor}</span>
                <span>{item.email}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
