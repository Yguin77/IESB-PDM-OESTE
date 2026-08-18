import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {titulo} from './util.js';
import  titulo_padrao  from './util.js';
import { Button, Styleshhet, Text, TextInput, View} from 'react-native-web';
import { rotulo_btn_cadastro, rotulo_input_metas , rotulo_lista_metas} from '../../../mensagens.js';


export default function App() {
  return (
    <View style={styles.mainContainer}>
     <TextInput placeholder={rotulo_btn_cadastro}></TextInput>
     <Button title={rotulo_btn_cadastro}></Button>
     <Text> {rotulo_lista_metas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    margin: 20,
    fontSize
  },
  
  mainContainer: {
    padding :30
  }
});
