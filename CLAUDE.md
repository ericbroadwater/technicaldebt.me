# CLAUDE.md — technicaldebt.me

## What This Is

Personal website for Eric Broadwater at technicaldebt.me. NOT a portfolio — it's the digital home of someone who lived through and helped build the internet's evolution firsthand (1999–present). The domain was chosen for self-deprecating, insider tech humor.

## Owner

Eric Broadwater — Senior Product Manager (Growth & SaaS Platforms), San Diego. ~25-year career spanning Clear Channel Radio online → Web 2.0/CMS → SaaS growth era → AI. Most recent role: Senior PM - Growth at Contentstack ($80M ARR enterprise CMS platform, 2022–2025).

## Stack

- **Frontend:** Single-page static HTML (index.html) with inline CSS/JS
- **CMS:** Contentful (free tier) — headless, content delivered via Delivery API
- **SSG:** Eleventy — pulls from Contentful at build time, generates static HTML
- **Hosting:** GitHub Pages (technicaldebt.me via Bluehost DNS)
- **Deploy:** GitHub Actions (pipeline not yet configured)
- **Contentful Space ID:** noqo7wi3e5ju
- **Contentful Environment:** master

## Local Path

`/Users/ebertmain/Desktop/Stuff/Github/GitHub/technicaldebt.me`

NOTE: The double `Github/GitHub` in the path is intentional — do NOT rename these folders.

## Design Concept

**"The Intersection"** — a four-panel MCM (mid-century modern) inspired layout with a shifting vertical rule between columns. Each panel alternates backgrounds and varies the column split ratio. Bleed labels sit vertically on panel divider lines. Minimal, editorial, warm.

## Typography

Three typefaces with specific roles:

- **Unbounded** (300, 400) — Hero/name text, accent elements. The "display" voice.
- **Cormorant Garamond** (300, 400, 600 + italics) — Body copy, section headings, taglines, contact statement. The "editorial" voice and primary typeface.
- **DM Mono** (300, 400, 500) — Nav, eyebrows, dates, links, footer, section labels. The "system" voice.

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Unbounded:wght@300;400&display=swap
```

## Color Palette (San Diego Sunset)

| Variable | Hex | Role |
|---|---|---|
| `--warm-white` | #f7f2eb | Primary background (panels 1, 3) |
| `--cream` | #ede6d8 | Alternate background (panels 2, 4) |
| `--night` | #0d1a2e | Primary text, headings |
| `--ocean` | #1b3a5c | Italic headings, tagline text |
| `--pacific` | #2e6da4 | Section eyebrow text |
| `--dusk` | #4a3060 | Accent (unused currently) |
| `--horizon` | #e8823a | Primary accent — hover states, bleed labels, links |
| `--ember` | #c23b0a | Secondary accent (unused currently) |
| `--gold` | #d4a853 | Timeline year markers |
| `--stone` | #8a7968 | Secondary text, body copy, nav text |
| `--rule` | #d4c9b8 | Divider lines, borders |

## Layout System

Four full-viewport panels with asymmetric two-column grids:

- **Panel 1** (Intro): 55/45 split, warm-white bg
- **Panel 2** (Work): 40/60 split, cream bg
- **Panel 3** (Basketdog): 62/38 split, warm-white bg
- **Panel 4** (Writing + Contact): 35/65 split, cream bg

Each panel has a `::after` pseudo-element creating a 1px vertical rule at the column break. Bleed labels use `writing-mode: vertical-rl` and sit on the rule line.

## Component Patterns

- **Section Eyebrow:** DM Mono 9px, 0.3em letter-spacing, uppercase, pacific color
- **Section Heading:** Cormorant Garamond 600, clamp(28-44px), night color, `em` children = ocean/italic
- **Section Body:** Cormorant Garamond 300, clamp(16-20px), 1.75 line-height, stone color, max-width 460px
- **Section Link:** DM Mono 10px, uppercase, night color, bottom border, hover = horizon
- **Writing List Item:** Grid with 72px date column + title, border-top rule, hover title = horizon
- **Timeline Era:** Grid with 100px year column + content, border-top rule, staggered fade-in
- **Contact Link:** DM Mono 10px, with animated `::before` line that expands on hover
- **Nav:** Fixed, semi-transparent warm-white bg with blur, DM Mono 10px

## Animation

- `.fade-up` class: `opacity: 0; transform: translateY(20px)` → visible state via IntersectionObserver (threshold 0.15)
- Timeline eras: staggered `transitionDelay` at 0.1s intervals
- Nav background: `rgba(247, 242, 235, 0.85)` with `backdrop-filter: blur(8px)`

## Responsive Breakpoints

- **900px:** Single column, panels stack, bleed labels/year markers/crossover text hidden
- **480px:** Tighter padding, nav links hidden entirely

## SEO / Meta

- **Title:** "Still figuring out what we got right. — Eric Broadwater"
- **Meta description:** "Still curious, still building. Product thinker who loves people, great products, and the fact that tech is still surprising."
- **OG image:** /images/egb-amsterdam.jpg
- **Favicon:** Basketdog/Oso logo via realfavicongenerator.net (favicon-96x96.png, favicon.svg)

## Content Model (Contentful)

**Author** (id: `author`)
- name (Symbol, required), slug (Symbol, required), bio (Text), photo (Asset)

**Topic** (id: `topic`)
- name (Symbol, required), slug (Symbol, required), description (Symbol)

**Article** (id: `article`)
- title (Symbol, required), slug (Symbol, required), publishDate (Date), summary (Symbol), body (RichText), author (Entry → author), topics (Array → topic), videoUrl (Symbol), videoCaption (Symbol), seoTitle (Symbol), metaDescription (Symbol), ogImage (Asset)

## Key Decisions

- Site is NOT a portfolio — it's a digital home for someone who built the internet
- LinkedIn field removed from Author content type
- Video handled via videoUrl (YouTube/Vimeo embed URL), not uploaded media
- `summary` used instead of `excerpt`
- Homepage stays static with dynamic article section rendered at build time
- Article inner pages auto-generated from Contentful content

## Current State

- Homepage `index.html` is live and confirmed working
- Eleventy v3 build confirmed working locally
- Contentful connection working — Delivery API pulling live data
- Full design system documented (this file)
- `writing/article.njk` — article inner page template complete (720px single-column, MCM aesthetic, rich text body, topics, author byline, video embed)
- `_data/articles.js` — fetches articles with `include: 2`, resolves author + topics, renders rich text body to HTML via `@contentful/rich-text-html-renderer`
- Homepage writing section updated to loop over live Contentful articles

## Stack (Current)

- **Eleventy:** v3.1.2 (upgraded from v2)
- **Contentful SDK:** v11 (upgraded from v10)
- **Rich Text:** `@contentful/rich-text-html-renderer` + `@contentful/rich-text-types`
- **Env vars:** `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT`

## Key File Locations

| File | Purpose |
|---|---|
| `index.html` | Homepage — treated as Nunjucks template by Eleventy |
| `writing/article.njk` | Article inner page — paginated from `articles` data |
| `_data/articles.js` | Contentful fetch — returns `articles` array to all templates |
| `.eleventy.js` | Eleventy config — filters, passthrough, ignores |
| `.env` | Contentful credentials — gitignored, never commit |
| `.gitignore` | Excludes `.env`, `_site/`, `node_modules/` |

## Roadmap (What's Next)

1. ~~Eleventy repo setup~~ ✅
2. ~~First Eleventy build~~ ✅
3. ~~Design system documentation~~ ✅
4. ~~Article inner page template (Nunjucks)~~ ✅
5. ~~Homepage writing section — live Contentful loop~~ ✅
6. Set up GitHub Actions deploy pipeline ← NEXT
7. Configure Contentful webhook to trigger rebuilds on publish
8. Preview / staging setup (likely Netlify free tier)

## Workflow Rules — READ THESE CAREFULLY

### File Versioning (Non-Negotiable)
Every HTML/CSS/JS output must be named with an incrementing version number (e.g., `homepage_v3.html`, `homepage_v4.html`). NEVER overwrite a confirmed-working version. Always start from the last explicitly confirmed-working version, rewrite the full file cleanly, and increment.

### No CLI Workflows
Eric has a strong aversion to terminal/CLI work. Do not suggest CLI-based workflows as the primary path. The preferred workflow is: edit in Sublime Text (CMD+H for find-and-replace) → commit via GitHub Desktop.

### Cloudflare Corruption
When producing HTML files, always check for and strip any `cfasync`, `cloudflare`, `cf_email__`, or `__cf_email__` content — these get injected silently and corrupt files.

### Verification
Eric verifies the live site via incognito browser + View Page Source. Do not rely on fetching technicaldebt.me to verify — caching lag makes results unreliable.

### Clean Rewrites Over Patches
When editing files, produce complete clean rewrites rather than incremental patches. Eric copies the final version into Sublime Text.

## Known Issues

- Double `Github/GitHub` in local folder path — do not rename
- Persistent "DNS check in progress" warning in GitHub Pages = cosmetic, not a real issue
- HTTPS enforcement requires CNAME record in Bluehost pointing `www` to `ericbroadwater.github.io` and removal of existing `www` A record
