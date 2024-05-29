"use client";

import { Label } from "@/components/ui/label";
import useGetUserIdentity from "@/hooks/use-get-user-identity";

interface ProfileDataItem {
  label: string;
  valueKey: string;
}

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
  const user = useGetUserIdentity(); // Get the user data.

  const ProfileData = ProfileDataTemplate.map((item) => ({
    ...item, // include all properties of item

    // If user is available, dynamically access the corresponding key value.
    value: user ? (user as any)[item.valueKey] : "Loading...", // 'as any' bypass type cheking to handle dynamic keys
  }));

  return (
    <>
      <div className="w-32 h-32 bg-gray-500 rounded-full mx-auto"></div>
      <div className="pt-10 space-y-7">
        {ProfileData.map(({ label, value }) => (
          <div key={label}>
            <Label className="text-gray-500">{label}</Label>
            <div className="border-b-[3px] border-gray-300 font-semibold text-lg drop-shadow-md">
              {value && "No data available"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
