import React from 'react';
import { StyleSheet, Text, View,Image,FlatList } from 'react-native';
import { useTransactions } from '../context/transactionsContext';
import { to_section_data,groupData, img_trans,somme,transform_date } from '../fonctions/fonctions';


export default function Test() {
   const { transactions } = useTransactions();
    console.log(transactions);

    return (
        <FlatList 
                        data={transactions}
                        renderItem={({item}) => (
                                   <View >
                                      <Text> 
                                        {transform_date(item.date)}
                                      </Text>
                                      <View  >
                                            <Text style={{ marginRight: 140}}>{item.note}</Text>
                                            <Text style={{marginRight: 20}}>-{item.montant}</Text>
                                      </View>
                                   </View> 
                        )
                          
                       }
        />
    );
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});