import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT, LIST_TITLE } from './labels';

const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Estrutura de Dados',
  'Banco de Dados II',
  'Engenharia de Software',
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{APP_TITLE}</Text>

        <View style={styles.row}>
          <TextInput style={styles.input} placeholder={INPUT_PLACEHOLDER} />
          <View style={styles.buttonWrapper}>
            <Button title={BUTTON_TEXT} onPress={() => {}} />
          </View>
        </View>

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>
        <View style={styles.list}>
          {disciplinas.map((nome, index) => (
            <View key={index} style={styles.item}>
              <Text>{nome}</Text>
            </View>
          ))}
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  input: { width: '70%', borderWidth: 1, borderColor: '#1a0efc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  buttonWrapper: { width: '25%' },
  listTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  list: { flex: 1 },
  item: { backgroundColor: '#6b0fec', padding: 12, margin: 6, borderRadius: 6 },
});