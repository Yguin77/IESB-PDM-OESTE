import { Stack } from 'expo-router';
import { DespesasProvider } from '../src/context/DespesasContext';

export default function RootLayout() {
  return (
    <DespesasProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="gerenciar"
          options={{ title: 'Gerenciar despesa', presentation: 'modal' }}
        />
      </Stack>
    </DespesasProvider>
  );
}