"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Events({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="p-5">
      <Button
        className=" bg-gradient-to-l from-accent-strong to-accent-light from-5% to-95%"
        onClick={() => router.back()}
      >
        Back
      </Button>
      <div className="pt-5">{children}</div>
    </div>
  );
}
