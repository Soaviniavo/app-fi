import React,{useState,useEffect} from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { To_letter_mois } from '../fonctions/fonctions';
import { get_depenseMensuel } from '../database/db';
import * as SQLite from 'expo-sqlite';
import { somme } from '../fonctions/fonctions';


export default function PorteFeuille() {

  const [budgetMensuel,setBudgetMensuel] = useState(100000);
  const [depenses,setdepenses] = useState(0);
  var restant = budgetMensuel - depenses ;
  var revenus = 40000; 
  var epargne = revenus - depenses ; 

  //Calcul Mois 
  var today = new Date();
  var mois = To_letter_mois(today.getMonth() + 1) ;

  // calcul dépenses total
  const get_depenseMensuel= async () => {
    const db = await SQLite.openDatabaseAsync('appFiDatabase.db');
    const allRows = await  db.getAllAsync('SELECT * FROM depenses');
    var T = somme(allRows);
    setdepenses(T); 
  }
  
  console.log("j");
  get_depenseMensuel();

 
  
  useEffect(() => {
    
  },[])




  return (

    <View style={styles.container}>
      <View style={styles.content}>  
        <Text style={styles.title}>Budget Mensuel ({mois})</Text>
          <View style={styles.detail}>
              <Text style={styles.text}> Budget : {budgetMensuel}</Text>
              <Text style={styles.text}> Dépenses : {depenses}</Text>
              <Text style={styles.text}> Revenus : {revenus}</Text>
              <Text style={styles.text}> Restant : {restant}</Text>
              <Text style={styles.text}> Argent epargné : {epargne} </Text>
              <Text style={styles.text}>Graphe Reste du Budget( moins dépense )</Text>
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
    height: 250
  },
  detail : {
    marginLeft : 20,
    marginTop: 15
  }

});
