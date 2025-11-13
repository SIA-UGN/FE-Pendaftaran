import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <Heading title="Data Diri" />
      <div className="w-full flex justify-end mb-4">
        <Button variant={"green"}>Tambah</Button>
      </div>
      <div>Ini Tabel</div>
    </>
  );
}
