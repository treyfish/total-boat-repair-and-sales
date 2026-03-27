import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See our work! Before and after boat restorations, shop photos, and more from Total Boat Repair & Sales in Old Town, FL.",
};

const galleryImages = [
  { src: "/images/shop-1.jpg", alt: "Our shop", category: "Shop" },
  { src: "/images/shop-2.jpg", alt: "Shop interior", category: "Shop" },
  { src: "/images/honda-engine.jpg", alt: "Honda engine service", category: "Our Work" },
  { src: "/images/back-of-boat.jpg", alt: "Boat stern detail", category: "Our Work" },
  { src: "/images/gallery/clean-1.jpg", alt: "Detailed clean boat", category: "Detailing" },
  { src: "/images/gallery/clean-2.jpg", alt: "Restored boat hull", category: "Detailing" },
  { src: "/images/gallery/clean-3.jpg", alt: "Polished boat finish", category: "Detailing" },
  { src: "/images/gallery/dirty-2.jpg", alt: "Before restoration", category: "Before" },
  { src: "/images/gallery/dirty-3.jpg", alt: "Before cleaning", category: "Before" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-dark py-20">
        <Container>
          <SectionHeader
            label="Our Work"
            title="Gallery"
            subtitle="From dirty to dazzling. See the quality of our work firsthand."
            light
          />
        </Container>
      </section>

      {/* Before/After */}
      <section className="py-20">
        <Container>
          <SectionHeader
            label="Transformations"
            title="Before & After"
            subtitle="Drag the slider to see the difference."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BeforeAfterSlider
              before="/images/gallery/dirty-2.jpg"
              after="/images/gallery/clean-2.jpg"
              label="Hull Restoration"
            />
            <BeforeAfterSlider
              before="/images/gallery/dirty-3.jpg"
              after="/images/gallery/clean-3.jpg"
              label="Full Detail"
            />
          </div>
        </Container>
      </section>

      {/* Full Gallery */}
      <section className="py-20 bg-off-white">
        <Container>
          <SectionHeader
            label="Browse"
            title="Shop & Work Photos"
          />
          <GalleryGrid images={galleryImages} />
        </Container>
      </section>

      {/* Facebook CTA */}
      <section className="py-16">
        <Container>
          <div className="text-center">
            <p className="text-text-muted mb-4">
              Want to see more? Follow us on Facebook for the latest photos and updates.
            </p>
            <a
              href={BUSINESS.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Follow Us on Facebook
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
