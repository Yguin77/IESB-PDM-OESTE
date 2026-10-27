import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // ------------------------------------------------------------------
  // useEffect #1 — CARREGAR metas do AsyncStorage ao montar o app
  // ------------------------------------------------------------------
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        console.error('Erro ao carregar metas:', erro);
        Alert.alert(
          'Erro',
          'Não foi possível carregar suas metas salvas. Tente novamente.'
        );
      } finally {
        // Só depois de carregar liberamos o efeito de salvamento (ver abaixo)
        setCarregado(true);
      }
    }

    carregarMetas();
  }, []); // [] => executa uma única vez, na montagem

  // ------------------------------------------------------------------
  // useEffect #2 — SALVAR sempre que a lista de metas mudar
  // ------------------------------------------------------------------
  useEffect(() => {
    // Evita sobrescrever o storage com [] antes do carregamento inicial terminar
    if (!carregado) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        console.error('Erro ao salvar metas:', erro);
        Alert.alert(
          'Erro',
          'Não foi possível salvar suas metas. Verifique o espaço/permissões do dispositivo.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregado]); // executa toda vez que "metas" mudar

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------
  function handleAdicionar() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    // Nunca mutar o array anterior: sempre criar um novo array
    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  function handleRemover(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function handleToggleConcluida(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.headerImage}
          />
          <View>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.subtitle}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
        />

        <MetaList
          metas={metas}
          onDelete={handleRemover}
          onToggle={handleToggleConcluida}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7dc3e2',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  headerImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0e2df4',
  },
  subtitle: {
    fontSize: 13,
    color: '#137ae7',
    marginTop: 2,
  },
});
