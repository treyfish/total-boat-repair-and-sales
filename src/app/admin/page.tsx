import { Ship, MessageSquare, Clock, DollarSign } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAuth } from "@/lib/supabase/auth-guard";
import Link from "next/link";

async function getStats() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const [boatsRes, submissionsRes] = await Promise.all([
      supabase.from("boats").select("status"),
      supabase.from("contact_submissions").select("is_read"),
    ]);

    const boats = boatsRes.data || [];
    const submissions = submissionsRes.data || [];

    return {
      available: boats.filter((b: { status: string }) => b.status === "available").length,
      pending: boats.filter((b: { status: string }) => b.status === "pending").length,
      sold: boats.filter((b: { status: string }) => b.status === "sold").length,
      totalBoats: boats.length,
      unreadMessages: submissions.filter((s: { is_read: boolean }) => !s.is_read).length,
      totalMessages: submissions.length,
    };
  } catch {
    return {
      available: 0,
      pending: 0,
      sold: 0,
      totalBoats: 0,
      unreadMessages: 0,
      totalMessages: 0,
    };
  }
}

export default async function AdminDashboardPage() {
  await requireAuth();
  const stats = await getStats();

  const cards = [
    {
      label: "Available Boats",
      value: stats.available,
      icon: Ship,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      href: "/admin/boats",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
      href: "/admin/boats",
    },
    {
      label: "Sold",
      value: stats.sold,
      icon: DollarSign,
      color: "text-blue-500",
      bg: "bg-blue-50",
      href: "/admin/boats",
    },
    {
      label: "Unread Messages",
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: "text-teal",
      bg: "bg-teal/10",
      href: "/admin/submissions",
    },
  ];

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-navy mb-1">
          Dashboard
        </h1>
        <p className="text-text-muted text-sm">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-6 border border-silver-light/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-lg ${card.bg} flex items-center justify-center`}
              >
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <div className="font-heading font-bold text-3xl text-navy mb-1">
              {card.value}
            </div>
            <div className="text-sm text-text-muted">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          href="/admin/boats/new"
          className="bg-white rounded-xl p-6 border border-silver-light/50 hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
            <Ship className="w-6 h-6 text-teal" />
          </div>
          <div>
            <div className="font-semibold text-navy">Add New Boat</div>
            <div className="text-sm text-text-muted">
              List a new boat for sale
            </div>
          </div>
        </Link>
        <Link
          href="/admin/submissions"
          className="bg-white rounded-xl p-6 border border-silver-light/50 hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <MessageSquare className="w-6 h-6 text-gold" />
          </div>
          <div>
            <div className="font-semibold text-navy">View Messages</div>
            <div className="text-sm text-text-muted">
              {stats.unreadMessages > 0
                ? `${stats.unreadMessages} unread message${stats.unreadMessages > 1 ? "s" : ""}`
                : "All caught up!"}
            </div>
          </div>
        </Link>
      </div>
    </AdminShell>
  );
}
