import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stats from './screens/Stats'
import Stats_depenses from './screens/stats/stats_depenses'
import Stats_revenus from './screens/stats/stats_revenus'
import { Button, View } from 'react-native';

const Stack = createNativeStackNavigator();

export const Stats_Stack = ({navigation}) => {
    return <Stack.Navigator 
                initialRouteName="Stats"
                screenOptions={{
                    headerStyle : {
                        
                    },
                    headerShadowVisible: false,
                    headerTintColor : "#747264",
                    headerTitleStyle : { fontWeight : "bold"}
                }}
           >  
           <Stack.Screen
                name='Statistiques' component={Stats}
            />
            <Stack.Screen
                name='stats_dep' component={Stats_depenses}
                options={{
                    title: 'Statistiques des dépenses',
                }}
            />
            <Stack.Screen
                name='stats_rev' component={Stats_revenus}
                options={{
                    title: 'Statistiques des revenus',
                }}
            />
           </Stack.Navigator>
}

export default function App(){
    return (
      <NavigationContainer>
         <Stats_Stack/>
      </NavigationContainer>
    );
}