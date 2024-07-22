import React, {useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,Image,RefreshControl,FlatList,SectionList } from 'react-native';

import * as SQLite from 'expo-sqlite';
import { useIsFocused,useFocusEffect } from '@react-navigation/native';
import { img_trans,somme,transform_date } from '../fonctions/fonctions';

const logo_empty_list = require('../assets/Vide.png');
    
export default function Transactions_List() { 

  const [transactions,settransactions] = useState([]); 
  const [refreshing,setrefreshing] = useState(false);
  const [sections,setsections] = useState([]);
  const [totalMois,setTotalMois] = useState(0);
  


  const onRefresh = async () => {
        const  db = await SQLite.openDatabaseAsync('appFiDatabase.db');  
        const allRows = await db.getAllAsync('SELECT * FROM transactions ORDER BY date DESC '); 
        settransactions(allRows);

        const groupedData =  transactions.reduce((acc, curr) => {
          const date = curr.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(curr);

          return acc;
        }, {}); 

        const S = Object.keys(groupedData).map(date => ({
          title: date,
          montant :  somme(groupedData[date]),
          data: groupedData[date]
        }));
        const total_mois = Object.keys(groupedData).map(date => {
          let T = 0 ; 
          T = T + somme(groupedData[date]);
          return T;
       })
        const sum = total_mois.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

        setTotalMois(sum);
        setsections(S);
  }

  
  useEffect(() => {
    const setupDatabase = async () => {
      const db = await SQLite.openDatabaseAsync('appFiDatabase.db'); 
      try {

        await db.execAsync(`
            PRAGMA journal_mode = WAL;   
            CREATE TABLE IF NOT EXISTS transactions( 
              id_trans INTEGER PRIMARY KEY NOT NULL,
              note VARCHAR(100),
              montant VARCHAR(50),  
              date DATE,
              categorie VARCHAR(50),
              type VARCHAR(20) 
            ); 
        `);  
        const allRows = await db.getAllAsync('SELECT * FROM transactions ORDER BY date DESC'); 
        settransactions(allRows);
        
    
        const groupedData = transactions.reduce((acc, curr) => {
          const date = curr.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(curr);
          
          return acc;
        }, {}); 

     
        const S = Object.keys(groupedData).map(date => ({
          title: date,
          montant :  somme(groupedData[date]),
          data: groupedData[date]
        }));

        const total_mois = Object.keys(groupedData).map(date => {
           let T = 0 ; 
           T = T + somme(groupedData[date]);
           return T;
        })

        
          const sum = total_mois.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);

         setTotalMois(sum);
         setsections(S);

      } catch (error) {  
        console.error(error) ;
        throw Error(`Failed to create tables`);
      }
    };

   setupDatabase();

  },[]);


   
  return (
        <View style={styles.container}> 
                <View style={styles.trans_mois} >
                     <Text>{totalMois} </Text> 
                     <Text>Ce Mois</Text> 
                </View>
                <StatusBar backgroundColor="green" />          
                    {
                        <SectionList 
                          refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                          }
                          sections={sections}
                          keyExtractor={(item, index) => item.date + index}
                          renderItem={({ item }) => (
                              <View style={styles.transaction} >
                                <Image source={img_trans(item.categorie)} style={{width:30,height:30 , marginLeft: 15,marginBottom:5}}/>
                                <Text style={{ marginRight: 100, color: '#747264'}}>{item.note}</Text>
                                <Text style={{marginRight: 20}}>-{item.montant}</Text>
                              </View> 
                          )}
                          renderSectionHeader={({ section: { title,montant } }) => (
                              <View style={styles.detail}>
                                <Text style={styles.title}>{transform_date(title)}</Text>
                                <Text><Text style={{fontStyle:'italic'}}>Total:</Text><Text style={{ fontWeight:'bold'}}>  {montant}</Text></Text>  
                              </View>
                          )}
                        />
                    }   
        </View>
   );
  }

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
    },
    detail :{
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 30 ,
      alignItems: 'center',
      backgroundColor: 'yellow',
    },
    transaction: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 0.8,
      borderColor: "#bbb",
      borderStyle: 'solid',
      height: 60,
    },
    title: {
      fontSize: 11,
      fontWeight: 'bold',
      marginRight: 100
    },
    trans_mois: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 70,
    }
    
});

{
  /*
  
  transactions.map((item) => {

    return   <View key={item.id}>
                <Text > 
                  {transform_date(item.date)}
                </Text>
                <View style={styles.depense} >
                      <Image source={img_trans(item.type)} style={{width:40,height:40 , marginLeft: 15,marginBottom:5}}/>
                      <Text style={{ marginRight: 140}}>{item.note}</Text>
                      <Text style={{marginRight: 20}}>-{item.montant}</Text>
                </View>
             </View> 
  })*/
}    


   /* <FlatList 
                        data={transactions}
                        renderItem={({item}) => (
                                   <View >
                                      <Text> 
                                        {transform_date(item.date)}
                                      </Text>
                                      <View style={styles.depense} >
                                            <Image source={img_trans(item.type)} style={{width:40,height:40 , marginLeft: 15,marginBottom:5}}/>
                                            <Text style={{ marginRight: 140}}>{item.note}</Text>
                                            <Text style={{marginRight: 20}}>-{item.montant}</Text>
                                      </View>
                                   </View> 
                        )
                          
                       }
                     />*/