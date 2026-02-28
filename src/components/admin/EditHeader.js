import Link from "next/link";

export default function EditHeader() {
  return (
    <div className="grid grid-cols-4 m-6 p-6 gap-6">
      <Link href="/dashboard/edit/pendaftaran/data-diri">
        <div className="flex text-center justify-center p-4 cursor-pointer" style={{ backgroundColor: '#E6EEE9', borderRadius: '12px', border: '1px solid #D9E5DE', color: '#015023', fontWeight: '500' }}>
          Form Data Diri
        </div>
      </Link>

      <Link href="/dashboard/edit/pendaftaran/data-alamat">
        <div className="flex text-center justify-center p-4 cursor-pointer" style={{ backgroundColor: '#E6EEE9', borderRadius: '12px', border: '1px solid #D9E5DE', color: '#015023', fontWeight: '500' }}>
          Form Data Alamat
        </div>
      </Link>

      <Link href="/dashboard/edit/pendaftaran/data-orangtua">
        <div className="flex text-center justify-center p-4 cursor-pointer" style={{ backgroundColor: '#E6EEE9', borderRadius: '12px', border: '1px solid #D9E5DE', color: '#015023', fontWeight: '500' }}>
          Form Data Orang Tua/Wali
        </div>
      </Link>

      <Link href="/dashboard/edit/pendaftaran/data-akademik">
        <div className="flex text-center justify-center p-4 cursor-pointer" style={{ backgroundColor: '#E6EEE9', borderRadius: '12px', border: '1px solid #D9E5DE', color: '#015023', fontWeight: '500' }}>
          Form Data Akademik
        </div>
      </Link>
    </div>
  );
}
