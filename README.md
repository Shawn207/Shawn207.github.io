# Xiaoyang Zhan: personal website

A small static site built with [Astro](https://astro.build). It has a home page, a page for each project highlight (POSE, SEDEM, dynamic obstacle perception, air-ground exploration), and a CV page. There is no database, no CMS and no tracking.

## Run it on your computer

You need Node.js 22.12 or newer.

```bash
npm install
npm run dev      # live preview at http://localhost:4321
npm run build    # writes the finished site to dist/
```

## Where to edit things

Almost everything you will change lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `site.ts` | Name, headline, the intro paragraphs (links are written as `[label](https://…)`), the photo, the "looking for internships" line, research interest, strengths, education |
| `projects.ts` | The tiles under "Project Highlights" on the home page (short loop, status, text, link buttons) |
| `projectPages.ts` | The page behind each tile (`/projects/<id>/`): abstract, figures, tables, videos, BibTeX |
| `hardware.ts` | The "Hardware" section: robots, sensors, and the sensor-fusion result |
| `publications.ts` | The publication list (authors, venue, link buttons) |
| `news.ts` | The "Recent" list. Keep it to the current year |

Other files:

- `public/Xiaoyang_Zhan_CV.pdf` is the file behind the CV page. Replace it with the same file name. This copy has no phone number.
- `public/docs/SEDEM_IROS2026_slides.pdf` is the SEDEM slide deck linked from "Recent" and the SEDEM page.
- To remove the "Looking for internships" line, set `seeking` to `''` in `site.ts`.
- To add a link button, add `{ label: 'Code', href: 'https://…' }` to a `links` list. A button without `href` is shown as a dashed, inactive tag, which is how "Code (planned)" appears.

### Add a GIF-style preview to a project tile

The tile on the home page is a short silent loop. Big GIFs are slow to load (a 20 MB GIF is about 2 MB as an MP4), so convert first:

```bash
ffmpeg -i input.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=960:-2:flags=lanczos,fps=15" -an -crf 28 public/media/pose/preview.mp4
ffmpeg -i public/media/pose/preview.mp4 -frames:v 1 public/media/pose/preview.jpg
```

Then, in `projects.ts`, remove the `//` in front of the `tile:` line of that project and fix the file names and the description (`alt`). An actual `.gif` also works: `tile: { gif: '/media/x/preview.gif', alt: '…' }`. Without `tile`, the tile shows the YouTube thumbnail.

### Fill in the empty figure slots on a project page

In `projectPages.ts`, entries like `{ kind: 'figure', heading: 'Overview', src: '', alt: '', caption: '' }` are empty slots. They are not shown on the site. To fill one, copy the picture to `public/media/<project>/`, then set `src`, `width`, `height` (in pixels), `alt` (what the picture shows, for screen readers) and `caption`. The DODT papers have a `figures: []` list for the same purpose.

### Keep YouTube out of the page until someone presses play

Tiles without a `tile` show YouTube's thumbnail, so the browser contacts YouTube when the page loads. To avoid that, add a `tile` as above.

## Put it online with GitHub Pages

1. On GitHub, create a **public** repository named exactly `Shawn207.github.io`. If you already have one with that name (for example an older Jekyll page), delete its old files first so only this project remains.
2. Upload this folder's contents to it (the repository root should contain `package.json`):

   ```bash
   git init
   git add .
   git commit -m "Add personal website"
   git branch -M main
   git remote add origin https://github.com/Shawn207/Shawn207.github.io.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. The first run takes about a minute. The site appears at https://shawn207.github.io.

If the repository has a different name, the site will live under a sub-path. In that case add `base: '/repository-name'` in `astro.config.mjs` and change the `site` URL.

### Moving to your own domain later

1. Buy the domain, add a file `public/CNAME` containing just the domain name, and follow GitHub's "Configuring a custom domain" instructions in Settings → Pages.
2. Change `site` in `astro.config.mjs` and `url` in `src/data/site.ts` to the new address.
3. Change the `Sitemap:` line in `public/robots.txt`.

## Before you share the link

- [ ] Open the site on your phone and in both light and dark mode (the half-filled circle in the top right switches the theme).
- [ ] Open each project page and press play on its videos once.
- [ ] Check the author lists and venues in `publications.ts`.
- [ ] When code for POSE is released, give the "Code (planned)" button on the POSE page in `projectPages.ts` an `href`.
- [ ] Paste the link into a chat app to check the preview image (`public/og.png`).

## Notes

- The site follows the visitor's light or dark setting and remembers a manual choice.
- Loop videos pause when they are off screen, and stay paused (with controls) when the visitor's system asks for reduced motion.
- The email address is assembled in the browser, so it is not in the page source for simple scrapers.
- The font is Archivo (variable), served from the site itself.
