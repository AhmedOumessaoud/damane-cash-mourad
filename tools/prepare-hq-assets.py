"""Create responsive local WebP variants while preserving source aspect ratios."""
from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
sources = json.loads((ROOT / 'assets/generated-sources.json').read_text(encoding='utf-8'))
home = ROOT / 'assets/images/home'
home.mkdir(parents=True, exist_ok=True)

def variants(source, folder, stem, widths, quality=88):
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        if image.mode == 'RGBA':
            bounds = image.getchannel('A').point(lambda value: 255 if value > 8 else 0).getbbox()
            if bounds:
                padding = round(max(bounds[2]-bounds[0], bounds[3]-bounds[1]) * 0.04)
                image = image.crop((max(0,bounds[0]-padding),max(0,bounds[1]-padding),min(image.width,bounds[2]+padding),min(image.height,bounds[3]+padding)))
        for width in widths:
            target = image.copy()
            target.thumbnail((width, 5000), Image.Resampling.LANCZOS)
            suffix = '' if width == max(widths) else f'-{width}'
            folder.mkdir(parents=True, exist_ok=True)
            target.save(folder / f'{stem}{suffix}.webp', quality=quality, method=6)

for name, source in sources.items():
    if name in ('transfer', 'telecom', 'insurance', 'administration', 'gaming', 'travel'):
        variants(source, home, name + '-hq', [480, 960, 1440])
        variants(source, ROOT / 'assets/images/categories', name + '-hq', [640, 1280])

for name in ('cnss', 'finance'):
    variants(ROOT / f'assets/images/{name}.webp', home, name + '-hq', [480, 960, 1440])

manifest_file = ROOT / 'assets/hq-generated-sources.json'
if manifest_file.exists():
    for key, source in json.loads(manifest_file.read_text(encoding='utf-8')).items():
        if key == 'hero-hq':
            variants(source, home, 'hero-hq', [640, 960, 1440], 92)
        elif key.startswith('icon-'):
            variants(source, ROOT / 'assets/icons/categories', key[5:], [128, 256], 91)
        elif key.startswith('insurance-'):
            variants(source, ROOT / 'assets/illustrations/insurance', key[10:], [160, 400], 92)

print('Prepared high-resolution, responsive WebP assets without stretching.')
