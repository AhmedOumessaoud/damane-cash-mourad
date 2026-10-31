# Dedicated service pages

The user requested direct page navigation instead of service popups. The builder now creates 93 individual detail pages at `services/details/{service-id}.html`, alongside the original 11 pages.

- Homepage service previews navigate directly to the relevant detail URL.
- Category cards use normal links; their clickable area covers the full card. WhatsApp remains a separate direct contact action.
- Detail pages contain the service description, enquiry topics, applicable notes, verified steps/documents only when available, and WhatsApp/call actions. No new unverified claims were introduced.
- Related services, category return links and the main navigation all work with relative paths, including direct static file opening.
- The shared shell no longer emits any dialog element. `js/interactions.js` only supports legacy hash-link redirection and does not open overlays.
- `sitemap.xml` includes all 104 pages.
- `qa.cjs` checks dedicated-page generation, navigation, whole-card clicks, legacy redirects, search, image loading, representative responsive pages and JavaScript errors. `tools/audit-links.py` scans all pages recursively.
