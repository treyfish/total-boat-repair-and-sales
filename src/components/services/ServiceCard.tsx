"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Settings,
  Snowflake,
  Award,
  Ship,
  Package,
  Paintbrush,
  Monitor,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Settings,
  Snowflake,
  Award,
  Ship,
  Package,
  Paintbrush,
  Monitor,
};

interface ServiceCardProps {
  title: string;
  description: string;
  features: readonly string[];
  icon: string;
  index: number;
}

export function ServiceCard({
  title,
  description,
  features,
  icon,
  index,
}: ServiceCardProps) {
  const Icon = iconMap[icon] || Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative bg-white rounded-2xl p-7 border border-silver-light/50 hover:border-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Glow top border on hover */}
      <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-teal to-cyan rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-cyan flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="font-heading font-semibold text-xl text-navy mb-3">
        {title}
      </h3>

      <p className="text-text-muted text-sm leading-relaxed mb-5">
        {description}
      </p>

      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-1.5" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
