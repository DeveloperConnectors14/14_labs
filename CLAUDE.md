# CLAUDE.md

Guidance for Claude Code working on the 14Labs website. Read this before any task.

## Working rule: analyse first, build after approval

For every request from now on:

1. **Critically analyse it first.** Before changing any code, say whether it's a good idea for the website and why: benefits, downsides, risks (UX, credibility with universities, performance, legal), and better alternatives if there are any.
2. **Wait for a second review.** Don't build until the user replies after that analysis and confirms.
3. **Then build it**, and verify it: lint, production build, and headless-browser screenshots at desktop (~1709px and 1366px) and mobile (390px). Look at the screenshots.

Other standing rules:
- Work on branch `feature/next-changes`. Don't commit, push or open PRs unless asked.
- Keep code well structured and optimised: data lives in `src/data/*.js` and is read only through `src/services/dataService.js`. Reuse existing components, tokens (`src/theme/tokens.js`) and theme styles instead of adding one-off styles.
- Ask before spending paid AI credits (Figma/Canva image generation), and confirm the target account first.

## Positioning and brand

- **14Labs, Lahore, Pakistan: AI Engineering, Applied Machine Learning & Research.** Always write the name as **"14Labs"** (no space), including metadata, the footer and emails.
- Audience includes universities (MOU discussions), so claims must be accurate and verifiable: no fake testimonials, no unverifiable stats, no implied partnerships.
- Brand colours: navy `#0A3B60`, teal `#00D3B1`. Teal is an accent for 2–3 key items per screen, not a fill colour.
- Design reference is deepmind.google, but **copy its layout only, never its theme**: keep the site's own colours, fonts, radii and button styles.

## Site structure (current decisions)

### Navbar (`src/components/common/Navbar.jsx`)
- Logo far left, links right beside it: **Research · Services · Case studies · About us**. There's no Contact link. Research, Services and Case studies are homepage sections (`/#research`, `/#services`, `/#case-studies`); only About us is a separate page.
- Right-hand button: **"Let's connect"** (→ `/contact`), 15px text.
- On `/` and `/research/*` the bar is transparent over the dark hero (white links, an **all-white** `logo-white.svg`) and turns solid white, with the colour logo, on scroll or when the mobile menu opens. Other pages use the solid white bar.

### Homepage hero (`src/components/home/HeroSection.jsx`)
- Full width (no margins or rounded corners), full screen height (`100svh`).
- Background: three rotating photos (`HeroSlideshow.jsx`, data `heroSlides` in `data.js`): Agriculture, Materials, Energy (Unsplash: Bernd Dittrich, Clayton Cardinalli, Shio Yang — a city street grid glowing at night from above ("the grid"; chosen over solar-farm and pylon photos); no usable real hydrogen photos exist on Unsplash; files in `public/media/hero/`). Slow crossfade every 7s (1.5s fade); first photo loads with priority; rotation pauses off-screen / hidden tab; reduced-motion visitors see only the first photo. Light overlays (user asked for less gradient): brand tint at 20%, a soft dark radial behind the headline, a dark bottom fade for the logo strip, and a subtle text shadow on the headline. A background grid was tried and removed; `HeroGrid.jsx` is unused.
- Note: Agriculture is not yet one of the published research areas; keep this in mind if a university asks.
- Headline: "AI Engineering, **Applied Machine Learning** & Research", with "Applied Machine Learning" in teal. Sizes 34 / 44 / 58px; balanced wrapping.
- Two buttons:
  - **Research:** teal, smooth-scrolls to `#research`.
  - **AI services:** white outline, → `/services`.
- Removed on purpose: the subline, the location caption, the "Work with us" button and the scroll arrow.
- **Collaborator strip** at the bottom (`CollaboratorStrip.jsx`):
  - Label: "Co-authored with researchers from".
  - 7 institutions, one per country: DFKI, UET Lahore, Istanbul Technical University, Yonsei, Osaka Metropolitan, University of Pittsburgh, University of Udine. Data: `collaborators` in `data.js`.
  - Logos are white, 32px tall in 60px tiles (28 / 56px on phones). Tiles are frosted glass (dark translucent fill + backdrop blur) so logos read on every hero photo; the label is near-white with a soft shadow. On mouse hover the tile turns white and the logo shows its original colours. Seal-only logos get a text `label`.
  - Never phrase these as partners or "worked with". They are co-authors' affiliations.

### Homepage order (`src/app/page.jsx`)
Hero → Research carousel → Our focus (research areas) → Services → Case studies → contact call to action. (The short mid-page call-to-action box was removed as repetitive.)

Removed from the homepage: pricing, "Challenges we can overcome", research output/impact stats, "What sets us apart", tech stack, testimonials, trusted brands, and the research team (moved to About).

### Research carousel (`src/components/research/`)
- Directly under the hero, with no heading text. Its background stays light (a dark section behind the cards was tried and rejected).
- Layout copied from DeepMind:
  - cards **400 × 600 (2:3)**, **48px gap**
  - first card aligned to a centred 3-card row (1296px), row bleeds off the right edge
  - native scroll-snap (no Swiper)
  - round arrows float centred at the left/right edges and hide at either end and on touch screens
- Card (`ResearchCard.jsx`):
  - The image fills the whole card. Like DeepMind's cards, only a few items sit on top: a 2–3 word `shortTitle` (22px, one line; two allowed on phones), a `blurb` description of up to 2 lines, and a small teal "LEARN MORE" pill (14px, the theme's mono font). Unpublished papers also get a small "UNDER REVIEW" tag above the title. Journal names, years and the DFKI note are not on cards; they're on each paper page.
  - The whole card links to `/research/<id>`.
  - Light images use dark text over a white fade. Images marked `imgTone: "dark"` use white text over a dark fade.
- Card images: see "Card images are real photos" below.
- **Card images are real photos (all 11 done):** free Unsplash/Pexels photos as `research/<id>-photo*.webp` with `imgTone: "dark"`; credits are in comments in `publications.js` and in the status table in `docs/IMAGE_GUIDE.md` (shareable with the team). The old AI images (`research/<id>-dark.webp` and `<id>.webp`) are unused. When replacing a file, give it a new name: the image cache keeps serving the old version under the same name.
- The same carousel shows "More research" (all other papers, same topic first) on each paper page.

### Paper pages (`src/app/research/[paperId]/page.jsx`)
- Statically generated for every paper; unknown ids return 404.
- Hero (`GradientHero`): full width, caption plus full title. Brand gradient by default (current state for all papers). A paper can set an optional `heroImg` (wide landscape photo, separate from the card image `img`) to show a photo behind the title with a dark navy fade; none are set yet. Title area up to 1300px wide with balanced wrapping, and hyphens shown as non-breaking (U+2011) so words like "meta-review" never split across lines; the stored title is unchanged.
- Body sections, in order:
  1. Authors (team members in bold)
  2. View paper ↗ / DOI ↗ buttons
  3. Overview
  4. Key findings
  5. The note "This is our summary of the paper…"
  6. Details (Journal, Published, Volume, Pages, DOI)
  7. Topics
  8. Cite (with Copy button)
- Under-review papers show their status, "Submitted to", and no findings or citation.
- Directors per paper and countries involved: requested, then **skipped for now**.

### Publications data (`src/data/publications.js`)
- 11 papers: 5 published and 6 under review. Work-in-progress papers are excluded.
- "Ensemble-Based Solar Irradiance…" is the same paper as "Hybrid Ensemble…", so it's listed once.
- Bibliographic details come from Crossref.
- The overviews and findings for the meta-review, SLM, air-quality and Zn–Co papers were written by Claude from the abstracts. **The authors should review them.** The fatigue paper's text was supplied by the user.
- `shortTitle` is used on cards; the full title is used elsewhere.

### "Our focus" section (`src/components/research/ResearchAreas.jsx`)
- Layout from a reference site: heading "Our **focus**" (no intro line, removed at the user's request) and a large photo on the left; a numbered accordion (01–04) of the research areas on the right. One row open at a time (first by default); the open row shows the area's description and its papers as chips linking to `/research/<id>` (from `getResearchAreas()`, which now includes `papers`).
- Alignment (desktop): the list's first divider lines up with the top of the heading's letters (10px offset). The photo keeps a fixed 3:2 shape (a stretch-to-list version squashed it when rows were closed, so the user rejected it); bottoms may differ slightly depending on the open row.
- Photo: `public/media/focus-microscope.webp`, an Unsplash photo by Yassine Khalfalli (free for commercial use, no attribution required), used as the original colours. A navy-to-teal duotone version was discussed as an option.

### Case studies
- There is no case-studies listing page or services page any more: `/services` and `/case-studies` permanently redirect (in `next.config.mjs`) to `/#services` and `/#case-studies`. The case-study detail pages `/case-studies/<id>` are kept; homepage case cards link to them. Service cards are plain (not links), and the services section has no "Explore services" button.
- No dates on case studies (the "1st January 2024" placeholders were removed).
- Both case studies use `layout: "article"` (layout copied from a DeepMind blog post, in the site's own style, light background, solid white navbar): `CaseHeader` (centred "Case study · <industry>" meta line, centred title, **SEE THE ARCHITECTURE** (`ScrollToButton`, smooth-scrolls to the pipeline section `#architecture`) + `ShareButton`, a large rounded cover, then the subtitle as a centred lead) → `CaseArticle` (Project details, The challenge + cost callout, Our approach, Results if any, Key features, Technology chips) → pipeline diagram → More case studies → call to action. A LET'S CONNECT header button was removed because it duplicated the navbar. AI Find Sites has real photos (Unsplash, free licence): cover `cases/find-sites-cover.webp` (aerial suburb, 21:9) and card `cases/find-sites-card.webp` (skyscrapers). AI Admission Counselor: cover `cases/admission-cover.webp` (university campus, Zhanhui Li) and card `cases/admission-card.webp` (graduation cap, Dragos Blaga), both Unsplash. The old `case1.png`/`case2.png` are no longer used.
- Shared article pieces: `src/components/general/GradientHero.jsx` and `ArticleParts.jsx` (`SectionTitle`, `DetailsList`, `DashList`), used by both paper pages and the case-study article.

### Services
4 services: Applied ML & forecasting, Research & academic collaboration, Multi-agent systems, Custom AI solutions.
- Homepage service cards always show number, title, description and up to 3 tag chips (nothing is hidden behind hover); the whole card links to `/services`, and hover only adds the teal→navy gradient. An "Explore services" button sits under the intro on the left.
- Both the homepage service cards and the case-study challenge cards use the shared `src/components/general/NumberedCard.jsx` (number + divider, title, description always visible; hover only adds the teal→navy gradient).

### Writing style
- All headings, labels and tags use **sentence case** ("Our services", "Key features", "Contact us"). Keep names (case-study titles, people), acronyms (AI, ML, QA) and brands as they are. The hero tagline and the 2–3 word research card titles stay title case.

### About page (`src/app/about-us/page.jsx`)
Sections in order:
1. Vision as the headline: "Machine learning research that solves humanity's real problems", then one paragraph (the four research-area tags were removed as repetitive)
2. Mission
3. Four values from the "14Labs Research – Main Document"
4. Contact call to action

The research stats and the Research team section were removed at the user's request ("for now"); `ResearchTeam.jsx`, the `team` data and photos are kept so the team can be restored with one line.

### Research team (`team` in `data.js`)
- Faisal Ali, Mehmood Ul Haq and Muhammad Ilyas. Photos come from the research doc's Drive links.
- Ilyas's role and bio were drafted from his portfolio and need confirming.
- `aliases` and `otherTeamAuthors` (Muhammad Baqir) control the bold names in author lists.

### Contact call to action (`src/components/general/CallSection.jsx`)
- Used at the bottom of every page. Brand gradient box; content aligned to the page edge: headline, subline (85% white) and a small "Start a conversation →" pill on the left; email and phone as grouped, clickable rows with icons (`mailto:` / `tel:`) on the right. Only the contact version exists now; the `contact` prop is accepted but ignored.

### Footer
Four columns: brand/tagline/location, Explore, Research (Publications, Our focus), Contact (email, phone, LinkedIn, X). "© {year} 14Labs · Lahore, Pakistan." **No privacy policy page** (the user doesn't want one). Contact details come from `contactInfo` in `data.js`.

## Open items

- **Logo permissions:**
  - UET, ITU, Yonsei and Udine logos are marked "fair use" on Wikipedia, so permission is needed before going live.
  - DFKI, Osaka and Pittsburgh are public domain, but they're still trademarks.
- **Unused files to delete** (deleting was blocked earlier):
  - `src/components/home/`: `PricingSection.jsx`, `ChallengesSection.jsx`, `SuccessStories.jsx` (the only remaining lint errors), `TrustedBrands.jsx`, `ImpactSection.jsx`, `WhyChooseUs.jsx`, `ToolsSection.jsx`
  - `src/components/research/ResearchTeam.jsx` is unused on the homepage but used on About, so **keep it**.
  - Old images in `public/media`: `trustedBrand1–6.png`, `person.png`, `challangeIcon1–4.png`, `feature1–3.png`, `service1.png`, `hero.png`, `hero-research.webp`
  - Unused partner logos: `partners/rptu*`, `partners/gazi*`
  - Unused tech logos: `tech_stacks/pytorch|tensorflow|scikitlearn|jupyter-original.svg`
  - After those deletions, the `swiper` package can be uninstalled.
- The X and LinkedIn footer links haven't been verified.

## Tools and accounts

- **Second Google Drive:** a local MCP server `gdrive-separate` connected to **baqir@14labs.co**. It uses Google Cloud project `claude-drive-14labs-261020` (Drive and Docs APIs enabled; Sheets is not).
- **Research main doc:** `1HPJdYAN_imZ1t7ZvxCINLB1U1nMpfAbajHjvaCzJZ04`. It holds the vision, mission, values, team and the contacts sheet link.
- **Figma** (for image generation): the connector is signed in as baqir@14labs.co (View seat). Website images are in the file "14Labs – Website images".
- **Browser checks:** `playwright-core` is installed in `/tmp/pw`, driving `/usr/bin/google-chrome`.
