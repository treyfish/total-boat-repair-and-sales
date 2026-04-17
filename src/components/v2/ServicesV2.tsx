import Link from "next/link";

const services = [
  {
    num: "01",
    title: "Engine Repair & Diagnostics",
    desc: "Fuel systems, carburetors, electrical — all outboard brands, fixed right the first time.",
  },
  {
    num: "02",
    title: "Routine Maintenance",
    desc: "Oil, impellers, 100-hour service. Keep your engine running, season after season.",
  },
  {
    num: "03",
    title: "Honda Marine Dealer",
    desc: "New Honda outboards, factory-trained technicians, genuine OEM parts in stock.",
  },
  {
    num: "04",
    title: "Pre-Owned Boats",
    desc: "Quality-inspected inventory, honest condition disclosures, trade-ins welcome.",
  },
];

function Arrow() {
  return (
    <svg
      className="v2-services-arrow"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 11h14m0 0l-5-5m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServicesV2() {
  return (
    <section className="v2-services">
      <div className="v2-container">
        <div className="v2-services-grid">
          <div className="v2-services-intro">
            <p className="eyebrow rise">Services</p>
            <h2 className="display rise">
              The whole boat,
              <br />
              <em>handled here.</em>
            </h2>
            <p className="body-lede body-muted rise">
              From routine maintenance to major repairs, boat sales to marine
              electronics — a full-service shop under one roof, run by people
              who have spent their lives on the water.
            </p>
            <Link href="/services" className="btn-text rise" style={{ alignSelf: "flex-start" }}>
              All services{" "}
              <span aria-hidden style={{ marginLeft: "2px" }}>
                →
              </span>
            </Link>
          </div>
          <ul className="v2-services-list">
            {services.map((s) => (
              <li key={s.num}>
                <Link href="/services" className="v2-services-item rise">
                  <span className="v2-services-number">{s.num}</span>
                  <span className="v2-services-body">
                    <span className="v2-services-title">{s.title}</span>
                    <span className="v2-services-desc">{s.desc}</span>
                  </span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
