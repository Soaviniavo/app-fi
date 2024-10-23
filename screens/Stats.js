import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import {  get_depenseMensuel,get_revenuMensuel } from '../database/db';
import { To_letter_mois,somme } from '../fonctions/fonctions';

export default function Stats({ navigation }) {
  const [depenses,setdepenses] = useState(0);
  const [revenus,setrevenus] = useState(0);
  var epargne = revenus - depenses ; 
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
         <View style={styles.content_title}>
              <Image source={require('../assets/img/statistics.png')} style={{width: 30 , height: 30,marginTop: 4}}/>
              <Text style={styles.title}>Statistiques Mensuelles ({mois})</Text>
          </View>
          <View style={styles.detail}>
              <Text style={styles.text}> Dépenses : {depenses}</Text>
              <Text style={styles.text}> Revenus : {revenus}</Text>
              <Text style={styles.text}> Argent epargné : {epargne} </Text>
          </View>
       </View>
        <View style={[styles.content,styles.epargne]}>
            <Image source={require('../assets/img/growth.png')} style={{ width:30 , height:30,marginLeft:10}}/>
            <Text style={styles.text}> Epargne Totale : 1321700</Text>
        </View>
       <TouchableOpacity  onPress={() => navigation.navigate("stats_dep")}>
          <View style={[styles.content,styles.stat]}>
            <Text style={{marginLeft : 13}}>Statistiques des dépenses</Text>
            <Image source={require('../assets/img/arrow.png')} style={{ width:20 , height:20,marginRight: 14}}/>
          </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate("stats_rev")}>
          <View style={[styles.content,styles.stat]}>
              <Text style={{marginLeft : 13}} >Statistiques des revenus</Text>
              <Image source={require('../assets/img/arrowG.png')} style={{ width:19 , height:19,marginRight: 14}}/>
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
    marginLeft:10,
    fontSize: 18,
    fontWeight : '500'  },
  text: {
    color: '#747264',
    fontSize : 15,
    fontStyle:'italic',
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
    height: 160
  },
  epargne:{
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'green'
  },
  content_title:{
    flexDirection:'row',
    height:35,
    alignItems: 'center',
    marginLeft:10
  },
  stat :{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  }
});