import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Transactions_List from './screens/Transactions_List'
import D_m from './screens/delete_Modif/d_m'

import { Image } from 'react-native-svg';   

const Stack = createNativeStackNavigator();
const logo_img = require('./assets/LogoISPM.png');


export const TransactionListStack = ({navigation}) => {
    return <Stack.Navigator 
                initialRouteName="transactionListe"
                screenOptions={{
                    headerShadowVisible: false,
                    headerTintColor : "#747264",
                    headerTitleStyle : { fontWeight : "bold"}
                }}
           >  
           <Stack.Screen name='Del_mod' component={D_m}
                options={{
                    headerTitle: "Supprimer ou Modifier" ,        
                }}
           />
            <Stack.Screen
                name='transactionListe' component={Transactions_List}
                options={{
                    headerTitle: "Mes Transactions" ,        
                }}
            />
           </Stack.Navigator>
}

export default function App(){
    return (
      <NavigationContainer>
         <TransactionListStack/>
      </NavigationContainer>
    );
}