# BCC Resort — Honeymoon Experience

Stable QR destination for the BCC Resort honeymoon digital guest experience.

## Purpose

Guests receive a printed honeymoon greeting card containing a QR code. The QR
must point to a permanent public URL whose address never changes, even when the
website behind it is fully redesigned and reimplemented.

This repository currently contains a **minimal placeholder** so that the URL is
live and printable immediately. The full experience is not built yet.

## Current status

Placeholder. A single static page that says the experience is being prepared.

## Public URL

Permanent custom domain (GitHub Pages, no build step, served from the repository
root on `main`):

```
https://honeymoon.hercules.my.id
```

The old project URL `https://n27tmfn847-hub.github.io/bcc-resort-honeymoon/`
redirects to the custom domain.

### QR code target

The QR code printed on the greeting card must encode exactly:

```
https://honeymoon.hercules.my.id/honeymoon/demo/
```

> **IMPORTANT:** The QR code should continue pointing to the same URL even when
> the website design/content is replaced. Never regenerate the QR for a new
> design. Keep this path stable forever.

This is the permanent hostname. Do not migrate again.

Do **not** encode into a QR:

- `localhost` or any development server URL
- temporary preview / tunnel URLs
- branch or commit specific URLs
- randomly generated deployment URLs

## Routing

| Path                | Served by                                   |
| ------------------- | ------------------------------------------- |
| `/`                 | `index.html` (redirects to the demo route)  |
| `/honeymoon/demo/`  | `honeymoon/demo/index.html` (placeholder)   |

Routes map to directories with an `index.html`, so no server or SPA router is
required. GitHub Pages serves them directly.

## Future token architecture

The final experience will serve per-guest routes:

```
/honeymoon/:token      e.g. /honeymoon/7xK92mQ
```

- The QR encodes only the public entry path (`/honeymoon/demo/` at print time).
- A random **token** identifies the guest experience.
- **No personal guest information is ever encoded in the URL.**
- The token backend is not implemented yet. `demo` is a reserved placeholder
  token for now.

## Replacing the placeholder with the final website

1. Build the final BCC Resort honeymoon experience (React/TypeScript or any
   static output).
2. Make its production build resolve `/honeymoon/demo/` (and later
   `/honeymoon/:token`) to the app entry — copy the build output into this
   repository's directory structure, or add a build workflow that does so.
3. Keep the `/honeymoon/demo/` path working, or add a `404.html` fallback that
   routes unknown `/honeymoon/*` paths into the app.
4. Push to `main`. GitHub Pages redeploys automatically.
5. **Do not change the printed URL and do not regenerate the QR code.**

## Deployment

Static hosting via GitHub Pages, source = `main` branch, root folder
(`/`). The custom domain is set via the `CNAME` file
(`honeymoon.hercules.my.id`). No build command, no dependencies. Pushing to
`main` updates the live site. The `.nojekyll` file disables Jekyll processing.

### DNS

The custom subdomain requires one record at the DNS provider for
`hercules.my.id` (Cloudflare):

| Type  | Host       | Target                  | TTL  |
| ----- | ---------- | ----------------------- | ---- |
| CNAME | `honeymoon` | `n27tmfn847-hub.github.io` | 3600 |

Do not add `http://`, `https://`, a path, or a trailing slash to the target.
If the record is proxied (Cloudflare orange cloud), set it to **DNS only** (grey
cloud) until GitHub issues the TLS certificate, then HTTPS can be enforced.