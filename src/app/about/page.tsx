import type { Metadata } from "next";
import Image from "next/image";
import { Award, Clock, Users, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/home/ContactCTA";
import { BUSINESS } from "@/lib/constants";
import { AboutAnimations } from "./AboutAnimations";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Total Boat Repair & Sales — your trusted marine service center in Old Town, FL. Authorized Honda Marine dealer, locally owned, all brands serviced.",
};

const values = [
  {
    iconName: "Award" as const,
    title: "Certified Expertise",
    description:
      "Factory-trained Honda Marine technicians with decades of combined experience across all major outboard brands.",
  },
  {
    iconName: "Shield" as const,
    title: "Honest Pricing",
    description:
      "Free estimates, transparent quotes, and no surprise charges. We treat your wallet the way we'd want ours treated.",
  },
  {
    iconName: "Clock" as const,
    title: "Fast Turnaround",
    description:
      "We know you'd rather be on the water. We prioritize quick service without cutting corners on quality.",
  },
  {
    iconName: "Heart" as const,
    title: "Community Focused",
    description:
      "Locally owned and operated, serving the Nature Coast boating community. Your neighbors are our customers.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero - Split screen */}
      <section className="relative bg-navy-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-teal font-semibold text-sm tracking-widest uppercase mb-4">
                About Us
              </span>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Built on Trust,{" "}
                <span className="gradient-text">Driven by Passion</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Total Boat Repair & Sales started with a simple idea: give
                boaters an honest, reliable shop they can count on. Located on
                US Highway 19 in Old Town, Florida, we&apos;ve been serving the
                Nature Coast boating community since 2021.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-heading font-bold text-3xl text-teal">5+</div>
                  <div className="text-xs text-white/50">Years Experience</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="font-heading font-bold text-3xl text-gold">{BUSINESS.reviewCount}+</div>
                  <div className="text-xs text-white/50">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="font-heading font-bold text-3xl text-cyan">All</div>
                  <div className="text-xs text-white/50">Brands Serviced</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/shop-1.jpg"
                  alt="Total Boat Repair & Sales shop"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Offset accent card */}
              <div className="absolute -bottom-6 -left-6 bg-teal text-white rounded-xl p-5 shadow-xl hidden lg:block">
                <Award className="w-8 h-8 mb-2" />
                <div className="font-heading font-bold text-lg">Honda Marine</div>
                <div className="text-sm text-white/80">Authorized Dealer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <Container>
          <SectionHeader
            label="Our Story"
            title="From Passion to Purpose"
          />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-text-muted leading-relaxed mb-6">
              What started as Total Boat Care grew into something bigger.
              Owner Tyler Wright and the team saw that boaters in the
              Suwannee and Levy County area needed more than just quick fixes —
              they needed a full-service marine partner they could trust.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              In 2024, Total Boat Repair & Sales, LLC was officially formed,
              expanding our services to include pre-owned boat sales, Honda
              Marine dealership, and a wider range of cosmetic and electronic
              services. Our mission stayed the same: honest work, fair prices,
              and getting you back on the water.
            </p>
            <p className="text-text-muted leading-relaxed">
              Today, we&apos;re proud to be the go-to marine shop on the Nature
              Coast. Whether you need a 100-hour service, a fiberglass repair,
              or your next fishing boat — we&apos;re here for you.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 bg-off-white">
        <Container>
          <SectionHeader
            label="Our Values"
            title="Why Boaters Choose Us"
          />
          <AboutAnimations values={values} />
        </Container>
      </section>

      {/* Team */}
      <section className="py-20">
        <Container>
          <SectionHeader
            label="The Team"
            title="Meet the Crew"
            subtitle="The people behind the wrenches."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              {
                name: "Tyler Wright",
                role: "Owner / Manager",
                description:
                  "Founded Total Boat Care and built it into the full-service shop it is today. Tyler oversees operations and ensures every job meets his standards.",
              },
              {
                name: "Dennis",
                role: "Co-Owner / Sales & Service",
                description:
                  "The face customers know and trust. Dennis handles sales, customer relationships, and makes sure everyone leaves happy.",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 border border-silver-light/50 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-teal to-cyan rounded-full flex items-center justify-center mx-auto mb-5">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-teal font-semibold text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section className="py-20 bg-navy-dark">
        <Container>
          <SectionHeader
            label="Find Us"
            title="Visit Our Shop"
            light
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-teal shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Address</h3>
                  <p className="text-white/70">{BUSINESS.address.full}</p>
                  <p className="text-white/50 text-sm mt-1">
                    On US Highway 19 — easy access from the Suwannee River area
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-teal shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Phone</h3>
                  <a href={BUSINESS.phoneHref} className="text-white/70 hover:text-teal-light transition-colors">
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-teal shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Hours</h3>
                  <p className="text-white/70">Mon–Fri: {BUSINESS.hours.weekdays}</p>
                  <p className="text-white/70">Sat–Sun: {BUSINESS.hours.weekends}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-80">
              <iframe
                src={BUSINESS.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Total Boat Repair & Sales location"
              />
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
