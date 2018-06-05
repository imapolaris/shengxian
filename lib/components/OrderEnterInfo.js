"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
class OrderEnterInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement(native_base_1.Container, { style: styles.container },
            React.createElement(ComHeaderWithRouter, { title: "\u586B\u5199\u8BA2\u5355" })));
    }
}
exports.default = OrderEnterInfo;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});
//# sourceMappingURL=OrderEnterInfo.js.map