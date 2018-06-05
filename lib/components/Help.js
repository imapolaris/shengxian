"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const RouterDefine_1 = require("../constants/RouterDefine");
const funcs_1 = require("../common/utils/funcs");
const ComHeader_1 = require("./ComHeader");
const MyStatusBar_1 = require("./MyStatusBar");
const Config_1 = require("../config/Config");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
exports.saddr = react_native_1.StyleSheet.create({
    bk: { backgroundColor: '#999' },
});
class Help extends React.Component {
    constructor(props) {
        super(props);
        // `满${formatMoney(lowmoney)}元减${formatMoney(money)}元`
        this.state = {
            questions: [
                { id: 0, select: false, title: 'App订单如何付款?', des: '我们支持支付宝/微信/货到付款' },
                { id: 1, select: false, title: 'App是免费送货吗?', des: `我们满${funcs_1.formatMoneyEx(Config_1.Config.NOPEISONGRMBMIN)}元免配送费` },
            ]
        };
    }
    render() {
        return (React.createElement(native_base_1.Container, { style: { backgroundColor: '#f5f5f5' } },
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: "\u5E2E\u52A9\u4E2D\u5FC3" }),
            React.createElement(native_base_1.View, { style: [exports.saddr.bk, { flex: 1, backgroundColor: '#f5f5f5', marginTop: 10 }] },
                React.createElement(native_base_1.List, { style: { backgroundColor: '#f5f5f5' }, dataArray: this.state.questions, renderRow: (item) => {
                        return React.createElement(react_native_1.TouchableOpacity, { key: item.id, style: { backgroundColor: 'white', borderColor: Config_1.Config.ColorBf4,
                                borderWidth: 1, marginLeft: 5, marginRight: 5, borderRadius: 10 }, onPress: () => {
                                this.setState({
                                    questions: this.state.questions.map((obj, i) => {
                                        return Object.assign({}, obj, { select: obj.id == item.id ? !obj.select : false });
                                    }),
                                });
                            } },
                            React.createElement(native_base_1.View, { style: { flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: 10,
                                    alignItems: 'center'
                                } },
                                React.createElement(native_base_1.Text, { style: { color: item.select ? Config_1.Config.ColorG2e : 'black', marginLeft: 10 } }, item.id + 1 + "、 " + item.title),
                                item.select ? React.createElement(native_base_1.Icon, { style: { marginRight: 10, fontSize: 12, color: Config_1.Config.ColorB999 }, name: 'arrow-up' }) :
                                    React.createElement(native_base_1.Icon, { style: { marginRight: 10, fontSize: 12, color: Config_1.Config.ColorB999 }, name: 'arrow-down' })),
                            React.createElement(native_base_1.View, { style: { backgroundColor: '#f5f5f5', height: 1 } }),
                            item.select ? React.createElement(native_base_1.View, { style: { padding: 20, backgroundColor: '#f5f5f5' } },
                                React.createElement(native_base_1.Text, null, item.des)) : null);
                    }, horizontal: false })),
            React.createElement(native_base_1.View, { style: { height: 65, backgroundColor: 'white', alignItems: 'center', marginBottom: Config_1.IS_IPHONE_X() ? 24 : 0 } },
                React.createElement(native_base_1.Text, { style: { color: '#999', fontSize: 12, marginTop: 5 } }, "\u6CA1\u6709\u6211\u60F3\u95EE\u7684\u95EE\u9898?"),
                React.createElement(react_native_1.TouchableOpacity, { style: { paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: Config_1.Config.ColorG3c,
                        marginTop: 5,
                        flexDirection: 'row',
                        marginBottom: 5
                    }, onPress: () => { this.props.history.push(RouterDefine_1.SHOPLIST); } },
                    React.createElement(native_base_1.Icon, { style: { fontSize: Config_1.Config.IconSize1, color: Config_1.Config.ColorG3c }, name: 'call' }),
                    React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorG2e, fontSize: 13, marginLeft: 5 } }, "\u5BA2\u670D\u4E2D\u5FC3")))));
    }
}
exports.default = Help;
//# sourceMappingURL=Help.js.map