import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function SommeDepRev({ sum_dep, sum_rev }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.value_trans_container, { marginRight: 10 }]}>
        <Text style={[styles.Somme_value, { marginLeft: 8 }]}>{sum_dep} </Text>
        <View style={styles.transaction_index}>
          <Image
            source={require("../assets/img/Red_dollar.png")}
            style={{ width: 18, height: 16, marginTop: 5, marginRight : -3 }}
          />
          <Text style={styles.text}>Dépenses</Text>
        </View>
      </View>
      <View style={styles.value_trans_container}>
        <Text style={styles.Somme_value}> {sum_rev}</Text>
        <View style={styles.transaction_index}>
          <Image
            source={require("../assets/img/Green_dollar.png")}
            style={{ width: 12, height: 15, marginTop: 6 }}
          />
          <Text style={styles.text}>Revenus</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  text: {
    color: "#747264",
    fontSize: 15,
    fontStyle: "italic",
    marginLeft: 4,
    marginTop: 3,
  },
  Somme_value: {
    fontSize: 16,
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
