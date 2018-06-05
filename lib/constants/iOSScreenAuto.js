"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mymac on 2017/10/11.
 */
const Config_1 = require("../config/Config");
const react_native_1 = require("react-native");
//import * as DeviceInfo from 'react-native-device-info';
// export const is_iPhoneX             = DeviceInfo.getModel() === 'iPhone X';
exports.is_iPhoneX = false;
exports.Tabbar_Height = (Config_1.IS_IPHONE_X() ? 34 + 49 : 49);
exports.Tabbar_marginBottom = (Config_1.IS_IPHONE_X() ? 34 : 0);
exports.NavigationBar_Height = 44;
exports.StatusBar_Height = react_native_1.Platform.select({
    ios: (Config_1.IS_IPHONE_X() ? 44 : 20),
    android: 20
});
exports.NavigationBar_StatusBar_Height = (exports.NavigationBar_Height + exports.StatusBar_Height);
//# sourceMappingURL=iOSScreenAuto.js.map