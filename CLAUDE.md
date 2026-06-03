# Rajat Bhandari Portfolio — Claude Code Context

## Who I Am
Rajat Bhandari, Senior UX Designer, 11+ years experience, based in Bangalore, India. Currently job hunting. Portfolio is live at https://rajat-portfolio-kohl.vercel.app/

## The Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** Supabase (projects table, site_settings table)
- **Hosting:** Vercel (auto-deploys on GitHub push)
- **Styling:** globals.css with scoped class names prefixed `rb-` (no Tailwind for custom styles)
- **Fonts:** Plus Jakarta Sans (Google Fonts)
- **Icons:** Font Awesome 6 (CDN)
- **GitHub:** https://github.com/rajatbhand/rajat-portfolio

## Project Structure
```
app/
  page.tsx              ← fetches projects from Supabase, passes to HomeClient
  layout.tsx            ← loads fonts, metadata
  globals.css           ← ALL custom CSS lives here (rb- prefixed classes)
  work/[slug]/page.tsx  ← dynamic case study page (force-dynamic, fetches from Supabase)
  about/page.tsx        ← separate About page (not built yet)
components/
  HomeClient.tsx        ← main homepage React component (client-side)
data/
  site.json             ← personal info (name, bio, social links, experience, skills)
lib/
  supabase.ts           ← Supabase client
  theme.ts              ← design tokens (colors, fonts)
content/work/           ← MDX files (legacy, not used — Supabase is source of truth)
```

## Design Language — "Komorebi Sky"
Inspired by Wim Wenders' Perfect Days. Sky blue hero fading to white. Clean, airy, precise.

**Visual reference:** https://aeline.framer.website/ (layout and card style inspiration)

### Colours
- Hero background: blue sky gradient `#2196f3 → #f5f9ff`
- Page background: `#ffffff`
- Work section bg: `#f5f5f7` (grey, cards sit on top as white)
- Dark card/footer: `#0e0e0e`
- Accent yellow-green: `#d4f53c`
- Text: `#0a0a0a`
- Muted: `#888`

### Typography
- Font: Plus Jakarta Sans
- Display: 800 weight, tight letter-spacing `-0.03em`
- Body: 400 weight, 1.65 line-height

### Logo
- `®B` monogram — ® and B same visual size, no R before it
- Class: `.rb-logo` with `.rb-reg` for the ® symbol

## Homepage Sections (in order)
1. **Nav** — `®B` logo left, WORK / ABOUT / RESUME links centre, no contact button in nav
2. **Hero** — full viewport sky blue with CSS cloud shapes, headline + subtext + two buttons (VIEW WORK outline, GET IN TOUCH yellow), auto-scrolling carousel of stat cards below
3. **Case Studies** (`#work`) — grey `#f5f5f7` background, 2×2 grid of white cards, dark floating mockup inside each, title + description below. NO chips/pills/tags visible
4. **Family & Friends** — white background, side projects / vibe coding section, separate from case studies
5. **Footer** (`#contact`) — dark rounded card on white, 2-column: left=CTA text + GET IN TOUCH button, right=PAGES links top + social icons bottom

## Supabase
- URL: `https://lddwnrehhfkvwimbpaah.supabase.co`
- Table: `projects` — fields: title, subtitle, slug, display_order, tags, is_new, is_published, year, role, duration, team, visual, hero_color, summary, outcome, content, cover_image
- RLS is disabled on projects table (public read)
- Admin panel: `/admin` — password: ask Rajat
- Key fix: `params` must be awaited in Next.js 15 — `const { slug } = await params`

## Projects in Supabase
1. **Rely** (slug: `rely`) — Bay Area rental platform, UX research + IA. New project.
2. **Partner Portal** (slug: `partner-portal`) — Insurance agent dashboard, 7 modules

## Pages Still Needed
- `/about` — storytelling page, separate from homepage, includes experience
- `/ai-projects` — Family & Friends vibe coding projects page

## Rajat's Working Style
- Do NOT ask unnecessary questions — make the change, show the result
- Do NOT add duplicate buttons or nav items — always check the full page before adding anything
- CSS goes in `globals.css` ONLY — never inline `<style>` tags in components
- Class names must be prefixed `rb-` to avoid conflicts with Tailwind
- Always check existing code before writing new code — never assume what's there

## Common Issues & Fixes
- **Projects not showing:** CSS not loading because styles were inside component `<style>` tag — always put CSS in globals.css
- **404 on case study pages:** params must be awaited — `const { slug } = await params`
- **Fonts not loading:** Use Google Fonts `@import` in globals.css, not Next.js font system
- **Supabase auth:** Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` env var (new key format), fallback to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Environment Variables (set in Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `ADMIN_PASSWORD`

## What NOT to Do
- Do not use Tailwind for custom homepage styles — use `rb-` prefixed CSS classes in globals.css
- Do not put the same CTA in both the nav AND the hero
- Do not add pastel/coloured backgrounds to work card visuals — they must be white
- Do not use serif fonts — Plus Jakarta Sans only
- Do not add the About section to the homepage — it is a separate page
