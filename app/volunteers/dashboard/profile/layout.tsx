export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5">
      <div className="text-xl font-bold pb-5">Edit Profile</div>
      {children}
    </div>
  );
}
