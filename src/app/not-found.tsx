import Link from "next/link";
import { Anchor } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFoundPage() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center">
          <Anchor className="w-20 h-20 text-silver mx-auto mb-6" />
          <h1 className="font-heading font-bold text-6xl text-navy mb-4">
            404
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
            Looks like this page drifted out to sea. Let&apos;s get you back on
            course.
          </p>
          <Link
            href="/"
            className="btn-shimmer inline-flex items-center gap-2 bg-gold text-navy-dark font-bold px-6 py-3 rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
