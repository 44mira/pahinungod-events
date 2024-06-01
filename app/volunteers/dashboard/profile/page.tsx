"use client";

import { Label } from "@/components/ui/label";
import useGetUserIdentity from "@/hooks/use-get-user-identity";

interface ProfileDataItem {
  label: string;
  valueKey: string;
}

// valuekey is the name of the column in the database.
const ProfileDataTemplate: ProfileDataItem[] = [
  { label: "Full name", valueKey: "full_name" },
  { label: "Nickname", valueKey: "nickname" },
  { label: "E-mail", valueKey: "email" },
  { label: "Occupation", valueKey: "occupation" },
  { label: "Phone No.", valueKey: "phone" },
  { label: "Sex", valueKey: "sex" },
  { label: "Age", valueKey: "age" },
];

export default function Profile() {
  const { data: user, isLoading, isError } = useGetUserIdentity(); // Fetch data of the user.

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <>
      <div className="w-32 h-32 bg-gray-500 rounded-full mx-auto"></div>
      <div className="pt-10 space-y-7">
        {ProfileDataTemplate.map(({ label, valueKey }) => (
          <div key={label}>
            <Label className="text-gray-500">{label}</Label>
            <div className="border-b-[3px] border-gray-300 font-semibold text-lg drop-shadow-md">
              {/* Fetch data in the user_metadata object.*/}
              {user?.user_metadata?.[valueKey] || "No data available"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
