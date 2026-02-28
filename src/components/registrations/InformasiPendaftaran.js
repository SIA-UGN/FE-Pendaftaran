import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";

export default function InformasiPendaftaran() {
  return (
    <div
      className="flex flex-col w-full max-w-7xl mx-auto"
      style={{
        backgroundColor: '#E6EEE9',
        borderRadius: '16px',
        border: '1px solid #D9E5DE',
        padding: '20px 24px',
      }}
    >
      <h2
        className="text-xl sm:text-2xl md:text-3xl font-semibold pb-3 flex items-center gap-2 md:gap-3"
        style={{
          borderBottom: '2px solid #DABC4E',
          color: '#015023',
          marginBottom: '16px',
        }}
      >
        <Info className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" style={{ color: '#015023' }} />
        <span>Informasi Tahapan</span>
      </h2>
      <div className="pl-6 sm:pl-8 md:pl-12 flex flex-col gap-3 md:gap-4">
        <p className="leading-relaxed flex items-start sm:items-center gap-2 md:gap-3 text-sm sm:text-base text-gray-700">
          <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
          <span>Tahapan belum diselesaikan</span>
        </p>
        <p className="leading-relaxed flex items-start sm:items-center gap-2 md:gap-3 text-sm sm:text-base text-gray-700">
          <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: '#DABC4E' }} />
          <span>Tahapan belum dapat dilakukan</span>
        </p>
        <p className="leading-relaxed flex items-start sm:items-center gap-2 md:gap-3 text-sm sm:text-base text-gray-700">
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: '#015023' }} />
          <span>Tahapan sudah diselesaikan</span>
        </p>
      </div>
    </div>
  );
}
