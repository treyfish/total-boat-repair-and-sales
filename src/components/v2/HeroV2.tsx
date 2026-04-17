import Image from "next/image";
import { BUSINESS } from "@/lib/constants";

export function HeroV2() {
  return (
    <section className="v2-hero on-ink">
      <div className="v2-hero-bg grain-overlay" aria-hidden />
      <div className="v2-container v2-hero-grid">
        <div className="v2-hero-left">
          <p className="eyebrow hero-rise hero-rise-1">
            Authorized Honda Marine · Est. Old Town, FL
          </p>
          <h1 className="display hero-rise hero-rise-2">
            Your boat,
            <br />
            <em>in expert hands.</em>
          </h1>
          <p className="v2-hero-body hero-rise hero-rise-3">
            A small shop on the Nature Coast that has spent years learning what
            makes an engine sing. Full-service marine repair, pre-owned boats,
            and Honda outboards — looked after with care.
          </p>
          <div className="v2-hero-ctas hero-rise hero-rise-4">
            <a href={BUSINESS.phoneHref} className="btn btn-primary">
              Call {BUSINESS.phone}
            </a>
            <a href="/services" className="btn-text">
              See our services{" "}
              <span aria-hidden style={{ marginLeft: "2px" }}>
                →
              </span>
            </a>
          </div>
        </div>
        <figure className="v2-hero-figure hero-rise hero-rise-2">
          <div className="treated-image ken-burns">
            <Image
              src="/images/shop-1.jpg"
              alt="The Total Boat Repair & Sales shop in Old Town, Florida"
              width={1040}
              height={1300}
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
            />
            <div className="grade" />
          </div>
          <figcaption className="v2-hero-caption">
            <span>The shop</span>
            <span>·</span>
            <span>Old Town, FL</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
