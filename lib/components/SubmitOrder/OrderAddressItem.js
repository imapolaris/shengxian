"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const Config_1 = require("../../config/Config");
class OrderAddressItem extends React.Component {
    render() {
        let { addr } = this.props;
        return (React.createElement(react_native_1.TouchableOpacity, { style: styles.container, onPress: () => {
                // if (!addr.name)
                // {	//请选择收货地址
                // 	return;
                // }
                this.props.addressClick();
            } },
            React.createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                React.createElement(native_base_1.Icon, { style: { fontSize: Config_1.Config.FontIcon20, color: Config_1.Config.ColorG3c, marginLeft: 10, alignItems: 'center' }, name: 'locate' }),
                React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginLeft: 10, alignItems: 'center', justifyContent: 'center' } },
                    React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333, marginRight: 10 } }, addr.name || "点击选择地址"),
                    React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333 } }, addr.address))),
            React.createElement(native_base_1.Icon, { name: "arrow-forward", style: Config_1.Config.styles.ForwardIcon })));
    }
}
exports.default = OrderAddressItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
});
//# sourceMappingURL=OrderAddressItem.js.map