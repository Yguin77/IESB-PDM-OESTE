import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const parts = [address.street, address.district, address.city].filter(Boolean);
      if (parts.length > 0) {
        label = parts.join(', ');
      }
    }
  } catch (err) {
    // Sem endereço: mantém as coordenadas como texto
  }

  return { latitude, longitude, label };
}
