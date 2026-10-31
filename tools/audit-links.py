"""Read-only local link/asset audit for every generated HTML page."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parent.parent
PAGES = [ROOT / 'index.html', ROOT / 'about.html', ROOT / 'contact.html', *sorted((ROOT / 'services').rglob('*.html'))]

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.refs.append(attrs[key])
        if 'srcset' in attrs:
            self.refs.extend(item.strip().split()[0] for item in attrs['srcset'].split(',') if item.strip())

parsed = {}
for page in PAGES:
    parser = Parser()
    parser.feed(page.read_text(encoding='utf-8'))
    parsed[page.resolve()] = parser

failures = []
count = 0
for page, parser in parsed.items():
    for ref in parser.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        target = (page.parent / unquote(url.path)).resolve() if url.path else page
        count += 1
        if not target.is_file():
            failures.append(f'{page.name}: missing {ref}')
        elif url.fragment and target in parsed and unquote(url.fragment) not in parsed[target].ids:
            failures.append(f'{page.name}: missing anchor {ref}')
assert not failures, '\n'.join(failures)
print(f'PASS: {len(PAGES)} pages, {count} local links/assets/anchors; no broken paths.')
