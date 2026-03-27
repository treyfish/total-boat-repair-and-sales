import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { BoatTable } from "@/components/admin/BoatTable";
import type { Boat } from "@/lib/types";

async function getBoats(): Promise<Boat[]> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase
      .from("boats")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Boat[]) || [];
  } catch {
    return [];
  }
}

export default async function AdminBoatsPage() {
  const boats = await getBoats();

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy mb-1">
            Boat Inventory
          </h1>
          <p className="text-text-muted text-sm">
            Manage your boat listings. {boats.length} total.
          </p>
        </div>
        <Link
          href="/admin/boats/new"
          className="btn-shimmer inline-flex items-center gap-2 bg-gold text-navy-dark font-bold px-5 py-2.5 rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Boat
        </Link>
      </div>

      <BoatTable boats={boats} />
    </AdminShell>
  );
}
