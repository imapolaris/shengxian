"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const OrderImg_1 = require("../OrderImg");
const native_base_1 = require("native-base");
const RouterDefine_1 = require("../../constants/RouterDefine");
const PropTypes = require("prop-types");
const Config_1 = require("../../config/Config");
class OrderItemInfo extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.View, { style: { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row' } },
                React.createElement(react_native_1.Text, { style: { marginLeft: 10, fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333 } }, "\u5230\u8FBE\u65F6\u95F4"),
                React.createElement(react_native_1.TouchableOpacity, { style: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 }, onPress: () => {
                        this.props.timeClick && this.props.timeClick();
                    } },
                    React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorG2e, fontSize: Config_1.Config.Font09375 } }, this.props.selectTime),
                    React.createElement(native_base_1.Icon, { name: "arrow-forward", style: [Config_1.Config.styles.ForwardIcon, { marginLeft: 10 }] }))),
            React.createElement(react_native_1.View, { style: { backgroundColor: '#f5f5f5', height: 1 } }),
            React.createElement(OrderImg_1.default, { items: this.props.order, price: this.props.allprice, click: () => { this.context.router.history && this.context.router.history.push(RouterDefine_1.ITEMLIST, { orderlist: this.props.order, from: RouterDefine_1.SUBMITORDER }); } })));
    }
}
OrderItemInfo.contextTypes = {
    router: PropTypes.object
};
exports.default = OrderItemInfo;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
});
//# sourceMappingURL=OrderItemInfo.js.map