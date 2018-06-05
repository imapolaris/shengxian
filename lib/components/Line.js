"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class Line extends React.Component {
    render() {
        let size = this.props.size ? this.props.size : { height: 1, width: '100%' };
        return (React.createElement(react_native_1.View, { style: { height: size.height, width: size.width, backgroundColor: this.props.color } }));
    }
}
exports.default = Line;
//# sourceMappingURL=Line.js.map