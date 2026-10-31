# Mobile design update

The supplied mobile reference guides the phone layout without reproducing the decorative phone frame or OS status bar.

- Compact header with logo, phone, menu and AR/FR control.
- Side-by-side hero artwork and headline; full-width trust badges and contact actions below the headline.
- Compact illustrated service bands with gold curved separators.
- Horizontally scrollable quick categories, insurance/administration previews and benefit cards, preserving readable tap targets.
- Fixed bottom navigation: home, services, about, contact and WhatsApp. Safe-area padding reserves space for modern phones; floating controls are hidden to avoid overlap.
- Existing dedicated service pages and French translation remain functional.

`css/mobile.css` is the final responsive layer. `tools/qa-mobile.cjs` checks the dock, menu, image loading, Arabic/French layouts and overflow at seven widths. `output/mobile-reference.png` records the phone result.

The latest reference correction gives every illustrated band a broad, alternating curved cut, with a continuous gold gradient visible between panels. Navy/electric-blue backgrounds, ice-blue/white surfaces, blue pill buttons and operator colors follow the supplied mobile reference. The hero uses a dedicated gold swoosh in `assets/decor/mobile-swoosh.svg`. Dark backgrounds are retained behind white transfer-company logos for contrast.
