# Homepage V2 — Editorial Nautical Rebuild

**Date:** 2026-04-17
**Status:** Design approved, pending spec review
**Scope:** Homepage only, mounted at `/v2`, for side-by-side comparison with existing `/`

## Purpose

Rebuild the Total Boat Repair & Sales homepage using the Superpowers skills workflow
(brainstorming → frontend-design → verification), then compare it to the existing `/`
homepage (built pre-skills) to see whether the skills produce better design output.

The existing `/` remains untouched. The rebuild lives at `/v2` so both can be viewed
side-by-side on localhost. If the rebuild is worse, it is discarded with no impact on
the live site.

## Concept: "The Shop, in Focus"

An editorial marine-service site that feels like a well-made trade magazine: confident
typography, photography that has been treated (not just dropped in), generous air,
restrained gold accents. Positions Total Boat Repair as *the expert you bring your boat
to*, not a generic dealer. Navy carries authority; brass accents carry warmth so it
doesn't feel corporate.

## Architecture

- **Route:** new file `src/app/v2/page.tsx`, mounted at `localhost:3000/v2`.
- **Chrome:** uses the existing `RootLayout` (shares `TopBar`, `Navbar`, `Footer`
  with `/`) so the comparison is strictly about homepage composition, not site chrome.
- **Components:** new, isolated under `src/components/v2/`:
  - `HeroV2.tsx`
  - `CredibilityV2.tsx`
  - `ServicesV2.tsx`
  - `FeaturedBoatsV2.tsx`
  - `VoicesV2.tsx`
  - `ContactV2.tsx`
- **Styles:** new file `src/app/v2/v2.css` with v2-only tokens and utilities (grain
  filter, editorial grid, depth system). Not imported by `/` — `globals.css` is
  untouched.
- **Data:** identical to `/`. Pulls from the same `BUSINESS` constants in
  `src/lib/constants` and the same Supabase `boats` query used by the existing
  homepage. Same content, different design.
- **Fonts:** Fraunces + Inter loaded via `next/font/google` in `src/app/v2/page.tsx`
  (self-hosted, no layout shift, no extra network hop), bound to CSS variables
  `--font-v2-display` and `--font-v2-body` on the `/v2` root element. Does not
  affect `/`.
- **Dependencies:** no new npm packages. `framer-motion` and `lucide-react` are
  already in `package.json` and may be used.
- **Rollback:** `rm -rf src/app/v2 src/components/v2` removes everything. No edits
  to shared files.

### Out of scope

- Admin panel, API routes, other public pages (`/about`, `/services`, `/boats`,
  `/gallery`, `/contact`)
- Supabase schema changes
- SEO/meta strategy beyond what the root layout already provides
- Lighthouse perf optimization beyond the guardrails below

## Visual system

All tokens defined in `src/app/v2/v2.css`, scoped to `.v2-root` to avoid leaking into
the rest of the app.

### Palette

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0A1B2E` | Deep base, dark section backgrounds |
| `--ink-elevated` | `#122B47` | Card surface on dark sections |
| `--canvas` | `#F4EFE6` | Warm off-white, "paper" of the editorial |
| `--canvas-raised` | `#EAE2D4` | Subtle elevated surface on light sections |
| `--brass` | `#B8874A` | Oxidized gold, primary accent |
| `--brass-bright` | `#D9A968` | Hover/highlight states only |
| `--tide` | `#3A6970` | Desaturated coastal teal; icon/link details only |
| `--text` | `#1A1F26` | Primary text on canvas |
| `--text-muted` | `#5A6670` | Secondary text on canvas |

No default Tailwind palette entries (indigo/blue/slate/etc.) anywhere.

### Typography

- **Display:** Fraunces (variable, optical-sized). Weights 400 and 500.
  Tracking `-0.03em` on sizes 48px and above. Line-height `1.02` on display sizes.
- **Body:** Inter. Weights 400 and 500. Line-height `1.7`. Body size 17px.
- **Eyebrow/caption:** Inter 500, uppercase, tracking `+0.14em`, size 12px.
- **Numerics (stats, prices):** Fraunces with `font-variant-numeric: tabular-nums`.

### Spacing scale

Custom scale in rems: `0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4.5, 6, 9`. Used consistently
across padding, margins, and gaps. No random Tailwind steps (e.g., no `p-7`,
`gap-11`).

### Depth system (three planes)

- **Base:** canvas surface, no shadow.
- **Elevated:**
  `0 1px 0 rgba(10,27,46,.04),
   0 8px 24px -8px rgba(10,27,46,.14),
   0 24px 48px -24px rgba(184,135,74,.08)`
  Layered, navy + warm-tinted, low opacity.
- **Floating:** elevated + `inset 0 1px 0 rgba(255,255,255,.04)` highlight.

### Texture

- **Grain:** SVG fractal-noise inline data URI, applied at 3% opacity on all dark
  (`--ink`) surfaces via a `::before` pseudo-element.
- **Hero background:** two radial gradients layered — warm brass top-right 15%,
  tide bottom-left 8%, on top of the `--ink` base and below the grain.

### Imagery treatment

Every photo gets two layers:

1. **Gradient overlay:** `linear-gradient(to top, rgba(10,27,46,.55), transparent 60%)`
   for text legibility and focal pull.
2. **Color grade:** a `mix-blend-multiply` layer in `--ink` at 20% opacity to unify
   the palette across disparate source photos.

Shop photos will read as one cohesive set, not as stock.

### Motion

- **Easing:** `cubic-bezier(.2, .8, .2, 1)` (spring-style).
- **Animated properties:** `transform` and `opacity` only. Never `transition-all`.
- **Enter-on-view:** `y: 24px → 0, opacity: 0 → 1`, 600ms, stagger 80ms for child
  items. Runs once per element.
- **Hero image:** slow 8s Ken Burns `scale: 1 → 1.04` for subtle life.
- **Hover:** 200ms `translateY(-2px)` + shadow intensify on cards; underline-slide
  on text links; `--brass` → `--brass-bright` on buttons.
- **Active:** 100ms `translateY(0) scale(0.98)`.
- **Reduced motion:** honors `prefers-reduced-motion: reduce` — disables Ken Burns
  and enter animations; hover stays.

## Layout — section by section

Six sections. Same content as the existing homepage; restructured for editorial
rhythm. Key structural moves: stats are pulled out of the hero into a separate
credibility strip; services become an editorial chapter list; testimonials become
pull-quotes.

### 1. HeroV2 — "The Lead"

Asymmetric 12-column split (desktop):

- **Left 6 cols:** eyebrow (`AUTHORIZED HONDA MARINE · EST. OLD TOWN, FL`),
  2-line headline in Fraunces display, short body paragraph, two CTAs —
  primary brass "Call {phone}" and secondary text-link-with-arrow "See our
  services →".
- **Right 6 cols:** treated photo of the shop (`/images/shop-1.jpg`) with a small
  caption beneath ("The shop · Old Town, FL"). Ken Burns effect per motion spec.

No stats inside the hero. Hero breathes.

Mobile: stacks. Photo above text, smaller aspect ratio.

### 2. CredibilityV2 — "Masthead strip"

Thin horizontal strip on `--canvas`, single row, hairline rule top and bottom.
Four inline metrics pulled from `BUSINESS` constants:

`★ {BUSINESS.googleRating} · {BUSINESS.reviewCount} Google reviews` | `Honda Marine · Authorized Dealer` | `All brands serviced` | `{BUSINESS.address.city}, {BUSINESS.address.state} · Nature Coast`

At time of writing this resolves to: `★ 4.5 · 51 Google reviews | Honda Marine ·
Authorized Dealer | All brands serviced | Old Town, FL · Nature Coast`.

Brass-colored dot separators between items. Replaces both the old `TrustBar` and
the old Hero stat cards — consolidated, no duplication.

Mobile: wraps to two lines, same rhythm.

### 3. ServicesV2 — "Chapter list"

Two-column editorial grid (desktop):

- **Left 5 cols:** manifesto-style intro. Small eyebrow `SERVICES`, Fraunces
  heading (working copy: *"The whole boat, handled here."* — final headline to be
  drafted during implementation, direction is one short declarative sentence that
  positions the shop as comprehensive and local), one paragraph of body copy (~35
  words) pulling from the existing `ServicesOverview` subtitle as source material.
- **Right 7 cols:** numbered service list. Each row:
  - `01` in Fraunces tabular-nums, brass color
  - Service name in Fraunces 24px
  - One-line description in Inter, muted
  - Right-aligned arrow icon
  - Hairline divider between rows
  - Full-row hover target: background shifts to `--canvas-raised`, arrow translates
    +4px, 200ms

Services (the same 4-item preview subset shown by the existing `ServicesOverview`
bento grid — the full 8-item list remains on `/services`):

01. Engine Repair & Diagnostics
02. Routine Maintenance
03. Honda Marine Dealer
04. Pre-Owned Boats

Mobile: manifesto moves above list, single column.

### 4. FeaturedBoatsV2 — "The Inventory"

**If boats returned from Supabase:**

- One lead boat at full width: large treated photo (16:9 aspect), editorial caption
  block beside it on desktop (name in Fraunces, year + price in tabular-nums Fraunces,
  one-line description, "View boat →" link).
- Below: up to 2 secondary boats in a 2-col grid, smaller but same treatment.

**If no boats (empty state):**

- Well-designed empty state, not a "no items" placeholder:
  - Fraunces heading: "Inventory refreshes often."
  - Body: "Give us a call for what's on the lot today."
  - Primary CTA: brass "Call {phone}"

Mobile: lead boat stacks (photo on top, caption below); secondary boats collapse to
1 column.

### 5. VoicesV2 — "Pull-quotes"

Three testimonials (from existing `Testimonials` data) as large Fraunces italic
pull-quotes. No star clusters, no avatar circles — just the quote, an em-dash,
and plain-text attribution.

Desktop: 3-column grid with generous gutters, each quote in its own column. Subtle
brass ornament (a decorative opening quotation mark in Fraunces) top-left of each.

Mobile: horizontal scroll-snap carousel, one quote per viewport width, 16px gutter.

### 6. ContactV2 — "The Close"

Two-column (desktop):

- **Left 7 cols:** small eyebrow `GET IN TOUCH`, Fraunces heading ("Bring it in."),
  tight details list:
  - Phone row with brass phone icon → `{BUSINESS.phone}` (e.g. `(352) 542-0015`),
    links to `{BUSINESS.phoneHref}`
  - Address row with brass pin icon → `{BUSINESS.address.full}` (e.g. `25771 SE
    Highway 19, Old Town, FL 32680`)
  - Hours row with brass clock icon → `Mon–Fri {BUSINESS.hours.weekdays}` (e.g.
    `Mon–Fri 8:00 AM – 5:00 PM`) · `Sat–Sun {BUSINESS.hours.weekends}`
  - Primary brass CTA "Call now" → `{BUSINESS.phoneHref}`, secondary underlined
    link "Get a quote" → `/contact`
- **Right 5 cols:** small treated photo `/images/shop-2.jpg` with a caption
  ("Inside the shop"). Same imagery treatment as hero (gradient overlay + color-grade
  layer). Photo choice can be swapped during implementation if shop-2 composition
  doesn't suit the smaller frame.

Mobile: stacks. Photo goes last.

## Interactive states

Every clickable element must have all four:

- `:hover` — per motion spec
- `:focus-visible` — 2px `--brass` ring with 3px offset on canvas surfaces; 2px
  `--canvas` ring with 3px offset on `--ink` surfaces. Never `outline: none` without
  a visible replacement.
- `:active` — 100ms `translateY(0) scale(0.98)`
- Disabled state (if applicable) — 40% opacity + `cursor: not-allowed`

## Responsive

Mobile-first. Breakpoints: `sm: 640px, md: 768px, lg: 1024px, xl: 1280px`.

- All touch targets ≥ 44px.
- Hero: single column below `lg`.
- Chapter list: single column below `md`.
- Featured boats secondary grid: 1 col below `md`.
- Voices: carousel below `md`, grid at `md+`.
- Contact: stacks below `md`.

## Performance guardrails

- Images served through `next/image` with explicit `width`/`height`.
- `priority` on the hero image only; all other images lazy-loaded by default.
- Fonts self-hosted via `next/font/google` with `display: 'swap'` — no external
  font network calls, no layout shift.
- Enter animations use `transform` + `opacity` only — zero layout shift.

## Success criteria

Judged against the existing `/` homepage on:

1. **Side-by-side screenshot comparison** at desktop (1440px) and mobile (390px)
   using `screenshot.mjs`, saved to `temporary screenshots/`. At least 2 rounds of
   compare-and-refine per CLAUDE.md.
2. **Anti-generic guardrails audit** — each bullet in CLAUDE.md's
   "Anti-Generic Guardrails" section verified against `/v2`:
   - Custom palette, no Tailwind defaults
   - Layered, color-tinted shadows (no flat `shadow-md`)
   - Serif + sans pairing, tight tracking on large headings, generous line-height
     on body
   - Layered radial gradients + SVG grain
   - Only `transform` + `opacity` animations, no `transition-all`
   - Hover, focus-visible, and active on every clickable element
   - Gradient + color-grade layer on every image
   - Intentional spacing tokens, not random Tailwind steps
   - Base → elevated → floating depth layering
3. **Accessibility spot-check** — keyboard focus order, WCAG AA contrast on
   `--text` and `--text-muted` over `--canvas`, reduced-motion honored.
4. **User eyeball test** — user looks at `/` and `/v2` and makes the final call.

### Out of scope for the comparison

- Full Lighthouse or axe audit
- Real user testing
- Conversion or analytics comparison
- Changes to `/` to "match" `/v2`

## Deployment / release

- **Do not push to Vercel.** User will review locally first.
- Commit and push to branch `claude/general-session-1Z19K` only when user approves.
