"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench,
  Settings,
  Award,
  Ship,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const previewServices = [
  {
    icon: Wrench,
    title: "Engine Repair & Diagnostics",
    description:
      "Expert diagnostics and repair for all outboard motor brands. From fuel system issues to complete rebuilds.",
    color: "from-teal to-cyan",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Settings,
    title: "Routine Maintenance",
    description:
      "Oil changes, 100-hour service, impellers, and more. Keep your engine running strong.",
    color: "from-blue to-teal",
    span: "",
  },
  {
    icon: Award,
    title: "Honda Marine Dealer",
    description:
      "New Honda outboards, factory-trained service, and genuine OEM parts.",
    color: "from-gold to-gold-light",
    span: "",
  },
  {
    icon: Ship,
    title: "Pre-Owned Boats",
    description:
      "Quality inspected boats at fair prices. Trade-ins welcome, financing available.",
    color: "from-navy to-blue",
    span: "md:col-span-2",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 bg-off-white dot-grid">
      <Container>
        <SectionHeader
          label="What We Do"
          title="Full-Service Marine Shop"
          subtitle="From routine maintenance to major repairs, boat sales to custom electronics — we handle it all under one roof."
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {previewServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative bg-white rounded-2xl p-7 border border-silver-light/50 hover:border-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${service.span}`}
            >
              {/* Gradient top line */}
              <div
                className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${service.color} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-navy mb-3">
                {service.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-teal font-semibold hover:text-blue transition-colors group"
          >
            View All Services
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
