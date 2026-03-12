import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6EEE9' }}>
            <GraduationCap className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#015023' }}>Data Akademik</h2>
            <p className="text-xs text-gray-400">Kelola form data akademik pendaftar</p>
          </div>
        </div>
        <Button className="rounded-xl text-white" style={{ backgroundColor: '#015023' }}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah
        </Button>
      </div>
      <div className="text-sm text-gray-500 text-center py-8 border rounded-xl" style={{ borderColor: '#E6EEE9' }}>
        Belum ada data
      </div>
    </div>
  );
}
