export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5">
      <div className="text-xl font-bold pb-5">Dashboard</div>
      {children}
    </div>
  );
}
