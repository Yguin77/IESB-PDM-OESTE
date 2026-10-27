import { useEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Profile() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) {
          setPhotoUri(saved);
        }
      } catch (err) {
        // Sem foto salva: mantém o avatar vazio
      }
    }
    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) {
      return;
    }
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch (err) {
      // Falha ao salvar: a foto continua na tela nesta sessão
    }
  }

  async function handlePickImage() {
    const uri = await pickImage();
    await savePhoto(uri);
  }

  async function handleTakePhoto() {
    const uri = await takePhoto();
    await savePhoto(uri);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePickImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>Toque para escolher</Text>
          </View>
        )}
      </Pressable>
      <Text style={styles.hint}>Toque no avatar para abrir a galeria</Text>
      <Button title="Tirar foto" onPress={handleTakePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholder: {
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { color: '#555', textAlign: 'center', padding: 12 },
  hint: { fontSize: 14, color: '#555' },
});