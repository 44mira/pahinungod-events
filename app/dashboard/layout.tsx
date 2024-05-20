import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import favicon from "@/app/favicon.ico";
import logo from "@/public/logo.png";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const logoDimensions = 225;
  const NavbarItems: string[][] = [
    ["Dashboard", ""],
    ["Events", "/events"],
    ["Volunteers", "/volunteers"],
    ["Edit Profile", "/profile"],
  ];

  return (
    <div className="flex w-full min-h-screen">
      <div className="md:flex flex-col min-w-[290px] bg-muted p-5 gap-5 border rounded-r-2xl hidden fixed bottom-0 top-0">
        <div className="flex mb-5 justify-center items-center">
          <Image
            src={logo}
            alt="pahinungod logo"
            height={logoDimensions}
            width={logoDimensions}
          />
        </div>
        <Separator className="bg-black" />
        <ul className="flex flex-col gap-5">
          {NavbarItems.map(([item, url], idx) => (
            <li key={idx}>
              <Link
                href={{ pathname: `/dashboard/${url}` }}
                className="font-bold text-body text-primary flex gap-5 items-center"
              >
                <Image src={favicon} alt="placeholder" width={30} />
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full p-10 lg:pl-16 md:ml-[290px]">{children}</div>
    </div>
  );
}
