import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import Link from "next/link";

export default function NotificationManager() {
  return (
    <>
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl mb-12 w-full gap-3 mx-auto">
        <Heading title={"Notification Manager"} variant="first" />
        <div className="grid grid-cols-1 gap-6">
          <Link href="/manager/broadcast">
            <Button
              variant={"green"}
              className={"rounded-lg text-lg h-12 w-full"}
            >
              Buat Notifikasi
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
