"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.png";
import google from "@/public/google.svg";

const logoDimensions = 100;
export default function UserLogin() {
  return (
    <div className="mx-auto my-auto translate-y-52 bg-gradient-to-br  from-accent-strong to-accent-light from-20%% to-80% w-96 rounded-lg p-5">
      <Image
        src={logo}
        alt={"pahinungod logo"}
        height={logoDimensions}
        width={logoDimensions}
        className="mx-auto mb-10"
      />
      <Button variant={"none"} className="bg-white w-full space-x-3">
        <Image src={google} alt="google_icon" className="w-7" />
        <span className="font-semibold">Sign in with Google</span>
      </Button>
    </div>
  );
}
