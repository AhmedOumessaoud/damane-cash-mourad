# Arabic and French

The site now includes 104 Arabic and 104 French static pages. The AR / FR control in the shared header links to the same page in the other language. Service links remain within the selected language, and both versions work without a backend or translation service.

- Arabic routes stay at the root; French routes use `fr/`.
- Arabic uses `lang="ar" dir="rtl"`; French uses `lang="fr" dir="ltr"`.
- `tools/translations-fr.cjs` holds French category/service descriptions and interface translations.
- `tools/localize.cjs` generates the French pages and language controls after the shared HTML build. Run `node tools/build.cjs` after editing content.
- French enquiry links contain French WhatsApp messages. Search supports French and Arabic service names; result counts use the selected language.
- `css/language.css` adjusts navigation spacing and French text layout.
- The sitemap includes both languages. Domain URLs are set by the existing deployment-origin configuration.
- `tools/qa-language.cjs` exercises language navigation, direction, representative service pages, responsive widths, French search and local image loading.

The business logo and words inside supplied brand/storefront images remain as part of the original artwork. Editable text, service descriptions, navigation and contact actions are translated.
