import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,Modal,TextInput,Pressable,Platform } from 'react-native';
import { img_trans,transform_date } from '../../fonctions/fonctions';
import { deleteOneTransaction,modifyOneTransaction } from '../../database/db';
import RNDateTimePicker from '@react-native-community/datetimepicker'


export default function D_m({route,navigation}){
    const categorie = route.params.categorie ; 
    const type = route.params.type ; 
    const note = route.params.note ; 
    const montant = route.params.montant ; 
    const date = route.params.date ; 
    const id = route.params.id_trans;

    const [isModalModifVisible,SetisModalModifVisible] = useState(false);
    const [isModalDelVisible,SetisModalDelVisible] = useState(false);

    const [update_note,setupdateNote] = useState(note);
    const [update_montant,setupdateMontant] = useState(montant);

    const [update_date,setupdatedate] = useState(new Date());
    const [showpicker,setshowpicker] = useState(false);
    const [date_dep,setdate_dep] = useState(date);

    const toogleDatePicker = () => {
        setshowpicker(!showpicker)
    }
    const get_Date = (_date) => {
        let date_temp = `${_date.getFullYear()}-${_date.getMonth()+1}-${_date.getDate()}`;
        return date_temp ; 
    }
       
    
    const onChange = ({type},selectedDate) =>  {
        if(type == 'set') {
            const currentDate = selectedDate ; 
            setupdatedate(currentDate);
            if(Platform.OS === "android"){
                setdate_dep(currentDate.toDateString());
                toogleDatePicker();
            }
        }else{
            toogleDatePicker();
        }
    }


    return (
        <View style={Styles.container}> 
            <View style={[Styles.box,Styles.imgtrans]}>
                <Image source={img_trans(categorie)} style={{  width:75 , height:75}}/>
                <Text style={{ marginBottom:2, fontSize: 18, color:"#747264"}}>{categorie}</Text>
            </View>
            <View style={[Styles.box]}>
                <View style={Styles.date}>
                    <Text style={{fontWeight:'bold'}}>{transform_date(date)}</Text>
                </View>
                <View style={Styles.content}>
                    <View style={Styles.text}>
                        <Text style={Styles.item}>Note        :</Text>
                        <Text style={[Styles.item,Styles.item_value]}>{note}</Text>
                    </View>
                    <View style={Styles.text}>
                        <Text style={Styles.item}>Montant : </Text>
                        <Text style={[Styles.item,Styles.item_value]}>{montant}</Text>
                    </View>
                    <View style={Styles.text}>
                        <Text style={Styles.item}>Type        :</Text>
                        <Text style={[Styles.item,Styles.item_value]}> {type}</Text>
                    </View>
                </View>
            </View>
            <View style={Styles.btn_container}>
                <TouchableOpacity onPress={
                    async () => {
                        try {
                            deleteOneTransaction(id);
                            console.log("transaction supprimé");
                        } catch (error) {
                            console.log(error);
                        } finally {
                            navigation.navigate('transactionListe');
                        }
                    }
                }>
                    <View style={[Styles.btn,{backgroundColor:'red'}]}>
                        <Text style={Styles.text_btn}>Supprimer</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetisModalModifVisible(true)}>
                    <View style={Styles.btn}>
                        <Text style={Styles.text_btn}>Modifier</Text>
                    </View>
                </TouchableOpacity>
                <Modal 
                    visible={isModalModifVisible}
                    onRequestClose={() => SetisModalModifVisible(false)}
                    animationType='slide'
                >
                    <View style={[Styles.box,Styles.modifier_box]}>
                            <View style={Styles.date}>
                                <Text style={{fontWeight:'bold'}}>Modifier</Text>
                            </View>
                            <View style={Styles.content}>
                                <View style={Styles.text}>
                                    <Text style={Styles.item}>Note        :</Text>
                                    <TextInput style={Styles.input} value={update_note} onChangeText={setupdateNote}/>
                                </View>
                                <View style={Styles.text}>
                                    <Text style={Styles.item}>Montant : </Text>
                                    <TextInput style={Styles.input} value={update_montant} onChangeText={setupdateMontant}/>
                                </View>
                                <View style={Styles.text}>
                                    <Text style={Styles.item}>Date        :</Text>
                                    {!showpicker &&
                                        <Pressable onPress={toogleDatePicker}>
                                            <TextInput style={Styles.input} value={date_dep} 
                                                onChangeText={setdate_dep}
                                                editable={false}
                                            />
                                        </Pressable>   
                                    }
                                    { showpicker && (
                                            <RNDateTimePicker
                                                mode='date'
                                                display='spinner'
                                                value={update_date}
                                                onChange={onChange}
                                            />
                                    )}
                                </View>
                           </View>
                    </View>
                    <TouchableOpacity onPress={
                        async ()=> {
                            try {
                                let valid_date = get_Date(update_date);
                                modifyOneTransaction(id,update_note,update_montant,valid_date)
                                console.log('transactionn modifié!!');
                            } catch (error) {
                                console.log(error)
                            }finally{
                                navigation.navigate('transactionListe');
                            }
                        }
                    }>
                        <View style={[Styles.btn,{backgroundColor:'green',marginLeft: 120}]}>
                            <Text style={Styles.text_btn}>Enregister</Text>
                        </View>
                   </TouchableOpacity>

                </Modal>
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
    imgtrans: {
      justifyContent:'center',
      alignItems: 'center',
      marginVertical: 10
    },
    item:{
        width: 70 ,
        fontSize: 15,
        color:"#747264"
    },
    item_value : {
        fontSize: 15 ,
        fontWeight:'condensedBold',
        color:'black',
        width: 270,
        marginTop: 1
    },
    content:{
        marginTop: 15,
        marginHorizontal: 10
    },
    text: {
        flexDirection: 'row',
        height: 50
    },
    date:{
        backgroundColor: 'yellow',
        height: 40,
        borderTopLeftRadius:16,
        borderTopRightRadius: 16 ,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_container:{
        flexDirection:'row',
        marginTop: 10,
    },
    btn:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 4,
        backgroundColor:'orange',
        width: 140,
        height:30,
        margin: 10
    },
    text_btn:{
        fontSize:16,
        fontWeight:'bold',
        lineHeight:21,
        letterSpacing:0.25,
        color:'white'
    },
    modifier_box:{
        marginTop: 10,
        marginLeft: 13,
        height: 200
    },
    input:{
        width: 270,
        height: 40,
        marginTop:-8,
        color:'black',
        fontSize: 15
    }



  });