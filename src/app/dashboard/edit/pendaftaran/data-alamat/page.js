import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";

export default function Page() {
  return (
    <>
      <Heading title="Data Alamat" />
      <div className="w-full flex justify-end mb-4">
        <Button variant={"green"}>Tambah</Button>
      </div>
    </>
  );
}
