
import {AsyncStorage} from 'react-native';

class DB {

    async saveValueForKey(key: any, value: any) {
        let result = value;
        if (value && typeof value === 'object') {
            result = JSON.stringify(value);
        }
        return await AsyncStorage.setItem(key, result);
    }

    async getValueForKey(key: any) {
        const value = await AsyncStorage.getItem(key);
        let result;
        try {
            result = JSON.parse(value);
        } catch (e) {
            console.warn(e);
            result = value;
        } finally {
            return result;
        }
    }

    removeValueFoKey(key: any) {
        return AsyncStorage.removeItem(key);
    }

    clear() {
        return AsyncStorage.clear();
    }

}

const instance = new DB();

export default instance;
