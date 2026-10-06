import { Tabs, useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={() => router.push('/gerenciar')} style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 28, color: '#2563eb' }}>+</Text>
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Recentes' }} />
      <Tabs.Screen name="todas" options={{ title: 'Todas' }} />
    </Tabs>
  );
}