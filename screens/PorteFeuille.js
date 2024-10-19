import React,{useState,useEffect} from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { To_letter_mois } from '../fonctions/fonctions';
import {  get_depenseMensuel,get_revenuMensuel } from '../database/db';
import * as SQLite from 'expo-sqlite';
import { somme } from '../fonctions/fonctions';


export default function PorteFeuille() {

  const budgetMensuel = 400000;
  const [depenses,setdepenses] = useState(0);
  const [revenus,setrevenus] = useState(0);
  var restant = budgetMensuel - depenses ;
  var epargne = revenus - depenses ; 

  //Calcul Mois 
  var today = new Date();
  var mois = To_letter_mois(today.getMonth() + 1) ;

  
  
  useEffect(() => {
    
      // calcul dépenses total 
      const dataMensuel= async () => {
        const depenseMensuel = await get_depenseMensuel();
        const revenuMensuel = await get_revenuMensuel();
        setdepenses(somme(depenseMensuel))
        setrevenus(somme(revenuMensuel));
      }
      
      dataMensuel();

  },[])




  return (

    <View style={styles.container}>
      <View style={styles.content}>  
        <Text style={styles.title}>Statistiques Mensuelles ({mois})</Text>
          <View style={styles.detail}>
              <Text style={styles.text}> Dépenses : {depenses}</Text>
              <Text style={styles.text}> Revenus : {revenus}</Text>
              <Text style={styles.text}> Argent epargné : {epargne} </Text>
          </View>
      </View>
      <View style={styles.content}>  
        <Text style={styles.title}>Budget Mensuel </Text>
          <View style={styles.detail}>
              <Text style={styles.text}> Budget : {budgetMensuel}</Text>
              <Text style={styles.text}> Restant : {restant}</Text>
          </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
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
  content : {
    marginTop: 20,
    width : 350,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
    height: 150
  },
  detail : {
    marginLeft : 20,
    marginTop: 15
  }

});
