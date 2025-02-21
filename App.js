import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Transactions_List from "./screens/Transactions_List";
import PorteFeuille from "./screens/PorteFeuille";
import Stats from "./screens/Stats";
import { Transaction_Stack } from "./transactionstack";
import { Stats_Stack } from "./statsstack";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Image, StyleSheet } from "react-native";

import graphe_icon from "./assets/charte-de-croissance (1).png";
import transaction_icon from "./assets/money-transfer.png";
import portefeuille_icon from "./assets/portefeuille.png";
import liste_icon from "./assets/liste-de-controle.png";
import NFtransaction_icon from "./assets/money-transfer (1).png";
import NFliste_icon from "./assets/liste-de-controle (1).png";
import NFportefeuille_icon from "./assets/portefeuille (1).png";
import NFgraphe_icon from "./assets/charte-de-croissance.png";
import { TransactionListStack } from "./transactionListStack";
const Tab = createBottomTabNavigator();

import { TransactionsProvider } from "./context/transactionsContext";

export default function App() {
  return (
    <TransactionsProvider>
      <NavigationContainer>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#747264",
              },
              headerStyle: {
                borderBottomWidth: 4,
              },
              headerShadowVisible: false,
              tabBarActiveBackgroundColor: "#C5EBAA",
              tabBarActiveTintColor: "green",
              tabBarShowLabel: true,
              tabBarStyle: {
                height: 53,
              },
              tabBarLabelStyle: {
                fontSize: 15,
                paddingBottom: 5,
              },
              tabBarIcon: ({ focused }) => {
                if (route.name === "Ajouter")
                  return (
                    <Image
                      source={focused ? transaction_icon : NFtransaction_icon}
                      style={
                        focused ? styles.FocusedIcon : styles.notFocusedIcon
                      }
                    />
                  );
                else if (route.name === "Portefeuille")
                  return (
                    <Image
                      source={focused ? portefeuille_icon : NFportefeuille_icon}
                      style={
                        focused ? styles.FocusedIcon : styles.notFocusedIcon
                      }
                    />
                  );
                else if (route.name === "Stats")
                  return (
                    <Image
                      source={focused ? graphe_icon : NFgraphe_icon}
                      style={
                        focused ? styles.FocusedIcon : styles.notFocusedIcon
                      }
                    />
                  );
                else if (route.name === "Liste")
                  return (
                    <Image
                      source={focused ? liste_icon : NFliste_icon}
                      style={
                        focused ? styles.FocusedIcon : styles.notFocusedIcon
                      }
                    />
                  );
              },
              headerShown: route.name === "Ajouter" ? false : true,
            })}
          >
            <Tab.Screen
              name="Liste"
              component={TransactionListStack}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen name="Ajouter" component={Transaction_Stack} />
            <Tab.Screen name="Portefeuille" component={PorteFeuille} />
            <Tab.Screen
              name="Stats"
              component={Stats_Stack}
              options={{
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </TransactionsProvider>
  );
}

const styles = StyleSheet.create({
  FocusedIcon: {
    width: 28,
    height: 28,
  },

  notFocusedIcon: {
    marginVertical: 5,
    width: 22,
    height: 22,
  },
});
