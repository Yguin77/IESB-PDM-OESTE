import { Button, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses } = useExpenses();

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );
  const totalText = total.toFixed(2);

  async function handleShare() {
    try {
      await Share.share({
        message: `Gastei R$ ${totalText} neste semestre.`,
      });
    } catch (err) {
      // Compartilhamento cancelado ou indisponível: segue normalmente
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {totalText}</Text>
      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  label: { fontSize: 16, color: '#555' },
  total: { fontSize: 36, fontWeight: 'bold', marginBottom: 12 },
});