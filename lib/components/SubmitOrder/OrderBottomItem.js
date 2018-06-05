"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const funcs_1 = require("../../common/utils/funcs");
const Config_1 = require("../../config/Config");
class OrderBottomItem extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, null,
            React.createElement(react_native_1.View, { style: { height: 1, backgroundColor: '#f4f4f4' } }),
            React.createElement(react_native_1.View, { style: styles.container },
                React.createElement(react_native_1.TouchableOpacity, { style: { justifyContent: 'center', alignItems: 'center', backgroundColor: Config_1.Config.ColorOff, width: 120, height: 40 }, onPress: () => {
                        this.props.commitOrderClick();
                    } },
                    React.createElement(react_native_1.Text, { style: { color: 'white' } }, "\u63D0\u4EA4\u8BA2\u5355")),
                React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorOf8, marginRight: 10, marginTop: 10, fontSize: Config_1.Config.Font09375, fontWeight: 'bold' } },
                    "\uFFE5",
                    funcs_1.formatMoney(this.props.real)),
                React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB333, fontSize: Config_1.Config.Font09375, marginTop: 10, marginRight: 5 } }, "\u5B9E\u4ED8"))));
    }
}
exports.default = OrderBottomItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: Config_1.IS_IPHONE_X() ? 40 + 24 : 40,
        flexDirection: 'row-reverse',
        alignItems: 'flex-start'
    },
});
//# sourceMappingURL=OrderBottomItem.js.map