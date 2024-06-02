"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Events({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="p-5">
      <Button
        variant={"accent_gradient"}
        className=" text-white"
        onClick={() => router.back()}
      >
        Back
      </Button>
      <div className="pt-5">{children}</div>
    </div>
  );
}
