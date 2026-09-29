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

**Profile photo.** Two files, and the distinction matters:

| File | Role |
| --- | --- |
| `public/profile.jpg` | The untouched original studio shot. Not referenced by any component. |
| `public/profile.png` | What the site actually renders: the backdrop keyed out, cropped above the waist. Generated. |

To use a different photo, overwrite `public/profile.jpg` and run `npm run
portrait`. The script crops and keys the backdrop, then writes `profile.png`.
It expects the same setup — a plain, evenly lit backdrop that contrasts with
the subject — and prints how much it removed, so you can tell at a glance
whether the key worked. If your photo is framed differently, adjust `CROP` at
the top of `scripts/make-portrait.mjs`; it errors out if the crop does not fit
the source rather than producing a silently wrong image.

Already have a cut-out on a transparent background? Skip the script: save it
as `public/profile.png` directly and update `width`/`height` in
`src/components/ProfileAvatar.tsx` to its real dimensions.

**Resolution.** The current original is 570×1000, which the hero displays at up
to 461px wide — so on a 2× display it is being stretched to roughly 1.6× its
real pixels and reads slightly soft. A larger original fixes it and nothing
else has to change: `next/image` never upscales, so it serves whatever the
source supports. Somewhere around 1400px wide is plenty. Crop `CROP` in
`scripts/make-portrait.mjs` will need its numbers scaled to the new source.

Nothing is cropped at render time. It is displayed at up to 461px wide, and
`next/image` serves roughly 30KB of WebP for it. The `sizes` prop in
`src/components/ProfileAvatar.tsx` mirrors the Hero's own widths — if you change
how wide the figure renders, change `sizes` too, or the browser will pick a
source that is too small.

**How the portrait sits on the page.** The hero is a split screen: a near-black
field with a solid lime block down the right, and the cut-out figure standing on
the seam between them, anchored to the bottom edge. Three things keep that
working:

- The image is a cut-out on transparency, so nothing is masked at render time —
  the flat waist crop simply meets the bottom of the section. A figure cropped
  anywhere else will show its cut edge as a hard line.
- The lime block starts just below the navbar rather than at the top of the
  page. White is the only colour that reads on the black half and near-black the
  only one that reads on lime, so a nav spanning both cannot stay legible at
  every width; giving the bar its own black band settles it. The block is sized
  as a share of the viewport, not of the content column, so the split lands in
  the same place at every width.
- The figure is anchored to the content column's bottom-right, so it reaches
  back across the seam into the black by a fixed proportion rather than drifting
  as the window widens.

**Project screenshots.** `public/projects/` holds the three screenshots, cropped
to 16:9 at 2000×1125:

| File | Project |
| --- | --- |
| `architectai.jpg` | ArchitectAI |
| `delizioso.jpg` | Delizioso |
| `ambient-expense-agent.jpg` | Ambient Expense Agent |

The card frame is `aspect-16/9`, so the images fill it exactly and nothing is
cropped at any breakpoint. To swap one, overwrite the file keeping the name, or
point `image` in `src/data/site.ts` at a new one:

```ts
{ name: "Delizioso", /* … */ image: "/projects/delizioso.png" }
```

The details sit in a dark glass panel *below* the image rather than over it —
these are full-page screenshots, and an overlay covered the part worth seeing.
That panel is always dark with white text, so light and dark images both work.

**Wallpaper.** Off by default — the background is a gradient wash. To put an
image behind the whole page, set `wallpaper` in `src/data/site.ts`:

```ts
export const wallpaper = { src: "/wallpaper.jpg", opacity: 0.35 };
```

`public/wallpaper-placeholder.svg` previews the slot before you have a file.
A dimming tint is applied on top, so text contrast does not depend on the image.

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
| `NEXT_PUBLIC_WEB3FORMS_KEY`       | Contact form access key. Strongly recommended — see below   |
| `NEXT_PUBLIC_FORMSUBMIT_TARGET`   | Optional. Hides the contact address in the page source (see below) |

All are optional — the site builds and deploys without them.

### Contact form

Delivery lives in `src/lib/contact.ts`; `ContactForm.tsx` is only the interface.
Messages arrive at **princekanswal70@gmail.com**, taken from `profile.email` in
`src/data/site.ts`.

**Set `NEXT_PUBLIC_WEB3FORMS_KEY`.** Get a free key by entering your address at
[web3forms.com](https://web3forms.com) — it arrives by email. It needs no server
and no confirmation step, and it has a dashboard where you can see submissions.

That dashboard is the actual reason to prefer it. A form backend that fails
quietly is indistinguishable from a form nobody is using, and you would only
find out when someone mentioned it.

**Why there are two providers.** FormSubmit is used when no Web3Forms key is
set, and as the fallback when one is. They are tried in order, so a provider
being down costs a retry rather than the message.

FormSubmit was the original choice because it needs no account: the destination
is just the address. It was demoted after its API returned HTTP 500 to every
request for an extended period — including for addresses that had never been
used — while its homepage kept answering `200`. Every uptime checker polls the
homepage, so nothing reported an outage, and the site had no way to tell a
broken backend from a working one.

**What happens when every provider fails.** The visitor gets an explanation, a
button that opens their message pre-filled in their own mail client, and the
address in plain text. The form is not reset on failure, so nothing they typed
is lost. There are three routes because the fallback should not itself be a
single point of failure.

**FormSubmit's one manual step.** It confirms each new address by email: submit
the form once, open the confirmation message, click the link. Until then it
accepts submissions without delivering them. This applies only when FormSubmit
is actually in use — Web3Forms needs no confirmation.

Two smaller notes:

- Submissions are rate limited by both providers (roughly 10–20 per hour on
  FormSubmit's free tier), and the form carries an off-screen honeypot that
  quietly reports success to bots without sending anything.
- Failures are logged to the console per provider, so "the service is down" and
  "the network dropped" are distinguishable after the fact.

There are no secrets involved — `NEXT_PUBLIC_*` values are compiled into the
page by definition — but `.env.local` is gitignored regardless.

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

Two scopes opt out of the toggle and stay dark in both themes: `.section-dark`,
for a whole block (the contact panel), and `.on-dark`, which overrides only the
text tokens so it can be layered onto a transparent element — that is how the
navbar stays legible while floating over the hero. Both work by re-declaring the
`--ink` / `--line` / `--brand` custom properties, because the Tailwind theme is
defined with `@theme inline` and every colour utility resolves through those
variables rather than a literal.

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

The repository is [princek70/prince-portfolio](https://github.com/princek70/prince-portfolio).

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add the environment variables from `.env.example`
3. Deploy

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
