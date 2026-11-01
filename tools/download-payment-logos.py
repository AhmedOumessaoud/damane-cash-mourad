"""Fetch original brand artwork and normalize raster padding without upscaling."""
from pathlib import Path
from urllib.request import Request, urlopen
from io import BytesIO
from PIL import Image, ImageChops

root = Path(__file__).resolve().parents[1] / 'assets/logos/payments'
root.mkdir(parents=True, exist_ok=True)
sources = {
 'yalla-xash': 'https://mnf.ma/wp-content/uploads/2022/11/yallaxash_logo.jpg',
 'worldremit': 'https://images.ctfassets.net/sb7j5o4oxtgv/6ewORVHzAt0H7V1jCLObgr/f74e21f107d02b8d717c887406f0e87e/logo.svg',
 'money-exchange': 'https://moneyexchange.es/wp-content/uploads/2021/08/5-scaled.png',
 'chari': 'https://chari.ma/images/logo.png',
 'mdjs': 'https://mdjs.ma/wp-content/uploads/2019/05/logo-mdjs-1.png',
 'inwi-money': 'https://inwimoney.ma/sites/default/files/inwi_money.png',
 'orange-money': 'https://www.logo.wine/a/logo/Orange_Money/Orange_Money-Logo.wine.svg',
}
for name, url in sources.items():
 try:
  data = urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=25).read()
  if url.endswith('.svg'):
   assert b'<svg' in data
   if name=='worldremit':
    # The site's asset is a white symbol; compose its purple wordmark for white cards.
    import re
    original=data.decode('utf-8')
    body=re.sub(r'^.*?<svg[^>]*>', '', original, count=1, flags=re.S).rsplit('</svg>',1)[0]
    body=body.replace('#FFF','#8445cb')
    data=('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315 56"><g transform="translate(3 4) scale(1.2)">'+body+'</g><text x="61" y="39" font-family="Arial,sans-serif" font-weight="800" font-size="38" letter-spacing="-1.5" fill="#8445cb">WorldRemit</text></svg>').encode()
   if name=='orange-money':
    data=data.replace(b'viewBox="-22.35 -9.987675 193.7 59.92605"', b'viewBox="0 0 149 40"')
   (root / (name+'.svg')).write_bytes(data)
  else:
   im=Image.open(BytesIO(data)).convert('RGBA')
   bg=Image.new('RGBA',im.size,'white'); bg.alpha_composite(im)
   bounds=ImageChops.difference(bg.convert('RGB'),Image.new('RGB',im.size,'white')).point(lambda x:255 if x>35 else 0).getbbox()
   if bounds: im=im.crop(bounds)
   im.thumbnail((1000,400))
   im.save(root / (name+'.webp'),quality=95)
  print(name,'OK')
 except Exception as e: print(name,'FAILED',str(e))
(root/'SOURCES.md').write_text('# Payment logo sources\n\n'+ '\n'.join(f'- {name}: {url}' for name,url in sources.items())+'\n\nDamane Mandat Express and Yassir: vector redraws from user-supplied references.\n',encoding='utf-8')
