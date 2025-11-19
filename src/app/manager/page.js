import AccountInformation from "@/components/dashboard/AccountInformation";
import NotificationManager from "@/components/manager/NotificationManager";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
      <AccountInformation />
      <NotificationManager />
    </div>
  );
}
