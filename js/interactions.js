// Preserve old category#service links by opening the dedicated page.
(() => {
 function redirectLegacyLink(){
  if(document.body.dataset.page==='detail'||!location.hash)return;
  let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  if(!SERVICES.some(service=>service.id===id))return;
  location.replace(`${document.body.dataset.prefix||''}services/details/${id}.html`);
 }
 window.addEventListener('hashchange',redirectLegacyLink);
 redirectLegacyLink();
})();
