# DevPath — Online IT Courses Catalog

Course project for «Веб-технології та веб-дизайн» (KPI, ННІ ПСА).
Author: Baibarza Myroslav, KN-43. Topic #5 — **Online IT Courses Catalog**.

- **Lab 1 (Figma):** [DevPath mockup — Desktop 1280 / Mobile 360](https://www.figma.com/design/xkoXdcYgg0KJTDNNr2RqSi/DevPath-%E2%80%94-Lab-1-%E2%80%94-Baibarza-KN-43)
- **Lab 2 (HTML & semantics):** this repository, preview: `https://<user>.github.io/<repo>/`

## Pages

| Page | File | Key semantics |
|------|------|---------------|
| Home | `index.html` | `header/nav`, hero `section` + search `form[role=search]`, `dl` stats, `aside` progress card with `progress`, category list, course cards (`article`), CTA |
| Courses | `courses.html` | breadcrumbs `nav`, filters `aside > form > fieldset/legend`, toolbar `form[role=search]` + `select`, results `section`, live result counter, pagination `nav` |
| Course details | `course.html` | `article` with **schema.org/Course microdata**, purchase `aside` (`data`, `del`), curriculum `ol > details/summary`, instructor, reviews (`blockquote`, `time`), related `aside` |
| Enrollment | `enroll.html` | steps `ol[aria-current=step]`, form with `fieldset/legend`, `label[for]`, `autocomplete`, radio plans, error message slot, summary `table` (`caption`, `th[scope]`, `tfoot`, `output`) |

All navigation uses **relative links** (`./courses.html`, `./course.html?id=1#instructor` …).
`npm run validate` checks HTML (html-validate) and that no relative link, image or `#anchor` is broken.

## Lab 2 checklist

- [x] 4 pages with semantic tags: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, tables and forms
- [x] Responsive images: `picture` + `srcset`/`sizes`, WebP with JPEG fallback, art direction for the hero (`media`), `width/height`, `loading="lazy"`
- [x] `alt` for every image, `aria-label`/`aria-labelledby`/`aria-current`/`aria-expanded` for interactive elements, skip link
- [x] BEM class names, **no inline styles** (styles come in Lab 3)
- [x] **Extra:** EJS templating — header, footer, course card, picture and breadcrumbs are partials (`src/views/partials`), pages are rendered from `api/db.json`
- [x] **Extra:** schema.org microdata for `Course` (Offer, AggregateRating, Review, Person, Syllabus, CourseInstance)
- [x] **Bonus:** i18n via data attributes: `data-i18n`, `data-i18n-attr`, `data-i18n-args`; dictionaries `src/i18n/en.json`, `src/i18n/uk.json` (try `?lang=uk`)

## Quick start

```bash
npm install
npm run dev:vite      # EJS -> HTML (watch) + Vite + json-server
```
- App: http://localhost:5173
- API: http://localhost:5174

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run html` | render `src/views/pages/*.ejs` → `index.html`, `courses.html`, `course.html`, `enroll.html` |
| `npm run dev:vite` | HTML watch + Vite dev server + json-server |
| `npm run lint` | ESLint (flat config `eslint.config.js`) |
| `npm run validate` | html-validate + broken links check |
| `npm run build:vite` | lint → html → validate → Vite build to `dist/` |
| `npm run deploy` | build and publish `dist/` to the `gh-pages` branch |

> The root `*.html` files are **generated**. Edit templates in `src/views/`, then run `npm run html`.

## Structure

```
api/                 db.json (t5_* data for this topic), routes.json
scripts/
  build-html.js      EJS renderer (server-side templating at build time)
  check-links.js     relative links / anchors checker
  make-images.py     generates responsive WebP/JPEG images
src/
  assets/images/     courses/, hero/, avatars/  (-400/-800 … .webp + .jpg)
  i18n/              en.json, uk.json
  js/                main.js, i18n.js (+ api/, core/ from the template)
  styles/            SCSS 7-1 (Lab 3)
  views/
    partials/        head, header, footer, course-card, picture, breadcrumbs
    pages/           index, courses, course, enroll
```
