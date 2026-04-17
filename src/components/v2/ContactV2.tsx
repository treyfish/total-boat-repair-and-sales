import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/constants";

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.86 19.86 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactV2() {
  return (
    <section className="v2-contact on-ink">
      <div className="v2-contact-bg grain-overlay" aria-hidden />
      <div className="v2-container v2-contact-grid">
        <div className="v2-contact-left">
          <p className="eyebrow rise">Get in touch</p>
          <h2 className="display rise">
            Bring it <em>in.</em>
          </h2>
          <ul className="v2-contact-list rise">
            <li>
              <a
                href={BUSINESS.phoneHref}
                className="v2-contact-row"
                aria-label={`Call ${BUSINESS.phone}`}
              >
                <IconPhone />
                <span>{BUSINESS.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  BUSINESS.address.full
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="v2-contact-row"
              >
                <IconPin />
                <span>{BUSINESS.address.full}</span>
              </a>
            </li>
            <li>
              <span className="v2-contact-row" style={{ cursor: "default" }}>
                <IconClock />
                <span>
                  Mon–Fri {BUSINESS.hours.weekdays} · Sat–Sun{" "}
                  {BUSINESS.hours.weekends}
                </span>
              </span>
            </li>
          </ul>
          <div className="v2-contact-actions rise">
            <a href={BUSINESS.phoneHref} className="btn btn-primary">
              Call now
            </a>
            <Link href="/contact" className="u-link">
              Get a quote
            </Link>
          </div>
        </div>
        <figure className="v2-contact-figure rise">
          <div className="treated-image">
            <Image
              src="/images/shop-2.jpg"
              alt="Inside the Total Boat Repair & Sales shop"
              width={840}
              height={1050}
              sizes="(min-width: 900px) 420px, 100vw"
              loading="eager"
            />
            <div className="grade" />
          </div>
          <figcaption className="v2-contact-caption">
            <span>Inside the shop</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
