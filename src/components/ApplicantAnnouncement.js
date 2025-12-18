import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useProfile } from "@/hooks/useProfile";
import { useMyRegistration } from "@/hooks/useRegistration";

export default function ApplicantAnnouncement({ status }) {
  const { data: profileData } = useProfile();
  const { data: registrationData } = useMyRegistration();

  const profile = registrationData?.data?.data?.profile;
  const user = profileData?.data?.data?.user;

  const fullName = profile?.full_name || "Loading...";
  const registrationNumber = profile?.registration_number || "-";
  const programName =
    registrationData?.data?.data?.program?.name_program || "Loading...";
  const email = user?.email || "-";

  const avatarPath = user?.avatar_url || profile?.profile_photo_url;
  const profilePhoto = avatarPath
    ? avatarPath.startsWith("http")
      ? avatarPath
      : `http://localhost:8000/storage/${avatarPath}`
    : "/logo.jpg";

  const username = email !== "-" ? `@${email.split("@")[0]}` : "-";
  return (
    <Card className="w-full flex flex-col sm:flex-row gap-6 p-8 rounded-2xl shadow-md">
      <Image
        alt={`Profile ${fullName}`}
        src={profilePhoto}
        width={180}
        height={300}
        className="w-full sm:w-1/4 h-[260px] rounded-xl object-cover"
      />
      <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
        <h2 className="font-bold text-xl text-[var(--green)]">{fullName}</h2>
        <p className="text-gray-500">{registrationNumber}</p>
        <h3 className="text-gray-500">{username}</h3>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-500">{programName}</p>
        <p
          className={`mt-auto px-4 py-2 rounded-lg font-bold text-white ${
            status === "Lulus" ? "bg-[var(--green)]" : "bg-red-500"
          }`}
        >
          {status}
        </p>
      </div>
    </Card>
  );
}
