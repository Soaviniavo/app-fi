import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView ,Image, TouchableOpacity,StatusBar } from 'react-native';



export default function Transactions({ navigation }) {
  const [categories,setcategories] = useState([
    {key :1 , categorie : 'Nourriture' , icon_img : require('../assets/categories_depense/Nourriture.png') },
    {key :2 , categorie : 'Transport' , icon_img : require('../assets/categories_depense/transport.png') },
    {key :24 , categorie : 'Electricité',icon_img : require('../assets/categories_depense/electricite.png') },
    {key :3 , categorie : 'Scolarité' ,icon_img : require('../assets/categories_depense/etudes.png') },
    {key :17 , categorie : 'Loyer' ,icon_img : require('../assets/categories_depense/Loyer.png')},
    {key :4 , categorie : 'Vêtements', icon_img : require('../assets/categories_depense/Vetement.png') },
    {key :5 , categorie : 'Cigarette',icon_img : require('../assets/categories_depense/cigarettes.png') },
    {key :6 , categorie : 'Amusement',icon_img : require('../assets/categories_depense/amusement.png')},
    {key :7 , categorie : 'Sport' ,icon_img : require('../assets/categories_depense/sport.png')},
    {key :8 , categorie : 'Santé' ,icon_img : require('../assets/categories_depense/santé.png')},
    {key :9 , categorie : 'Voyage',icon_img : require('../assets/categories_depense/voyage.png')},
    {key :10 , categorie : 'Achat' ,icon_img : require('../assets/categories_depense/Achat.png')},
    {key :11 , categorie : 'Cellulaire',icon_img : require('../assets/categories_depense/Telecom.png')},
    {key :12 , categorie : 'Assurance' ,icon_img : require('../assets/categories_depense/assurance.png')},
    {key :25 , categorie : 'Musique' ,icon_img : require('../assets/categories_depense/Musique.png')},
    {key :13 , categorie : 'Dette',icon_img : require('../assets/categories_depense/Dette.png') },
    {key :14 , categorie : 'Electronique' ,icon_img : require('../assets/categories_depense/electronique.png')},
    {key :15 , categorie : 'Revy',icon_img : require('../assets/categories_depense/revy.png') },
    {key :16 , categorie : 'Réparation' ,icon_img : require('../assets/categories_depense/reparation.png') },
    {key :18 , categorie : 'Animaux',icon_img : require('../assets/categories_depense/chien.png') },
    {key :19 , categorie : 'Cadeaux' ,icon_img : require('../assets/categories_depense/cadeau.png')},
    {key :20 , categorie : 'Loterie',icon_img : require('../assets/categories_depense/loterie.png') },
    {key :22 , categorie : 'Gouter',icon_img : require('../assets/categories_depense/pizza.png') },
    {key :23 , categorie : 'Evènement' ,icon_img : require('../assets/categories_depense/Evenement.png')},
  ])

  return ( 
    <View style={Styles.container}>
        <StatusBar backgroundColor="green" />
        <ScrollView>
          <View style={Styles.content}>
            {
              categories.map((object) => {
                return <TouchableOpacity  key= {object.key} onPress={() => navigation.navigate("Ajout_Depense",object)}>
                          <View style={Styles.categorie}>
                              <Image source={object.icon_img} style={{ width:40 , height:40}}/>
                              <Text style={{ color:"#747264"}}>{object.categorie}</Text>
                          </View>
                      </TouchableOpacity>
               })
            }
          </View>
        </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'white',
  },
  content : {
    flexDirection: 'row',
    flexWrap : 'wrap',
    justifyContent: 'space-around',
  },
  categorie:{
    width : 90, 
    height : 90,
    marginVertical : 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  }
});
