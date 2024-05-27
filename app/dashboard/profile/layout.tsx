import { Button } from "@/components/ui/button";

export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="lg:flex w-full items-center gap-5 hidden">
        <h1 className="text-2xl text-accent font-bold basis-5">Profile</h1>
        <div className="flex w-full items-center gap-5">
          <div className="grow" />
          <Button
            className="text-xsm text-accent-foreground"
            variant={"accent"}
          >
            Log out
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <div className="flex gap-2 items-center self-end">
          <Button
            className="text-xsm text-accent-foreground"
            variant={"accent"}
          >
            Log out
          </Button>
        </div>
        <h1 className="text-2xl text-accent font-bold mx-auto">Profile</h1>
      </div>
      {children}
    </div>
  );
}
