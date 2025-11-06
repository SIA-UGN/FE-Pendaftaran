import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";

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
      <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-10/12 mx-auto">
        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
          Pimpinan Universitas Global Nusantara
        </h2>
        <div className="flex flex-col gap-12 w-full mt-12">
          {pimpinan.map((item) => (
            <div
              className="flex w-full gap-5 flex-col md:flex-row"
              key={item.nama}
            >
              <div className="relative w-full md:w-96 h-96 rounded-xl">
                <Image
                  src="/auth.png"
                  alt="sejarah"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <p className="flex flex-col gap-2 w-full">
                <span className="text-2xl font-bold text-[var(--green)]">
                  {item.nama}
                </span>
                <span className="text-lg font-semibold text-[var(--green)]">
                  {item.posisi}
                </span>

                <span className="text-sm text-gray-500 w-fit md:w-2xl">
                  {item.deskripsi}
                </span>
                <span className="text-gray-500">Contact: {item.nomor}</span>
                <span className="text-gray-500">Email: {item.email}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
