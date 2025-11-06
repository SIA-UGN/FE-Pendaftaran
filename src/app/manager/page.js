import AccountInformation from "@/components/AccountInformation";
import NotificationManager from "@/components/NotificationManager";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AccountInformation />
      {/* <RegistrantInformation /> */}
      <NotificationManager />
    </div>
  );
}
