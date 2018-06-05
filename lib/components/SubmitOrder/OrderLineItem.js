"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class OrderLineItem extends React.Component {
    render() {
        const { height } = this.props;
        return (React.createElement(react_native_1.View, { style: [styles.container, { height: height }] }));
    }
}
exports.default = OrderLineItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
});
//# sourceMappingURL=OrderLineItem.js.map