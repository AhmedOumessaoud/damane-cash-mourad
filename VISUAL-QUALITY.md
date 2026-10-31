# High-resolution visual upgrade

The latest upgrade replaces the small poster-cropped service photographs in the live homepage with optimized high-resolution generated artwork. Original reference files remain available for provenance; the complete poster is never embedded as the website.

## New assets

- One high-resolution storefront hero restored from the supplied promotional artwork. It is an illustrative reconstruction, not authenticated premises photography. The supplied header/footer logo is retained.
- Eight transparent blue-and-gold 3D category icons: transfer, telecom, insurance, administration, gaming, travel, CNSS and finance.
- Six transparent insurance illustrations: car, motorcycle, truck, travel, education and family.
- Nine local brand vector files from Simple Icons, plus original Remitly and Al Ansari assets from their primary websites. Their sources are listed in `assets/logos/vector/SOURCES.md`.
- Existing 37 scalable utility SVGs retained for clean, small action controls. Their XML/view boxes have been audited.

## Delivery

Generated files are copied into `assets/`, with source paths recorded locally in `assets/hq-generated-sources.json` (excluded from deployment). `tools/prepare-hq-assets.py` creates WebP sizes while preserving natural aspect ratios and alpha transparency:

- Hero: 640, 960 and 1440 pixels wide.
- Homepage photographs: 480, 960 and 1440 pixels wide.
- Category photographs: 640 and 1280 pixels wide.
- Category icons: up to 128 and 256 pixels wide.
- Insurance illustrations: up to 160 and 400 pixels wide.

The HTML uses responsive `srcset`/`sizes`, lazy loads below the fold, and prioritizes the hero. The hero layout preserves the complete facade instead of stretching a small crop. Insurance illustrations appear on both homepage cards and dedicated service cards/dialogs.

`css/quality.css` contains the visual upgrade rules. `tools/qa-quality.cjs` checks image loading, photo resolution, the six illustration dialogs and page overflow at the eight target viewport widths. Captures and its report are written to `output/quality/`.
