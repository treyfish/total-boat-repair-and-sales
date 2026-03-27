"use client";

import { Phone, Mail, Clock, MapPin, ExternalLink } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="bg-navy-dark text-white/80 text-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-10">
        <div className="flex items-center gap-6">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 hover:text-teal-light transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{BUSINESS.phone}</span>
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="flex items-center gap-1.5 hover:text-teal-light transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{BUSINESS.email}</span>
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{BUSINESS.address.full}</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Mon–Fri: {BUSINESS.hours.weekdays}</span>
          </span>
          <a
            href={BUSINESS.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-light transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
