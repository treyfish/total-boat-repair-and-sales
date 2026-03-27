"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS, BUSINESS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="py-20 bg-off-white">
      <Container>
        <SectionHeader
          label="Reviews"
          title="What Our Customers Say"
          subtitle={`${BUSINESS.googleRating} stars from ${BUSINESS.reviewCount}+ reviews on Google. Real feedback from real boaters.`}
        />

        {/* Staggered layout - not uniform grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 6).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-white rounded-2xl p-7 border border-silver-light/50 hover:shadow-lg transition-all duration-300 ${
                i === 0 ? "lg:translate-y-4" : i === 2 ? "lg:-translate-y-4" : ""
              }`}
            >
              <Quote className="w-8 h-8 text-teal/20 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-navy text-sm">
                    {review.name}
                  </div>
                  <div className="text-xs text-text-muted">{review.date}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3 h-3 fill-gold/30 text-gold/30"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
