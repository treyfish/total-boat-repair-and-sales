import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Total Boat Repair & Sales. Call (352) 542-0015, email us, or fill out our contact form. Located at 25771 SE Highway 19, Old Town, FL.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-dark py-20">
        <Container>
          <SectionHeader
            label="Get in Touch"
            title="Contact Us"
            subtitle="Have a question, need a quote, or ready to schedule service? We'd love to hear from you."
            light
          />
        </Container>
      </section>

      {/* Contact section - asymmetric layout */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form - takes more space */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 border border-silver-light/50 shadow-sm relative">
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-teal to-cyan rounded-b-full" />
              <h2 className="font-heading font-semibold text-2xl text-navy mb-2">
                Send Us a Message
              </h2>
              <p className="text-text-muted text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you within one business day.
              </p>
              <ContactForm />
            </div>

            {/* Info panel - dark sidebar */}
            <div className="lg:col-span-2 bg-navy-dark rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full border border-teal/10" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full border border-cyan/10" />

              <h3 className="font-heading font-semibold text-xl mb-8 relative z-10">
                Contact Information
              </h3>

              <div className="space-y-7 relative z-10">
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-start gap-4 group hover:text-teal-light transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-teal/20 flex items-center justify-center shrink-0 group-hover:bg-teal/30 transition-colors">
                    <Phone className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-0.5">Phone</div>
                    <div className="font-semibold">{BUSINESS.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-start gap-4 group hover:text-teal-light transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-teal/20 flex items-center justify-center shrink-0 group-hover:bg-teal/30 transition-colors">
                    <Mail className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-0.5">Email</div>
                    <div className="font-semibold text-sm break-all">
                      {BUSINESS.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-teal/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-0.5">Address</div>
                    <div className="font-semibold text-sm">
                      {BUSINESS.address.full}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-teal/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-0.5">Hours</div>
                    <div className="font-semibold text-sm">
                      Mon–Fri: {BUSINESS.hours.weekdays}
                    </div>
                    <div className="text-sm text-white/60">
                      Sat–Sun: {BUSINESS.hours.weekends}
                    </div>
                  </div>
                </div>

                <a
                  href={BUSINESS.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:text-teal-light transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-teal/20 flex items-center justify-center shrink-0 group-hover:bg-teal/30 transition-colors">
                    <ExternalLink className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-0.5">Social</div>
                    <div className="font-semibold text-sm">
                      Follow us on ExternalLink
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="pb-20">
        <Container>
          <div className="rounded-2xl overflow-hidden shadow-lg h-96">
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
        </Container>
      </section>
    </>
  );
}
