"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/logo-no-words.jpg"
            alt="Total Boat Repair & Sales"
            width={64}
            height={64}
            className="rounded-xl mx-auto mb-4"
          />
          <h1 className="font-heading font-bold text-2xl text-white mb-1">
            Admin Login
          </h1>
          <p className="text-white/50 text-sm">
            Sign in to manage your boat listings and messages.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-xl space-y-5"
        >
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="admin@totalboatrepair.com"
            required
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button type="submit" size="lg" loading={loading} className="w-full">
            <Lock className="w-4 h-4" />
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
