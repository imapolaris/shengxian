"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
// import {Util} from "../common/utils/util";
const RouterDefine_1 = require("../constants/RouterDefine");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const MyStatusBar_1 = require("./MyStatusBar");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const pichead = { uri: "screen" };
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
});
//f4f4f4
exports.saddr = react_native_1.StyleSheet.create({
    bk3: { backgroundColor: '#f3f3f3', flex: 1, flexDirection: 'row', paddingTop: 10 },
    btn: { backgroundColor: '#fff', flex: 1, margin: 1 },
    btn3: { backgroundColor: '#fff', height: 80, flex: 1, flexDirection: 'column', margin: 1 },
    fonticon: { color: '#000', fontSize: 30 },
});
class More extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: "\u66F4\u591A" }),
            React.createElement(native_base_1.View, { style: [exports.saddr.bk3] },
                React.createElement(native_base_1.Button, { light: true, style: exports.saddr.btn3, onPress: () => { this.props.history.push(RouterDefine_1.FEEDBACK); } },
                    React.createElement(native_base_1.Icon, { name: "chatboxes", style: [exports.saddr.fonticon, { color: 'mediumaquamarine' }] }),
                    React.createElement(native_base_1.Text, null, "\u610F\u89C1\u53CD\u9988")),
                React.createElement(native_base_1.Button, { light: true, style: exports.saddr.btn3, onPress: () => { this.props.history.push(RouterDefine_1.HELP); } },
                    React.createElement(native_base_1.Icon, { name: "help-circle", style: [exports.saddr.fonticon, { color: 'orange' }] }),
                    React.createElement(native_base_1.Text, null, "\u5E2E\u52A9\u4E2D\u5FC3")),
                React.createElement(native_base_1.Button, { light: true, style: exports.saddr.btn3, onPress: () => { this.props.history.push(RouterDefine_1.SETUP); } },
                    React.createElement(native_base_1.Icon, { name: "settings", style: [exports.saddr.fonticon, { color: '#50be07' }] }),
                    React.createElement(native_base_1.Text, null, "\u8BBE\u7F6E\u4E2D\u5FC3")),
                React.createElement(native_base_1.Button, { light: true, style: exports.saddr.btn3 },
                    React.createElement(native_base_1.Icon, { name: "people", style: [exports.saddr.fonticon, { color: '#50be07' }] }),
                    React.createElement(native_base_1.Text, null, "\u5173\u4E8E\u6211\u4EEC")))));
    }
}
exports.default = More;
//# sourceMappingURL=More.js.map