import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: "btn-shimmer bg-gold text-navy-dark font-bold hover:shadow-lg",
  secondary: "bg-navy text-white font-semibold hover:bg-navy-dark",
  outline:
    "border-2 border-white text-white font-semibold hover:bg-white hover:text-navy",
  ghost: "text-navy hover:bg-navy/5 font-semibold",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-lg",
  lg: "px-8 py-4 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-300",
        variants[variant],
        sizes[size],
        (disabled || loading) && "opacity-60 pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
