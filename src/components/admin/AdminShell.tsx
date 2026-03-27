"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Ship, MessageSquare, LayoutDashboard, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/boats", icon: Ship, label: "Boats" },
  { href: "/admin/submissions", icon: MessageSquare, label: "Messages" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-off-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-dark text-white flex flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-no-words.jpg"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div>
              <div className="font-heading font-bold text-sm leading-tight">
                Total Boat Repair
              </div>
              <div className="text-[10px] text-teal tracking-wider uppercase">
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-teal/20 text-teal-light"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-white/5 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="md:hidden bg-navy-dark text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-no-words.jpg" alt="Logo" width={28} height={28} className="rounded" />
            <span className="font-heading font-bold text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "p-2 rounded-lg",
                  pathname?.startsWith(item.href) || (item.href === "/admin" && pathname === "/admin")
                    ? "text-teal-light bg-white/10"
                    : "text-white/50"
                )}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
