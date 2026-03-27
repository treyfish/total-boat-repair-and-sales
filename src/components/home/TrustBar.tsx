"use client";

import { motion } from "framer-motion";
import { Award, Wrench, ShieldCheck, Ship, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const trustItems = [
  { icon: Award, text: "Honda Marine Authorized" },
  { icon: Wrench, text: "All Brands Serviced" },
  { icon: ShieldCheck, text: "Licensed & Insured" },
  { icon: Ship, text: "Pre-Owned Boat Sales" },
  { icon: Phone, text: BUSINESS.phone },
];

export function TrustBar() {
  return (
    <section className="bg-navy py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-2.5 text-white/90"
            >
              <item.icon className="w-5 h-5 text-teal-light shrink-0" />
              <span className="text-sm font-semibold whitespace-nowrap">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
