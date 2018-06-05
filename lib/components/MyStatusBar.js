"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const ConstValue = require("../constants/iOSScreenAuto");
class MyStatusbar extends React.Component {
    render() {
        let size = this.props.size ? this.props.size : { height: ConstValue.StatusBar_Height, width: '100%' };
        let color = this.props.color ? this.props.color : 'black';
        let iconcolor = this.props.iconcolor ? this.props.iconcolor : 'default';
        return (React.createElement(react_native_1.View, null,
            React.createElement(react_native_1.StatusBar, { backgroundColor: 'transparent', translucent: true, barStyle: iconcolor }),
            React.createElement(react_native_1.View, { style: [styles.vx, { height: size.height }] })));
    }
}
exports.default = MyStatusbar;
const styles = react_native_1.StyleSheet.create({
    vx: Object.assign({}, react_native_1.Platform.select({
        ios: {
            backgroundColor: 'white',
        },
        android: {
            backgroundColor: 'black',
        },
    }))
});
//# sourceMappingURL=MyStatusBar.js.map