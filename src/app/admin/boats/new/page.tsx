import { AdminShell } from "@/components/admin/AdminShell";
import { BoatForm } from "@/components/admin/BoatForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBoatPage() {
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
          Add New Boat
        </h1>
      </div>
      <BoatForm />
    </AdminShell>
  );
}
