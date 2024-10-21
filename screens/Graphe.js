import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  get_depenseMensuel,get_revenuMensuel } from '../database/db';

export default function Graphe() {
    useEffect(() => {
        
        // calcul dépenses total 
        const dataMensuel= async () => {
          const depenseMensuel = await get_depenseMensuel();
          const revenuMensuel = await get_revenuMensuel();
        }
        
        dataMensuel();

    },[]);

  return (
    <View style={styles.container}>
        <Text style={styles.title}> {mois}</Text>
            <View style={styles.detail}>
            <Text style={styles.text}> Dépenses : {depenses}</Text>
            <Text style={styles.text}> Revenus : {revenus}</Text>
            <Text style={styles.text}> Argent epargné : {epargne} </Text>
        </View>
    </View>
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
  detail : {
    marginLeft : 20,
    marginTop: 15
  },
});