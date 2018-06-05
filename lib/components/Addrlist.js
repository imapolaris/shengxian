"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const RouterDefine_1 = require("../constants/RouterDefine");
const ComHeader_1 = require("./ComHeader");
const EntitiesState_1 = require("../store/EntitiesState");
const Tags_1 = require("../constants/Tags");
const MyStatusBar_1 = require("./MyStatusBar");
const Config_1 = require("../config/Config");
const locationHelper_1 = require("../util/locationHelper");
const screenWidth = react_native_1.Dimensions.get('window').width;
//const  ComHeaderWithRouter= withRouter(ComHeader)
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
});
class Addrlist extends React.Component {
    constructor(props) {
        super(props);
        this.onEditAddr = this.onEditAddr.bind(this);
    }
    getTag(id) {
        const data = Tags_1.default.find((val) => val.id === id);
        return data ? data.name : "";
    }
    componentDidMount() {
        if (this.props.addrs.addrs.length <= 0) {
            this.props.fetchAddrList(this.props.addrs.version, true);
        }
        else {
            this.props.fetchAddrList(this.props.addrs.version, false);
        }
    }
    onEditAddr(add, data) {
        this.props.setUiAddr(add, data || EntitiesState_1.defaultAddress);
        let from = this.props.location.state && this.props.location.state.from || "";
        if (add) {
            if (this.props.addrs.addrs.length >= Config_1.Config.MaxAddrNum) {
                native_base_1.Toast.show({
                    text: '地址数超过上限',
                    buttonText: "确定",
                    position: "bottom",
                    type: "warning",
                    duration: 3000
                });
                return;
            }
            this.props.navigation && this.props.navigation.navigate(RouterDefine_1.NavScreenKey.Addaddr);
        }
        else {
            if (this.props.location.state.from == RouterDefine_1.MAIN_MY) {
                this.props.navigation.navigate(RouterDefine_1.NavScreenKey.Addaddr); //修改地址
            }
            else if (from == RouterDefine_1.SUBMITORDER) {
                if (!data)
                    return;
                this.props.setSubmitOrderAddr(data);
                this.props.navigation && this.props.navigation.goBack();
            }
            else {
                if (data) {
                    let { lat, lng } = data;
                    let building = data.building || data.address || "";
                    console.log("update location", { name: building, address: data.address, lat: data.lat, lng: data.lng, city: "1" });
                    this.props.updateLocation && this.props.updateLocation({ name: building, address: data.address, lat: data.lat, lng: data.lng, city: "1" });
                    locationHelper_1.LocationHelper.updateLocation({ name: building, address: data.address, lat: data.lat, lng: data.lng, city: "1" });
                }
                this.props.navigation && this.props.navigation.goBack();
            }
        }
    }
    onEditAddrOnly(add, data) {
        this.props.setUiAddr(add, data || EntitiesState_1.defaultAddress);
        this.props.navigation.navigate(RouterDefine_1.NavScreenKey.Addaddr); //修改地址
    }
    render() {
        const { navigation } = this.props;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            this.props.navigation.state.params.from == RouterDefine_1.MAIN_MY ?
                React.createElement(ComHeader_1.ComHeader, { title: "\u6536\u8D27\u5730\u5740", navigation: navigation }) :
                React.createElement(ComHeader_1.ComHeader, { title: "\u9009\u62E9\u6536\u8D27\u5730\u5740", navigation: navigation }),
            React.createElement(native_base_1.View, { style: exports.styles.bk },
                React.createElement(native_base_1.List, { dataArray: this.props.addrs.addrs, renderRow: (aData) => React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.onEditAddr(false, aData); } },
                        React.createElement(native_base_1.View, { style: exports.styles.box1 },
                            React.createElement(native_base_1.View, { style: [exports.styles.box2, { margin: 0 }] },
                                React.createElement(native_base_1.Icon, { name: "person", style: exports.styles.fonticon }),
                                React.createElement(native_base_1.Text, { style: exports.styles.fonttxt }, aData.name),
                                React.createElement(native_base_1.Text, { style: [exports.styles.fontaddr] }, aData.phone),
                                !aData.isdefault ?
                                    React.createElement(react_native_1.TouchableOpacity, { style: [exports.styles.fontmod, { backgroundColor: Config_1.Config.ColorG3c }], onPress: () => { this.onEditAddrOnly(false, aData); } },
                                        React.createElement(native_base_1.Text, { style: { color: '#fff', fontSize: 12, backgroundColor: 'transparent' } }, "\u4FEE\u6539"))
                                    : null),
                            React.createElement(native_base_1.View, { style: exports.styles.blackline }),
                            React.createElement(native_base_1.View, { style: [exports.styles.box2, { margin: 0 }] },
                                React.createElement(native_base_1.Icon, { name: "pin", style: exports.styles.fonticon }),
                                React.createElement(native_base_1.Text, { style: [exports.styles.fontaddr, { width: Config_1.px2dp(265) }] }, aData.building + aData.address),
                                aData.user_address_tag_id > 0 ?
                                    React.createElement(native_base_1.View, { style: exports.styles.tag },
                                        React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorOff, fontSize: 12, backgroundColor: 'transparent' } }, this.getTag(aData.user_address_tag_id)))
                                    : null))) }),
                React.createElement(native_base_1.View, { style: { height: Config_1.Config.BtnComHeight, position: 'absolute', bottom: Config_1.IS_IPHONE_X() ? 24 : 0, width: screenWidth } },
                    React.createElement(react_native_1.TouchableOpacity, { style: { backgroundColor: Config_1.Config.ColorG3c, flex: 1, alignItems: 'center', justifyContent: 'center' }, onPress: () => { this.onEditAddr(true); } },
                        React.createElement(native_base_1.Text, { style: { color: 'white' } }, "\u65B0\u52A0\u5730\u5740"))))));
    }
}
exports.default = Addrlist;
exports.styles = react_native_1.StyleSheet.create({
    bk: { flex: 1, backgroundColor: '#f3f3f3' },
    box1: { borderRadius: 10, borderWidth: 1, backgroundColor: 'white', marginHorizontal: 10, marginTop: 2, borderColor: '#f3f3f3' },
    box2: { flexDirection: "row", alignItems: 'center' },
    fonttxt: { color: Config_1.Config.ColorB333, fontSize: Config_1.Config.FontBase, margin: 10 },
    fontaddr: { color: Config_1.Config.ColorB666, fontSize: Config_1.Config.Font0875, margin: 10 },
    fonticon: { color: '#b5b5b5', fontSize: 20, marginLeft: 10 },
    fonttag: { backgroundColor: Config_1.Config.ColorOff, borderRadius: 5, position: 'absolute', right: 10, paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center', alignItems: 'center' },
    fontmod: { backgroundColor: Config_1.Config.ColorOff, borderRadius: 5, position: 'absolute', right: 10, paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center', alignItems: 'center' },
    fontdef: { backgroundColor: "orange", borderRadius: 5, position: 'absolute', right: 10, paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center', alignItems: 'center' },
    blackline: { height: 1, backgroundColor: '#f3f3f3' },
    tag: { borderColor: Config_1.Config.ColorOff, borderWidth: 1, backgroundColor: 'white', borderRadius: 5, position: 'absolute', right: 10,
        paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center', alignItems: 'center' },
});
//# sourceMappingURL=Addrlist.js.map