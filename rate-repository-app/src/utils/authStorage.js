import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
   // Obtenemos el token usando la clave con namespace
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`,
    );

    return accessToken || undefined;
  }

  async setAccessToken(accessToken) {
    // Guardamos el token convertido a string
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      accessToken,
    );
    }

  async removeAccessToken() {
    // Eliminamos la clave específica del almacenamiento
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    }
}

export default AuthStorage;