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

export default function Navbar({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();

  type NavbarItem = [string, string, JSX.Element?];
  const logoDimensions = 80;
  const NavbarItems: NavbarItem[] = [
    ["Dashboard", "", <HouseWhite key="house" />],
    ["Events", "events", <CalendarWhite key="calendar" />],
    ["Volunteers", "volunteers", <UsersWhite key="user" />],
    ["Edit Profile", "profile", <SettingsWhite key="settings" />],
  ];

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
                  /* Sets dashboard style to be selected by default. */
                  url === "" && currentPath === "/dashboard"
                    ? "font-bold text-xmd text-accent bg-white px-3 rounded-xl flex gap-1 items-center transition ease-in-out duration-300"
                    : /* Style selected except for dashboard */
                    url !== "" && currentPath.includes(`/dashboard/${url}`)
                    ? "font-bold text-xmd text-accent bg-white px-3 rounded-xl flex gap-1 items-center transition ease-in-out duration-300"
                    : "font-bold text-xmd text-white px-3 rounded-xl flex gap-1 items-center transition ease-in-out duration-300"
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
