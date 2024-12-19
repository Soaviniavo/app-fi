import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView ,Image, TouchableOpacity,StatusBar } from 'react-native';
import categories_rev from '../data/categories/revenus';
export default function Transactions({ navigation }) {


    return ( 
        <View style={Styles.container}>
            <StatusBar backgroundColor="green" />
            <ScrollView>
              <View style={Styles.content}>
                {
                  categories_rev.map((object) => {
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