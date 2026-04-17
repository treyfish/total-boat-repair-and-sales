import { BUSINESS } from "@/lib/constants";

export function CredibilityV2() {
  return (
    <section className="v2-creds">
      <div className="v2-container">
        <div className="v2-creds-inner">
          <span className="v2-creds-item">
            <span className="star" aria-hidden>
              ★
            </span>
            <strong>{BUSINESS.googleRating}</strong>
            <span>·</span>
            <span>{BUSINESS.reviewCount} Google reviews</span>
          </span>
          <span className="v2-creds-dot" aria-hidden />
          <span className="v2-creds-item">
            <strong>Honda Marine</strong>
            <span>·</span>
            <span>Authorized Dealer</span>
          </span>
          <span className="v2-creds-dot" aria-hidden />
          <span className="v2-creds-item">
            <span>All brands serviced</span>
          </span>
          <span className="v2-creds-dot" aria-hidden />
          <span className="v2-creds-item">
            <strong>
              {BUSINESS.address.city}, {BUSINESS.address.state}
            </strong>
            <span>·</span>
            <span>Nature Coast</span>
          </span>
        </div>
      </div>
    </section>
  );
}
