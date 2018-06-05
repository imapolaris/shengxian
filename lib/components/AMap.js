"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_smart_amap_1 = require("react-native-smart-amap");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const PropTypes = require("prop-types");
const UIState_1 = require("../store/UIState");
const react_native_2 = require("react-native");
const react_native_smart_amap_location_1 = require("react-native-smart-amap-location");
const goback = require("../../images/goback.png");
const search = require("../../images/search.png");
const screenWidth = react_native_1.Dimensions.get('window').width;
const Config_1 = require("../config/Config");
const locationHelper_1 = require("../util/locationHelper");
const POI_PAG_SIZE = 30;
const DEFAULT_MAP_ZOOM_LEVEL = 17.1;
let { width } = react_native_1.Dimensions.get("window");
class AMap extends React.Component {
    constructor(props) {
        super(props);
        //这里监听到用户的位置
        this._onLocationResult = (result) => {
            if (result.error) {
                console.log(`map-错误代码: ${result.error.code}, map-错误信息: ${result.error.localizedDescription}`);
            }
            else {
                if (result.formattedAddress) {
                    console.log(`map-格式化地址 = ${result.formattedAddress}`);
                }
                else {
                    console.log(`map-纬度 = ${result.coordinate.latitude}, map-经度 = ${result.coordinate.longitude}`);
                    this.setState({
                        latitude: result.coordinate.latitude,
                        longitude: result.coordinate.longitude
                    });
                    let address = this.props.location ? this.props.location.state : undefined;
                    let center = { latitude: this.props.currentLocation && this.props.currentLocation.lat || result.coordinate.latitude, longitude: this.props.currentLocation && this.props.currentLocation.lng || result.coordinate.longitude };
                    if (address && address.lat && address.lng) {
                        center = { latitude: address.lat, longitude: address.lng };
                    }
                    setTimeout(() => {
                        this._AMap.setCenterCoordinate({ latitude: center.latitude, longitude: center.longitude });
                    }, 500);
                }
            }
        };
        this.onMoved = this.onMoved.bind(this);
        this.onSearched = this.onSearched.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onFocusSearch = this.onFocusSearch.bind(this);
        this.onBlurSearch = this.onBlurSearch.bind(this);
        this.onStartSearch = this.onStartSearch.bind(this);
        this.onBack = this.onBack.bind(this);
        // 起始位置
        let address = props.location.state;
        let center = { latitude: locationHelper_1.LocationHelper.currentLocation.lat, longitude: locationHelper_1.LocationHelper.currentLocation.lng };
        if (address && address.lat && address.lng) {
            center = { latitude: address.lat, longitude: address.lng };
        }
        this.state = {
            keywords: "",
            search: false,
            count: POI_PAG_SIZE,
            center,
            poiDatas: [],
            opType: props.uiData.opType,
            latitude: 0,
            longitude: 0
        };
    }
    onSearched(result) {
        console.log("resultconsole.log('dadadadadadzzzzzzzz')", result);
        if (result.searchResultList && result.searchResultList.length > 0) {
            this.setState({ poiDatas: result.searchResultList });
        }
        else {
            this.setState({ poiDatas: [] });
        }
    }
    onSelected(item) {
        let pos = {
            name: item.name || "",
            address: item.address || "",
            lat: item.latitude || 0,
            lng: item.longitude || 0,
            city: item.cityName || ""
        };
        console.log(`选择的地址${item.address},经纬度 = ${item.latitude} + ${item.longitude}`);
        // 地图中心点
        if (this._AMap && item.latitude && item.longitude) {
            this._AMap.setCenterCoordinate({ latitude: item.latitude, longitude: item.longitude });
        }
        if (this.state.opType == UIState_1.AMapOpType.selelctAddAddr) {
            let addr = {
                building: item.name || "",
                address: item.address || "",
                lat: item.latitude || 0,
                lng: item.longitude || 0 //经度
            };
            this.props.updateUiAddr(addr);
        }
        else {
            this.props.updateLocation && this.props.updateLocation(pos);
        }
        if (this.state.search) {
            this.setState({ search: false });
            react_native_2.Keyboard.dismiss();
        }
        else {
            this.props.history && this.props.history.goBack();
        }
    }
    onBack() {
        this.props.history && this.props.history.goBack();
        return true;
    }
    componentDidMount() {
        react_native_smart_amap_location_1.default.init(null); //使用默认定位配置
        react_native_1.NativeAppEventEmitter.addListener("amap.onPOISearchDone", this.onSearched);
        react_native_1.NativeAppEventEmitter.addListener("amap.location.onLocationResult", this.onSearched);
        react_native_1.BackHandler.addEventListener("hardwareBackPress", this.onBack);
    }
    componentWillUnmount() {
        react_native_1.NativeAppEventEmitter.removeListener("amap.onPOISearchDone", this.onSearched);
        react_native_1.NativeAppEventEmitter.removeListener("amap.location.onLocationResult", this.onSearched);
        react_native_1.BackHandler.removeEventListener("hardwareBackPress", this.onBack);
        react_native_smart_amap_location_1.default.cleanUp();
    }
    onMoved(event) {
        this.setState({ center: event.nativeEvent.data.centerCoordinate });
        let { keywords, count } = this.state;
        const searchOptions = {
            coordinate: event.nativeEvent.data.centerCoordinate,
            types: "商务住宅|学校",
            keywords,
            page: 0,
            count,
        };
        this._AMap && this._AMap.searchPoiByCenterCoordinate(searchOptions);
    }
    onFocusSearch() {
        this.setState({ search: true });
    }
    onBlurSearch() {
        this.setState({ search: false });
    }
    onStartSearch(keywords) {
        console.log('dadadadadadzzzzzzzz + ' + keywords);
        this._AMap && this._AMap.searchLocation(keywords);
    }
    render() {
        let { latitude, longitude } = this.state.center;
        let option = {
            frame: {
                width: screenWidth,
                height: this.state.search ? 0 : 300
            },
            zoomLevel: DEFAULT_MAP_ZOOM_LEVEL,
            showsUserLocation: true,
            centerMarker: (react_native_1.Platform.OS == 'ios') ? 'icon_location' : 'poi_marker',
            centerCoordinate: { latitude: latitude || locationHelper_1.LocationHelper.currentLocation.lat, longitude: longitude || locationHelper_1.LocationHelper.currentLocation.lng }
        };
        return (React.createElement(react_native_1.View, { style: { flex: 1, marginTop: 5 } },
            React.createElement(react_native_1.View, null,
                React.createElement(react_native_smart_amap_1.default, { style: { height: this.state.search ? 0 : 300 }, onDidMoveByUser: this.onMoved, options: option, ref: (item) => { item && (this._AMap = item); } }),
                React.createElement(native_base_1.Button, { style: { width: 50, height: 50, position: 'absolute', right: 10, bottom: 20, borderWidth: 0.5,
                        backgroundColor: 'rgba(246, 246, 246, 0.5)', justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderColor: '#ffffff' }, onPress: () => {
                        this._AMap.setCenterCoordinate({ latitude: locationHelper_1.LocationHelper.currentLocation.lat, longitude: locationHelper_1.LocationHelper.currentLocation.lng });
                        //this._activityIndicator.setState({ visible: true,})
                    } },
                    React.createElement(native_base_1.Icon, { name: react_native_1.Platform.OS == 'ios' ? 'ios-locate-outline' : 'md-locate', style: { width: 40, justifyContent: 'center',
                            alignItems: 'center', color: Config_1.Config.ColorG3c, alignSelf: 'center', marginLeft: 38 } }))),
            React.createElement(react_native_1.View, { style: { height: 35, borderBottomWidth: 1, borderColor: "#f3f3f3", justifyContent: 'center', marginLeft: 10 } },
                React.createElement(native_base_1.Text, null, "\u9644\u8FD1\u5730\u5740")),
            React.createElement(native_base_1.List, { keyboardShouldPersistTaps: 'always', style: { flex: 1, margin: 0, paddingHorizontal: 0 }, dataArray: this.state.poiDatas, renderRow: (data) => (React.createElement(native_base_1.ListItem, { key: data.uid, style: { marginLeft: 0 } },
                    React.createElement(react_native_1.TouchableOpacity, { style: { flex: 1, alignItems: "center" }, activeOpacity: 0.5, onPress: () => { this.onSelected(data); } },
                        React.createElement(react_native_1.View, null,
                            React.createElement(native_base_1.Text, null, data.name),
                            React.createElement(native_base_1.Text, { note: true }, data.address))))) }),
            React.createElement(react_native_1.View, { style: { position: 'absolute', left: 0, top: 0, paddingTop: Config_1.IS_IPHONE_X() ? 44 : 20, flexDirection: 'row',
                    backgroundColor: 'white', height: Config_1.IS_IPHONE_X() ? 88 : 64, width: screenWidth,
                    paddingRight: 10, justifyContent: 'center', alignItems: 'center' } },
                React.createElement(native_base_1.Button, { style: { width: Config_1.px2dp(40), height: Config_1.Config.BtnComHeight, marginRight: 10 }, transparent: true, onPress: () => { this.props.history && this.props.history.goBack(); } },
                    React.createElement(react_native_2.Image, { source: goback, style: { height: Config_1.px2dp(23), width: Config_1.px2dp(23), marginLeft: 20 } })),
                React.createElement(react_native_1.View, { style: { backgroundColor: 'white', alignItems: "center", height: 44, paddingRight: 10, width: (screenWidth - 44) } },
                    React.createElement(native_base_1.Item, { bordered: true, style: { flex: 1, backgroundColor: Config_1.Config.ColorBf2, alignSelf: "center", borderWidth: 0.5, borderRadius: 15, marginVertical: 10, height: Config_1.Config.SearchHeight, marginHorizontal: 10 } },
                        React.createElement(react_native_2.Image, { style: { height: 20, width: 20, alignItems: 'center', justifyContent: 'center', marginRight: -1, marginLeft: 10, marginTop: 2 }, source: search, resizeMode: 'contain' }),
                        React.createElement(native_base_1.Input, { placeholder: '\u67E5\u627E\u5C0F\u533A|\u5927\u53A6|\u5B66\u6821\u7B49', style: { color: Config_1.Config.ColorB999, fontSize: Config_1.Config.Font0875, justifyContent: 'center', alignItems: 'center' }, onFocus: this.onFocusSearch, onBlur: this.onBlurSearch, onChangeText: this.onStartSearch }))))));
    }
}
AMap.contextTypes = {
    history: PropTypes.object
};
exports.default = AMap;
//# sourceMappingURL=AMap.js.map