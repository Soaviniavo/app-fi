import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView ,Image, TouchableOpacity,StatusBar } from 'react-native';

export default function Transactions({ navigation }) {
    const [categories,setcategories] = useState([
      {key :1 , categorie : 'Salaire' , icon_img : require('../assets/categories_revenu/salaire.png') },
      {key :2 , categorie : 'Pension' , icon_img : require('../assets/categories_revenu/retraite.png') },
      {key :3 , categorie : 'Transfert' ,icon_img : require('../assets/categories_revenu/transfert.png') },
      {key :4 , categorie : 'Rémuneration', icon_img : require('../assets/categories_revenu/remuneration.png') },
      {key :5 , categorie : 'bonus',icon_img : require('../assets/categories_revenu/bonus.png')},
      {key :6 , categorie : 'Investment',icon_img : require('../assets/categories_revenu/investment.png')},
      {key :7 , categorie : 'Autres' ,icon_img : require('../assets/categories_revenu/autre.png')},
    ])

    return ( 
        <View style={Styles.container}>
            <StatusBar backgroundColor="green" />
            <ScrollView>
              <View style={Styles.content}>
                {
                  categories.map((object) => {
                    return <TouchableOpacity  key= {object.key} onPress={() => navigation.navigate("Ajout_revenu",object)}>
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