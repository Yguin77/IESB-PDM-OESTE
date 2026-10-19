import { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CATEGORIAS, useDespesas } from '../context/DespesasContext';
import { getDataFormatada } from '../util/data';

export default function GerenciarDespesa() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { despesas, adicionarDespesa, atualizarDespesa, excluirDespesa } = useDespesas();

  const despesaEditada = despesas.find((d) => d.id === id);

  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditada ? String(despesaEditada.valor) : '');
  const [categoria, setCategoria] = useState(despesaEditada?.categoria ?? '');
  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [mostrarData, setMostrarData] = useState(false);

  function tratarValor(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) setValor(texto);
  }

  function aoMudarData(_evento, dataSelecionada) {
    setMostrarData(Platform.OS === 'ios');
    if (dataSelecionada) setData(dataSelecionada);
  }

  function salvar() {
    if (!descricao.trim() || !valor || Number(valor) <= 0 || !categoria) {
      Alert.alert('Atenção', 'Preencha descrição, valor e categoria.');
      return;
    }
    const dados = { descricao: descricao.trim(), valor: Number(valor), categoria, data };
    if (despesaEditada) atualizarDespesa(id, dados);
    else adicionarDespesa(dados);
    router.back();
  }

  function excluir() {
    excluirDespesa(id);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Supermercado"
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarData(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarData && (
        <DateTimePicker value={data} mode="date" onChange={aoMudarData} />
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.chip, categoria === cat && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, categoria === cat && styles.chipTextoAtivo]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.botaoTexto}>{despesaEditada ? 'Atualizar' : 'Adicionar'}</Text>
      </Pressable>

      {despesaEditada && (
        <Pressable style={styles.botaoExcluir} onPress={excluir}>
          <Text style={styles.botaoTexto}>Excluir</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
  },
  chipAtivo: { backgroundColor: '#2563eb' },
  chipTexto: { color: '#374151' },
  chipTextoAtivo: { color: '#fff' },
  botaoSalvar: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoExcluir: {
    backgroundColor: '#dc2626',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});