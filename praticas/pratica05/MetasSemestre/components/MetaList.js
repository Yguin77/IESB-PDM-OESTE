import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

// Props:
// - metas: array de { id, texto, criadaEm, concluida }
// - onDelete: função(id) chamada para remover uma meta
// - onToggle: função(id) chamada para marcar/desmarcar como concluída
export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhuma meta cadastrada ainda. Adicione a primeira acima! 🎯
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <Pressable
            style={styles.itemTextTouchable}
            onPress={() => onToggle(item.id)}
            android_ripple={{ color: '#420303' }}
          >
            <Text
              style={[
                styles.itemText,
                item.concluida && styles.itemTextDone,
              ]}
            >
              {item.texto}
            </Text>
            <Text style={styles.itemDate}>
              {new Date(item.criadaEm).toLocaleDateString('pt-BR')}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#010e2d' }}
          >
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  itemTextTouchable: {
    flex: 1,
    paddingVertical: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
    overflow: 'hidden',
  },
  deleteButtonPressed: {
    opacity: 0.8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
