"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Ship, Filter } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Boat } from "@/lib/types";

interface BoatListingsProps {
  initialBoats: Boat[];
}

export function BoatListings({ initialBoats }: BoatListingsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = initialBoats
    .filter((b) => statusFilter === "all" || b.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "year") return (b.year || 0) - (a.year || 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  if (initialBoats.length === 0) {
    return (
      <div className="text-center py-16">
        <Ship className="w-20 h-20 text-silver mx-auto mb-6" />
        <h3 className="font-heading font-semibold text-2xl text-navy mb-3">
          No Boats Listed Yet
        </h3>
        <p className="text-text-muted max-w-md mx-auto mb-6">
          We get new inventory regularly. Call us to ask about current
          availability or to be notified when new boats arrive.
        </p>
        <a
          href="tel:3525420015"
          className="btn-shimmer inline-flex items-center gap-2 bg-gold text-navy-dark font-bold px-6 py-3 rounded-lg"
        >
          Call for Availability
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-4 mb-10 p-4 bg-off-white rounded-xl">
        <Filter className="w-5 h-5 text-text-muted" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-silver-light bg-white text-sm focus:outline-none focus:border-teal"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-silver-light bg-white text-sm focus:outline-none focus:border-teal"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="year">Year: Newest</option>
        </select>
        <span className="text-sm text-text-muted ml-auto">
          {filtered.length} boat{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filtered.map((boat, i) => (
          <motion.div
            key={boat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Link
              href={`/boats/${boat.id}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-silver-light/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={boat.photos[0] || "/images/back-of-boat.jpg"}
                  alt={boat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge variant={boat.status as "available" | "pending" | "sold"}>
                    {boat.status.charAt(0).toUpperCase() + boat.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-navy mb-2 group-hover:text-teal transition-colors">
                  {boat.name}
                </h3>
                <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
                  {boat.year && <span>{boat.year}</span>}
                  {boat.make && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-silver" />
                      <span>{boat.make}</span>
                    </>
                  )}
                  {boat.model && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-silver" />
                      <span>{boat.model}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal">
                    {formatPrice(boat.price)}
                  </span>
                  {boat.engine_hp && (
                    <span className="text-xs text-text-muted">
                      {boat.engine_hp} HP
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
