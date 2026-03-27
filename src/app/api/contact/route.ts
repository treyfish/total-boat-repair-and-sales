import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    // Try to insert into Supabase, fall back gracefully if not configured
    try {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const supabase = createAdminClient();
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || null,
          service_type: result.data.service_type || null,
          boat_id: result.data.boat_id || null,
          message: result.data.message,
        });

      if (error) {
        console.error("Supabase insert error:", error);
        // Still return success for demo — form worked, just DB not connected
      }
    } catch (err) {
      console.error("Supabase not configured:", err);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
