(() => {
 const topButton=document.querySelector('.back-top');
 const update=()=>{topButton.classList.toggle('visible',window.scrollY>500);document.body.classList.toggle('past-hero',window.scrollY>320);};window.addEventListener('scroll',update,{passive:true});update();
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:.06});
  document.querySelectorAll('.home-band .band-content,.benefit-grid,.approach-grid,.related-grid').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
 }
})();
