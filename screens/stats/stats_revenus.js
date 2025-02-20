import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SectionList,
} from "react-native";
import {
  img_trans,
  formatNumber,
  to_section_data,
  groupData,
  transform_date,
} from "../../fonctions/fonctions";
import { useTransactions } from "../../context/transactionsContext";
import { getCategorieRevenu } from "../../database/db";

export default function Stats_revenus() {
  const { revenusMensuel, SommeRevMensuel, mois, year_month } =
    useTransactions();
  const [grouped_revenu, setgrouped_revenu] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemCategorie, setItemCategorie] = useState("");
  const [itemMontant, setItemMontant] = useState(0);
  const [sectionsRev, setsectionsRev] = useState([]);

  const dataMensuel = async () => {
    const result = {};
    revenusMensuel.forEach((item) => {
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
    setgrouped_revenu(sorted_grouped_Data);
  };

  const PrepareSection = async (rev) => {
    try {
      // Grouper les transactions par jours et mettre à jour sections
      const groupedData = groupData(rev);
      const Data_par_jour = to_section_data(groupedData);
      setsectionsRev(Data_par_jour);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dataMensuel();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/img/Green_dollar.png")}
          style={{ width: 20, height: 20, marginLeft: 30 }}
        />
        <Text style={styles.text}>
          {" "}
          Revenu Total ce Mois :{" "}
          <Text
            style={{fontSize: 14,  fontWeight: "bold", color: "green",fontFamily: "monospace"}}
          >
            {formatNumber(SommeRevMensuel)}
          </Text>
        </Text>
      </View>
      <FlatList
        data={grouped_revenu}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              setModalVisible(true);
              setItemCategorie(item.categorie);
              setItemMontant(item.montant);
              const ListeCat = await getCategorieRevenu(
                item.categorie,
                year_month
              );
              PrepareSection(ListeCat);
            }}
          >
            <View style={styles.revenu}>
              <Image
                source={img_trans(item.categorie)}
                style={{ width: 30, height: 30, marginLeft: 15 }}
              />
              <View style={{ width: 140 }}>
                <Text>{item.categorie}</Text>
              </View>
              <View style={{ width: 110 }}>
                <Text>{formatNumber(item.montant)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide" // Ou "fade", "none"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); // Ferme le modal si l'utilisateur appuie sur "back" (Android)
        }}
      >
        <View style={modalStyles.container}>
          <View style={[modalStyles.box, modalStyles.imgtrans]}>
            <Image
              source={img_trans(itemCategorie)}
              style={{ width: 75, height: 75 }}
            />
            <Text
              style={{ marginVertical: 10, fontSize: 18, color: "#747264" }}
            >
              {itemCategorie}: {formatNumber(itemMontant)}
            </Text>
          </View>
          <SectionList
            sections={sectionsRev}
            keyExtractor={(item, index) => item.date + index}
            renderItem={({ item }) => (
              <View
                style={
                  item.type === "revenu"
                    ? [modalStyles.transaction]
                    : [modalStyles.transaction]
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
                <View style={{ width: 150 }}>
                  <Text style={{ color: "#747264" }}>{item.note}</Text>
                </View>
                <View style={{ width: 120 }}>
                  <Text style={{ marginRight: 20 }}>
                    {item.type === "revenu"
                      ? "+" + formatNumber(item.montant)
                      : "-" + formatNumber(item.montant)}
                  </Text>
                </View>
              </View>
            )}
            renderSectionHeader={({
              section: { title, depense_total, revenu_total },
            }) => (
              <View style={modalStyles.detail}>
                <Text style={modalStyles.title}>{transform_date(title)}</Text>
                <View style={modalStyles.total_par_jour}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontStyle: "italic" }}>Dépenses :</Text>
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                      {" "}
                      {formatNumber(depense_total)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontStyle: "italic" }}>Revenus :</Text>
                    <Text style={{ fontWeight: "bold", color: "green" }}>
                      {" "}
                      {formatNumber(revenu_total)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  revenu: {
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
const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    width: 369,
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#bbb",
    borderStyle: "dashed",
    marginLeft: 13,
  },
  imgtrans: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
  detail: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
    backgroundColor: "yellow",
  },

  title: {
    fontSize: 11,
    fontWeight: "bold",
    marginRight: 100,
  },
  total_par_jour: {
    flexDirection: "column",
    width: 150,
  },
});
