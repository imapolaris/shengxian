"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
// import {Util} from "../common/utils/util";
const ComHeader_1 = require("./ComHeader");
const MyStatusBar_1 = require("./MyStatusBar");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const Config_1 = require("../config/Config");
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
});
class Shoplist extends React.Component {
    constructor(props) {
        super(props);
        //拨打电话  
        this.linking = (url) => {
            console.log(url);
            react_native_1.Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                }
                else {
                    return react_native_1.Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        };
        this.onChangeShop = this.onChangeShop.bind(this);
    }
    onChangeShop(id) {
        this.props.changeShop(id);
        this.props.history.goBack();
    }
    render() {
        let { shops } = this.props;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: "\u95E8\u5E97\u5217\u8868" }),
            React.createElement(native_base_1.View, { style: exports.styles.bk },
                React.createElement(native_base_1.List, { dataArray: shops, renderRow: (aData) => React.createElement(native_base_1.View, { style: { padding: 10, backgroundColor: 'white', marginTop: 10, marginLeft: 10, marginRight: 10, borderWidth: 1,
                            borderColor: Config_1.Config.ColorBf4, borderRadius: 10 } },
                        React.createElement(react_native_1.TouchableOpacity, { style: { justifyContent: 'space-between', flexDirection: 'row' }, onPress: () => this.onChangeShop(aData.id) },
                            React.createElement(native_base_1.Text, { style: { fontWeight: 'bold', fontSize: Config_1.Config.FontBase, color: Config_1.Config.ColorB333 } }, aData.name),
                            React.createElement(native_base_1.Text, { style: exports.styles.fontkm },
                                aData.dis,
                                "km")),
                        React.createElement(native_base_1.Text, { style: { marginTop: 10, color: Config_1.Config.ColorB666, fontSize: Config_1.Config.Font09375 } }, aData.addr),
                        React.createElement(native_base_1.View, { style: { flexDirection: "row", marginTop: 20 } },
                            React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font0875, color: Config_1.Config.ColorB999 } },
                                "\u95E8\u5E97\u8425\u4E1A\u65F6\u95F4\uFF1A",
                                aData.time),
                            React.createElement(react_native_1.TouchableOpacity, { style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, onPress: () => this.linking('tel:' + aData.phone) },
                                React.createElement(native_base_1.Icon, { style: { fontSize: 14, marginLeft: 20, color: Config_1.Config.ColorG2e }, name: "call" }),
                                React.createElement(native_base_1.Text, { style: { fontSize: 12, marginLeft: 3, color: Config_1.Config.ColorG2e } }, "\u8054\u7CFB\u7535\u8BDD")))) }))));
    }
}
exports.default = Shoplist;
exports.styles = react_native_1.StyleSheet.create({
    bk: { flex: 1, backgroundColor: '#f4f4f4' },
    fontkm: { color: Config_1.Config.ColorG2e, fontSize: Config_1.Config.Font0875 },
});
//# sourceMappingURL=Shoplist.js.map