# Damane Cash Mourad — complete static website

Latest navigation update: all 93 individual services now have dedicated static pages under `services/details/` (104 pages total). Homepage previews and entire category cards navigate directly to these pages. No modal, bottom sheet or popup remains in the generated HTML. Old category `#service-id` links redirect to the corresponding detail page. Each page retains the description, enquiry topics, verified information when available, WhatsApp, call and return links.

Arabic RTL website built with HTML5, CSS3 and vanilla JavaScript. No frontend framework, backend, runtime package installation or personal-data collection.

## Pages

- `index.html`: reference-led illustrated homepage, eight service previews, seven benefits and contact footer.
- `services/money-transfer.html`
- `services/telecommunications.html`
- `services/insurance.html`
- `services/administration.html`
- `services/gaming.html`
- `services/travel.html`
- `services/cnss-amo.html`
- `services/damane-salaf.html`
- `about.html`
- `contact.html`

The shared database contains **93 distinct services**. Closely overlapping services are combined in a single explicit entry: for example trainee insurance includes company/factory internships, and vehicle forms cover both buying and selling.

## Preview

Open `index.html` directly, or start a local static server:

```powershell
python -m http.server 4173
```

Visit http://localhost:4173. All pages, styles, images and scripts use relative paths. Cairo and Tajawal are loaded from Google Fonts when available, with local fallbacks.

## Editing and rebuilding

`js/data.js` is the single source of content: categories, Arabic/French keywords, individual descriptions, enquiry topics, availability flags and unverified offers.

After changing it, regenerate the static HTML and SVG files:

```powershell
node tools/build.cjs
```

`tools/build.cjs` generates all 11 complete HTML pages using reusable header, footer, service-card, hero and contact components. Node is a development/build convenience; visitors receive static files only. Checked-in HTML works without a build. All service descriptions and contact links remain present even without JavaScript; JavaScript enhances search, filters, menus and detail sheets.

- `css/global.css`: tokens, typography, shared base.
- `css/components.css`: header, footer, buttons, navigation, modal and reusable UI.
- `css/home.css`: illustrated homepage composition.
- `css/services.css`: service, about and contact pages.
- `css/responsive.css`: mobile layouts and breakpoints.
- `css/animations.css`: light animations and reduced-motion support.
- `js/navigation.js`: mobile menu, service dropdown, keyboard dismissal.
- `js/interactions.js`: accessible native dialog, Escape/focus restoration, deep links, service-specific contact actions.
- `js/services.js`: Arabic/French search and group filtering.
- `js/whatsapp.js`: reusable encoded WhatsApp URL generator.

## Vercel

Import this folder as a project with the **Other** framework preset. `vercel.json` sets the build command to `node tools/build.cjs` and output directory to `.`. No API keys or backend are required.

The builder uses `SITE_ORIGIN`, Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, or `VERCEL_URL` to generate absolute sitemap URLs. The local fallback is `http://localhost:4173`. For a custom domain set `SITE_ORIGIN` or run:

```powershell
node tools/build.cjs --origin=https://YOUR-CONFIRMED-DOMAIN
```

Do not publish the local sitemap without rebuilding for the deployment domain. The domain is intentionally not guessed. The project is prepared for deployment; no publication has been performed.

## Verification

The high-resolution visual upgrade adds a restored illustrative hero, eight transparent 3D category icons, six insurance illustrations and responsive WebP sizes. See `VISUAL-QUALITY.md`. The homepage now uses HD artwork instead of the small poster crops; utility icons stay crisp SVG. The optional `python tools/prepare-hq-assets.py` regenerates image variants from the recorded local generation sources; deployed sites use the checked-in assets and require no Python.

The optional `qa.cjs` uses Playwright installed outside this project. Set `DAMANE_PLAYWRIGHT_PATH` to that package directory, run the local server and execute `node qa.cjs`.

It checks all 11 pages, all 93 service dialogs and personalized WhatsApp messages, Arabic/French search, group filters, empty/reset states, mobile navigation, Escape/focus behavior, mobile bottom sheets, direct file opening, deep links, local assets and horizontal overflow at 320, 360, 375, 390, 430, 768, 1024 and 1440 pixels. Screenshots and a JSON report are saved under `output/qa/` and excluded from deployment.

## Business review and asset limits

The two supplied images are composite advertising designs. No separate authenticated photograph of the premises or standalone official logo master was supplied. The unmodified supplied brand lockup and storefront artwork are reused; the About/Contact captions identify the storefront as illustration. Generated category scenes depict services, not real employees or premises. See `ASSET-INVENTORY.md` and `DESIGN-INVENTORY.md`.

Phone and locality agree with the references; the email is supplied by the brief. Exact street address/map pin, opening hours, current availability, partnerships, insurance pricing/coverage, finance eligibility/repayment terms and documents remain unverified. No unsupported figures or guarantees are rendered. Stored unverified offers cannot appear automatically merely by changing a flag; reviewed presentation and complete terms must be added deliberately.

WhatsApp links open draft enquiries. Nothing is sent until the visitor chooses to send it in WhatsApp. No identity, banking or medical files are requested by the site.
