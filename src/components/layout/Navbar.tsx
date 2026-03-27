"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Don't show navbar on admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-white py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo-no-words.jpg"
              alt="Total Boat Repair & Sales"
              width={48}
              height={48}
              className={cn(
                "rounded-lg transition-all duration-300",
                isScrolled ? "w-10 h-10" : "w-12 h-12"
              )}
            />
            <div className="hidden sm:block">
              <div
                className={cn(
                  "font-heading font-bold text-navy leading-tight transition-all duration-300",
                  isScrolled ? "text-lg" : "text-xl"
                )}
              >
                Total Boat Repair
              </div>
              <div className="text-xs text-teal font-semibold tracking-wider uppercase">
                & Sales
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                  pathname === link.href
                    ? "text-teal bg-teal/10"
                    : "text-navy hover:text-teal hover:bg-teal/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="btn-shimmer hidden sm:flex items-center gap-2 bg-gold text-navy-dark font-bold text-sm px-5 py-2.5 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-navy hover:text-teal transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-6 pt-20">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg font-heading text-lg font-semibold transition-all",
                    pathname === link.href
                      ? "text-teal bg-teal/10"
                      : "text-navy hover:text-teal hover:bg-teal/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-silver-light">
              <a
                href={BUSINESS.phoneHref}
                className="btn-shimmer flex items-center justify-center gap-2 bg-gold text-navy-dark font-bold px-6 py-3 rounded-lg w-full"
              >
                <Phone className="w-5 h-5" />
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
