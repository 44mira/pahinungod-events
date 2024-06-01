"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signoutUser } from "@/actions/auth/actions";

export default function Profile({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <Button variant={"accent_gradient"} onClick={() => router.back()}>
          Back
        </Button>
        <form action={signoutUser}>
          <Button type="submit">Log out</Button>
        </form>
      </div>
      <div className="text-xl font-bold py-5">Edit Profile</div>
      {children}
    </div>
  );
}
