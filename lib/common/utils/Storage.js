"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class DB {
    saveValueForKey(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = value;
            if (value && typeof value === 'object') {
                result = JSON.stringify(value);
            }
            return yield react_native_1.AsyncStorage.setItem(key, result);
        });
    }
    getValueForKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield react_native_1.AsyncStorage.getItem(key);
            let result;
            try {
                result = JSON.parse(value);
            }
            catch (e) {
                console.warn(e);
                result = value;
            }
            finally {
                return result;
            }
        });
    }
    removeValueFoKey(key) {
        return react_native_1.AsyncStorage.removeItem(key);
    }
    clear() {
        return react_native_1.AsyncStorage.clear();
    }
}
const instance = new DB();
exports.default = instance;
//# sourceMappingURL=Storage.js.map