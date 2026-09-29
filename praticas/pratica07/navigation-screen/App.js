import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DespesaRecentes from './screens/DespesaRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import { Ionicons } from '@expo/vector-icons';


export default function App() {

  const Tab = createBottomTabNavigator();

  function BottonTabScreen(){
    return(
      <Tab.Navigator>
        <Tab.Screen name="DespesaRecentes" component={DespesaRecentes} />
        <Tab.Screen name="TodasDespesas" component={TodasDespesas} />
      </Tab.Navigator>
    )
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name='Despesas' component={BottonTabScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name='GerenciarDespesa' component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});