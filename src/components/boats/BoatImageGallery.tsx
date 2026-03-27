"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BoatImageGalleryProps {
  photos: string[];
  name: string;
}

export function BoatImageGallery({ photos, name }: BoatImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden bg-off-white">
        <Image
          src={photos[current]}
          alt={`${name} - Photo ${current + 1}`}
          fill
          className="object-cover"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent((current - 1 + photos.length) % photos.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={() =>
                setCurrent((current + 1) % photos.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                i === current
                  ? "border-teal shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={photo}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
