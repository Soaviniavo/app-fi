import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView ,Image, TouchableOpacity,StatusBar } from 'react-native';



export default function Transactions({ navigation }) {
  const [items,setItems] = useState([
    {key :1 , item : 'Nourriture' , icon_img : require('../assets/categories_depense/Nourriture.png') },
    {key :2 , item : 'Transport' , icon_img : require('../assets/categories_depense/transport.png') },
    {key :24 , item : 'Electricité',icon_img : require('../assets/categories_depense/electricite.png') },
    {key :3 , item : 'Scolarité' ,icon_img : require('../assets/categories_depense/etudes.png') },
    {key :17 , item : 'Loyer' ,icon_img : require('../assets/categories_depense/Loyer.png')},
    {key :4 , item : 'Vêtements', icon_img : require('../assets/categories_depense/Vetement.png') },
    {key :5 , item : 'Cigarette',icon_img : require('../assets/categories_depense/cigarettes.png') },
    {key :6 , item : 'Amusement',icon_img : require('../assets/categories_depense/amusement.png')},
    {key :7 , item : 'Sport' ,icon_img : require('../assets/categories_depense/sport.png')},
    {key :8 , item : 'Santé' ,icon_img : require('../assets/categories_depense/santé.png')},
    {key :9 , item : 'Voyage',icon_img : require('../assets/categories_depense/voyage.png')},
    {key :10 , item : 'Achat' ,icon_img : require('../assets/categories_depense/Achat.png')},
    {key :11 , item : 'Cellulaire',icon_img : require('../assets/categories_depense/Telecom.png')},
    {key :12 , item : 'Assurance' ,icon_img : require('../assets/categories_depense/assurance.png')},
    {key :25 , item : 'Musique' ,icon_img : require('../assets/categories_depense/Musique.png')},
    {key :13 , item : 'Dette',icon_img : require('../assets/categories_depense/Dette.png') },
    {key :14 , item : 'Electronique' ,icon_img : require('../assets/categories_depense/electronique.png')},
    {key :15 , item : 'Revy',icon_img : require('../assets/categories_depense/revy.png') },
    {key :16 , item : 'Réparation' ,icon_img : require('../assets/categories_depense/reparation.png') },
    {key :18 , item : 'Animaux',icon_img : require('../assets/categories_depense/chien.png') },
    {key :19 , item : 'Cadeaux' ,icon_img : require('../assets/categories_depense/cadeau.png')},
    {key :20 , item : 'Loterie',icon_img : require('../assets/categories_depense/loterie.png') },
    {key :22 , item : 'Gouter',icon_img : require('../assets/categories_depense/pizza.png') },
    {key :23 , item : 'Evènement' ,icon_img : require('../assets/categories_depense/Evenement.png')},
  ])

  return ( 
    <View style={Styles.container}>
        <StatusBar backgroundColor="green" />
        <ScrollView>
          <View style={Styles.content}>
            {
              items.map((object) => {
                return <TouchableOpacity  key= {object.key} onPress={() => navigation.navigate("Ajout_Depense",object)}>
                          <View style={Styles.item}>
                              <Image source={object.icon_img} style={{ width:40 , height:40}}/>
                              <Text style={{ color:"#747264"}}>{object.item}</Text>
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
  item:{
    width : 90, 
    height : 90,
    marginVertical : 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  }
});
