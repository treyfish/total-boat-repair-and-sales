import { AdminShell } from "@/components/admin/AdminShell";
import { SubmissionTable } from "@/components/admin/SubmissionTable";
import type { ContactSubmission } from "@/lib/types";

async function getSubmissions(): Promise<ContactSubmission[]> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as ContactSubmission[]) || [];
  } catch {
    return [];
  }
}

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-navy mb-1">
          Contact Messages
        </h1>
        <p className="text-text-muted text-sm">
          {submissions.length} total message{submissions.length !== 1 ? "s" : ""}.
          {submissions.filter((s) => !s.is_read).length > 0 &&
            ` ${submissions.filter((s) => !s.is_read).length} unread.`}
        </p>
      </div>

      <SubmissionTable submissions={submissions} />
    </AdminShell>
  );
}
