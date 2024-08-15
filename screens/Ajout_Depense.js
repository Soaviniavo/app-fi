import React, { useState } from 'react';
import { StyleSheet, Text, View , Button,Image,TextInput,Pressable,Platform,StatusBar } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { getDatabase, insertTransaction,deleteAllDepenses } from '../database/db';

export default function Ajout_Depense({ route, navigation }) {

const [note,setnote] = useState("");
const [montant,setmontant] = useState("");
const [date,setdate] = useState(new Date());
const [showpicker,setshowpicker] = useState(false);
const [date_dep,setdate_dep] = useState("");
const [isdisabled_btn,setisdisable_btn] = useState(true);


const  categorie  = route.params.categorie ;
const  icon_img  = route.params.icon_img ; 

const toogleDatePicker = () => {
    setshowpicker(!showpicker)
}

const enable_btn = () => {
   setisdisable_btn(!isdisabled_btn);
}

const get_Date = (_date) => {
  let date_temp = `${_date.getFullYear()}-${_date.getMonth()+1}-${_date.getDate()}`;
  return date_temp ; 
}
   

const onChange = ({type},selectedDate) =>  {
    if(type == 'set') {
        const currentDate = selectedDate ; 
        setdate(currentDate);
        if(Platform.OS === "android"){
            toogleDatePicker();
            setdate_dep(currentDate.toDateString());
        }
    }else{
        toogleDatePicker();
    }
}


  return (
    <View style={Styles.container}>
        <StatusBar backgroundColor="green" />
        
         <View style={[Styles.box,Styles.depense]}>
             <Image source={icon_img} style={{  width:75 , height:75}}/>
             <Text style={{ marginBottom:2, fontSize: 18, color:"#747264"}}>{categorie}</Text>
         </View>
         <View style={[Styles.box,Styles.input_container]}>
                <View style={Styles.input_box} >
                    <Text style={Styles.input_text}>Note : </Text>
                    <TextInput style={Styles.input} value={note} 
                        onChangeText={setnote}
                        placeholder='Ajouter une note...'
                    />
                </View>
                <View style={Styles.input_box} >
                    <Text style={Styles.input_text}>Montant : </Text>
                    <TextInput style={Styles.input} value={montant} 
                        onChangeText={setmontant}
                        placeholder='Saisir le montant...'
                        keyboardType='number-pad'
                    />
                </View>

                <View style={Styles.input_box} >
                    <Text style={Styles.input_text}>Date : </Text>
                    {!showpicker &&
                        <Pressable onPress={toogleDatePicker}>
                            <TextInput style={Styles.input} value={date_dep} 
                                onChangeText={setdate_dep}
                                placeholder='Saisir une date...'
                                editable={false}
                            />
                        </Pressable>   
                    }
                        { showpicker && (
                            <RNDateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                            />
                        )}
                </View>
         </View>
         <View style={{marginTop:20}}>
              <Button  title={'Enregistrer'} onPress={
                async () => {
                  try {
                    let valid_date = get_Date(date);
                    let type = "dépense";
                    await insertTransaction(note,montant,valid_date,categorie,type);
                    navigation.navigate( 'Liste');
                    return console.log("insertion successfull");
                  } catch (error) {
                      console.error(error);
                      throw Error("L'insertion a echoué !");
                  } 
                }
              } disabled={!isdisabled_btn}/>
              
         </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  box:{
    width:369,
    height:200,
    borderRadius : 16 ,
    borderWidth: 1,
    borderColor: "#bbb",
    borderStyle: "dashed"
  },
  depense: {
    justifyContent:'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  input_box:{
    flexDirection:'row',
    width: 300,
  },
  input_container: {
    justifyContent:'center',
    alignItems: 'center',
  },
  input:{
    width: 240,
    height: 50,
    color: '#747264'
  },
  input_text :{
    marginTop:14, 
    color:"#747264",
    width : 80
  }
});