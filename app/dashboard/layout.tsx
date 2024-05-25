"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";
import UsersWhite from "@/public/usersWhite";
import HouseWhite from "@/public/house_white";
import CalendarWhite from "@/public/calendar_white";
import SettingsWhite from "@/public/settings_white";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();

  type NavbarItem = [string, string, JSX.Element?];
  const [iconStroke, setIconStroke] = useState(
    "stroke-white transition ease-in-out duration-300"
  );
  const [iconFill, setIconFill] = useState(
    "fill-white transition ease-in-out duration-300"
  );
  const logoDimensions = 80;
  const NavbarItems: NavbarItem[] = [
    ["Dashboard", "", <HouseWhite className={iconFill} />],
    ["Events", "events", <CalendarWhite className={iconStroke} />],
    ["Volunteers", "volunteers", <UsersWhite className={iconStroke} />],
    ["Edit Profile", "profile", <SettingsWhite className={iconStroke} />],
  ];

  useEffect(() => {
    setIconFill(
      currentPath === "/dashboard"
        ? "fill-accent transition ease-in-out duration-300"
        : "fill-white transition ease-in-out duration-300"
    );
    setIconStroke(
      currentPath === "/dashboard/events"
        ? "stroke-accent transition ease-in-out duration-300"
        : "stroke-white transition ease-in-out duration-300"
    );
    /* setIconStroke(
      currentPath === "/dashboard/volunteers" ? "stroke-accent" : "stroke-white"
    );
    setIconStroke(
      currentPath === "/dashboard/profile" ? "stroke-accent" : "stroke-white"
    ); */
  }, [currentPath]);

  return (
    <div className="flex w-full min-h-screen">
      <div className="md:flex flex-col w-[250px] bg-gradient-to-t from-accent-light to-accent-strong py-5 gap-5 rounded-r-2xl hidden fixed bottom-0 top-0">
        <div className="text-center mb-3 space-y-3">
          <Image
            src={logo}
            alt="pahinungod logo"
            height={logoDimensions}
            width={logoDimensions}
            className="mx-auto"
          />
          <p className=" text-white font-semibold">
            UGNAYAN NG PAHINUNGOD <span className="text-lg">MINDANAO</span>
          </p>
        </div>
        <Separator className="border-white border-2" />
        <ul className="flex flex-col gap-5 px-5">
          {NavbarItems.map(([item, url, icon], idx) => (
            <li key={idx}>
              <Link
                href={{ pathname: `/dashboard/${url}` }}
                className={
                  item === "Dashboard" && currentPath === "/dashboard"
                    ? "font-bold text-xmd text-accent bg-white p-2 px-3 rounded-xl  flex gap-5 items-center transition ease-in-out duration-300"
                    : currentPath === `/dashboard/${url}`
                    ? "font-bold text-xmd text-accent bg-white p-2 px-3 rounded-xl flex gap-5 items-center transition ease-in-out duration-300"
                    : "font-bold text-xmd text-white p-2 px-3 rounded-xl flex gap-5 items-center transition ease-in-out duration-300"
                }
              >
                {icon}
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full p-10 lg:pl-16 md:ml-[230px]">{children}</div>
    </div>
  );
}
