import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/constants";
import { formatPrice, getBoatTitle } from "@/lib/utils";
import type { Boat } from "@/lib/types";

interface Props {
  boats: Boat[];
}

function BoatCard({ boat, lead = false }: { boat: Boat; lead?: boolean }) {
  const photo = boat.photos[0] || "/images/back-of-boat.jpg";
  const title = getBoatTitle(boat);

  if (lead) {
    return (
      <div className="v2-boats-lead rise">
        <Link
          href={`/boats/${boat.id}`}
          className="v2-boat-lead-figure"
          aria-label={title}
        >
          <div className="treated-image">
            <Image
              src={photo}
              alt={title}
              width={1200}
              height={825}
              sizes="(min-width: 900px) 60vw, 100vw"
              loading="eager"
            />
            <div className="grade" />
          </div>
        </Link>
        <div className="v2-boat-caption">
          <p className="eyebrow">Featured · For Sale</p>
          <h3 className="v2-boat-name">{title}</h3>
          <div className="v2-boat-meta">
            <span className="v2-boat-price">{formatPrice(boat.price)}</span>
            {boat.year && <span className="v2-boat-year">Year {boat.year}</span>}
            {boat.length_ft && (
              <span className="v2-boat-year">{boat.length_ft} ft</span>
            )}
          </div>
          {boat.description && (
            <p className="v2-boat-desc">{boat.description.slice(0, 140)}</p>
          )}
          <Link href={`/boats/${boat.id}`} className="btn-text">
            View this boat{" "}
            <span aria-hidden style={{ marginLeft: "2px" }}>
              →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/boats/${boat.id}`} className="v2-boat-card rise">
      <div className="treated-image">
        <Image
          src={photo}
          alt={title}
          width={800}
          height={600}
          sizes="(min-width: 900px) 40vw, 100vw"
        />
        <div className="grade" />
      </div>
      <h3 className="v2-boat-name">{title}</h3>
      <div className="v2-boat-meta">
        <span className="v2-boat-price">{formatPrice(boat.price)}</span>
        {boat.year && <span className="v2-boat-year">Year {boat.year}</span>}
      </div>
    </Link>
  );
}

export function FeaturedBoatsV2({ boats }: Props) {
  return (
    <section className="v2-boats">
      <div className="v2-container">
        <div className="v2-boats-head rise">
          <div>
            <p className="eyebrow eyebrow-muted">The Inventory</p>
            <h2 className="display">
              Currently <em>on the lot.</em>
            </h2>
          </div>
          <Link href="/boats" className="btn-text">
            Full inventory{" "}
            <span aria-hidden style={{ marginLeft: "2px" }}>
              →
            </span>
          </Link>
        </div>

        {boats.length === 0 ? (
          <div className="v2-boats-empty rise">
            <p className="eyebrow">Inventory</p>
            <h3 className="display">
              Inventory <em>refreshes often.</em>
            </h3>
            <p>
              New boats come through the shop all the time. Give us a call for
              what&rsquo;s on the lot today.
            </p>
            <a href={BUSINESS.phoneHref} className="btn btn-primary">
              Call {BUSINESS.phone}
            </a>
          </div>
        ) : (
          <>
            <BoatCard boat={boats[0]} lead />
            {boats.length > 1 && (
              <div className="v2-boats-secondary">
                {boats.slice(1, 3).map((b) => (
                  <BoatCard key={b.id} boat={b} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
