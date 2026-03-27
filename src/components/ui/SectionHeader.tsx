"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  center = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", center && "text-center")}
    >
      {label && (
        <span className="inline-block text-teal font-semibold text-sm tracking-widest uppercase mb-3">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      <div className={cn("glow-line", center && "mx-auto", "mb-5")} />
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl leading-relaxed",
            center && "mx-auto",
            light ? "text-white/70" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
