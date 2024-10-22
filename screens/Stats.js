import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {  get_depenseMensuel,get_revenuMensuel } from '../database/db';
import { To_letter_mois,somme } from '../fonctions/fonctions';

export default function Stats({ navigation }) {
  const [depenses,setdepenses] = useState(0);
  const [revenus,setrevenus] = useState(0);
  //Calcul Mois 
  var today = new Date();
  var mois = To_letter_mois(today.getMonth() + 1) ;

    useEffect(() => {
        
        // calcul dépenses total 
        const dataMensuel= async () => {
          const depenseMensuel = await get_depenseMensuel();
          const revenuMensuel = await get_revenuMensuel();
          setdepenses(somme(depenseMensuel));
          setrevenus(somme(revenuMensuel));
        }
        
        dataMensuel();

    },[]);

  return (
    <View style={styles.container}>
       <View style={styles.content}>  
        <Text style={styles.title}>Statistiques Mensuelles ({mois})</Text>
          <View style={styles.detail}>
              <Text style={styles.text}> Dépenses : {depenses}</Text>
              <Text style={styles.text}> Revenus : {revenus}</Text>
          </View>
       </View>
       <TouchableOpacity  onPress={() => navigation.navigate("stats_dep")}>
          <View style={[styles.content,styles.stat]}>
            <Text style={{marginLeft : 10}}>Statistiques des dépenses</Text>
          </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate("stats_rev")}>
          <View style={[styles.content,styles.stat]}>
              <Text style={{marginLeft : 10}} >Statistiques des revenus</Text>
          </View>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
  },
  title: { 
    marginTop: 10,
    marginLeft:10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#747264',
    fontSize : 15,
    margin: 3
  },  
  detail : {
    marginLeft : 20,
    marginTop: 15
  },
  content : {
    marginTop: 20,
    width : 350,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
    borderStyle: "dashed",
    height: 150
  },
  stat :{
    justifyContent: 'center',
    height: 50
  }
});