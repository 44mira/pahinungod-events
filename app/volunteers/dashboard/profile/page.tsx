"use client";

import { Label } from "@/components/ui/label";
import useSingleUserQuery from "@/hooks/use-single-user-query";

export default function Profile() {
  const { data: volunteer, isLoading, isError } = useSingleUserQuery();

  const ProfileDataTemplate = [
    { label: "Full name", valueKey: volunteer?.name },
    { label: "Nickname", valueKey: volunteer?.nickname },
    { label: "E-mail", valueKey: volunteer?.email },
    { label: "Occupation", valueKey: volunteer?.occupation },
    { label: "Phone No.", valueKey: volunteer?.phone_number },
    { label: "Sex", valueKey: volunteer?.sex },
    { label: "Age", valueKey: volunteer?.age },
  ];
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
              {valueKey || "No data available"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
