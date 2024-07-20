import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Choix_Depenses from './screens/Choix_depenses'
import Ajout_Depense from './screens/Ajout_Depense';

const Stack = createNativeStackNavigator();

export const Transaction_Stack = () => {
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
                }}
            />

            <Stack.Screen
                name='Ajout_Depense' component={Ajout_Depense}
                options={{
                    title: 'Enregistrer dépense',
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