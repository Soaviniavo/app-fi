import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { To_letter_mois, formatNumber } from "../fonctions/fonctions";
import PieChart from "react-native-pie-chart";
import { useTransactions } from "../context/transactionsContext";
import SommeDepRev from "../components/SommeDepRev";

export default function PorteFeuille() {
  const {
    SommeDepMensuelle,
    SommeRevMensuel,
    SommeDepAnnuelle,
    SommeRevAnnuel,
    budgetMensuel,
    setbudgetMensuel,
    updateBdg,
  } = useTransactions();
  const [updateBudget, setupdateBudget] = useState(`${budgetMensuel}`);
  var restantBudget = budgetMensuel - SommeDepMensuelle;
  var restantAnnuel = SommeRevAnnuel - SommeDepAnnuelle;
  var restantMensuel = SommeRevMensuel - SommeDepMensuelle;
  var pourcentage = Math.round((100 * restantBudget) / budgetMensuel);
  const [modalVisible, setModalVisible] = useState(false);

  //Calcul Mois
  const today = new Date();
  const mois = To_letter_mois(today.getMonth() + 1);
  const annee = today.getFullYear();

  const widthAndHeight = 200;
  const series =
    restantBudget > 0
      ? [restantBudget, budgetMensuel - restantBudget]
      : [0, budgetMensuel - 0];

  const chart_color = (P) => {
    if (P >= 70) {
      return ["green", "#DEE5D4"];
    } else if (P >= 40) {
      return ["orange", "#DEE5D4"];
    } else if (P < 40) {
      return ["red", "#DEE5D4"];
    }
  };
  //#FFB30D #E3BBED
  const sliceColor = chart_color(pourcentage);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {
          //MOIS
        }
        <View style={[styles.content, { height: 170 }]}>
          <View style={styles.content_title}>
            <Image
              source={require("../assets/img/appointment.png")}
              style={styles.img}
            />
            <Text style={styles.title}> {mois}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <SommeDepRev
              sum_dep={formatNumber(SommeDepMensuelle)}
              sum_rev={formatNumber(SommeRevMensuel)}
            />
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 20 }}>
            <Image
              source={require("../assets/img/dollar.png")}
              style={{
                width: 14,
                height: 14,
                marginTop: 3,
              }}
            />
            <Text style={styles.text}>Restant :</Text>
            <Text style={styles.Somme_value}>
              {" "}
              {formatNumber(restantMensuel)}
            </Text>
          </View>
        </View>

        {
          //BUDGET MENSUEL
        }

        <View style={[styles.content, styles.graph_content]}>
          <View style={styles.content_title}>
            <Image
              source={require("../assets/img/sac-dargent.png")}
              style={styles.img}
            />
            <Text style={styles.title}>Budget Mensuel </Text>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Image
                source={require("../assets/img/modifier.png")}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 120,
                }}
              />
            </Pressable>
          </View>
          <View style={styles.detail}>
            <View
              style={{ flexDirection: "row", marginLeft: 10, marginTop: -5 }}
            >
              <Image
                source={require("../assets/img/sacdargent.png")}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 2,
                }}
              />
              <Text style={styles.text}>Total :</Text>
              <Text style={styles.Somme_value}>
                {" "}
                {formatNumber(budgetMensuel)}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", marginLeft: 10, marginTop: 3 }}
            >
              <Image
                source={require("../assets/img/dollar.png")}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 2,
                }}
              />
              <Text style={styles.text}>Restant :</Text>
              <Text style={styles.Somme_value}>
                {" "}
                {formatNumber(restantBudget)}
              </Text>
            </View>

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

        {/* ANNEE*/}
        <View style={styles.content}>
          <View style={styles.content_title}>
            <Image
              source={require("../assets/img/year.png")}
              style={styles.img}
            />
            <Text style={styles.title}> {annee}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <SommeDepRev
              sum_dep={formatNumber(SommeDepAnnuelle)}
              sum_rev={formatNumber(SommeRevAnnuel)}
            />
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 10 }}>
            <Image
              source={require("../assets/img/dollar.png")}
              style={{
                width: 14,
                height: 14,
                marginTop: 3,
              }}
            />
            <Text style={styles.text}>Restant :</Text>
            <Text style={styles.Somme_value}>
              {" "}
              {formatNumber(restantAnnuel)}
            </Text>
          </View>
        </View>

        {/** Epargne */}

        <View style={[styles.content, styles.epargne_content]}>
          <View style={styles.content_title}>
            <Image
              source={require("../assets/img/jar.png")}
              style={styles.img}
            />
            <Text style={styles.title}>Epargne</Text>
          </View>
          <View style={styles.detail}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>Ce mois :</Text>
              <Text style={styles.Somme_value}>
                {" "}
                {formatNumber(restantMensuel)}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Votre épargne Totale : </Text>
            <Text style={styles.Somme_value}>
                {" "}
                {formatNumber(1321700)}
              </Text>
            </View>
          </View>
          <View style={styles.btn}>
            <Button title={"Créer Un Objectif financier"} />
          </View>
        </View>
      </View>
      {/**Modal Modification Budget */}

      <Modal
        animationType="fade" // Ou "fade", "none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); // Ferme le modal si l'utilisateur appuie sur "back" (Android)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalStyle}>
            <View
              style={{
                flexDirection: "row",
                textAlign: "center",
                marginLeft: 100,
                marginTop: 10,
              }}
            >
              <Text style={styles.text2}>Modifier Budget</Text>
              <Image
                source={require("../assets/img/modifier.png")}
                style={{ width: 20, height: 20, marginLeft: 10 }}
              />
            </View>
            <TextInput
              style={styles.input}
              value={updateBudget}
              onChangeText={setupdateBudget}
              keyboardType="number-pad"
            />
            <View style={{ flexDirection: "row", marginLeft: 90 }}>
              <View>
                <Button
                  color="gray"
                  title={"annuler"}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Button
                  title={"valider"}
                  color="green"
                  onPress={() => {
                    setModalVisible(false);
                    setbudgetMensuel(updateBudget);
                    updateBdg(updateBudget);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    margin: 20,
    padding: 10,
    marginTop: 25,
    color: "black",
    fontSize: 17,
    borderRadius: 10,
    borderColor: "gray",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  modalStyle: {
    width: 370,
    height: 170,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 15,
  },
  content_title: {
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    marginLeft: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: 19,
    fontWeight: "600",
  },
  img: {
    width: 30,
    height: 30,
  },
  text: {
    color: "#747264",
    fontSize: 15,
    fontStyle: "italic",
    marginLeft: 4,
  },
  content: {
    marginTop: 20,
    width: 350,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
    borderStyle: "dashed",
    height: 150,
  },
  graph_content: {
    height: 370,
  },
  graph_style: {
    flex: 1,
    marginLeft: 50,
    marginTop: 25,
  },
  detail: {
    marginLeft: 20,
    marginTop: 15,
  },
  pourcentage: {
    position: "absolute",
    marginTop: 160,
    marginLeft: 130,
    fontSize: 25,
  },
  btn: {
    width: 290,
    marginLeft: 25,
    marginTop: 14,
  },
  epargne_content: {
    height: 180,
  },
  Somme_value: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 2,
    marginTop: 1,
    fontFamily: "monospace",
  },
});
