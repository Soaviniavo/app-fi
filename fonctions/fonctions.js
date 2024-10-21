
 export const transform_date = (_date) => {
    let transformed_date = new Date(_date) ;
    let today = new Date();
    if(transformed_date.toDateString() === today.toDateString()){
        return "Aujourd'hui"
    }
    return transformed_date.toDateString();
 } 

export const somme = (tab) => {
   var total = 0 ;
   for(let i = 0 ; i< tab.length; i++){
     total += parseInt(tab[i].montant);
   } 
   return total ;
}

const somme_depense_par_jour = (tab) => {
   var total = 0 ;
   for(let i = 0 ; i< tab.length; i++){
     if(tab[i].type === "dépense"){
        total += parseInt(tab[i].montant);     
     }
   } 
   return total ;
}

const somme_revenu_par_jour = (tab) => {
    var total = 0 ;
    for(let i = 0 ; i< tab.length; i++){
      if(tab[i].type === "revenu"){
         total += parseInt(tab[i].montant);     
      }
    } 
    return total ;
 }

export const groupData = (data) => {
   var gD =  data.reduce((acc, curr) => {
        const date = curr.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
    }, {}); 
    return gD;
};

export const to_section_data = (gD) => {
    var s = Object.keys(gD).map(date => ({
        title: date,
        depense_total : somme_depense_par_jour(gD[date]),
        revenu_total : somme_revenu_par_jour(gD[date]),
        data: gD[date]
    }));
    return s; 
}

export const total_par_mois = (gD) => {
    var T = 0 ;
    Object.keys(gD).map(date => {
        T = T + somme(gD[date]);
    });
    return T ; 
}

export const To_letter_mois = (mois) => {
    if(mois === 1){
        return 'Janvier';
    }
    if(mois === 2){
        return 'Février';
    }
    if(mois === 3){
        return 'Mars';
    }
    if(mois === 4){
        return 'Avril';
    }
    if(mois === 5){
        return 'Mai';
    }
    if(mois === 6){
        return 'Juin';
    }
    if(mois === 7){
        return 'Juillet';
    }
    if(mois === 8){
        return 'Aout';
    }
    if(mois === 9){
        return 'Septembre';
    }
    if(mois === 10){
        return 'Octobre';
    }
    if(mois === 11){
        return 'Novembre';
    }
    if(mois === 12){
        return 'Décembre';
    }
}

export const img_trans = (transaction_name) => {
    if(transaction_name === 'Carburant'){
        let img = require('../assets/categories_depense/carburant.png');
        return img;
    }
    if(transaction_name === 'Transport'){
      let img = require('../assets/categories_depense/transport.png');
      return img;
    }
    if(transaction_name === 'Cigarette'){
      let img = require('../assets/categories_depense/cigarettes.png');
      return img;
    }
    if(transaction_name === 'Nourriture'){
      let img = require('../assets/categories_depense/Nourriture.png');
      return img;
    }
    if(transaction_name === 'Electricité'){ 
      let img = require('../assets/categories_depense/electricite.png');
      return img;
    }
    if(transaction_name === 'Scolarité'){
      let img = require('../assets/categories_depense/etudes.png') ;
      return img;
    }
    if(transaction_name === 'Vêtements'){
      let img = require('../assets/categories_depense/Vetement.png');
      return img;
    }
    if(transaction_name === 'Amusement'){ 
      let img = require('../assets/categories_depense/amusement.png');
      return img;
    }
    if(transaction_name === 'Sport'){
      let img = require('../assets/categories_depense/sport.png');
      return img;
    }
    if(transaction_name === 'Revy'){
        let img = require('../assets/categories_depense/revy.png');
        return img;
    }
    if(transaction_name === 'Réparation'){
        let img = require('../assets/categories_depense/reparation.png');
        return img;
    }
    if(transaction_name === 'Animaux'){
        let img = require('../assets/categories_depense/chien.png') ;
        return img;
    }
    if(transaction_name === 'Cadeaux'){
        let img = require('../assets/categories_depense/cadeau.png') ;
        return img;
    }
    if(transaction_name === 'Loterie'){
        let img = require('../assets/categories_depense/loterie.png') ;
        return img;
    }
    if(transaction_name === 'Gouter'){
        let img = require('../assets/categories_depense/pizza.png') ;
        return img;
    }
    if(transaction_name === 'Evènement'){
        let img = require('../assets/categories_depense/Evenement.png') ;
        return img;
    }
    if(transaction_name === 'Achat'){
        let img = require('../assets/categories_depense/Achat.png') ;
        return img;
    }
    if(transaction_name === 'Cellulaire'){
        let img = require('../assets/categories_depense/Telecom.png') ;
        return img;
    }
    if(transaction_name === 'Musique'){
        let img = require('../assets/categories_depense/Musique.png');
        return img;
    }
    if(transaction_name === 'Loyer'){
        let img = require('../assets/categories_depense/Loyer.png');
        return img;
    }
    if(transaction_name === 'Salaire'){
        let img = require('../assets/categories_revenu/salaire.png') ;
        return img;
    }
    if(transaction_name === 'Transfert'){
        let img = require('../assets/categories_revenu/transfert.png') ;
        return img;
    }
    if(transaction_name === 'bonus'){
        let img = require('../assets/categories_revenu/bonus.png') ;
        return img;
    }
    if(transaction_name === 'Investment'){
        let img = require('../assets/categories_revenu/investment.png') ;
        return img;
    }
    if(transaction_name === 'Autres'){
        let img = require('../assets/categories_revenu/autre.png') ;
        return img;
    }
    if(transaction_name === 'Rémuneration'){
        let img = require('../assets/categories_revenu/remuneration.png') ;
        return img;
    }
    if(transaction_name === 'Pension'){
        let img = require('../assets/categories_revenu/retraite.png');
        return img;
    }

}