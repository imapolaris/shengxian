"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//let Animation  = require('lottie-react-native');
const react_native_1 = require("react-native");
class Loading extends React.Component {
    componentDidMount() {
        this.animation.play();
    }
    render() {
        return React.createElement(react_native_1.View, { style: styles.container });
    }
}
exports.default = Loading;
const styles = react_native_1.StyleSheet.create({
    "container": {
        flex: 1,
        position: "absolute",
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    "animation": {
        width: 200,
        height: 200
    }
});
//# sourceMappingURL=Loading.js.map