# Rucola, Little Chalfont

Website for Rucola, the Italian restaurant at 1 Chalfont Station Road, Little Chalfont, Amersham HP7 9PS.

A static site with no build step: open `index.html` in a browser, or host the folder on any static host (Netlify, GitHub Pages, Cloudflare Pages).

```
index.html            the page
assets/css/styles.css styles
assets/js/main.js     mobile nav, "open now" status, today's hours highlight
assets/img/           photos and favicon
```

## Keeping it up to date

- **Opening hours** live in two places: the table in `index.html` (`.hours`) and the `HOURS` object in `assets/js/main.js` (used for the "Open now" line). The `openingHoursSpecification` in the JSON-LD block in `index.html` is what Google reads, so update all three together.
- **Menu**: the dishes in the `#menu` section are a selection taken from public listings and reviews, without prices. Check them against the current menu and add prices if wanted.
- **Photos**: drop new images into `assets/img/` and update the `src`, `alt`, `width` and `height` attributes.
