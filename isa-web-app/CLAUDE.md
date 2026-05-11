# isa's portfolio — project context

## what this is
personal portfolio site for isabelle (isa), a full-stack software engineer.
built with next.js (app router), typescript, tailwind css, framer motion.
deployed on vercel at isaweb-delta.vercel.app.

## vibe
whimsical, ghibli-inspired, playful, scrapbook-meets-editorial.
colorful but not chaotic. warm and personal, not a generic dev portfolio.

## routing structure
- `app/page.tsx` — main scrollable page (hero → timeline → playground preview)
- `app/playground/page.tsx` — full standalone creativity playground
- `app/resume/page.tsx` — clean full-page resume view
- all internal links use next.js `<Link>`, never `<a>` tags

## component structure
- every section lives in `app/components/{section}/`
- each component has a colocated css module: `ComponentName.module.css`
- shared/reusable ui pieces live in `app/components/ui/`
- `app/lib/animations.ts` — all framer motion variants, typed and exported
- `app/globals.css` — only font-face declarations and CSS variable tokens

## fonts
three fonts, three roles — never swap them:
- **HamIsCute** (`font-family: 'HamIsCute'`) — display only. hero headline, section titles. self-hosted in `app/fonts/HamIsCute-Regular.ttf`
- **PokemonClassic** (`font-family: 'PokemonClassic'`) — accent only. small labels, tags, pixel-style moments. self-hosted in `app/fonts/Pokemon-Classic.ttf`
- **DM Sans** (`var(--font-dm-sans)`) — body. all paragraph text, descriptions, nav, buttons, everything else. loaded via next/font/google

## color tokens (all defined in globals.css)
### backgrounds (one per section)
- `--color-cream: #FFF8F0` → hero section
- `--color-blush: #FDE8F0` → experience/timeline section
- `--color-olive-mist: #F2F5E4` → projects section
- `--color-soft-yellow: #FFF9E0` → playground preview section

### pastels (decorative elements, tags, cards)
- `--color-bubblegum: #FFB3C6`
- `--color-olive-yellow: #D4D98A`
- `--color-peach: #FFDAC1`
- `--color-sky-blue: #C7E8FA`

### text
- `--color-text-primary: #4A3728` → main text
- `--color-text-secondary: #8C7B6E` → subtext, captions
- `--color-text-muted: #C4B5A8` → placeholders, disabled

### accents (use sparingly — hover states, highlights, doodles)
- `--color-golden-orange: #FFAA33` → primary accent, pixel font labels
- `--color-hot-pink: #FF85A1`
- `--color-olive-pop: #8FA832`

## css conventions
- tailwind for layout and spacing only (flex, grid, padding, margin, width/height)
- never use tailwind color classes — always use css variables
- no inline styles except for dynamic css variable values
- no magic numbers — repeated values become css variables
- if a pattern appears more than once → extract to `app/components/ui/`

## reusable ui components (app/components/ui/)
- `Doodle.tsx` — decorative svg element. props: shape, color, size, position
- `PillTag.tsx` — pastel pill/tag. props: label, color, icon
- `SectionHeader.tsx` — section title in HamIsCute with optional pixel accent label above

## animation conventions
- all framer motion variants live in `app/lib/animations.ts`
- never define variants inline in components
- standard entrance: fade up (y: 20 → 0, opacity: 0 → 1, duration 0.6)
- stagger children: 0.1s delay between items
- respect prefers-reduced-motion

## sections overview
### hero (app/components/hero/)
- full viewport, cream background
- big HamIsCute headline wrapping around polaroid photo placeholder
- pixel font label above: `> software engineer_` in golden orange
- short dm sans bio blurb
- horizontal contact row: github, linkedin, resume as pill tags
- scattered svg doodles (stars, flowers, dots)
- framer motion entrance animations

### timeline (app/components/timeline/) — COMPLETE
- blush background (`--color-blush`)
- vertical flower stem (`--color-olive-pop`) that draws itself via scroll-linked `scaleY`
- large hot-pink flower bloom at top; small flower nodes per entry in alternating pastel colors
- flower nodes scale up (bouncy spring) as each entry reaches viewport center
- cards alternate left/right, slide in from their side on scroll
- hover: 3D tilt (mouse tracking) + lift effect (`y: -10, scale: 1.04`), grab cursor
- click card → expands to centered modal (spring animation, blurred backdrop)
- click anywhere on expanded modal → flips card (CSS 3D rotateY) to show `details` back face
- click outside modal → closes; at most one card open at a time (state in `Timeline`)
- 4 entries in `ENTRIES` array: each has `title`, `date`, `blurb`, `details`, `tags[]`, optional `photos[]`

### playground preview (app/components/playground-preview/) — COMPLETE
- soft yellow background (`--color-soft-yellow`), `min-height: 100vh`
- section header: `> playground_` pixel label + "explore" in HamIsCute
- three notebook cards in a row (stagger entrance animation), one per playground section
- each notebook: spiral rings at top, pink margin line, ruled lines, individual rotation (`--rotate` css var)
- each card has: pixel label, title as `<Link>` (accent-colored underline on hover), blurb, small preview sketch
  - media: rating bars (pink, varying widths)
  - travel: SVG squiggle path with colored location dots
  - creative: 3×2 pastel color grid
- clicking a title navigates to its sub-route (no full-card click)

### playground (app/playground/) — IN PROGRESS, pick up here next
- route structure:
  - `app/playground/page.tsx` — hub page, centered heading only (stub, needs content)
  - `app/playground/media/page.tsx` — **START HERE**: letterboxd-style card grid, click through to detail pages
  - `app/playground/travel/page.tsx` — stub: interactive map (react-leaflet), click location → photo gallery
  - `app/playground/creative/page.tsx` — stub: masonry grid for nail art, painting, baking photos
- all sub-pages currently render a centered HamIsCute heading in soft-yellow, nothing else
- shared background: `--color-soft-yellow` across all playground pages

### resume (app/resume/)
- clean full-page resume layout
- printable / pdf-friendly
- not yet built