 export const img_trans = (depense_name) => {
    if(depense_name === 'Transport'){
      let img = require('../assets/categories_depense/transport.png');
      return img;
    }
    if(depense_name === 'Cigarette'){
      let img = require('../assets/categories_depense/cigarettes.png');
      return img;
    }
    if(depense_name === 'Nourriture'){
      let img = require('../assets/categories_depense/Nourriture.png');
      return img;
    }
    if(depense_name === 'Electricité'){ 
      let img = require('../assets/categories_depense/electricite.png');
      return img;
    }
    if(depense_name === 'Scolarité'){
      let img = require('../assets/categories_depense/etudes.png') ;
      return img;
    }
    if(depense_name === 'Vêtements'){
      let img = require('../assets/categories_depense/Vetement.png');
      return img;
    }
    if(depense_name === 'Amusement'){ 
      let img = require('../assets/categories_depense/amusement.png');
      return img;
    }
    if(depense_name === 'Sport'){
      let img = require('../assets/categories_depense/sport.png');
      return img;
    }
    if(depense_name === 'Revy'){
        let img = require('../assets/categories_depense/revy.png');
        return img;
    }
    if(depense_name === 'Réparation'){
        let img = require('../assets/categories_depense/reparation.png');
        return img;
    }
    if(depense_name === 'Animaux'){
        let img = require('../assets/categories_depense/chien.png') ;
        return img;
    }
    if(depense_name === 'Cadeaux'){
        let img = require('../assets/categories_depense/cadeau.png') ;
        return img;
    }
    if(depense_name === 'Loterie'){
        let img = require('../assets/categories_depense/loterie.png') ;
        return img;
    }
    if(depense_name === 'Gouter'){
        let img = require('../assets/categories_depense/pizza.png') ;
        return img;
    }
    if(depense_name === 'Evènement'){
        let img = require('../assets/categories_depense/Evenement.png') ;
        return img;
    }
    if(depense_name === 'Achat'){
        let img = require('../assets/categories_depense/Achat.png') ;
        return img;
    }
    if(depense_name === 'Cellulaire'){
        let img = require('../assets/categories_depense/Telecom.png') ;
        return img;
    }
    if(depense_name === 'Musique'){
        let img = require('../assets/categories_depense/Musique.png');
        return img;
    }

}

   
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
