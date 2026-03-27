"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, ChevronDown, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { ContactSubmission } from "@/lib/types";

interface SubmissionTableProps {
  submissions: ContactSubmission[];
}

export function SubmissionTable({ submissions }: SubmissionTableProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  async function toggleRead(id: string, currentRead: boolean) {
    const supabase = createClient();
    await supabase
      .from("contact_submissions")
      .update({ is_read: !currentRead })
      .eq("id", id);
    router.refresh();
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-silver-light/50">
        <MessageSquare className="w-16 h-16 text-silver mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-xl text-navy mb-2">
          No Messages Yet
        </h3>
        <p className="text-text-muted">
          Contact form submissions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((sub) => (
        <div
          key={sub.id}
          className={cn(
            "bg-white rounded-xl border transition-all",
            sub.is_read
              ? "border-silver-light/50"
              : "border-teal/30 shadow-sm"
          )}
        >
          <button
            onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
            className="w-full flex items-center gap-4 p-5 text-left hover:bg-off-white/50 transition-colors rounded-xl"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                sub.is_read ? "bg-off-white" : "bg-teal/10"
              )}
            >
              {sub.is_read ? (
                <MailOpen className="w-5 h-5 text-text-muted" />
              ) : (
                <Mail className="w-5 h-5 text-teal" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-0.5">
                <span
                  className={cn(
                    "font-semibold truncate",
                    sub.is_read ? "text-text-muted" : "text-navy"
                  )}
                >
                  {sub.name}
                </span>
                {sub.service_type && (
                  <span className="text-xs bg-off-white text-text-muted px-2 py-0.5 rounded-full shrink-0">
                    {sub.service_type}
                  </span>
                )}
              </div>
              <div className="text-sm text-text-muted truncate">
                {sub.message}
              </div>
            </div>
            <div className="text-xs text-text-muted shrink-0 hidden sm:block">
              {formatDate(sub.created_at)}
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-text-muted shrink-0 transition-transform",
                expanded === sub.id && "rotate-180"
              )}
            />
          </button>

          {expanded === sub.id && (
            <div className="px-5 pb-5 border-t border-silver-light/50">
              <div className="pt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-text-muted">Email: </span>
                    <a
                      href={`mailto:${sub.email}`}
                      className="text-teal hover:underline"
                    >
                      {sub.email}
                    </a>
                  </div>
                  {sub.phone && (
                    <div>
                      <span className="text-text-muted">Phone: </span>
                      <a
                        href={`tel:${sub.phone}`}
                        className="text-teal hover:underline"
                      >
                        {sub.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="text-text-muted">Date: </span>
                    <span>{formatDate(sub.created_at)}</span>
                  </div>
                </div>
                <div className="bg-off-white rounded-lg p-4 text-sm text-text whitespace-pre-line">
                  {sub.message}
                </div>
                <button
                  onClick={() => toggleRead(sub.id, sub.is_read)}
                  className="text-sm text-teal hover:text-blue font-semibold transition-colors"
                >
                  Mark as {sub.is_read ? "unread" : "read"}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
