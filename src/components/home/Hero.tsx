"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, ChevronRight, Star, Users, Award, Wrench } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const hasDecimal = target % 1 !== 0;
      el.textContent = (hasDecimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix;
    }, 30);
    return () => clearInterval(timer);
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden wave-divider">
      {/* Background with diagonal clip */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/shop-1.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/95 via-navy/90 to-navy-dark/80" />
        {/* Animated water ripple circles */}
        <div className="absolute bottom-20 left-1/4 w-96 h-96 rounded-full border border-teal/10 animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-40 right-1/3 w-64 h-64 rounded-full border border-cyan/10 animate-ping" style={{ animationDuration: "6s" }} />
        <div className="absolute top-1/3 right-10 w-48 h-48 rounded-full border border-teal-light/10 animate-ping" style={{ animationDuration: "5s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          {/* Honda badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <Award className="w-4 h-4 text-gold" />
            <span className="text-sm text-white/90 font-semibold">
              Authorized Honda Marine Dealer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
          >
            Your Boat Deserves{" "}
            <span className="gradient-text">Expert Care</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
          >
            Full-service marine repair, pre-owned boat sales, and Honda
            outboard motors. Trusted by boaters across Florida&apos;s Nature Coast.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={BUSINESS.phoneHref}
              className="btn-shimmer inline-flex items-center gap-2 bg-gold text-navy-dark font-bold px-8 py-4 rounded-xl text-base"
            >
              <Phone className="w-5 h-5" />
              Call {BUSINESS.phone}
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-navy transition-all duration-300 text-base"
            >
              Our Services
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Star,
              value: <AnimatedCounter target={BUSINESS.googleRating} suffix="" />,
              display: `${BUSINESS.googleRating}`,
              label: "Google Rating",
              accent: "text-gold",
            },
            {
              icon: Users,
              value: <AnimatedCounter target={BUSINESS.reviewCount} suffix="+" />,
              label: "Happy Customers",
              accent: "text-teal-light",
            },
            {
              icon: Award,
              value: "Honda",
              label: "Authorized Dealer",
              accent: "text-cyan",
            },
            {
              icon: Wrench,
              value: "All Brands",
              label: "Serviced",
              accent: "text-teal",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 text-center"
            >
              <stat.icon className={`w-6 h-6 ${stat.accent} mx-auto mb-2`} />
              <div className="font-heading font-bold text-2xl text-white">
                {typeof stat.value === "string" ? stat.value : stat.value}
              </div>
              <div className="text-xs text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
