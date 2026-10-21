import { FlatList, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';
import { COLORS } from '../../constants/theme';

export default function DespesaLista({ expenses, total, periodo, emptyMessage, onItemPress }) {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem expense={item} onPress={() => onItemPress(item.id)} />
      )}
      ListHeaderComponent={
        <DespesaSumario quantidade={expenses.length} total={total} periodo={periodo} />
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="wallet-outline" size={56} color={theme.textSecondary} />
          <Text style={[styles.title, { color: theme.text }]}>Nenhuma despesa</Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>{emptyMessage}</Text>
        </View>
      }
      contentContainerStyle={[styles.content, expenses.length === 0 && styles.emptyContainer]}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 12, paddingBottom: 24 },
  emptyContainer: { flexGrow: 1 },
  empty: { alignItems: 'center', padding: 24, gap: 8, marginTop: 32 },
  title: { fontSize: 18, fontWeight: 'bold' },
  text: { fontSize: 14, textAlign: 'center' },
});