const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),translations=require('./translations-fr.cjs');
const data={};data.window=data;vm.createContext(data);vm.runInContext(fs.readFileSync(path.join(root,'js/data.js'),'utf8'),data);
const dictionary={...translations.ui};
for(const category of data.CATEGORIES){
 const fr=translations.categories[category.id];
 for(const key of ['title','heading','pageTitle','intro','note'])dictionary[category[key]]=fr[key];
 category.topics.forEach((value,index)=>dictionary[value]=fr.topics[index]);
 const services=data.SERVICES.filter(s=>s.category===category.id);
 services.forEach((service,index)=>{const [title,description]=translations.services[category.id][index];dictionary[service.title]=title;dictionary[service.description]=description;});
}
const entries=Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length);
function translate(value){
 if(dictionary[value])return dictionary[value];
 let result=value;for(const [ar,fr]of entries)result=result.split(ar).join(fr);
 result=result.replace(/عرض Tous les /g,'Voir tous les ').replace(/عرض جميع /g,'Voir tous les ').replace(/جميع /g,'Tous les ').replace(/خدمات /g,'services : ').replace(/بDkhissa/g,'à Dkhissa').replace(/طباعة/g,'').replace(/مسح ضوئي/g,'').replace(/نسخ الوثائق/g,'');
 return result.replace(/عرض جميع خدمات /g,'Voir tous les services : ').replace(/جميع خدمات /g,'Tous les services : ').replace(/استفسر عبر واتساب عن /g,'Se renseigner sur WhatsApp : ').replace(/استفسر عن /g,'Se renseigner sur ').replace(/البحث في خدمات /g,'Rechercher dans : ').replace(/تصفية حسب نوع الخدمة/g,'Filtrer par service').replace(/رسم توضيحي لخدمات /g,'Illustration : ').replace(/رسم توضيحي لـ/g,'Illustration : ').replace(/رسم توضيحي/g,'Illustration').replace(/تصور بصري محسّن/g,'Illustration améliorée').replace(/اتصل على /g,'Appeler le ').replace(/وكالة متعددة الخدمات/g,'Agence multiservices').replace(/خدمة للاستفسار/g,'services à découvrir').replace(/ — الرئيسية/g,' — Accueil');
}
const pages=['index.html','about.html','contact.html',...data.CATEGORIES.map(c=>`services/${c.slug}.html`),...data.SERVICES.map(s=>`services/details/${s.id}.html`)];
for(const page of pages){
 const source=fs.readFileSync(path.join(root,page),'utf8');
 const depth=page.split('/').length-1,prefix='../'.repeat(depth);
 const switcher=`<nav class="language-switch" aria-label="Langue / اللغة"><a href="${prefix}${page}" lang="ar" data-lang="ar" aria-current="true">AR</a><a href="${prefix}fr/${page}" lang="fr" data-lang="fr">FR</a></nav>`;
 let ar=source.replace('<button class="menu-toggle"',`${switcher}<button class="menu-toggle"`);
 ar=ar.replace('</head>',`<link rel="alternate" hreflang="fr" href="${new URL('fr/'+page,source.match(/rel="canonical" href="([^"]+)/)[1].split('/').slice(0,3).join('/')).href}"></head>`);
 fs.writeFileSync(path.join(root,page),ar);
 let fr=source.replace(/<html lang="ar" dir="rtl">/,'<html lang="fr" dir="ltr">');
 fr=fr.replace(/>([^<>]+)</g,(_,text)=>`>${translate(text)}<`);
 fr=fr.replace(/\b(alt|aria-label|placeholder|content)="([^"]*)"/g,(_,attr,value)=>`${attr}="${translate(value).replace(/"/g,'&quot;')}"`);
 // French pages share local assets/scripts/styles and retain same-language navigation.
 fr=fr.replace(/\b(src|srcset|href)="([^"]*)"/g,(match,attr,value)=>{
  if(/^(https?:|tel:|mailto:|#)/.test(value))return match;
  if(attr==='srcset')return match;
  if(/(?:assets|css|js|favicon\.svg)/.test(value))return `${attr}="../${value}"`;
  return match;
 });
 // srcset candidates all need the extra parent directory.
 fr=fr.replace(/srcset="([^"]+)"/g,(_,value)=>`srcset="${value.split(',').map(part=>'../'+part.trim()).join(', ')}"`);
 const frSwitch=`<nav class="language-switch" aria-label="Langue"><a href="${'../'.repeat(depth+1)}${page}" lang="ar" data-lang="ar">AR</a><a href="${prefix}${page}" lang="fr" data-lang="fr" aria-current="true">FR</a></nav>`;
 fr=fr.replace('<button class="menu-toggle"',`${frSwitch}<button class="menu-toggle"`);
 fr=fr.replace(/<script defer src="([^"]*js\/data.js)"><\/script>/,match=>`${match}<script defer src="${'../'.repeat(depth+1)}js/french-data.js"></script>`);
 fr=fr.replace(/https:\/\/wa.me\/212634038743\?text=([^"<]+)/g,(_,encoded)=>{let message=decodeURIComponent(encoded);for(const s of data.SERVICES){if(message.includes(s.title)){message=`Bonjour, je souhaite me renseigner sur le service ${translate(s.title)} chez Damane Cash Mourad.`;break;}}if(/[\u0600-\u06ff]/.test(message))message='Bonjour, je souhaite me renseigner sur vos services chez Damane Cash Mourad.';return 'https://wa.me/212634038743?text='+encodeURIComponent(message);});
 fr=fr.replace(/(<link rel="canonical" href="https?:\/\/[^/]+\/)/,'$1fr/').replace(/(<meta property="og:url" content="https?:\/\/[^/]+\/)/,'$1fr/').replace('content="ar_MA"','content="fr_MA"');
 const dest=path.join(root,'fr',page);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,fr);
}
fs.writeFileSync(path.join(root,'js/french-data.js'),`/* Generated French search data. */\nconst FRENCH_SERVICES=${JSON.stringify(data.SERVICES.map(s=>({id:s.id,title:translate(s.title),description:translate(s.description)})))};\nFRENCH_SERVICES.forEach(fr=>{const service=SERVICES.find(s=>s.id===fr.id);service.searchArabic=service.title;Object.assign(service,fr);});\n`);
console.log(`Localized ${pages.length} pages into French; AR/FR navigation added.`);
const sitemap=path.join(root,'sitemap.xml');
let xml=fs.readFileSync(sitemap,'utf8');
const siteOrigin=new URL(xml.match(/<loc>([^<]+)/)[1]).origin;
xml=xml.replace('</urlset>',pages.map(page=>`  <url><loc>${siteOrigin}/fr/${page}</loc></url>`).join('\n')+'\n</urlset>');
fs.writeFileSync(sitemap,xml);
