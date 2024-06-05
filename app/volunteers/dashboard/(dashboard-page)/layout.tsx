import { Separator } from "@/components/ui/separator";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 md:p-5 md:ps-40 ">
      <div className=" text-xl font-bold pb-5">
        Dashboard
        <Separator className="max-md:hidden border-[1.5px] border-slate-300 " />
      </div>
      {children}
    </div>
  );
}
