import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import favicon from "@/app/favicon.ico";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const NavbarItems: string[][] = [
    ["Dashboard", ""],
    ["Events", "/events"],
    ["Volunteers", "/volunteers"],
    ["Profile and Settings", "/profile"],
  ];

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col min-w-[290px] bg-muted p-5 gap-5 border rounded-r-2xl">
        <div className="mb-5">logo</div>
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
      <div className="w-full p-10 pl-16">{children}</div>
    </div>
  );
}
