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
    <div className="w-full flex flex-col sm:flex-row gap-6 p-8 shadow-md" style={{ backgroundColor: '#ffffff', border: '1px solid #E6EEE9', borderRadius: '16px' }}>
      <Image
        alt={`Profile ${fullName}`}
        src={profilePhoto}
        width={180}
        height={300}
        className="w-full sm:w-1/4 h-[260px] rounded-xl object-cover"
      />
      <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
        <h2 className="font-bold text-xl" style={{ color: '#015023' }}>{fullName}</h2>
        <p className="text-gray-500">{registrationNumber}</p>
        <h3 className="text-gray-500">{username}</h3>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-500">{programName}</p>
        <p
          style={{
            marginTop: 'auto',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: status === 'Lulus' ? '#015023' : '#BE0414',
          }}>
          {status}
        </p>
      </div>
    </div>
  );
}
