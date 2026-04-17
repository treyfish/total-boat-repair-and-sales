import { TESTIMONIALS } from "@/lib/constants";

const picks = [TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[3]];

export function VoicesV2() {
  return (
    <section className="v2-voices">
      <div className="v2-container">
        <div className="v2-voices-head rise">
          <p className="eyebrow">In their words</p>
          <h2 className="display">
            What boaters <em>say about the shop.</em>
          </h2>
        </div>
        <div className="v2-voices-grid" role="list">
          {picks.map((t) => (
            <figure key={t.name} className="v2-voice rise" role="listitem">
              <blockquote className="v2-voice-quote">{t.text}</blockquote>
              <figcaption className="v2-voice-attr">
                <span>{t.name}</span>
                <span>·</span>
                <span>{t.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
