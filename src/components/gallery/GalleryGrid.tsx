"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LightboxModal } from "./LightboxModal";

interface GalleryGridProps {
  images: { src: string; alt: string; category: string }[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))];
  const filtered =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              filter === cat
                ? "bg-teal text-white shadow-md"
                : "bg-white text-text-muted border border-silver-light hover:border-teal/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {filtered.map((image, i) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => setLightboxIndex(images.indexOf(image))}
          >
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-semibold">
                  {image.alt}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <LightboxModal
          images={images.map((img) => img.src)}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
