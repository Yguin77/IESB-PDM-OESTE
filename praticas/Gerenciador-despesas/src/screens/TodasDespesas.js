import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { CATEGORIAS, useDespesas } from '../context/DespesasContext';

export default function TodasDespesas() {
  const { despesas } = useDespesas();
  const [filtro, setFiltro] = useState('Todas');

  function filtrarPorCategoria(lista, categoria) {
    if (categoria === 'Todas') return lista;
    return lista.filter((d) => d.categoria === categoria);
  }

  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        {['Todas', ...CATEGORIAS].map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setFiltro(cat)}
            style={[styles.chip, filtro === cat && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, filtro === cat && styles.chipTextoAtivo]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={filtro === 'Todas' ? 'Total' : filtro}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
  },
  chipAtivo: { backgroundColor: '#2563eb' },
  chipTexto: { color: '#374151' },
  chipTextoAtivo: { color: '#fff' },
});