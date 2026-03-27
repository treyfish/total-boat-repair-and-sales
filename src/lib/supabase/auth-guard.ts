import { redirect } from "next/navigation";
import { createClient } from "./server";

/**
 * Call at the top of any admin server page/component to enforce auth.
 * Redirects to /admin/login if not authenticated.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
