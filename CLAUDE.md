# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `using-superpowers` skill** at the start of every conversation — establishes skill-use discipline for the whole session.
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `npm run dev` (Next.js dev server on `http://localhost:3000`)
- Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Preview Workflow (how Trey reviews work)
Claude runs in a cloud sandbox; Trey's Safari on his Mac cannot reach the
sandbox's `localhost`. To let Trey view work in his own browser, use this flow
every time there's something visual to review:

1. Finish the change and commit locally on the designated feature branch.
2. Push the branch: `git push -u origin <branch-name>`. Pushing to a feature
   branch **does not** change production — production is whatever is on
   `main` + Vercel. At most it creates a separate Vercel preview URL.
3. Do **not** merge to `main` or deploy to Vercel production unless Trey
   explicitly says so.
4. Tell Trey to **open Terminal on his Mac and run these exact commands** (give
   them to him in a copy-pasteable block, not as prose):

   ```bash
   cd ~/Desktop/total-boat-repair-and-sales   # or wherever the project lives
   git fetch origin
   git checkout <branch-name>
   git pull
   npm install
   npm run dev
   ```

   If the project isn't cloned yet on his Mac, the first block is instead:
   ```bash
   cd ~/Desktop
   git clone https://github.com/treyfish/total-boat-repair-and-sales.git
   cd total-boat-repair-and-sales
   git checkout <branch-name>
   npm install
   npm run dev
   ```

5. Tell him which URLs to open once the dev server is ready (e.g. `http://localhost:3000` and `http://localhost:3000/v2`).
6. Wait for his feedback before iterating.

Rules for this flow:
- **Always** explicitly say "open Terminal on your Mac and run these commands"
  — don't assume he knows.
- **Always** paste the commands in a fenced code block so they're
  copy-pasteable.
- **Never** say "view it on localhost:3000" without first walking him through
  the steps to get the dev server running on his machine.
- When giving screenshots for comparison, keep doing that — it's still useful
  for quick feedback — but the authoritative review happens in his browser.

## Screenshot Workflow
- Puppeteer auto-caches Chrome in `~/.cache/puppeteer/` on macOS/Linux. Install via `npm install puppeteer` in the project if missing.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
