import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="lg:flex w-full items-center gap-5 hidden">
        <h1 className="text-2xl text-primary font-bold">Dashboard</h1>
        <div className="flex w-full items-center gap-5">
          <div className="grow" />
          <Button className="text-xsm text-primary-foreground">Log out</Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 lg:hidden">
        <div className="flex gap-2 items-center self-end">
          <Button className="text-xsm text-primary-foreground">Log out</Button>
        </div>
        <h1 className="text-2xl text-primary font-bold mx-auto">Events</h1>
      </div>

      <div className="h-full w-full">{children}</div>
    </div>
  );
}
