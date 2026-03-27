"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Anchor,
  ChevronRight,
} from "lucide-react";
import { BUSINESS, NAV_LINKS, SERVICES } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy-dark text-white/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo-no-words.jpg"
                alt="Total Boat Repair & Sales"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">
                  Total Boat Repair
                </div>
                <div className="text-xs text-teal font-semibold tracking-wider uppercase">
                  & Sales
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              {BUSINESS.tagline} Authorized Honda Marine dealer serving the
              Nature Coast since 2021. Expert repair, quality boats, and honest
              service.
            </p>
            <a
              href={BUSINESS.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-teal-light transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Follow us on ExternalLink
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-lg mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm hover:text-teal-light transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-teal group-hover:translate-x-0.5 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-white text-lg mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href="/services"
                    className="flex items-center gap-1.5 text-sm hover:text-teal-light transition-colors group"
                  >
                    <Anchor className="w-3 h-3 text-teal" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white text-lg mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-start gap-3 hover:text-teal-light transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-teal shrink-0" />
                  <span className="text-sm">{BUSINESS.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-start gap-3 hover:text-teal-light transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-teal shrink-0" />
                  <span className="text-sm break-all">{BUSINESS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-teal shrink-0" />
                <span className="text-sm">{BUSINESS.address.full}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-teal shrink-0" />
                <div className="text-sm">
                  <div>Mon–Fri: {BUSINESS.hours.weekdays}</div>
                  <div>Sat–Sun: {BUSINESS.hours.weekends}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {BUSINESS.legalName}. All rights
            reserved.
          </p>
          <p className="text-xs text-white/50">
            Authorized Honda Marine Dealer &bull; Licensed & Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
