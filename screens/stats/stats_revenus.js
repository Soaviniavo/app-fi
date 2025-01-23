import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";

const fonts = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Roboto",
  "Droid Sans",
  "Droid Serif",
  "Droid Mono",
  "Helvetica",
  "Helvetica Neue",
  "Chalkboard SE",
  "Chalkduster",
  "Gill Sans",
  "Marker Felt",
  "Optima",
  "Palatino",
  "Trebuchet MS",
  "Zapfino",
  // Ajoutez d'autres polices pour les tester
];

export default function Stats_revenus() {
  return (
    <ScrollView style={styles.container}>
      <Text style={{fontFamily: 'monospace' }}>mzlrmarjmajlemjknc,s,dfkjhioer 12345</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});