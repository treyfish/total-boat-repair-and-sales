import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BoatListings } from "@/components/boats/BoatListings";
import { ContactCTA } from "@/components/home/ContactCTA";
import type { Boat } from "@/lib/types";

export const metadata: Metadata = {
  title: "Boats for Sale",
  description:
    "Browse our pre-owned boat inventory. Quality inspected boats at fair prices. Trade-ins welcome, financing available. Old Town, FL.",
};

async function getBoats(): Promise<Boat[]> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase
      .from("boats")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Boat[]) || [];
  } catch {
    return [];
  }
}

export default async function BoatsPage() {
  const boats = await getBoats();

  return (
    <>
      <section className="bg-navy-dark py-20">
        <Container>
          <SectionHeader
            label="Inventory"
            title="Boats for Sale"
            subtitle="Quality pre-owned boats, inspected and ready for the water. Trade-ins welcome."
            light
          />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <BoatListings initialBoats={boats} />
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
