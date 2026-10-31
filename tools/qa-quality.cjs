const {chromium}=require(process.env.DAMANE_PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=require('node:path').resolve(__dirname,'..');const data={};data.window=data;vm.createContext(data);vm.runInContext(fs.readFileSync(root+'/js/data.js','utf8'),data);
const routes=['index.html','about.html','contact.html',...data.CATEGORIES.map(c=>`services/${c.slug}.html`)];
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage();const errors=[],missing=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4173')&&r.status()>=400)missing.push(r.url());});
 fs.mkdirSync(root+'/output/quality',{recursive:true});
 const widths=[320,360,375,390,430,768,1024,1440];let imageCount=0;
 for(const route of routes){
  await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:4173/'+route);await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('.reveal').forEach(el=>el.classList.add('revealed'));await Promise.allSettled([...document.images].map(img=>{img.loading='eager';return img.decode()}));});
  const bad=await page.locator('img').evaluateAll(images=>images.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(bad,[],route);
  const photoWidths=await page.locator('figure img').evaluateAll(async images=>Promise.all(images.map(async i=>{const bitmap=await createImageBitmap(await(await fetch(i.currentSrc)).blob());const result={src:i.currentSrc,width:bitmap.width};bitmap.close();return result;})));assert.ok(photoWidths.every(i=>i.width>=600),`Low-resolution photographic art: ${JSON.stringify(photoWidths)}`);
  imageCount+=await page.locator('img').count();
  for(const width of widths){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Overflow ${route} @${width}`);}
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`${root}/output/quality/${route.replace('services/','').replace('.html','')}-mobile.png`,fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:`${root}/output/quality/${route.replace('services/','').replace('.html','')}-desktop.png`,fullPage:true,animations:'disabled'});
  console.log('PASS images / 8 widths:',route);
 }
 await page.goto('http://127.0.0.1:4173/services/insurance.html');
 for(const key of ['car','motorcycle','truck','travel-insurance','student','family']){await page.goto(`http://127.0.0.1:4173/services/details/insurance-${key}.html`);await page.locator('.category-art img').evaluate(i=>i.decode());assert.ok((await page.locator('.category-art img').getAttribute('src')).includes('/illustrations/insurance/'));assert.equal(await page.locator('dialog').count(),0);}
 await page.goto('http://127.0.0.1:4173/index.html');await page.setViewportSize({width:743,height:1000});await page.evaluate(async()=>{document.querySelectorAll('.reveal').forEach(e=>e.classList.add('revealed'));await Promise.allSettled([...document.images].map(i=>{i.loading='eager';return i.decode()}))});await page.screenshot({path:root+'/output/quality/reference-width.png',fullPage:true,animations:'disabled'});
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);await browser.close();
 const report={result:'PASS',pages:routes.length,widths,decodedImageElements:imageCount,illustratedInsurancePages:6,jsErrors:errors,missingLocalAssets:missing};fs.writeFileSync(root+'/output/quality/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exit(1)});
