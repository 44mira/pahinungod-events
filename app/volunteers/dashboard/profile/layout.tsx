"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signoutUser } from "@/actions/auth/actions";
import { Separator } from "@/components/ui/separator";

export default function Profile({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="p-5 md:p-5 md:ps-40 ">
      <div className="text-xl font-bold py-5">
        Edit Profile
        <Separator className="max-md:hidden border-[1.5px] border-slate-300 " />
      </div>
      <div className="flex justify-between">
        <Button variant={"accent_gradient"} onClick={() => router.back()}>
          Back
        </Button>
        <form action={signoutUser}>
          <Button type="submit">Log out</Button>
        </form>
      </div>
      {children}
    </div>
  );
}
