import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";
import { Heading } from "@/components/Heading";

const pimpinan = [
  // REKTOR
  {
    posisi: "Rektor",
    nama: "Prof. Dr. H. Ahmad Syafi'i, M.Ag.",
    deskripsi:
      "Pemimpin tertinggi universitas yang bertanggung jawab atas pengelolaan akademik dan non-akademik. Memiliki pengalaman 25 tahun di bidang pendidikan tinggi dan manajemen perguruan tinggi Islam.",
    nomor: "+62 274 555 1001",
    email: "rektor@ugn.ac.id",
    website: "https://ugn.ac.id/rektor",
  },

  // WAKIL REKTOR
  {
    posisi: "Wakil Rektor I (Bidang Akademik)",
    nama: "Dr. Siti Maryam Azzahra, M.Pd.",
    deskripsi:
      "Membawahi urusan akademik, kurikulum, pembelajaran, dan penjaminan mutu pendidikan. Berpengalaman dalam pengembangan kurikulum berbasis kompetensi dan akreditasi internasional.",
    nomor: "+62 274 555 1002",
    email: "warek1@ugn.ac.id",
    website: "https://ugn.ac.id/warek-akademik",
  },
  {
    posisi: "Wakil Rektor II (Bidang Umum & Keuangan)",
    nama: "Dr. Bambang Setiawan, S.E., M.M.",
    deskripsi:
      "Mengelola administrasi umum, keuangan, aset, dan sarana prasarana universitas. Ahli dalam manajemen keuangan pendidikan dan tata kelola kampus modern.",
    nomor: "+62 274 555 1003",
    email: "warek2@ugn.ac.id",
    website: "https://ugn.ac.id/warek-umum",
  },
  {
    posisi: "Wakil Rektor III (Bidang Kemahasiswaan)",
    nama: "Dr. Muhammad Ridwan, M.Si.",
    deskripsi:
      "Bertanggung jawab atas pembinaan kemahasiswaan, organisasi kampus, beasiswa, dan pengembangan soft skills mahasiswa. Fokus pada pembentukan karakter dan kepemimpinan mahasiswa.",
    nomor: "+62 274 555 1004",
    email: "warek3@ugn.ac.id",
    website: "https://ugn.ac.id/warek-kemahasiswaan",
  },
  {
    posisi: "Wakil Rektor IV (Bidang Kerjasama & Pengembangan)",
    nama: "Dr. Ratna Sari Dewi, M.A.",
    deskripsi:
      "Mengelola kerjasama institusional, riset, publikasi ilmiah, dan pengabdian masyarakat. Membangun jaringan dengan universitas dan lembaga dalam dan luar negeri.",
    nomor: "+62 274 555 1005",
    email: "warek4@ugn.ac.id",
    website: "https://ugn.ac.id/warek-kerjasama",
  },

  // DEKAN FAKULTAS
  {
    posisi: "Dekan Fakultas Syariah dan Hukum",
    nama: "Dr. H. Abdul Wahid, M.H.I.",
    deskripsi:
      "Memimpin fakultas yang mengembangkan ilmu syariah, hukum Islam, dan hukum positif. Berpengalaman dalam penelitian hukum ekonomi syariah dan hukum keluarga Islam.",
    nomor: "+62 274 555 2001",
    email: "dekan.syariah@ugn.ac.id",
    website: "https://ugn.ac.id/fakultas-syariah",
  },
];

export default function Pimpinan() {
  return (
    <div>
      <HomeCarousel />
      <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Heading
          title="Pimpinan Universitas Global Nusantara"
          variant="first"
        />
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 w-full mt-8 sm:mt-10 lg:mt-12">
          {pimpinan.map((item) => (
            <div
              className="flex w-full gap-4 sm:gap-5 lg:gap-6 flex-col md:flex-row items-start"
              key={item.nama}
            >
              {/* Image Section */}
              <div className="relative w-full md:w-80 lg:w-96 h-64 sm:h-80 md:h-96 overflow-hidden flex-shrink-0 shadow-md" style={{ borderRadius: '16px' }}>
                <Image
                  src="/auth.png"
                  alt={item.nama}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                {/* Nama */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight" style={{ color: '#015023' }}>
                  {item.nama}
                </h3>

                {/* Posisi */}
                <p className="text-base sm:text-lg lg:text-xl font-semibold" style={{ color: '#015023' }}>
                  {item.posisi}
                </p>

                {/* Deskripsi */}
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mt-1">
                  {item.deskripsi}
                </p>

                {/* Contact Info */}
                <div className="flex flex-col gap-1 mt-2 sm:mt-3 text-sm sm:text-base">
                  <p className="text-gray-600">
                    <span className="font-medium">Contact:</span>{" "}
                    <a
                      href={`tel:${item.nomor}`}
                      className="hover:underline"
                      style={{ color: '#015023' }}
                    >
                      {item.nomor}
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href={`mailto:${item.email}`}
                      className="hover:underline"
                      style={{ color: '#015023' }}
                    >
                      {item.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
