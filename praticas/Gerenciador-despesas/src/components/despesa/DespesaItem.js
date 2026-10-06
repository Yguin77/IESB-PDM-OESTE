import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, descricao, valor, categoria, data }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/gerenciar', params: { id } })}
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: { opacity: 0.7 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 3,
  },
  info: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  data: { color: '#6b7280', marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagTexto: { fontSize: 12, color: '#374151' },
  valor: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
});