// components/CompromissoList.js
// Aula 05 - Componente controlado por props (itens, onDelete, tituloLista, listaVazia)
// Aula 06 - Remoção por id com Pressable + android_ripple
// Aula 04 - flex: 1 para ocupar o restante da tela

import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      {itens.length === 0 ? (
        <Text style={styles.vazio}>{listaVazia}</Text>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.id} // key estável baseada no id
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.faixa} />

              <View style={styles.itemInfo}>
                <Text style={styles.itemTexto}>{item.texto}</Text>
                <Text style={styles.itemData}>{item.criadoEm}</Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.botaoRemover,
                  pressed && styles.botaoRemoverPressed,
                ]}
                android_ripple={{ color: '#F3B8BA', borderless: true }}
                onPress={() => onDelete(item.id)}
                hitSlop={8}
              >
                <Text style={styles.botaoRemoverTexto}>×</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // uso de flex (Aula 04)
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1D2B3A',
  },
  vazio: {
    fontSize: 14,
    color: '#9A9691',
    textAlign: 'center',
    marginTop: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingRight: 14,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  faixa: {
    width: 4,
    alignSelf: 'stretch',
    backgroundColor: '#ED1C24',
    marginRight: 12,
    borderRadius: 2,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemTexto: {
    fontSize: 15,
    color: '#1D2B3A',
  },
  itemData: {
    fontSize: 11,
    color: '#9A9691',
    marginTop: 3,
  },
  botaoRemover: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FBE7E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoRemoverPressed: {
    opacity: 0.6,
  },
  botaoRemoverTexto: {
    color: '#ED1C24',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
