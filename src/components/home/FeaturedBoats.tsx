"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Ship } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Boat } from "@/lib/types";

interface FeaturedBoatsProps {
  boats: Boat[];
}

export function FeaturedBoats({ boats }: FeaturedBoatsProps) {
  if (boats.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <SectionHeader
            label="Inventory"
            title="Boats for Sale"
            subtitle="Quality pre-owned boats inspected and ready for the water."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 bg-off-white rounded-2xl"
          >
            <Ship className="w-16 h-16 text-silver mx-auto mb-4" />
            <p className="text-text-muted text-lg mb-2">
              New inventory coming soon!
            </p>
            <p className="text-text-muted text-sm mb-6">
              We get new boats regularly. Call us to ask about current
              availability.
            </p>
            <a
              href="tel:3525420015"
              className="btn-shimmer inline-flex items-center gap-2 bg-gold text-navy-dark font-bold px-6 py-3 rounded-lg"
            >
              Call for Availability
            </a>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          label="Inventory"
          title="Featured Boats"
          subtitle="Hand-picked boats from our current inventory, inspected and ready for the water."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {boats.slice(0, 3).map((boat, i) => (
            <motion.div
              key={boat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Link
                href={`/boats/${boat.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-silver-light/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={
                      boat.photos[0] || "/images/back-of-boat.jpg"
                    }
                    alt={boat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={boat.status as "available" | "pending" | "sold"}
                    >
                      {boat.status.charAt(0).toUpperCase() +
                        boat.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-navy mb-2 group-hover:text-teal transition-colors">
                    {boat.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal">
                      {formatPrice(boat.price)}
                    </span>
                    {boat.year && (
                      <span className="text-sm text-text-muted">
                        {boat.year}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
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
            href="/boats"
            className="inline-flex items-center gap-2 text-teal font-semibold hover:text-blue transition-colors group"
          >
            View All Inventory
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
