import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { get_depenseMensuelle } from "../../database/db";
import { To_letter_mois, somme, img_trans } from "../../fonctions/fonctions";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useTransactions } from "../../context/transactionsContext";

const screenWidth = Dimensions.get("window").width;

export default function Stats_depenses() {

  const { depensesMensuelle,SommeDepMensuelle,mois} = useTransactions();
  const [grouped_depense, setgrouped_depense] = useState([]);

  

  const dataMensuel = async () => {
    
    const result = {};
    depensesMensuelle.forEach((item) => {
      if (result[item.categorie]) {
        result[item.categorie] += parseInt(item.montant);
      } else {
        result[item.categorie] = parseInt(item.montant);
      }
      // console.log(result);
    });
    const grouped_Data = Object.keys(result).map((categorie) => ({
      categorie: categorie,
      montant: result[categorie],
    }));
    const sorted_grouped_Data = grouped_Data.sort(
      (a, b) => b.montant - a.montant
    );
    setgrouped_depense(sorted_grouped_Data);
  };

  useEffect(() => {
    dataMensuel();
  }, []);


  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Image
          source={require("../../assets/img/growth.png")}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
        <Text style={styles.text}>
          {" "}
          Dépense Totale ce Mois :{" "}
          <Text
            style={{ fontStyle: "normal", fontWeight: "600", color: "red" }}
          >
            {SommeDepMensuelle}
          </Text>
        </Text>
      </View>
      <FlatList
        data={grouped_depense}
        renderItem={({ item }) => (
          <View style={styles.depense}>
            <Image
              source={img_trans(item.categorie)}
              style={{ width: 30, height: 30, marginLeft: 15 }}
            />
            <Text>{item.categorie}</Text>
            <Text style={{ marginRight: 20 }}>{item.montant}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  depense: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: "#bbb",
    borderStyle: "solid",
    height: 60,
  },
  content: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    height: 50,
  },
  text: {
    color: "#747264",
    fontSize: 15,
    marginLeft: 10,
  },
});
