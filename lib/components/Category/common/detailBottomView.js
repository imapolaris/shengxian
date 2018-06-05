"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const screenWidth = react_native_1.Dimensions.get('window').width;
class detailBottomView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.props.clickCart(); }, style: { width: 60, justifyContent: 'center' } },
                React.createElement(native_base_1.Icon, { style: { marginLeft: 10, marginTop: 10, fontSize: 20 }, name: "cart", color: "black" }),
                React.createElement(react_native_1.View, { style: styles.iconSytle },
                    React.createElement(react_native_1.Text, { style: styles.iconTextStyle }, this.props.cartCount))),
            React.createElement(react_native_1.TouchableOpacity, { style: styles.cartStyle, onPress: () => { this.props.addCart(); } },
                React.createElement(react_native_1.Text, { style: { textAlign: 'center', color: 'white', fontSize: 17 } }, "\u52A0\u5165\u8D2D\u7269\u8F66"))));
    }
}
exports.default = detailBottomView;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3',
        height: 41,
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomStyle: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconSytle: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 5,
        left: 25,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    iconTextStyle: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 12,
        width: 40,
        position: 'absolute',
        left: -10
    },
    cartStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#F68A0A',
        justifyContent: 'center'
    }
});
//# sourceMappingURL=detailBottomView.js.map