import { Button } from "@/components/ui/button";

export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5">
      <div className="text-xl font-bold pb-5">Dashboard</div>
      {children}
    </div>
  );
}
