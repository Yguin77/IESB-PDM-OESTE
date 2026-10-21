import { Platform, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { COLORS } from '../../constants/theme';
import { formatCurrency } from '../../util/data';

export default function DespesaItem({ expense, onPress }) {
  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {new Date(expense.date).toLocaleDateString('pt-BR')} · {expense.category}
        </Text>
      </View>
      <Text style={[styles.amount, { color: theme.primary }]}>
        {formatCurrency(expense.amount)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  pressed: { opacity: 0.7 },
  info: { flex: 1, marginRight: 12 },
  description: { fontSize: 16, fontWeight: 'bold' },
  meta: { fontSize: 13, marginTop: 2 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});