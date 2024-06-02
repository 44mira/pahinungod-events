"use client";

import IconClose from "@/public/close";
import IconMenu from "@/public/menu";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import HouseWhite from "@/public/house_white";
import CalendarWhite from "@/public/calendar_white";
import SettingsWhite from "@/public/settings_white";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import UserSingle from "@/public/single_user";
import { useRouter } from "next/navigation";
import useAdminQuery from "@/hooks/use-admin-query";

export default function Navbar({ children }: { children: React.ReactNode }) {
  // Show and Hide hamburger menu
  const currentPath = usePathname();
  const [menuState, setMenuState] = useState(false);
  const { data, status } = useAdminQuery();
  const router = useRouter();

  if (status === "error") {
    return <p className="text-destructive">Error in fetching user data.</p>;
  }

  if (status === "pending") {
    return <></>;
  }

  if (data.user.user_metadata.admin) {
    router.replace("/dashboard");
  }

  const logoDimensions = 80;

  type NavbarItem = [string, string, JSX.Element?];
  const NavbarItems: NavbarItem[] = [
    ["Dashboard", "", <HouseWhite key="house" />],
    ["Events", "events", <CalendarWhite key="calendar" />],
    ["Profile and Settings", "profile", <SettingsWhite key="settings" />],
  ];

  return (
    <>
      <div
        className={
          menuState
            ? "fixed  bg-gradient-to-br  from-accent-strong to-accent-light from-20%% to-80%  top-0 left-0 right-0 bottom-0 origin-left scale-x-100 transition duration-200 z-10"
            : "fixed  bg-gradient-to-br  from-accent-strong to-accent-light from-20% to-80% top-0 left-0 right-0 bottom-0 origin-left scale-x-0 z-10"
        }
      >
        <IconClose
          className="absolute top-2 right-2 text-white fill-white"
          onClick={() => setMenuState(false)}
        />
        <div className="flex pr-5 items-center">
          <Image
            src={logo}
            alt="pahinungod logo"
            height={logoDimensions}
            width={logoDimensions}
            className="m-5"
          />
          <p className="text-secondary-foreground font-bold text-lg leading-none">
            Ugnayan ng Pahinungod
            <span className="text-xl"> Mindanao</span>
          </p>
        </div>

        <Separator className="border-white border-2" />

        <ul className="flex flex-col gap-5 px-5 pt-5">
          {NavbarItems.map(([item, url, icon], idx) => (
            <li key={idx}>
              <Link
                onClick={() => setMenuState(!menuState)}
                href={{ pathname: `/volunteers/dashboard/${url}` }}
                className={
                  /* Sets dashboard style to be selected by default. */
                  idx === 0 && currentPath === "/volunteers/dashboard"
                    ? "font-bold text-xmd text-accent bg-white px-3 rounded-xl flex gap-1 items-center transition ease-in-out duration-300"
                    : /* Style selected except for dashboard */
                      idx !== 0 &&
                        currentPath.includes(`/volunteers/dashboard/${url}`)
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
      <div className="flex justify-between px-5 pt-4 pb-1 shadow-lg bg-gradient-to-l  from-accent-strong to-accent-light sticky top-0 z-0">
        <IconMenu
          onClick={() => setMenuState(true)}
          className="stroke-neutral-100 text-neutral-100"
        />
        <UserSingle
          className="text-white cursor-pointer"
          onClick={() => router.push("/volunteers/dashboard/profile")}
        />
        {/* <Button className="text-xsm text-white" variant={"accent"}>
          Log out
        </Button> */}
      </div>
      {children}
    </>
  );
}
