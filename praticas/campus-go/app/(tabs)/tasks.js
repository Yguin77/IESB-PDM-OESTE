import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  async function handleCheckIn() {
    try {
      const place = await getCurrentPlace();
      if (!place) {
        Alert.alert(
          'Sem permissão',
          'Não foi possível acessar a localização. Libere a permissão nos ajustes.'
        );
        return;
      }
      Alert.alert('Check-in feito', place.label);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      if (!id) {
        Alert.alert('Sem permissão', 'Libere as notificações para receber o lembrete.');
        return;
      }
      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch (err) {
      Alert.alert('Indisponível', 'Notificações locais não funcionam neste ambiente.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err) {
     
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Link href="/new-task" asChild>
        <Button title="Nova tarefa" />
      </Link>

      <Button title="Abrir tarefa 42" onPress={() => router.push('/task/42')} />
      <Button title="Estudei aqui" onPress={handleCheckIn} />
      <Button title="Lembrar em 10 segundos" onPress={handleReminder} />
      <Button title="Concluir" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
});