import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import DespesaLista from '../components/despesa/DespesaLista';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import { COLORS } from '../constants/theme';

export default function TodasDespesas() {
  const router = useRouter();
  const { expenses } = useExpenses();

  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  // filtra por descrição, sem diferenciar maiúsculas/minúsculas
  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return expenses;
    return expenses.filter((e) => e.description.toLowerCase().includes(term));
  }, [expenses, debouncedSearch]);

  // o total reflete a busca
  const total = useMemo(
    () => filtered.reduce((sum, e) => sum + e.amount, 0),
    [filtered]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.search,
          { backgroundColor: theme.card, color: theme.text, borderColor: theme.border },
        ]}
        placeholder="Buscar por descrição"
        placeholderTextColor={theme.textSecondary}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <DespesaLista
        expenses={filtered}
        total={total}
        periodo="Total"
        emptyMessage={
          debouncedSearch
            ? 'Nada encontrado para essa busca.'
            : 'Toque em + para adicionar.'
        }
        onItemPress={(id) =>
          router.push({ pathname: '/gerenciar', params: { expenseId: id } })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    margin: 12,
    marginBottom: 0,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
});