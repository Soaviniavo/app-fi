import categories_dep from '../data/depenses';
import categories_rev from '../data/revenus';

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
    switch (mois) {
        case 1: return 'Janvier';
        case 2: return 'Février';
        case 3: return 'Mars';
        case 4: return 'Avril';
        case 5: return 'Mai';
        case 6: return 'Juin';
        case 7: return 'Juillet';
        case 8: return 'Aout';
        case 9: return 'Septembre';
        case 10: return 'Octobre';
        case 11: return 'Novembre';
        case 12: return 'Décembre';
    }
}


export const img_trans = (transaction_name) => {
    let img = require('../assets/categories_depense/electricite.png')
    categories_dep.map((object) =>{
        if(object.categorie === transaction_name){
           img = object.icon_img
        }
    })
    categories_rev.map((object) =>{
        if(object.categorie === transaction_name){
           img = object.icon_img
        }
    })

    return img;
}