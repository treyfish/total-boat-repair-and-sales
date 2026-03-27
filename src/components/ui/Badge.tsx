import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "available" | "pending" | "sold" | "teal" | "gold";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  available: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  sold: "bg-gray-100 text-gray-600",
  teal: "bg-teal/10 text-teal",
  gold: "bg-gold/10 text-gold",
};

export function Badge({ variant = "teal", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
