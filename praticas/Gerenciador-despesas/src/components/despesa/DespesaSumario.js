import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > 200 && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 8,
  },
  periodo: { fontSize: 14, color: '#1e3a8a' },
  soma: { fontSize: 18, fontWeight: 'bold', color: '#1e3a8a' },
  somaAlta: { color: '#dc2626' }, // bônus: acima de R$ 200,00
});