import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { BoatForm } from "@/components/admin/BoatForm";
import { requireAuth } from "@/lib/supabase/auth-guard";
import type { Boat } from "@/lib/types";

async function getBoat(id: string): Promise<Boat | null> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase.from("boats").select("*").eq("id", id).single();
    return data as Boat | null;
  } catch {
    return null;
  }
}

export default async function EditBoatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;
  const boat = await getBoat(id);

  if (!boat) notFound();

  return (
    <AdminShell>
      <div className="mb-8">
        <Link
          href="/admin/boats"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-teal transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Boats
        </Link>
        <h1 className="font-heading font-bold text-2xl text-navy">
          Edit: {boat.name}
        </h1>
      </div>
      <BoatForm
        initialData={{
          id: boat.id,
          name: boat.name,
          description: boat.description || undefined,
          price: boat.price,
          year: boat.year,
          make: boat.make || undefined,
          model: boat.model || undefined,
          length_ft: boat.length_ft,
          engine_make: boat.engine_make || undefined,
          engine_hp: boat.engine_hp,
          hull_material: boat.hull_material || undefined,
          fuel_type: boat.fuel_type || "Gas",
          status: boat.status,
          featured: boat.featured,
          photos: boat.photos,
        }}
        isEditing
      />
    </AdminShell>
  );
}
