import { View, Text, Button } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tarefa número {id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
