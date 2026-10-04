# Xiaoyang Zhan: personal website

A small static site built with [Astro](https://astro.build). It has a home page, a project page for POSE, and a CV page. There is no database, no CMS and no tracking.

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
| `site.ts` | Name, headline, bio, the "looking for internships" line, links, research themes, education |
| `projects.ts` | The project tiles on the home page (video, status, text, link buttons) |
| `publications.ts` | The publication list (authors, venue, link buttons) |
| `news.ts` | The "Recent" list |

Other files:

- `public/Xiaoyang_Zhan_CV.pdf` is the file behind the CV page. Replace it with the same file name. This copy has no phone number.
- `src/pages/projects/pose.astro` is the POSE project page. Copy it to add another project page, then set `page:` on that project in `projects.ts`.
- To remove the "Looking for internships" line, set `seeking` to `''` in `site.ts`.
- To add a link button, add `{ label: 'Code', href: 'https://…' }` to a `links` list. A button without `href` is shown as a dashed, inactive tag, which is how "Code (planned)" appears.

### Replace the hero animation with a real clip

The animation on the home page is a generated simulation, labelled as one. To use a real recording instead, put a short, silent, looping MP4 (about 5 MB or less) in `public/media/`, then set `heroVideo` and `heroCaption` in `site.ts`.

### Keep YouTube out of the page until someone presses play

Project tiles show YouTube's thumbnail, which means the browser contacts YouTube when the page loads. To avoid that, save a 16:9 image per video in `public/media/` and set `poster: '/media/your-image.jpg'` on the project in `projects.ts`.

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
- [ ] Press the play button on each project video once.
- [ ] Check the author lists and venues in `publications.ts`.
- [ ] When code for POSE is released, give the "Code (planned)" button on `pose.astro` an `href`.
- [ ] Paste the link into a chat app to check the preview image (`public/og.png`).

## Notes

- The site follows the visitor's light or dark setting and remembers a manual choice.
- The home-page animation pauses when it is off screen or the tab is hidden, and shows a finished still map when the visitor's system asks for reduced motion.
- The email address is assembled in the browser, so it is not in the page source for simple scrapers.
- The font is Archivo (variable), served from the site itself.
