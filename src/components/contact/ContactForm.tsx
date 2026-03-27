"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { contactFormSchema } from "@/lib/validations";

const serviceOptions = [
  { value: "", label: "Select a service (optional)" },
  { value: "Repair", label: "Engine Repair & Diagnostics" },
  { value: "Maintenance", label: "Routine Maintenance" },
  { value: "Honda", label: "Honda Marine Sales/Service" },
  { value: "Boat Inquiry", label: "Boat Sales Inquiry" },
  { value: "Cosmetic", label: "Cosmetic & Restoration" },
  { value: "Electronics", label: "Marine Electronics" },
  { value: "General", label: "General Question" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service_type: formData.get("service_type") as string,
      message: formData.get("message") as string,
    };

    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (path) fieldErrors[String(path)] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center"
      >
        <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-xl text-navy mb-2">
          Message Sent!
        </h3>
        <p className="text-text-muted">
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-teal font-semibold text-sm hover:text-blue transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="name"
          name="name"
          label="Full Name"
          placeholder="John Smith"
          required
          error={errors.name}
        />
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          required
          error={errors.email}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="phone"
          name="phone"
          label="Phone (optional)"
          type="tel"
          placeholder="(352) 555-0100"
          error={errors.phone}
        />
        <Select
          id="service_type"
          name="service_type"
          label="Service Type"
          options={serviceOptions}
          error={errors.service_type}
        />
      </div>
      <Textarea
        id="message"
        name="message"
        label="Message"
        placeholder="Tell us about your boat, what service you need, or any questions you have..."
        rows={5}
        required
        error={errors.message}
      />

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      <Button type="submit" size="lg" loading={status === "loading"}>
        <Send className="w-4 h-4" />
        Send Message
      </Button>
    </form>
  );
}
