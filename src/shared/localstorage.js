import AsyncStorage from '@react-native-community/async-storage';

export const setAppStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        throw error;
    }
};

export const getAppStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return await JSON.parse(data);
    } catch (error) {
        throw error;
    }
};

export const removeAppStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        throw error;
    }
};

export const removeAppStorageByKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        throw error;
    }
};
