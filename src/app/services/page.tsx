import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { HondaBanner } from "@/components/services/HondaBanner";
import { FAQSection } from "@/components/services/FAQSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service marine repair: engine diagnostics, routine maintenance, winterization, Honda Marine sales, boat detailing, electronics, and more. All brands serviced.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-dark py-20">
        <Container>
          <SectionHeader
            label="Our Services"
            title="Everything Your Boat Needs"
            subtitle="From engine repair to boat sales, maintenance to custom electronics — we're your one-stop marine shop."
            light
          />
        </Container>
      </section>

      {/* Services grid - staggered bento */}
      <section className="py-20 bg-off-white dot-grid">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className={
                  i === 0
                    ? "lg:col-span-2"
                    : i === 3
                    ? "lg:col-span-2"
                    : ""
                }
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  icon={service.icon}
                  index={i}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <HondaBanner />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
