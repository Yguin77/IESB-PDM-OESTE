import { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import DespesaLista from '../components/despesa/DespesaLista';
import { useExpenses } from '../store/expenses-context';
import { COLORS } from '../constants/theme';

export default function DespesasRecentes() {
  const router = useRouter();
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  const recent = useMemo(() => {
    // hoje + os 6 dias anteriores = 7 dias, a partir da meia-noite
    const limit = new Date();
    limit.setHours(0, 0, 0, 0);
    limit.setDate(limit.getDate() - 6);

    return expenses.filter((e) => new Date(e.date) >= limit);
  }, [expenses]);

  const total = useMemo(() => recent.reduce((sum, e) => sum + e.amount, 0), [recent]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <DespesaLista
        expenses={recent}
        total={total}
        periodo="Últimos 7 dias"
        emptyMessage="Nenhuma despesa nos últimos 7 dias. Toque em + para adicionar."
        onItemPress={(id) => router.push({ pathname: '/gerenciar', params: { expenseId: id } })}
      />
    </View>
  );
}