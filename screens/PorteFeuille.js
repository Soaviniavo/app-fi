import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,ScrollView,Button } from 'react-native';
import { To_letter_mois,somme } from '../fonctions/fonctions';
import {  get_depenseMensuel,get_revenuMensuel } from '../database/db';
import * as SQLite from 'expo-sqlite';
import PieChart from 'react-native-pie-chart'


export default function PorteFeuille() {

  const budgetMensuel = 700000;
  const [depenses,setdepenses] = useState(0);
  const [revenus,setrevenus] = useState(0);
  var restant = budgetMensuel - depenses ;
  var epargne = revenus - depenses ; 
  var pourcentage = Math.round((100 * restant) / budgetMensuel) ; 
  //Calcul Mois 
  var today = new Date();
  var mois = To_letter_mois(today.getMonth() + 1) ;

  const widthAndHeight = 200;
  const series = [restant,budgetMensuel-restant];
  const sliceColor = ['#A0D683', '#DEE5D4'];

  
  
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

    <ScrollView style={{backgroundColor: "#fff"}} >
      <View style={styles.container} >
          <View style={styles.content}>  
            <Text style={styles.title}> {mois}</Text>
              <View style={styles.detail}>
                  <Text style={styles.text}> Dépenses : {depenses}</Text>
                  <Text style={styles.text}> Revenus : {revenus}</Text>
                  <Text style={styles.text}> Argent epargné : {epargne} </Text>
              </View>
          </View>
          <View style={[styles.content,styles.graph_content]}>  
            <Text style={styles.title}>Budget Mensuel </Text>
              <View style={styles.detail}>
                  <Text style={styles.text}> Budget : {budgetMensuel}</Text>
                  <Text style={styles.text}> Restant : {restant}</Text>
                  <Text style={styles.pourcentage}>{pourcentage}%</Text>
                  <View style={styles.graph_style}>
                    <PieChart
                      widthAndHeight={widthAndHeight}
                      series={series}
                      sliceColor={sliceColor}
                      coverRadius={0.6}
                    />
                  </View>
              </View>
          </View>
          <View style={[styles.content,styles.epargne_content]}>  
            <Text style={styles.title}>Epargne</Text>
              <View style={styles.detail}>
                  <Text style={styles.text}>Le mois dernier : 400 000</Text>
                  <Text style={styles.text}>Votre epargne Totale : 1 321 700</Text>
              </View>
              <View style={styles.btn}>
                 <Button  title={'Créer Un Objectif financier'} />
              </View>
          </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
    marginBottom: 15 
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
    borderStyle: "dashed",
    height: 150
  },
  graph_content : {
    height: 370
  },
  graph_style : {
    flex: 1 ,
    marginLeft: 50,
    marginTop: 25 
  },
  detail : {
    marginLeft : 20,
    marginTop: 15
  },
  pourcentage : {
    position :'absolute', 
    marginTop: 160,
    marginLeft: 130,
    fontSize: 25
  },
  btn: {
    width: 290 ,
    marginLeft : 25,
    marginTop : 14
  },
  epargne_content : {
    height: 180
  },

});
