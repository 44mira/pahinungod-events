"use client";

import IconClose from "@/public/close";
import IconMenu from "@/public/menu";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Navbar({ children }: { children: React.ReactNode }) {
  // Show and Hide hamburger menu
  const [menuState, setMenuState] = useState(false);

  return (
    <>
      <div
        className={
          menuState
            ? "fixed bg-red-300 top-0 left-0 right-0 bottom-0 origin-left scale-x-100 transition duration-200 z-10"
            : "fixed bg-red-300 top-0 left-0 right-0 bottom-0 origin-left scale-x-0 transition duration-200 z-10"
        }
      >
        <IconClose
          className="absolute top-2 right-2"
          onClick={() => setMenuState(false)}
        />
        <p>test</p>
      </div>
      <div className="flex justify-between p-5 bg-gradient-to-l shadow-lg from-accent-strong to-accent-light sticky top-0 z-0">
        <IconMenu
          onClick={() => setMenuState(true)}
          className="stroke-neutral-100 text-neutral-100"
        />
        <Image
          src={logo}
          alt="logo"
          className="w-10 rounded-full bg-gray-300"
        />
        {/* <Button className="text-xsm text-white" variant={"accent"}>
          Log out
        </Button> */}
      </div>
      {children}
    </>
  );
}
