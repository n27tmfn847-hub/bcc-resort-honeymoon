# BCC Resort — Honeymoon Experience

Stable QR destination for the BCC Resort honeymoon digital guest experience.

## Purpose

Guests receive a printed honeymoon greeting card containing a QR code. The QR
must point to a permanent public URL whose address never changes, even when the
website behind it is fully redesigned and reimplemented.

This repository serves a live guided honeymoon experience for a single guest,
Mr. Alex. The URL is stable and printable now; the content can be redesigned
later without changing the URL.

## Current status

Live. A four-step guided experience (Welcome, A Message, Thank You, Our Team) in
a single static HTML file with inline CSS/JS. Fully in English. No build step,
no dependencies.

## Public URL

Permanent custom domain, served from this VPS (Caddy, static files):

```
https://bulanmadu.dikapersonal.my.id
```

Host: VPS `159.223.42.25`. Web server: Caddy (config
`/etc/caddy/Caddyfile`). Site root: `/var/www/bcc-resort-honeymoon/`.

### QR code target

The QR code printed on the greeting card must encode exactly:

```
https://bulanmadu.dikapersonal.my.id/honeymoon/demo/
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

| Path                | Served by                                    |
| ------------------- | -------------------------------------------- |
| `/`                 | `index.html` (redirects to the demo route)   |
| `/honeymoon/demo/`  | `honeymoon/demo/index.html` (guided experience) |

Routes map to directories with an `index.html`, so no server or SPA router is
required. Caddy serves them directly.

## Experience

Single guest (Mr. Alex), single static file, four steps, English:

1. **Welcome** — greeting with the guest name.
2. **A Message** — personal message signed by the resort.
3. **Thank You** — closing.
4. **Our Team** — the staff looking after the stay:
   - I Made Sukra Mahardika
   - Ni Putu Bunga Mentari
   - I Putu Pradita Wiguna
   - I Kadek Dwi Adnyana

Navigation: Next/Back buttons, progress dots, arrow keys, Enter, and touch swipe.
Respects `prefers-reduced-motion`. Works without JS as a vertical fallback.

## Future token architecture

The final experience may serve per-guest routes:

```
/honeymoon/:token      e.g. /honeymoon/7xK92mQ
```

- The QR encodes only the public entry path (`/honeymoon/demo/` at print time).
- A random **token** identifies the guest experience.
- **No personal guest information is ever encoded in the URL.**
- Not implemented yet. The current build hardcodes a single guest. Add a token
  source only when more than one guest needs the experience.

## Replacing the experience content

1. Edit `honeymoon/demo/index.html` (or build a final React/TypeScript output
   and place it at the same path).
2. Keep the `/honeymoon/demo/` route working.
3. Deploy to the VPS as described below.
4. **Do not change the printed URL and do not regenerate the QR code.**

## Deployment

Static hosting on the VPS under Caddy. The `main` branch holds the source of
truth; deploy by copying the site files to `/var/www/bcc-resort-honeymoon/`
(Caddy reload not needed for static file changes). No build command, no
dependencies. The `.nojekyll` file disables Jekyll processing.

### Deployment steps

```sh
# 1. Sync files to the web root
cp -r index.html honeymoon .nojekyll /var/www/bcc-resort-honeymoon/

# 2. Only after editing the Caddyfile:
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

### Tests

```sh
node test/check.mjs   # asserts the 4 steps and required content markers
```

### Caddyfile

```
bulanmadu.dikapersonal.my.id {
	root * /var/www/bcc-resort-honeymoon
	file_server
}
```

Caddy obtains and renews the Let's Encrypt TLS certificate automatically.

### DNS

`bulanmadu.dikapersonal.my.id` resolves to this VPS (`159.223.42.25`). Provider
for `dikapersonal.my.id` is `ns1/ns2.clouden.id`. No further DNS change needed.