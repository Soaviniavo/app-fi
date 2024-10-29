import React, {useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,RefreshControl,SectionList,Button } from 'react-native';

import * as SQLite from 'expo-sqlite';
import { to_section_data,groupData, img_trans,somme,transform_date } from '../fonctions/fonctions';
import { getAlltransactions , get_depenseMensuel,get_revenuMensuel,deleteAll } from '../database/db';

const logo_empty_list = require('../assets/Vide.png');
    
export default function Transactions_List() { 

  const [transactions,settransactions] = useState([]); 
  const [refreshing,setrefreshing] = useState(false);
  const [sections,setsections] = useState([]);
  const [SommeDepMensuel,setSommeDepMensuel] = useState(0);
  const [SommeRevMensuel,setSommeRevMensuel] = useState(0);
  const [isLoading,setIsLoading] = useState(true);


  const onRefresh = async () => {
        const allRows = await getAlltransactions(); 
        const depenseMensuel = await get_depenseMensuel();
        const revenuMensuel = await get_revenuMensuel();
        settransactions(allRows);
        setSommeDepMensuel(somme(depenseMensuel));
        setSommeRevMensuel(somme(revenuMensuel));

        // Grouper les transactions par jours
        const groupedData =  groupData(transactions);
        const Data_par_jour = to_section_data(groupedData);
       
        setsections(Data_par_jour);
  } 

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
      const allRows = await getAlltransactions(); 
      const depenseMensuel = await get_depenseMensuel();
      const revenuMensuel = await get_revenuMensuel();

      settransactions(allRows);
      setSommeDepMensuel(somme(depenseMensuel));
      setSommeRevMensuel(somme(revenuMensuel));

      // Grouper les transactions par jours et mettre à jour sections
      const groupedData = groupData(allRows);
      const Data_par_jour = to_section_data(groupedData);
      setsections(Data_par_jour);
    } catch (error) {  
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    setupDatabase();
  },[])


  if(isLoading){
    return (
      <View>
        <Text>Chargement.... </Text>
      </View>
    );
  }
  

   
  return (
        <View style={styles.container}> 
                <View style={styles.trans_mois} >
                     <Text>Ce Mois</Text> 
                     <Text>Dépenses : {SommeDepMensuel} </Text> 
                     <Text>revenus : {SommeRevMensuel} </Text> 
                </View>
             {
                /* <Button  title={'Vider'} onPress={
                  async () => {
                    try {
                      deleteAll();
                      return console.log("insertion successfull");
                    } catch (error) {
                        console.error(error);
                        throw Error("La suppression a echoué !");
                    } 
                  }
                }
              />*/
             }
               
             
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
                            // repère pour des conditions comme ci dessous 
                              <View style={ item.type === 'revenu' ? [styles.transaction] : [styles.transaction]} >
                                <Image source={img_trans(item.categorie)} style={{width:30,height:30 , marginLeft: 15,marginBottom:5}}/>
                                <Text style={{ marginRight: 100, color: '#747264'}}>{item.note}</Text>
                                <Text style={{marginRight: 20}}>{item.type === 'revenu' ? '+'+item.montant : '-'+item.montant}</Text>
                              </View> 
                          )}
                          renderSectionHeader={({ section: { title,depense_total,revenu_total } }) => (
                              <View style={styles.detail}>
                                <Text style={styles.title}>{transform_date(title)}</Text>
                                <View style={styles.total_par_jour} >
                                    <View style={{flexDirection:'row'}}>
                                         <Text style={{fontStyle:'italic'}}>Dépenses :</Text><Text style={{ fontWeight:'bold' , color: 'red'}}>  {depense_total}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                          <Text style={{fontStyle:'italic'}}>Revenus :</Text><Text style={{ fontWeight:'bold', color: 'green'}}>  {revenu_total}</Text>
                                    </View>
                                </View>  
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
      height: 50 ,
      alignItems: 'center',
      backgroundColor: 'yellow',
    },

    total_par_jour : {
      flexDirection: 'column',
      width: 150 , 
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