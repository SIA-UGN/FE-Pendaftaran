import { Button } from "@/components/ui/button";

export default function NotificationManager() {
  return (
    <>
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3">
        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
          Notification Manager
        </h2>
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
