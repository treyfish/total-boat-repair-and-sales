import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./v2.css";
import { HeroV2 } from "@/components/v2/HeroV2";
import { CredibilityV2 } from "@/components/v2/CredibilityV2";
import { ServicesV2 } from "@/components/v2/ServicesV2";
import { FeaturedBoatsV2 } from "@/components/v2/FeaturedBoatsV2";
import { VoicesV2 } from "@/components/v2/VoicesV2";
import { ContactV2 } from "@/components/v2/ContactV2";
import type { Boat } from "@/lib/types";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-v2-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v2-body",
  display: "swap",
});

async function getFeaturedBoats(): Promise<Boat[]> {
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
    return (data as Boat[]) || [];
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Editorial Preview (v2) | Total Boat Repair & Sales",
  description: "Editorial redesign preview of the Total Boat Repair & Sales homepage.",
};

export default async function V2HomePage() {
  const boats = await getFeaturedBoats();

  return (
    <div className={`v2-root ${fraunces.variable} ${inter.variable}`}>
      <HeroV2 />
      <CredibilityV2 />
      <ServicesV2 />
      <FeaturedBoatsV2 boats={boats} />
      <VoicesV2 />
      <ContactV2 />
    </div>
  );
}
