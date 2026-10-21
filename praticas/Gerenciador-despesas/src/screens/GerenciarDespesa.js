import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES, COLORS } from '../constants/theme';
import IconButton from '../components/Iconbutton';

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa() {
  const router = useRouter();
  const navigation = useNavigation();
  const { expenseId } = useLocalSearchParams();
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  const scheme = useColorScheme();
  const theme = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  const isEditing = !!expenseId;
  const editedExpense = expenses.find((e) => e.id === expenseId);

  const [form, setForm] = useState({
    description: editedExpense?.description ?? '',
    amount: editedExpense ? String(editedExpense.amount) : '',
    date: editedExpense ? new Date(editedExpense.date) : new Date(),
    category: editedExpense?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showDate, setShowDate] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  function handleChange(field, value) {
    const newForm = { ...form, [field]: value };
    setForm(newForm);

    // remove só as mensagens dos campos que foram corrigidos
    const newErrors = validate(newForm);
    setErrors((prev) => {
      const next = {};
      Object.keys(prev).forEach((key) => {
        if (newErrors[key]) next[key] = newErrors[key];
      });
      return next;
    });
  }

  function handleAmount(text) {
    if (/^\d*\.?\d{0,2}$/.test(text)) handleChange('amount', text);
  }

  function handleDateChange(_event, selectedDate) {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) handleChange('date', selectedDate);
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);

    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  // título dinâmico + ícone de excluir (só no modo edição)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => <IconButton icon="trash" color={theme.error} onPress={handleDelete} />
        : undefined,
    });
  }, [navigation, isEditing, theme.error]);

  const inputStyle = (field) => [
    styles.input,
    { backgroundColor: theme.card, color: theme.text, borderColor: theme.border },
    errors[field] && { borderColor: theme.error },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex: Supermercado"
          placeholderTextColor={theme.textSecondary}
        />
        {errors.description && <Text style={[styles.error, { color: theme.error }]}>{errors.description}</Text>}

        <Text style={[styles.label, { color: theme.text }]}>Valor</Text>
        <TextInput
          style={inputStyle('amount')}
          value={form.amount}
          onChangeText={handleAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
        />
        {errors.amount && <Text style={[styles.error, { color: theme.error }]}>{errors.amount}</Text>}

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <Pressable style={inputStyle('date')} onPress={() => setShowDate(true)}>
          <Text style={{ color: theme.text }}>{form.date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {errors.date && <Text style={[styles.error, { color: theme.error }]}>{errors.date}</Text>}
        {showDate && (
          <DateTimePicker value={form.date} mode="date" onChange={handleDateChange} />
        )}

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setShowCategories(true)}>
          <Text style={{ color: form.category ? theme.text : theme.textSecondary }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {errors.category && <Text style={[styles.error, { color: theme.error }]}>{errors.category}</Text>}

        <Pressable style={[styles.saveButton, { backgroundColor: theme.primary }]} onPress={handleSave}>
          <Text style={styles.saveText}>{isEditing ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </ScrollView>

      <Modal visible={showCategories} transparent animationType="slide" onRequestClose={() => setShowCategories(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowCategories(false)}>
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={styles.option}
                onPress={() => {
                  handleChange('category', cat);
                  setShowCategories(false);
                }}
              >
                <Text
                  style={{
                    color: form.category === cat ? theme.primary : theme.text,
                    fontWeight: form.category === cat ? 'bold' : 'normal',
                    fontSize: 16,
                  }}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 48 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { padding: 12, borderRadius: 8, borderWidth: 1 },
  error: { fontSize: 13, marginTop: 4 },
  saveButton: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  saveText: { color: '#fff', fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  option: { paddingVertical: 14 },
});