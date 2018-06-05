"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const RouterDefine_1 = require("../constants/RouterDefine");
class LocationHeader extends React.Component {
    render() {
        return (React.createElement(native_base_1.Header, { style: { justifyContent: "flex-start", alignItems: "center" } },
            this.props.locate ?
                React.createElement(native_base_1.Button, { iconLeft: true, transparent: true, style: { paddingHorizontal: 0 }, onPress: () => { this.props.history && this.props.history.push(RouterDefine_1.ADDRLIST, { from: RouterDefine_1.MAIN }); } },
                    React.createElement(native_base_1.Icon, { name: "pin" }),
                    React.createElement(react_native_1.Text, null, this.props.locate),
                    React.createElement(native_base_1.Icon, { name: "arrow-dropdown" })) :
                React.createElement(native_base_1.Button, { iconLeft: true, transparent: true, style: { paddingHorizontal: 0 } },
                    React.createElement(native_base_1.Icon, { name: "pin" }),
                    React.createElement(native_base_1.Spinner, null),
                    React.createElement(native_base_1.Icon, { name: "arrow-dropdown" })),
            React.createElement(native_base_1.Item, { bordered: true, rounded: true, style: { flex: 1 } },
                React.createElement(native_base_1.Icon, { name: "search" }),
                React.createElement(native_base_1.Input, { style: { paddingVertical: 2 }, onFocus: () => { this.props.history && this.props.history.push(RouterDefine_1.SEARCH); } }))));
    }
}
exports.default = LocationHeader;
//# sourceMappingURL=LocationHeader.js.map