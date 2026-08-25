# LinkHub — All My Links

Personal links landing page. Next.js (App Router) + Tailwind CSS v4 +
react-hot-toast + Remix Icon.

## 1. Install

```bash
npm install
```

## 2. Fill in your data (no code editing needed for content)

| File | What it controls |
|---|---|
| `data/profile.js` | Your name, role, avatar path, code line, status |
| `data/links.js` | Every card: name, description, `show`, `hasLink`, `url`, `copyValue` |
| `data/config.js` | WhatsApp number, Web3Forms access key, site name/description |

**Required before the contact form works:**
```bash
cp .env.example .env.local
```
Then open `.env.local` and paste your free Web3Forms Access Key from
[web3forms.com](https://web3forms.com):
```
WEB3FORMS_KEY=your_real_key_here
```
This key is read only by `app/api/contact/route.js` on the server — it's
never sent to the browser or bundled into any client file. The visitor
enters their own name, country code + number, and picks "WhatsApp" or
"Callback"; the form posts to your own `/api/contact` route, which
forwards it to Web3Forms. You receive it by email and reach out yourself.
Your own number is never needed in the code. `.env.local` is already
covered by `.gitignore`. Restart `npm run dev` after adding the key.

## 3. Add your assets

See `public/ASSETS_README.md` for the exact filenames expected for icons,
your photo, and the background video. Everything degrades gracefully if a
file is missing — no broken images anywhere.

## 4. Run it

```bash
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/                   Routes: page, layout, loading, error, not-found, globals.css
components/
  layout/               TopBar, Footer
  profile/               ProfileHeader, Avatar
  links/                 LinksGrid, LinkCard
  contact/               ContactButton, ContactModal
  ui/                    AppLoader, BackgroundVideo, IconImage, ToasterProvider
data/                   links.js, profile.js, config.js — all content lives here
lib/                    clipboard.js, validation.js, iconFallbacks.js, AppReadyContext.js
public/
  icons/                 Social icon PNGs (see ASSETS_README.md)
  images/                Avatar + video poster
  video/                 Background video
```

## Notes on how it's built

- **Loading screen**: `AppLoader` blocks first paint until the background
  video and avatar report ready (or a 4.5s timeout, so a slow/missing
  asset never hangs the page).
- **Icon fallback**: `IconImage` swaps to a Remix Icon glyph per-card if a
  PNG 404s — one missing icon never affects the rest.
- **Text selection**: disabled globally via `.no-select` on `<body>`.
- **Copy vs Visit**: controlled entirely by `hasLink` in `data/links.js` —
  set to `false` and the card renders a single full-width Copy button.
- **Visibility**: set `show: false` on any link entry to hide that card
  without deleting its data.
- **Sizing consistency**: every button/pill uses the `--size-btn-h` /
  `--size-btn-h-sm` / `--size-icon` tokens defined in `app/globals.css`,
  so control sizing never drifts between components.
