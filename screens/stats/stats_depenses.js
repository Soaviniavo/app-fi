import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { get_depenseMensuel } from "../../database/db";
import { To_letter_mois, somme,img_trans } from "../../fonctions/fonctions";


export default function Stats_depenses() {
  const [depenses, setdepenses] = useState(0);
  const [grouped_depense, setgrouped_depense] = useState([]);
  //Calcul Mois
  var today = new Date();
  var mois = To_letter_mois(today.getMonth() + 1);

  useEffect(() => {
    // calcul dépenses total
    const dataMensuel = async () => {
      const depenseMensuel = await get_depenseMensuel();

      // avoir la somme totale pour chaque categorie
      const result = {};
      depenseMensuel.forEach((item) => {
        if (result[item.categorie]) {
          result[item.categorie] += parseInt(item.montant);
        } else {
          result[item.categorie] = parseInt(item.montant);
        }
       // console.log(result);
      });
      const grouped_Data = Object.keys(result).map((categorie) => ({
        categorie: categorie,
        montant: result[categorie],
      }));

      setgrouped_depense(grouped_Data);

      setdepenses(somme(depenseMensuel));
    };

    dataMensuel();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
            <Image source={require('../../assets/img/growth.png')} style={{ width:30 , height:30,marginLeft:10}}/>
            <Text style={styles.text}> Dépense Totale ce Mois : <Text style={{fontStyle:'normal',fontWeight:'600',color:'red'}}>{depenses}</Text></Text>
      </View>
      <FlatList
        data={grouped_depense}
        renderItem={({ item }) => (
          <View style = {styles.depense}>
            <Image source={img_trans(item.categorie)} style={{width: 30 , height: 30, marginLeft: 15}}/>
            <Text>{item.categorie}</Text>
            <Text style={{marginRight: 20}}>{item.montant}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  depense: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 0.3,
      borderColor: "#bbb",
      borderStyle: 'solid',
      height: 60,
  },
  content : {
    justifyContent:'center',
    flexDirection:'row',
    alignItems: 'center',
    width : 350,
    height: 50
  },
  text: {
    color: '#747264',
    fontSize : 15,
    marginLeft: 10
  },  
});
