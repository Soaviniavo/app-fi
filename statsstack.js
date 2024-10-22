import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stats from './screens/Stats'
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
           </Stack.Navigator>
}

export default function App(){
    return (
      <NavigationContainer>
         <Stats_Stack/>
      </NavigationContainer>
    );
}