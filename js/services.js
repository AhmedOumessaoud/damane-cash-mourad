(() => {
 const input=document.getElementById('service-search');if(!input)return;
 const cards=[...document.querySelectorAll('.detail-card')],filters=[...document.querySelectorAll('[data-group]')];let activeGroup='all';
 const normalize=text=>text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ـ/g,'');
 function render(){const query=normalize(input.value.trim());let count=0;cards.forEach(card=>{const service=SERVICES.find(s=>s.id===card.id);const visible=(activeGroup==='all'||service.group===activeGroup)&&normalize(`${service.title} ${service.titleFr} ${service.description}`).includes(query);card.hidden=!visible;if(visible)count++;});document.querySelector('.result-count').textContent=`${count} خدمة للاستفسار`;document.querySelector('.empty-state').hidden=count!==0;}
 filters.forEach(button=>button.addEventListener('click',()=>{activeGroup=button.dataset.group;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
 input.addEventListener('input',render);
 document.getElementById('reset-search').addEventListener('click',()=>{input.value='';activeGroup='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group==='all')));render();input.focus();});
})();
