"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Wrench, Package, Settings } from "lucide-react";

const badges = [
  { icon: Award, label: "Factory Authorized" },
  { icon: Wrench, label: "Trained Technicians" },
  { icon: Package, label: "Genuine OEM Parts" },
  { icon: ShieldCheck, label: "Warranty Service" },
  { icon: Settings, label: "Expert Installation" },
];

export function HondaBanner() {
  return (
    <section className="py-20 bg-navy-dark relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-3">
              Authorized Dealer
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-5">
              Honda Marine{" "}
              <span className="gradient-text">Sales & Service</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              As an authorized Honda Marine dealer, we offer new outboard motors,
              factory-trained service, and genuine Honda OEM parts. Honda&apos;s
              legendary reliability backed by local expertise you can trust.
            </p>
            <a
              href="tel:3525420015"
              className="btn-shimmer inline-flex items-center gap-2 bg-gold text-navy-dark font-bold px-6 py-3 rounded-lg"
            >
              Ask About Honda Motors
            </a>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass rounded-xl p-5 text-center hover:bg-white/10 transition-colors"
              >
                <badge.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <span className="text-white text-xs font-semibold">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
