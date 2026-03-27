import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, Ship } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, getBoatTitle } from "@/lib/utils";
import { BUSINESS } from "@/lib/constants";
import { BoatImageGallery } from "@/components/boats/BoatImageGallery";
import type { Boat } from "@/lib/types";

async function getBoat(id: string): Promise<Boat | null> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase.from("boats").select("*").eq("id", id).single();
    return data as Boat | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const boat = await getBoat(id);
  if (!boat) return { title: "Boat Not Found" };
  return {
    title: getBoatTitle(boat),
    description: boat.description || `${getBoatTitle(boat)} for sale at Total Boat Repair & Sales.`,
  };
}

export default async function BoatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boat = await getBoat(id);

  if (!boat) {
    notFound();
  }

  const specs = [
    { label: "Year", value: boat.year },
    { label: "Make", value: boat.make },
    { label: "Model", value: boat.model },
    { label: "Length", value: boat.length_ft ? `${boat.length_ft} ft` : null },
    { label: "Engine", value: boat.engine_make },
    { label: "Horsepower", value: boat.engine_hp ? `${boat.engine_hp} HP` : null },
    { label: "Hull", value: boat.hull_material },
    { label: "Fuel", value: boat.fuel_type },
  ].filter((s) => s.value);

  return (
    <>
      {/* Back link */}
      <section className="bg-off-white py-4">
        <Container>
          <Link
            href="/boats"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Inventory
          </Link>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Photo gallery */}
              {boat.photos.length > 0 ? (
                <BoatImageGallery photos={boat.photos} name={boat.name} />
              ) : (
                <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden bg-off-white flex items-center justify-center">
                  <Ship className="w-20 h-20 text-silver" />
                </div>
              )}

              {/* Title & price */}
              <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-navy">
                      {boat.name}
                    </h1>
                    <Badge variant={boat.status as "available" | "pending" | "sold"}>
                      {boat.status.charAt(0).toUpperCase() + boat.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-text-muted">
                    {[boat.year, boat.make, boat.model].filter(Boolean).join(" ")}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-heading font-bold text-3xl text-teal">
                    {formatPrice(boat.price)}
                  </div>
                </div>
              </div>

              {/* Description */}
              {boat.description && (
                <div className="mt-8">
                  <h2 className="font-heading font-semibold text-xl text-navy mb-3">
                    Description
                  </h2>
                  <p className="text-text-muted leading-relaxed whitespace-pre-line">
                    {boat.description}
                  </p>
                </div>
              )}

              {/* Specs */}
              {specs.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-heading font-semibold text-xl text-navy mb-4">
                    Specifications
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="glass bg-off-white rounded-xl p-4 text-center border border-silver-light/50"
                      >
                        <div className="text-xs text-text-muted mb-1">
                          {spec.label}
                        </div>
                        <div className="font-semibold text-navy">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky CTA sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-navy-dark rounded-2xl p-8 text-white">
                <h3 className="font-heading font-semibold text-xl mb-2">
                  Interested in This Boat?
                </h3>
                <p className="text-white/60 text-sm mb-8">
                  Call us or send a message. We&apos;re happy to answer questions
                  or schedule a viewing.
                </p>
                <div className="space-y-4">
                  <a
                    href={BUSINESS.phoneHref}
                    className="btn-shimmer flex items-center justify-center gap-2 bg-gold text-navy-dark font-bold px-6 py-4 rounded-xl w-full"
                  >
                    <Phone className="w-5 h-5" />
                    Call {BUSINESS.phone}
                  </a>
                  <a
                    href={`mailto:${BUSINESS.email}?subject=Inquiry about ${encodeURIComponent(boat.name)}`}
                    className="flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-4 rounded-xl w-full hover:bg-white hover:text-navy transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    Email Us
                  </a>
                  <Link
                    href={`/contact?boat=${boat.id}`}
                    className="block text-center text-sm text-teal-light hover:text-white transition-colors mt-2"
                  >
                    Or send us a message through our contact form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
