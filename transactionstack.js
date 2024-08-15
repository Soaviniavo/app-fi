import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Choix_Depenses from './screens/Choix_depenses'
import Ajout_Depense from './screens/Ajout_Depense';
import Ajout_revenu from './screens/Ajout_revenu';
import Choix_revenus from './screens/Choix_revenus';
import { Button, View } from 'react-native';

const Stack = createNativeStackNavigator();

export const Transaction_Stack = ({navigation}) => {
    return <Stack.Navigator 
                initialRouteName="Choix_Depenses"
                screenOptions={{
                    headerStyle : {
                        
                    },
                    headerShadowVisible: false,
                    headerTintColor : "#747264",
                    headerTitleStyle : { fontWeight : "bold"}
                }}
           >
            <Stack.Screen
                name='Choix_Depenses' component={Choix_Depenses}
                options={{
                    title: 'Catégorie de dépenses',
                    headerRight: () => (
                        <Button title={'Revenus'} onPress={() => navigation.navigate("Choix_revenus")} />
                    ) 
                }}
            />

            <Stack.Screen
                name='Choix_revenus' component={Choix_revenus}
                options={{
                    title: 'Catégorie de revenus',
                }}
            />

            <Stack.Screen
                name='Ajout_Depense' component={Ajout_Depense}
                options={{
                    title: 'Enregistrer dépense',
                }}
            />

            <Stack.Screen
                name='Ajout_revenu' component={Ajout_revenu}
                options={{
                    title: 'Enregistrer revenu',
                }}
            />
          
           </Stack.Navigator>
}

export default function App(){
    return (
      <NavigationContainer>
         <Transaction_Stack/>
      </NavigationContainer>
    );
}