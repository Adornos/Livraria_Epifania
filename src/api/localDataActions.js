
import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('@userData', JSON.stringify(userData))
    } catch (e) {
        console.log("Erro ao salvar usuario local", e);
    }
}

export const getUserData = async () => {
    try {
        const data = await AsyncStorage.getItem('@userData')
        return data != null ? JSON.parse(data) : null;
    } catch (e) {
        console.log("Erro ao resgatar usuario local", e);
    }
}

export const debugAsyncStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const values = await AsyncStorage.multiGet(keys);
  console.log("AsyncStorage:", values);
};