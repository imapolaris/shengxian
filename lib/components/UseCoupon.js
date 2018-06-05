"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const MyStatusBar_1 = require("./MyStatusBar");
// import {Util} from "../common/utils/util";
exports.titles = [
    '通用红包',
    '生鲜红包',
    '',
];
exports.coData = [
    { title: exports.titles[0], time: '2017-12-08 12:00', rmb: 50, scope: '满100元可用' },
    { title: exports.titles[1], time: '2017-12-08 12:00', rmb: 100, scope: '满200元可用' },
    { title: exports.titles[0], time: '2017-12-08 12:00', rmb: 150, scope: '满300元可用' },
];
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
    btn: { borderRadius: 5, margin: 5, width: 100, backgroundColor: 'transparent', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
});
exports.saddr = react_native_1.StyleSheet.create({
    bk: { flex: 1, backgroundColor: '#f3f3f3' },
    box1: { height: 146, backgroundColor: '#f3f3f3', margin: 20, borderRadius: 10, borderWidth: 2 },
    box2: { height: 70, backgroundColor: '#fff', flexDirection: "row", borderRadius: 10, alignItems: "center" },
    box3: { height: 80, backgroundColor: '#f3f3f3' },
    fonttxt: { color: '#000', fontSize: 20, margin: 10 },
    fonticon: { color: '#f3f3f3', fontSize: 40, margin: 10 },
    fonttag: { backgroundColor: "orange", color: '#fff', fontSize: 20, paddingHorizontal: 10, margin: 20, borderRadius: 10 },
    blackline: { height: 2, backgroundColor: '#f3f3f3' },
});
class Coupon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: "\u4F7F\u7528\u4F18\u60E0\u5238" }),
            React.createElement(native_base_1.View, { style: exports.saddr.bk },
                React.createElement(native_base_1.View, { style: { flexDirection: 'row', height: 40, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, marginTop: 5,
                        paddingRight: 23, paddingLeft: 10, marginBottom: 15, borderWidth: 1, alignItems: 'center' } },
                    React.createElement(native_base_1.Text, null, "\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238"),
                    React.createElement(native_base_1.CheckBox, null)),
                React.createElement(native_base_1.View, { style: { flexDirection: 'row', marginLeft: 15, height: 40 } },
                    React.createElement(native_base_1.Text, { style: { marginRight: 80 } }, "\u67093\u4E2A\u7EA2\u5305\u4E0D\u53EF\u4F7F\u7528"),
                    React.createElement(native_base_1.Button, { style: { height: 15, width: 15, borderRadius: 100 } }),
                    React.createElement(native_base_1.Text, null, "\u7EA2\u5305\u4F7F\u7528\u8BF4\u660E")),
                React.createElement(native_base_1.View, null,
                    React.createElement(native_base_1.List, { dataArray: exports.coData, renderRow: (item) => React.createElement(native_base_1.ListItem, { style: { marginRight: 20 } },
                            React.createElement(native_base_1.View, { style: { flexDirection: 'row', flex: 1 } },
                                React.createElement(native_base_1.View, { style: { flex: 1 } },
                                    React.createElement(native_base_1.Text, { style: { fontWeight: 'bold' } }, item.title),
                                    React.createElement(native_base_1.Text, { style: { color: '#f3f3f3', marginTop: 10 } }, item.time)),
                                React.createElement(native_base_1.View, { style: { flex: 1, justifyContent: 'flex-end' } },
                                    React.createElement(native_base_1.Text, { style: { color: 'red', textAlign: 'right', fontSize: 25 } },
                                        "\uFFE5",
                                        item.rmb),
                                    React.createElement(native_base_1.Text, { style: { color: '#f3f3f3', textAlign: 'right' } }, item.scope)),
                                React.createElement(native_base_1.CheckBox, null))) })))));
    }
}
exports.default = Coupon;
//# sourceMappingURL=UseCoupon.js.map