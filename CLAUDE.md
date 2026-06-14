# CLAUDE.md — Guidelines for working on this repo

## What this is

A **single-page website for a fencing club**. One vertical page made of
stacked sections. Built with **Vite + React (plain JavaScript/JSX)**.

The whole point of the architecture: a **non-developer** can change all the
text, photos, and videos by editing files in the single **`content/`** folder —
without ever touching the layout or React code, and without being able to break
it.

## Core principle: content vs. structure

Keep these two worlds strictly separated.

- **Content (the user's domain): the `content/` folder only.**
  - `content/textes/*.md` — the text (one file per section)
  - `content/photos/` — photos shown inside sections
  - `content/diaporama/` — photos for the full-width sliding gallery
  - `content/videos/` — videos
  - `content/logo.png` — club logo (also the favicon)
  - `content/banniere.png` — header background banner
  - `content/README.md` — the editing guide (for the non-dev)
- **Structure & logic (the developer's domain):** everything in `src/`, plus
  `index.html`, `vite.config.js`. Controls layout, section order, styling.

When adding a feature, never push content into JSX or styling into markdown.
Text belongs in a `.md` file; media belongs in `content/`.

### Why content lives in `content/`, not `public/`

Vite cannot auto-discover (`import.meta.glob`) or import assets from `public/`.
By keeping media under `content/` and importing it, Vite bundles it with hashed,
cache-busted filenames that also respect the `base` path automatically. The
price is that media can't be referenced by a hardcoded URL — it's resolved at
build time (see `src/content-assets.js`).

## How it fits together

- `src/content-assets.js` — resolves the files in `content/` to their built
  URLs. Exports `logoUrl`, `bannerUrl`, and `mediaUrl(filename)` (looks up a
  photo/video by filename in `content/photos` + `content/videos`; external URLs
  pass through). This is the bridge that lets all media live in `content/`.
- `src/content.js` — auto-loads every `content/textes/*.md` file at build time
  (`?raw`), keyed by filename (`about.md` → `"about"`). `getContent(name)`.
- `src/App.jsx` — renders `<Header />`, `<Nav />`, the page sections (an explicit
  ordered list of `<Section name="..." />`, with `<Slideshow />` interleaved
  after `schedule`), then `<Footer />`. **This is where you add/reorder/remove
  sections** — edit the JSX list. Current order: hero, video, about, schedule,
  slideshow, ecole, escrime-entreprise, then the footer (contact).
- `src/components/Header.jsx` — header band. Imports `logoUrl`/`bannerUrl` from
  content-assets; applies the banner (`content/banniere.*`) via an inline
  `--header-banner` CSS variable; the logo (`content/logo.*`) sits left in a
  white rounded badge (`.site-logo` — the badge is deliberate; the logo has a
  solid white background). The club name is an `<h1>`; it's a `CLUB_NAME`
  constant here (site identity, also in the `index.html` `<title>`) — change
  both if renamed.
- `src/main.jsx` — sets the favicon at runtime from `logoUrl` (no hardcoded
  favicon in `index.html`).
- `src/components/Nav.jsx` — sticky menu bar under the header. A `links` array of
  `{ href, label }` anchors that smooth-scroll: `#top` (special fragment → top of
  page, "Accueil"), then one per section (`#about`, `#schedule`, `#ecole`,
  `#escrime-entreprise`), `#contact` (the footer). Section ids = markdown
  filenames. Scroll targets get `scroll-margin-top` in styles.css so headings
  clear the sticky bar. Adding a menu entry is a code edit here.
- `src/components/Video.jsx` — promo video shown right after `hero`. Reads a
  YouTube/Vimeo link from `content/textes/video.md`, extracts the id, and renders
  a responsive 16:9 `<iframe>` embed (`.video-embed`). No valid link → renders
  nothing. The video is intentionally NOT bundled (a real file is too large for
  static hosts like GitHub Pages' 100 MB/file cap); it stays on YouTube/Vimeo.
- `src/components/Slideshow.jsx` — full-width (edge-to-edge) photo strip, ≥50vh
  tall. Shows whole (uncropped) photos resized to the band height, side by side,
  scrolling in a seamless CSS loop (photo list duplicated; track animates to
  `translateX(-50%)`). Auto-discovers every image in `content/diaporama/` via
  `import.meta.glob`, in filename order. Rendered in `App.jsx`.
- `src/components/Section.jsx` — wraps one markdown file in a `<section>` (id =
  filename). Empty/missing file → renders nothing (layout stays intact).
- `src/components/Footer.jsx` — footer (blue background, white text,
  `id="contact"`) showing contact info from `content/textes/contact.md`. Contact
  is intentionally NOT in `App.jsx`'s section list — it lives only in the footer.
- `src/components/Markdown.jsx` — renders markdown via `react-markdown`
  (+ `remark-gfm` for tables/lists, + `rehype-raw` so `<video>`/`<img>` HTML
  works). Image/video `src` values are resolved by filename via `mediaUrl`.
- `src/styles.css` — all styling. Plain CSS. The real design goes here.

## Color palette (single source of truth)

The site uses a **3-color chart**, declared once in `:root` at the top of
`src/styles.css`:

- `--color-white` — backgrounds
- `--color-blue` — primary color
- `--color-red` — secondary color

Every other color is a *role* variable (`--color-text`, `--color-heading`,
`--color-link`, `--color-primary`, `--color-secondary`, `--color-bg-alt`) that
references one of those three. **Always style with the role variables**, never
hardcode hex values — so the user can re-theme by editing just the three colors.

## Conventions

- **Plain JavaScript/JSX**, not TypeScript.
- **Plain CSS** in `src/styles.css`. No CSS-in-JS, no Tailwind.
- Media is referenced from markdown by **filename only** (e.g.
  `![alt](photo.jpg)` / `<img src="photo.jpg">`); the file lives in
  `content/photos` (or `content/videos`) and is resolved by `mediaUrl`.
- Keep dependencies minimal. Current runtime deps: `react`, `react-dom`,
  `react-markdown`, `remark-gfm`, `rehype-raw`. Don't add more without a real
  need — the user asked not to over-engineer and to favor standard libraries.
- The site is in **French**.

## Adding a new section (the common task)

1. Create `content/textes/<name>.md` with the text.
2. Add `<Section name="<name>" />` to the list in `src/App.jsx` (right position).
3. Add a `{ href: '#<name>', label: '...' }` entry in `src/components/Nav.jsx` if
   it should be in the menu.
4. Style it in `src/styles.css` if it needs more than the defaults.
5. Update the table in `content/README.md` so the editor knows about it.

## Commands

- `npm run dev` — local dev server with hot reload.
- `npm run build` — production build into `dist/`.
- `npm run preview` — serve the built `dist/` locally to check it.

## Hosting

Not chosen yet. The build is a standard static bundle that works on any static
host. Because all media is bundled (not in `public/`), a sub-path deploy just
needs `base: '/<repo>/'` in `vite.config.js` — asset URLs adapt automatically.

## Design

The user provides the visual design directly in conversation. Don't invent a
look beyond neutral defaults; implement what they describe in `styles.css`
(and component structure if needed).
