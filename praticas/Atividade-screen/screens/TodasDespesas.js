import { View, Text, StyleSheet } from 'react-native';

export default function TodasDespeas() {
  return (
    <View style={styles.container}>
      <Text>TodasDespeas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});