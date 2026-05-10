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

### timeline (app/components/timeline/)
- blush background
- combined experience + projects, unified vertical timeline
- entries: georgia tech, mastercard, miss chat, other personal projects
- each entry has: date, title, description, tags

### playground preview (app/components/playground-preview/)
- soft yellow background
- teaser only — 2-3 hint cards suggesting what's inside
- CTA button linking to /playground
- does NOT contain real playground logic

### playground (app/playground/ + app/components/playground/)
- full standalone page
- three tabbed sections:
  1. media ratings — letterboxd-style card grid, click through to detail pages
  2. travel — interactive map (react-leaflet), click location → photo gallery
  3. creative — masonry grid for nail art, painting, baking photos

### resume (app/resume/)
- clean full-page resume layout
- printable / pdf-friendly