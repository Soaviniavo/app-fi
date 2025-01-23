import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  SectionList,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import {
  to_section_data,
  groupData,
  img_trans,
  transform_date,
  To_letter_mois,
} from "../fonctions/fonctions";
import { useTransactions } from "../context/transactionsContext";
import SommeDepRev from "../components/SommeDepRev";

export default function Transactions_List({ navigation }) {
  const [refreshing, setrefreshing] = useState(false);
  const [sections, setsections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [Month, setMonth] = useState("Ce mois");
  const {
    transactions,
    annee,
    fetchTransaction,
    year_month,
    SommeDepMen_TransList,
    SommeRevMens_TransList
  } = useTransactions();


  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const years = Array.from({ length: 20 }, (_, i) => annee - i);

  const onRefresh = async () => {
    await fetchTransaction(year_month);
    PrepareSection(transactions);
    setMonth("Ce mois");
  };

  const handleConfirm = async () => {
    let m = selectedMonth + 1;
    let y = selectedYear;
    let y_m = `${y}-${m}-%`;
    try {

      await fetchTransaction(y_m);
      PrepareSection(transactions);
      setMonth(`${To_letter_mois(m)} ${y}`);
    } catch (error) {
      throw error;
    } finally {
      hidePicker();
      //PrepareSection(trans_mens);
    }
  };

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // section pour l' affichage des transactions par date
  const PrepareSection = async (Trans) => {
    try {
      // Grouper les transactions par jours et mettre à jour sections
      const groupedData = groupData(Trans);
      const Data_par_jour = to_section_data(groupedData);
      setsections(Data_par_jour);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length >= 0) {
      console.log('useEffect ');
      PrepareSection(transactions); // Exécuter seulement si `transactions` contient des données
    }
  }, [transactions]);

  if (isLoading) {
    return (
      <View>
        <Text>Chargement.... </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.trans_mois}>
        <View
          style={{ flexDirection: "row", marginBottom: 10, marginTop: -20 }}
        >
          <Image
            source={require("../assets/img/Piece.png")}
            style={{ width: 20, height: 20, marginRight: 7, marginTop: 4 }}
          />
          <Text style={{ fontSize: 20 }}>{Month}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={showPicker}>
            <View style={{ width: 50, marginRight: 5 }}>
              <Image
                source={require("../assets/img/chercher.png")}
                style={{ width: 35, height: 35, marginTop: 7 }}
              />
            </View>
          </Pressable>
          <SommeDepRev sum_dep={SommeDepMen_TransList} sum_rev={SommeRevMens_TransList} />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => {
          setPickerVisible(false); // Ferme le modal si l'utilisateur appuie sur "back" (Android)
        }}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.pickerContainer}>
            <View
              style={{
                flexDirection: "row",
                height: 200,
                width: 250,
                justifyContent: "center",
              }}
            >
              <View style={{ width: 150 }}>
                <FlatList
                  data={months}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={[
                        modalStyles.item,
                        selectedMonth === index && modalStyles.selectedItem,
                      ]}
                      onPress={() => setSelectedMonth(index)}
                    >
                      <Text style={modalStyles.itemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={{ marginLeft: 5, width: 100 }}>
                <FlatList
                  data={years}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        modalStyles.item,
                        selectedYear === item && modalStyles.selectedItem,
                      ]}
                      onPress={() => setSelectedYear(item)}
                    >
                      <Text style={modalStyles.itemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                title="Confirmer"
                onPress={handleConfirm}
                disabled={selectedMonth === null || selectedYear === null}
              />
              <View style={{ marginTop: 10 }}>
                <Button title="Annuler" color="gray" onPress={hidePicker} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar backgroundColor="green" />
      {
        <SectionList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          sections={sections}
          keyExtractor={(item, index) => item.date + index}
          renderItem={({ item }) => (
            // repère pour des conditions comme ci dessous
            <TouchableOpacity
              onPress={() => navigation.navigate("Del_mod", item)}
            >
              <View
                style={
                  item.type === "revenu"
                    ? [styles.transaction]
                    : [styles.transaction]
                }
              >
                <Image
                  source={img_trans(item.categorie)}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 15,
                    marginBottom: 5,
                  }}
                />
                <View style={{  width: 150 }}>
                  <Text style={{ color: "#747264" }}>{item.note}</Text>
                </View>
                <View style={{  width: 120 }}>
                  <Text style={{ marginRight: 20 }}>
                    {item.type === "revenu"
                      ? "+" + item.montant
                      : "-" + item.montant}
                  </Text>
                </View> 
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({
            section: { title, depense_total, revenu_total },
          }) => (
            <View style={styles.detail}>
              <Text style={styles.title}>{transform_date(title)}</Text>
              <View style={styles.total_par_jour}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontStyle: "italic" }}>Dépenses :</Text>
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    {" "}
                    {depense_total}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontStyle: "italic" }}>Revenus :</Text>
                  <Text style={{ fontWeight: "bold", color: "green" }}>
                    {" "}
                    {revenu_total}
                  </Text>
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
    backgroundColor: "white",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
    backgroundColor: "yellow",
  },

  total_par_jour: {
    flexDirection: "column",
    width: 150,
  },

  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "#bbb",
    borderStyle: "solid",
    height: 60,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    marginRight: 100,
  },
  trans_mois: {
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    marginBottom: 5,
  },
  Somme_value: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 2,
    fontFamily: "monospace",
  },
  transaction_index: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  value_trans_container: {
    width: 140,
    borderWidth: 1,
    borderStyle: "dashed",
    height: 55,
    borderRadius: 10,
    borderColor: "grey",
    padding: 1,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    padding: 15,
  },
  itemText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedItem: {
    //#FFB30D #E3BBED
    backgroundColor: "#BDD4F2", //#BDD4F2
    borderRadius: 5,
  },
  selectedItemText: {
    color: "white",
    fontWeight: "bold",
  },
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
