import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function NewTask() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Nova tarefa</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}
