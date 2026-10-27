import { Stack } from 'expo-router';
import { ExpensesContextProvider } from '../src/store/expenses-context';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="gerenciar" options={{ title: 'Nova despesa' }} />
      </Stack>
    </ExpensesContextProvider>
  );
}