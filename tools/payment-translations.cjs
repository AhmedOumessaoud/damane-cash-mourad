/* Applied after existing translations so service order matches the Arabic catalog. */
module.exports=function(t){
 const transfer=t.categories.transfer;
 Object.assign(transfer,{title:'Transferts internationaux',heading:'Services de transfert international',pageTitle:'Envoyer et recevoir des transferts internationaux',intro:'Envoyez et recevez de l’argent depuis l’étranger via les réseaux internationaux. Choisissez un réseau pour découvrir le service.'});
 const manda=t.services.transfer.splice(3,1)[0];
 t.services.transfer.push(
  ['Yalla Xash','Réception de transferts internationaux via Yalla Xash. Contactez-nous pour connaître les justificatifs, les conditions de réception et les frais.'],
  ['WorldRemit','Renseignez-vous sur la réception de transferts internationaux via WorldRemit et les démarches disponibles en agence.'],
  ['Money Exchange','Réception de transferts internationaux liés à Money Exchange. Confirmez les modalités, les justificatifs et les frais en agence.']
 );
 t.categories.domestic={title:'Transferts nationaux',heading:'Services de transfert national',pageTitle:'Envoyer et recevoir de l’argent au Maroc',intro:'Transferts au Maroc via Damane Mandat Express. Découvrez les modalités d’envoi et de réception.',note:transfer.note,topics:['Le service de transfert national souhaité','Les justificatifs et la référence de réception','Le montant et les frais avant confirmation']};
 t.services.domestic=[manda,['Damane Mandat Express','Envoi et réception d’argent au Maroc via Damane Mandat Express. Contactez-nous pour confirmer les justificatifs, les frais et les conditions.']];
 t.categories.wallets={title:'Dépôts et retraits des comptes et applications',heading:'Dépôts et retraits des comptes et applications',pageTitle:'Recharges, dépôts et retraits des comptes et applications',intro:'Dépôts, recharges et retraits des comptes et applications. Choisissez Orange Money, inwi money, Chari, MDJS ou Yassir pour vous renseigner sur votre opération.',note:'Les opérations, frais et plafonds dépendent du prestataire et des vérifications en agence. Ne partagez ni mot de passe ni code de confirmation sur le site.',topics:['Le compte ou l’application et l’opération souhaitée','Les vérifications et justificatifs nécessaires en agence','Le montant, les frais et le plafond avant l’opération']};
 t.services.wallets=[
  ['Orange Money','Dépôt, recharge et retrait d’argent du compte Orange Money. Contactez-nous pour connaître les conditions, les frais et les plafonds.'],
  ['inwi money','Recharge et retrait d’argent du compte inwi money selon les opérations disponibles. Confirmez les informations requises et les frais en agence.'],
  ['Chari Money','Dépôt et retrait d’argent du compte Chari Money. Renseignez-vous sur les conditions, les vérifications et les frais avant l’opération.'],
  ['MDJS','Recharge et retrait du solde du compte MDJS selon les conditions du prestataire et les opérations disponibles en agence. Confirmez les exigences et les frais.'],
  ['Yassir','Dépôt et retrait d’argent liés au compte Yassir. Contactez-nous pour confirmer les opérations disponibles, les justificatifs et les frais.']
 ];
 t.ui['الحسابات والتطبيقات']='Comptes et applications';
};
