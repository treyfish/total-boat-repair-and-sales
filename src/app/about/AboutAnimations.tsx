"use client";

import { motion } from "framer-motion";
import { Award, Clock, Heart, Shield, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Award, Clock, Heart, Shield };

interface Value {
  iconName: string;
  title: string;
  description: string;
}

export function AboutAnimations({ values }: { values: Value[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((value, i) => {
        const Icon = iconMap[value.iconName] || Award;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group bg-white rounded-2xl p-8 border border-silver-light/50 hover:border-teal/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-cyan flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-heading font-semibold text-xl text-navy mb-3">
              {value.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
