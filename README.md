# Prince Kanswal — Portfolio

A single-page personal portfolio: dark-first, fully static, deployed on Vercel.

Built with **Next.js 16** (App Router), **React 19**, **TypeScript** and
**Tailwind CSS v4**.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run build`     | Production build                                           |
| `npm start`         | Serve the production build                                 |
| `npm run lint`      | ESLint                                                     |
| `npm run typecheck` | `tsc --noEmit`                                             |
| `npm run icons`     | Regenerates `src/components/icons/icon-data.ts`            |

---

## Where the content lives

**Every word, link and date on the site comes from `src/data/site.ts`.** The
components only read from it, so editing that one file updates the whole page.
Nothing is duplicated in the markup.

All of it is taken from the résumé and the linked repositories. If a fact isn't
in one of those, it isn't on the site — there are no invented metrics, features,
testimonials or work history.

### Things you will likely want to change

**LeetCode link.** Set in `src/data/site.ts`:

```ts
export const LEETCODE_URL: string | null = "https://leetcode.com/u/Princek70/";
```

It appears in the contact section and the footer. Setting it to `null` removes
the entry from both at once.

**Profile photo.** The site ships a monogram placeholder — deliberately not a
photo, and not a generated likeness. To use a real one:

1. Save a square image to `public/` (e.g. `public/profile.jpg`, ~800×800)
2. In `src/components/ProfileAvatar.tsx` set `src: "/profile.jpg"` and
   `placeholder: false`

`next/image` then optimises it. The placeholder SVG doesn't go through the
optimiser, which is why the flag exists.

**Project screenshots.** There are none yet, so each card composes its own
visual from the project icon, a faint grid and an accent glow. To add a real
screenshot, set `image` on a project in `src/data/site.ts`:

```ts
{ name: "Delizioso", /* … */ image: "/projects/delizioso.png" }
```

The decorative panel is replaced by the image and nothing else about the card
changes.

**Ambient Expense Agent** has no public deployment, so its `live` field is
absent and the card renders only a GitHub button. There is no placeholder URL.

---

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable                          | Purpose                                                     |
| --------------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Canonical URL — used for metadata, canonical tags, OG URLs, `sitemap.xml` and `robots.txt` |
| `NEXT_PUBLIC_FORMSUBMIT_TARGET`   | Optional. Hides the contact address in the page source (see below) |

Both are optional — the site builds and deploys without them.

### Contact form

The form posts to [FormSubmit](https://formsubmit.co), which needs no account
and no endpoint ID: the destination is simply the address, taken from
`profile.email` in `src/data/site.ts`. Messages arrive at
**princekanswal70@gmail.com**.

**Do this once, after the first deploy.** FormSubmit confirms each new address
by email. Submit the form once yourself, open the confirmation message it sends
to that inbox, and click the link. Until you do, submissions are accepted but
not delivered. Every message after that arrives normally.

Two optional refinements once it is confirmed:

- FormSubmit emails you a random string that stands in for your address. Set
  `NEXT_PUBLIC_FORMSUBMIT_TARGET` to it and the address disappears from the page
  source. Until then it is visible in the markup — which is fine here, since the
  contact section already shows it.
- Submissions are rate limited (roughly 10–20 per hour on the free tier), and
  the form carries an off-screen honeypot field that quietly discards bots.

There are no secrets involved — every value is public by design — but
`.env.local` is gitignored regardless.

*Switched from Formspree deliberately: Formspree retired the email-in-the-URL
form of its endpoints, so it now requires an account and a generated form ID.
FormSubmit accepts the address directly.*

---

## Theming

Dark is the default experience, including for visitors with JavaScript disabled
(`<html class="dark">` is server-rendered). The toggle adds or removes that
class and persists the choice to `localStorage`; a small inline script in
`<head>` applies the stored value before first paint, so there is no flash of
the wrong theme.

To follow the operating system instead, change the fallback in
`src/lib/theme.ts` — the comment there shows the exact replacement.

Colour tokens are defined once in `src/app/globals.css` for both themes, so
contrast can be checked in a single place.

---

## Icons

Icons are plain SVG data rather than a runtime dependency.
`scripts/generate-icons.mjs` reads the icons it needs out of `react-icons`
(a dev dependency) and writes `src/components/icons/icon-data.ts`.

That means:

- icons render on the server as inline SVG — no client JavaScript for them
- each icon is a named export, so client components importing one icon don't
  pull in the other 45
- `react-icons` stays out of the production bundle entirely

Two entry points:

- `components/Icon.tsx` — `<Icon name="java" />`. Looks icons up by name, so it
  needs the full map. **Server Components only.**
- `components/icons/SvgIcon.tsx` — `<SvgIcon data={sun} />`. Import the icon
  directly. Use this in Client Components.

To add an icon, add it to the `ICONS` map in the generator and run
`npm run icons`.

---

## Deployment

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add the environment variables from `.env.example`
4. Deploy

No `vercel.json` is needed. Every route — including `robots.txt`,
`sitemap.xml`, the favicon and the Open Graph image — is prerendered as static
content.

Vercel Analytics is mounted in the root layout and needs no configuration. It
only reports once deployed on Vercel.

When a custom domain is added, change `NEXT_PUBLIC_SITE_URL` and nothing else:
the canonical tag, Open Graph URLs, sitemap and robots all derive from it.

---

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, and each
  section labelled by its own heading
- A skip link, visible focus rings, and keyboard-operable navigation with
  `aria-expanded` / `aria-current`
- The theme toggle's accessible name and icon are swapped in CSS, so the
  announced label always matches the current theme
- Form fields have real labels, `aria-invalid`, and errors tied on with
  `aria-describedby`; the first invalid field is focused on submit
- Status messages use `role="status"` / `role="alert"`
- `prefers-reduced-motion` disables scroll reveals, smooth scrolling, the
  spinner animation and theme transitions — and a `<noscript>` rule keeps every
  section visible when JavaScript never runs
