"use client";

import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold" />
      <div className="absolute inset-0 bg-[url('/images/back-of-boat.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy-dark mb-4">
            Ready to Get Back on the Water?
          </h2>
          <p className="text-navy/70 text-lg mb-8 max-w-xl mx-auto">
            Call us today for a free estimate or stop by the shop. We&apos;re here to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 bg-navy-dark text-white font-bold px-8 py-4 rounded-xl hover:bg-navy transition-colors text-base"
            >
              <Phone className="w-5 h-5" />
              Call {BUSINESS.phone}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address.full)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-navy-dark font-bold px-8 py-4 rounded-xl hover:bg-off-white transition-colors text-base"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
