"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//import {AMapManager, PoiItem, PoiSearchOptions, PoiSearchResult} from 'react-native-smart-amap';
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const PropTypes = require("prop-types");
const UIState_1 = require("../store/UIState");
const POI_PAG_SIZE = 30;
let { width } = react_native_1.Dimensions.get("window");
class AMapSearch extends React.Component {
    constructor(props) {
        super(props);
        this.onStartSearch = this.onStartSearch.bind(this);
        this.onSearched = this.onSearched.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onBack = this.onBack.bind(this);
        this.state = {
            keywords: "",
            search: false,
            count: POI_PAG_SIZE,
            poiDatas: [],
            opType: props.uiData.opType
        };
    }
    onSearched(result) {
        if (result.result && result.result.length > 0) {
            this.setState({ poiDatas: result.result });
        }
        else {
            this.setState({ poiDatas: [] });
        }
    }
    onSelected(item) {
        let pos = {
            name: item.name || "",
            address: item.address || "",
            lat: item.coordinate && item.coordinate.latitude || 0,
            lng: item.coordinate && item.coordinate.longitude || 0,
            city: item.city || ""
        };
        if (this.state.opType == UIState_1.AMapOpType.selelctAddAddr) {
            this.props.changeAddr(pos);
        }
        else {
            this.props.updateLocation && this.props.updateLocation(pos);
        }
        this.context.router.history && this.context.router.history.go(-2);
    }
    onBack() {
        this.context.router.history && this.context.router.history.goBack();
        return true;
    }
    componentDidMount() {
        react_native_1.NativeAppEventEmitter.addListener("amap.onPOISearchDone", this.onSearched);
        react_native_1.BackHandler.addEventListener("hardwareBackPress", this.onBack);
    }
    componentWillUnmount() {
        react_native_1.NativeAppEventEmitter.removeListener("amap.onPOISearchDone", this.onSearched);
        react_native_1.BackHandler.removeEventListener("hardwareBackPress", this.onBack);
    }
    onStartSearch(keywords) {
        const searchOptions = {
            keywords,
            page: 0,
            count: this.state.count || POI_PAG_SIZE,
            city: this.props.currentLocation.city || "上海"
        };
        //AMapManager && AMapManager.searchPoi(searchOptions);
    }
    render() {
        return (React.createElement(react_native_1.View, { style: { flex: 1 } },
            React.createElement(react_native_1.View, { style: { backgroundColor: '#c0c0c0c0', width: width, alignItems: "center", height: 50 } },
                React.createElement(native_base_1.Item, { bordered: true, style: { flex: 1, backgroundColor: 'white', alignSelf: "center", marginVertical: 10, height: 30, marginHorizontal: 10 } },
                    React.createElement(native_base_1.Icon, { active: true, name: 'search' }),
                    React.createElement(native_base_1.Input, { placeholder: '\u67E5\u627E\u5C0F\u533A|\u5927\u53A6|\u5B66\u6821\u7B49', onChangeText: this.onStartSearch, autoFocus: true }))),
            React.createElement(native_base_1.List, { style: { flex: 1, margin: 0, paddingHorizontal: 0 }, dataArray: this.state.poiDatas, renderRow: (data) => (React.createElement(native_base_1.ListItem, { key: data.uid, style: { marginLeft: 0 } },
                    React.createElement(react_native_1.TouchableOpacity, { style: { flex: 1, alignItems: "center" }, activeOpacity: 0.5, onPress: () => { this.onSelected(data); } },
                        React.createElement(react_native_1.View, null,
                            React.createElement(native_base_1.Text, null, data.name),
                            React.createElement(native_base_1.Text, { note: true }, data.address))))) })));
    }
}
AMapSearch.contextTypes = {
    router: PropTypes.object
};
exports.default = AMapSearch;
//# sourceMappingURL=AMapSearch.js.map