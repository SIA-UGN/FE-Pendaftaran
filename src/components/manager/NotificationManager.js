import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";

export default function NotificationManager() {
  return (
    <>
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3">
        <Heading title={"Notification Manager"} />
        <div className="grid grid-cols-2 gap-6">
          <Button
            variant={"yellow"}
            className={"rounded-lg w-[320px] text-lg h-12"}
          >
            Lihat Notifikasi
          </Button>
          <Button variant={"green"} className={"rounded-lg text-lg h-12"}>
            Buat Notifikasi
          </Button>
        </div>
      </div>
    </>
  );
}
