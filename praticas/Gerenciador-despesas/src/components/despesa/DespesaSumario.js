import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { COLORS } from '../../constants/theme';
import { formatCurrency } from '../../util/data';

export default function DespesaSumario({ quantidade, total, periodo }) {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View>
        {periodo ? <Text style={[styles.periodo, { color: theme.textSecondary }]}>{periodo}</Text> : null}
        <Text style={[styles.count, { color: theme.text }]}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: theme.primary }]}>{formatCurrency(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginHorizontal: 12,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  periodo: { fontSize: 12, textTransform: 'uppercase' },
  count: { fontSize: 15, fontWeight: '600' },
  total: { fontSize: 20, fontWeight: 'bold' },
});