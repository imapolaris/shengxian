/**
 * Created by mymac on 2017/10/11.
 */
import {IS_IPHONE_X} from "../config/Config";
import {Platform} from 'react-native'

//import * as DeviceInfo from 'react-native-device-info';

// export const is_iPhoneX             = DeviceInfo.getModel() === 'iPhone X';
export const is_iPhoneX             = false;

export const Tabbar_Height          = (IS_IPHONE_X() ? 34 + 49 : 49);

export const Tabbar_marginBottom    = (IS_IPHONE_X() ? 34 : 0);

export const NavigationBar_Height   = 44;

export const StatusBar_Height       = Platform.select({
    ios:(IS_IPHONE_X() ? 44 : 20),
    android:20
})

export const NavigationBar_StatusBar_Height = (NavigationBar_Height + StatusBar_Height);