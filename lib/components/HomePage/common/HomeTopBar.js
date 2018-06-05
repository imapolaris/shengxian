"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_smart_amap_location_1 = require("react-native-smart-amap-location");
//import * as HomeAddress from '../asset/home_address';
//import * as HomeArrowDown from '../asset/home_arrow_down';
//import * as HomeSearch from '../asset/home_search';
const ConstValue = require("../../../constants/iOSScreenAuto");
const Config_1 = require("../../../config/Config");
const search = require("../../../../images/search.png");
const postion = require("../../../../images/postion.png");
const down = require("../../../../images/down.png");
const locationHelper_1 = require("../../../util/locationHelper");
const screenWidth = react_native_1.Dimensions.get('window').width;
const maxLength = 6;
class HomeTopBar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            POIName: '正在定位中...',
            currentAppState: react_native_1.AppState.currentState,
        };
        this.appStateListener = () => {
            react_native_1.AppState.addEventListener('change', this._handleAppStateChange);
        };
        this._handleAppStateChange = (nextAppState) => {
            if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
                console.log('到前台');
                if (this.state.POIName === '正在定位中...') {
                    console.log('开始定位');
                    this._showReGeocode();
                }
            }
            this.setState({ currentAppState: nextAppState });
        };
        //单次定位并返回逆地理编码信息
        this._showReGeocode = () => {
            console.log('_showReGeocode');
            react_native_smart_amap_location_1.default.getReGeocode();
        };
        this._onLocationResult = (result) => {
            console.log('_onLocationResult + ' + JSON.stringify(result));
            if (result.error) {
                // Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`)
                console.log(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`);
            }
            else {
                if (result.formattedAddress) {
                    // Alert.alert(`格式化地址 = ${result.formattedAddress}`)
                    console.log(`格式化地址 = ${result.formattedAddress}`);
                    if (this.state.POIName === '正在定位中...') {
                        console.log('开始定位');
                        this.setState({
                            POIName: result.POIName
                        });
                    }
                }
                else {
                    // Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`)
                    console.log(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`);
                    console.log('获取用户定位,更新定位updateCurrentLocation');
                    locationHelper_1.LocationHelper.updateCurrentLocation({ name: '当前位置', address: '最新地址', lat: result.coordinate.latitude, lng: result.coordinate.longitude, city: "1" });
                }
            }
        };
    }
    componentDidMount() {
        locationHelper_1.LocationHelper.getLocation((location) => {
            console.log('LocationHelperasdjhajksdhjkashd +' + location);
            this.setState({
                POIName: location.name
            });
        });
        react_native_smart_amap_location_1.default.init(null); //使用默认定位配置
        react_native_1.NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult);
        // if(!this.state.POIName)this._showReGeocode()
        this.appStateListener();
        react_native_smart_amap_location_1.default.getLocation();
        if (this.state.POIName === '正在定位中...') {
            console.log('开始定位');
            this._showReGeocode();
        }
    }
    componentWillUnmount() {
        react_native_1.NativeAppEventEmitter.removeListener("amap.location.onLocationResult", this._onLocationResult);
        //停止并销毁定位服务
        react_native_smart_amap_location_1.default.cleanUp();
        react_native_1.AppState.removeEventListener('change', this._handleAppStateChange);
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.viewStyle },
            React.createElement(react_native_1.TouchableOpacity, { style: styles.addressStyle, onPress: () => { this.props.addressClick(); } },
                React.createElement(react_native_1.Image, { style: { height: 20, width: 20, alignSelf: 'center' }, source: postion, resizeMode: 'contain' }),
                React.createElement(react_native_1.Text, { style: { backgroundColor: 'transparent', marginLeft: 5, color: Config_1.Config.ColorW, fontSize: 15, fontWeight: '100' } }, this.state.POIName || "定位中......"),
                React.createElement(react_native_1.Image, { style: { height: 12, width: 12, marginTop: 2, marginLeft: 5 }, source: down, resizeMode: 'contain' })),
            React.createElement(react_native_1.TouchableOpacity, { style: styles.searchStyle, onPress: () => { this.props.searchClick(); } },
                React.createElement(react_native_1.Image, { style: { height: 20, width: 20 }, source: search, resizeMode: 'contain' }))));
    }
}
exports.default = HomeTopBar;
const styles = react_native_1.StyleSheet.create({
    container: Object.assign({}, react_native_1.Platform.select({
        ios: {
            marginTop: ConstValue.StatusBar_Height,
        },
        android: {
            marginTop: 0,
        },
    }), { backgroundColor: 'white' }),
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center'
    },
    addressStyle: {
        flexDirection: 'row',
        width: screenWidth - 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Config_1.Config.SearchHeight,
    },
    textStyle: {
        fontSize: 15,
        marginLeft: 5,
    },
    searchStyle: {
        width: 30,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    searchText: {
        fontSize: Config_1.Config.Font0875,
        color: Config_1.Config.ColorB999,
    }
});
//# sourceMappingURL=HomeTopBar.js.map