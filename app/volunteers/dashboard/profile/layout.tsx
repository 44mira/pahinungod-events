"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Profile({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="p-5">
      <Button variant={"accent"} onClick={() => router.back()}>
        Back
      </Button>
      <div className="text-xl font-bold py-5">Edit Profile</div>
      {children}
    </div>
  );
}
