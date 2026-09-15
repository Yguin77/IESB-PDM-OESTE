// App.js
// RotinaIESB - Atividade Integradora (Aulas 02 a 06)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

import {
  tituloApp,
  subtituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
  mensagemCampoVazio,
  mensagemErroSalvar,
  mensagemErroCarregar,
} from './labels';

const labels = { placeholderCompromisso, botaoAdicionar };

// Aula 06 - Chave de persistência no AsyncStorage
const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // ----------------------------------------------------
  // useEffect #1 - CARREGAR compromissos do AsyncStorage
  // (executa apenas uma vez, na montagem do app)
  // ----------------------------------------------------
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (erro) {
        console.log('Erro ao carregar compromissos:', erro);
        Alert.alert('Erro', mensagemErroCarregar);
      } finally {
        setCarregado(true);
      }
    }

    carregarCompromissos();
  }, []);

 
  useEffect(() => {
    if (!carregado) return;

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        console.log('Erro ao salvar compromissos:', erro);
        Alert.alert('Erro', mensagemErroSalvar);
      }
    }

    salvarCompromissos();
  }, [compromissos, carregado]);

  // ----------------------------------------------------
  // Adicionar novo compromisso
  // ----------------------------------------------------
  function adicionarCompromisso() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Atenção', mensagemCampoVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(), // identificador único
      texto: textoLimpo,
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    setCompromissos((listaAtual) => [...listaAtual, novoCompromisso]);
    setTexto('');
  }

  // ----------------------------------------------------
  // Remover compromisso pelo id
  // ----------------------------------------------------
  function removerCompromisso(id) {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" />

        {/* Faixa vermelha do cabeçalho, com cantos arredondados embaixo (Aula 04) */}
        <View style={styles.header}>
          <Image source={require('./assets/iesb.png')} style={styles.iesb} />
          <View style={styles.headerTextos}>
            <Text style={styles.titulo}>{tituloApp}</Text>
            <Text style={styles.subtitulo}>{subtituloApp}</Text>
          </View>
        </View>

        <View style={styles.corpo}>
          {/* Cartão de cadastro "flutuando" sobre o cabeçalho (Aula 05) */}
          <View style={styles.cartaoInput}>
            <CompromissoInput
              value={texto}
              onChangeText={setTexto}
              onAdd={adicionarCompromisso}
              labels={labels}
            />
          </View>

          {/* Área da lista, ocupando o restante da tela (Aula 04 e 06) */}
          <View style={styles.areaLista}>
            <CompromissoList
              itens={compromissos}
              onDelete={removerCompromisso}
              tituloLista={tituloLista}
              listaVazia={listaVazia}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ED1C24',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ED1C24',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 34,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  iesb: {
    width: 50,
    height: 50,
    marginRight: 14,
    resizeMode: 'contain',
  },
  headerTextos: {
    flexShrink: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  subtitulo: {
    fontSize: 13,
    color: '#FFD9DB',
    marginTop: 2,
  },
  corpo: {
    flex: 1,
    backgroundColor: '#F6F5F2',
  },
  cartaoInput: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20, // efeito de "flutuar" sobre o cabeçalho
    borderRadius: 16,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  areaLista: {
    flex: 1, // uso de flex (Aula 04)
    paddingHorizontal: 20,
    paddingTop: 22,
  },
});
