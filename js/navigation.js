(() => {
 const mobileButton=document.querySelector('.menu-toggle'),mobileNav=document.getElementById('mobile-nav');
 const servicesButton=document.querySelector('.services-toggle'),servicesMenu=document.getElementById('service-menu');
 function closeMenus(){mobileNav.hidden=true;mobileButton.setAttribute('aria-expanded','false');servicesMenu.hidden=true;servicesButton.setAttribute('aria-expanded','false');}
 mobileButton.addEventListener('click',()=>{const open=mobileNav.hidden;closeMenus();mobileNav.hidden=!open;mobileButton.setAttribute('aria-expanded',String(open));});
 servicesButton.addEventListener('click',()=>{const open=servicesMenu.hidden;closeMenus();servicesMenu.hidden=!open;servicesButton.setAttribute('aria-expanded',String(open));});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenus();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!mobileNav.hidden)mobileButton.focus();else if(!servicesMenu.hidden)servicesButton.focus();closeMenus();}});
 mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenus));
 matchMedia('(min-width: 761px)').addEventListener('change',closeMenus);
 matchMedia('(min-width: 601px)').addEventListener('change',closeMenus);
})();
