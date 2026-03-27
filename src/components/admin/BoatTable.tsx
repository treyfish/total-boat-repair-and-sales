"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Ship, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Boat } from "@/lib/types";

interface BoatTableProps {
  boats: Boat[];
}

export function BoatTable({ boats }: BoatTableProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    setDeleting(id);

    const supabase = createClient();
    await supabase.from("boats").delete().eq("id", id);
    router.refresh();
    setDeleting(null);
  }

  if (boats.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-silver-light/50">
        <Ship className="w-16 h-16 text-silver mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-xl text-navy mb-2">
          No Boats Listed
        </h3>
        <p className="text-text-muted mb-6">
          Add your first boat listing to get started.
        </p>
        <Link
          href="/admin/boats/new"
          className="btn-shimmer inline-flex items-center gap-2 bg-gold text-navy-dark font-bold px-5 py-2.5 rounded-lg text-sm"
        >
          Add First Boat
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-silver-light/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-off-white border-b border-silver-light/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Boat
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Year
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {boats.map((boat) => (
              <tr
                key={boat.id}
                className="border-b border-silver-light/30 hover:bg-off-white/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-off-white shrink-0 relative">
                      {boat.photos[0] ? (
                        <Image
                          src={boat.photos[0]}
                          alt={boat.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Ship className="w-6 h-6 text-silver" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-navy flex items-center gap-2">
                        {boat.name}
                        {boat.featured && (
                          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                        )}
                      </div>
                      <div className="text-xs text-text-muted">
                        {[boat.make, boat.model].filter(Boolean).join(" ")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">
                  {boat.year || "—"}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-navy">
                  {formatPrice(boat.price)}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={boat.status as "available" | "pending" | "sold"}
                  >
                    {boat.status.charAt(0).toUpperCase() + boat.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/boats/${boat.id}/edit`}
                      className="p-2 text-text-muted hover:text-teal hover:bg-teal/10 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(boat.id, boat.name)}
                      disabled={deleting === boat.id}
                      className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
