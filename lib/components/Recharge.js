"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
// import {Util} from "../common/utils/util";
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const ImageMoney = require("../../images/moneyImage.gif");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const MyStatusBar_1 = require("./MyStatusBar");
const screenWidth = react_native_1.Dimensions.get('window').width;
exports.rechargeData = [
    { id: 1, rmb: 100, ret: 50 },
    { id: 2, rmb: 200, ret: 100 },
    { id: 3, rmb: 300, ret: 150 },
    { id: 4, rmb: 500, ret: 250 },
    { id: 5, rmb: 1000, ret: 500 },
    { id: 6, rmb: 2000, ret: 1000 },
    { id: 7, rmb: 5000, ret: 2500 },
];
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
    btn: { borderRadius: 5, margin: 5, width: 100, backgroundColor: 'transparent', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
});
exports.saddr = react_native_1.StyleSheet.create({
    bk: { flex: 1, backgroundColor: 'white' },
    box1: { height: 146, backgroundColor: '#f3f3f3', margin: 20, borderRadius: 10, borderWidth: 2 },
    box2: { height: 70, backgroundColor: '#fff', flexDirection: "row", borderRadius: 10, alignItems: "center" },
    box3: { height: 80, backgroundColor: '#f3f3f3' },
    fonttxt: { color: '#000', fontSize: 20, margin: 10 },
    fonticon: { color: '#f3f3f3', fontSize: 40, margin: 10 },
    fonttag: { backgroundColor: "orange", color: '#fff', fontSize: 20, paddingHorizontal: 10, margin: 20, borderRadius: 10 },
    blackline: { height: 2, backgroundColor: '#f3f3f3' },
    chvalue: { flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#8fb140', fontSize: 20 },
    chtitle: { flex: 1, marginRight: 5, color: '#848484', textAlign: 'center',
        textShadowOffset: { width: 5, hegith: 2 },
        textShadowRadius: 3,
        textShadowColor: '#e8e8e8',
        fontSize: 20 },
});
class Recharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rmb: 100,
            ret: 50,
            total: 150,
            id: 1,
            customCnt: 0,
            fanxianMoney: 0,
        };
    }
    SpecifyCount(id) {
        id = id - 1;
        this.setState({
            rmb: exports.rechargeData[id].rmb,
            ret: exports.rechargeData[id].ret,
            total: exports.rechargeData[id].rmb + exports.rechargeData[id].ret,
            id: id + 1,
            fanxianMoney: id + 1
        });
    }
    //自定义充值
    CustomCount(count) {
        let cnt = +count;
        this.setState({
            rmb: cnt,
            ret: cnt / 2,
            total: cnt + cnt / 2,
        });
    }
    //修改其他金额边框颜色
    ModifyBorder() {
        console.log('获取焦点');
        this.setState({
            rmb: 0,
            ret: 0,
            total: 0,
            id: 8,
        });
    }
    Recharege() {
        //ToDo
        console.log("充值！！！");
    }
    render() {
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: this.state.fanxianMoney === 0 ? '账户金额' : '账户金额（￥' + this.state.fanxianMoney.toString() + '）' }),
            React.createElement(native_base_1.View, { style: exports.saddr.bk },
                React.createElement(native_base_1.View, null,
                    this.state.id == 8 ? React.createElement(native_base_1.View, { style: { justifyContent: 'center', alignItems: 'center', height: 150,
                            paddingBottom: 30, paddingTop: 30 } },
                        React.createElement(native_base_1.Text, { style: { color: '#3b3b3b' } }, "\u5176\u4ED6\u91D1\u989D"),
                        React.createElement(native_base_1.Input, { ref: 'input', style: { fontSize: 14, textAlign: 'center', marginTop: 20, height: 40, width: screenWidth - 60,
                                borderRadius: 5, borderWidth: 1, borderColor: '#b5b5b5' }, placeholder: '\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D', keyboardType: 'numeric', onChangeText: (money) => {
                                this.CustomCount(money);
                            }, underlineColorAndroid: 'transparent', autoFocus: true }))
                        :
                            React.createElement(native_base_1.View, { style: { flex: 1 } },
                                React.createElement(react_native_1.Image, { style: { width: screenWidth, height: 240 }, source: ImageMoney })),
                    React.createElement(native_base_1.View, { style: { flexDirection: 'row', marginTop: this.state.id == 8 ? 30 : 180 } },
                        React.createElement(native_base_1.Text, { style: exports.saddr.chtitle }, "\u5145\u503C"),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chtitle }),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chtitle }, "\u8D60\u9001"),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chtitle }),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chtitle }, "\u5165\u8D26")),
                    React.createElement(native_base_1.View, { style: { flexDirection: 'row', marginRight: 5, marginTop: 5 } },
                        React.createElement(native_base_1.Text, { style: exports.saddr.chvalue }, this.state.rmb),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chvalue }, "+"),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chvalue }, this.state.ret),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chvalue }, "="),
                        React.createElement(native_base_1.Text, { style: exports.saddr.chvalue }, this.state.total))),
                React.createElement(native_base_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, justifyContent: 'flex-start', marginLeft: 35, paddingBottom: 5 } },
                    exports.rechargeData.map((rData) => (React.createElement(native_base_1.Button, { key: rData.id, style: {
                            borderRadius: 5,
                            width: 100,
                            height: 30,
                            marginRight: 10,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: this.state.id == rData.id ? 'orange' : '#f3f3f3'
                        }, onPress: () => {
                            this.SpecifyCount(rData.id);
                        } },
                        React.createElement(native_base_1.Text, { style: { color: this.state.id == rData.id ? '#ffb001' : '#b5b5b5' } },
                            rData.rmb,
                            "\u5143")))),
                    React.createElement(native_base_1.Button, { style: { height: 30, borderRadius: 5, width: 102, backgroundColor: 'transparent',
                            borderWidth: 1, borderColor: this.state.id == 8 ? 'orange' : '#f3f3f3', marginTop: 10 }, onPress: () => {
                            this.setState({
                                id: 8
                            });
                        } },
                        React.createElement(native_base_1.Text, { style: { fontSize: 14, textAlign: 'center', color: this.state.id == 8 ? 'orange' : '#b5b5b5' } }, "\u5176\u4ED6\u91D1\u989D")))),
            React.createElement(native_base_1.View, { style: { justifyContent: 'center', alignItems: 'center', position: 'absolute', width: screenWidth, height: 45, bottom: 0 } },
                React.createElement(native_base_1.Button, { style: { height: 40, marginLeft: 10, width: screenWidth - 20, backgroundColor: '#ff7e00', borderRadius: 5, justifyContent: 'center' }, onPress: () => this.Recharege() },
                    React.createElement(native_base_1.Text, null, "\u7ACB\u5373\u5145\u503C")))));
    }
}
exports.default = Recharge;
//# sourceMappingURL=Recharge.js.map