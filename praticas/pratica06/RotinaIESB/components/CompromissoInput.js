// components/CompromissoInput.js
// Aula 05 - Componente controlado por props (value, onChangeText, onAdd, labels)
// Aula 04 - Layout em linha usando Flexbox

import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
        onSubmitEditing={onAdd}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressed,
        ]}
        android_ripple={{ color: '#B0141A' }}
        onPress={onAdd}
      >
        <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '66%', // uso de width percentual (Aula 04)
    borderWidth: 1,
    borderColor: '#E4E1DC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    backgroundColor: '#FAFAF8',
    color: '#1D2B3A',
  },
  botao: {
    width: '30%',
    backgroundColor: '#ED1C24',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  botaoPressed: {
    opacity: 0.85,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
