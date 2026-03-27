import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedBoats } from "@/components/home/FeaturedBoats";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactCTA } from "@/components/home/ContactCTA";
import { BUSINESS } from "@/lib/constants";

// For demo: featured boats will come from Supabase once connected.
// Until then, show the empty state.
async function getFeaturedBoats() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase
      .from("boats")
      .select("*")
      .eq("featured", true)
      .eq("status", "available")
      .order("created_at", { ascending: false })
      .limit(3);
    return data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredBoats = await getFeaturedBoats();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    openingHours: "Mo-Fr 08:00-17:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.googleRating,
      reviewCount: BUSINESS.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <FeaturedBoats boats={featuredBoats} />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
