"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class Point extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, { style: { borderRadius: 100, height: this.props.size, width: this.props.size, backgroundColor: this.props.color } }));
    }
}
exports.default = Point;
//# sourceMappingURL=Point.js.map