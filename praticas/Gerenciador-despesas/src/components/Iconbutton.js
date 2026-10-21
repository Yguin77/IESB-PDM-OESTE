import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ icon, size = 24, color = '#000', onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      hitSlop={8}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});