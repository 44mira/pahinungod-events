import { createClient } from "@/utils/supabase/server";
import { Volunteer, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Volunteer[]> {
  const supabase = createClient();
  let { data: volunteer, error } = await supabase.from("volunteer").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return volunteer || [];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      {/* Search Bar */}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
