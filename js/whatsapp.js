/* Service-specific enquiries: no information is submitted or stored by this site. */
window.whatsappURL=serviceName=>`https://wa.me/${BUSINESS.international}?text=${encodeURIComponent(document.documentElement.lang==='fr'?`Bonjour, je souhaite me renseigner sur le service ${serviceName} chez Damane Cash Mourad.`:`السلام عليكم، بغيت نستفسر على خدمة ${serviceName} عند ضمان كاش مراد.`)}`;
window.openWhatsApp=serviceName=>window.open(whatsappURL(serviceName),'_blank','noopener,noreferrer');
