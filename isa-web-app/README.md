# isa's portfolio

Personal portfolio site for Isabelle (isa). Next.js 16 (app router), TypeScript, Tailwind CSS (layout only), Framer Motion, deployed on Vercel at isaweb-delta.vercel.app.

**Always read `CLAUDE.md` before touching anything** — it has the full design system, font rules, color tokens, CSS conventions, and component structure.

---

## running locally

```bash
cd isa-web-app
npm run dev
```

Runs on http://localhost:3000 (or 3001 if 3000 is taken).

---

## current state (end of session 1)

### ✅ done: hero section

Everything in `app/components/hero/` is complete and working.

**Layout** — 3-column CSS grid: `[hello, i'm + label] | [photo card] | [isa. + bio + pills]`

- `hello, i'm` is right-aligned in the left col, near the top of the photo
- `isa.` overlaps into the photo from the right via `position: relative; left: calc(-1 * var(--name-overlap))` — tweak `--name-overlap` in `Hero.module.css` to control how much it overlaps
- text columns are `z-index: 2`, photo card is `z-index: 1` so text sits on top of the photo

**Photo card** — polaroid-style flip card (CSS 3D `rotateY` on hover)
- Front: real photo — `app/photos/irl_me.jpeg` imported as a static asset, rendered with `<Image fill>`
- Back: sky-blue placeholder — swap in cartoon image the same way when ready
- The `<Image fill>` must go inside the `.photoImg` wrapper div (not directly in `.photoFront`) so it clips within the polaroid frame

**Pixel label** — PokemonClassic font, golden orange, cycles through roles with a typewriter animation (`useTypewriter` hook in `Hero.tsx`). The "cookie creator/destroyer" entry uses a mid-correction sequence (types "cookie creator", hesitates, backtracks to "cookie", then types "cookie destroyer"). To add more mid-corrections, add intermediate checkpoints to the `ROLES` array.

**Shared UI built this session:**
- `app/components/ui/Doodle.tsx` — static SVG decorative elements (star, flower, dot, sparkle), absolutely positioned, used throughout the hero
- `app/components/ui/PillTag.tsx` — pastel pill/tag, accepts `color` as a CSS variable string, `href` + `external` for links
- `app/lib/animations.ts` — all Framer Motion variants (`fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer`)

**Known/intentional:**
- `app/globals.css` font-face URL for PokemonClassic was fixed from `Pokemon-Classic.ttf` → `Pokemon Classic.ttf` (matches the actual filename with a space)
- framer-motion is installed (`npm install framer-motion` was run this session)

---

## up next: timeline section

Build `app/components/timeline/` — see `CLAUDE.md` for the spec:
- Blush background (`var(--color-blush)`)
- Combined experience + projects on a single vertical timeline
- Entries: Georgia Tech MSCS, Mastercard, Miss Chat, other personal projects
- Each entry: date, title, description, tags (as PillTags)
- Reuse `PillTag` from `app/components/ui/PillTag.tsx`
- Entrance animations using variants from `app/lib/animations.ts`
- Import and render `<Timeline />` in `app/page.tsx` below `<Hero />`

---

## file map

```
app/
├── globals.css              # font-face declarations + CSS variable tokens only
├── layout.tsx               # DM Sans loaded via next/font, applied as --font-dm-sans
├── page.tsx                 # renders <Hero /> (add <Timeline /> here next)
├── fonts/
│   ├── HamIsCute-Regular.ttf
│   └── Pokemon Classic.ttf
├── photos/
│   └── irl_me.jpeg          # hero photo (front of flip card)
├── lib/
│   └── animations.ts        # all framer motion variants
└── components/
    ├── ui/
    │   ├── Doodle.tsx / .module.css
    │   └── PillTag.tsx / .module.css
    └── hero/
        ├── Hero.tsx          # "use client" — typewriter hook lives here
        └── Hero.module.css   # CSS vars: --photo-w, --photo-h, --name-overlap, --headline-size
```
