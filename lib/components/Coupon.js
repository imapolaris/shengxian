"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const MyStatusBar_1 = require("./MyStatusBar");
const RouterDefine_1 = require("../constants/RouterDefine");
const Config_1 = require("../config/Config");
const funcs_1 = require("../common/utils/funcs");
exports.titles = [
    '通用红包',
    '生鲜红包',
    '',
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
    isCouponValid(coupon) {
        let allmoney = this.props.location.state.all;
        if (allmoney && allmoney < coupon.lowmoney) {
            return false;
        }
        return true;
    }
    componentDidMount() {
        this.props.fetchCoupon(this.props.Coupon.version);
        console.log("----------componentDidMount111--Coupon-");
    }
    isOverTime(timestr) {
        var moment = require('moment');
        return !moment().isBefore(timestr);
    }
    render() {
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: this.props.location.state.from == RouterDefine_1.MAIN_MY ? "我的优惠券" : "选择优惠卷" }),
            React.createElement(native_base_1.Content, { style: exports.saddr.bk }, this.props.Coupon.data.map((item, index) => {
                return React.createElement(react_native_1.TouchableOpacity, { key: index, disabled: !this.isCouponValid(item), onPress: () => {
                        if (this.props.location.state.from == RouterDefine_1.SUBMITORDER) {
                            if (!this.isCouponValid(item)) {
                                Config_1.MyToast(2000, "订单金额不足！");
                                return;
                            }
                            if (this.isOverTime(item.endtime)) {
                                Config_1.MyToast(2000, "优惠券已过期！");
                                return;
                            }
                            this.props.setSubmitOrderCoupon(item);
                            this.props.history.goBack();
                        }
                    } },
                    React.createElement(native_base_1.View, { style: { height: 10 } }),
                    React.createElement(native_base_1.View, { style: { flex: 1, height: Config_1.px2dp(80), flexDirection: 'row', backgroundColor: Config_1.Config.ColorW,
                            paddingLeft: 15, paddingRight: 15, marginLeft: 10, marginRight: 10,
                            borderRadius: 10, borderWidth: 1, borderColor: Config_1.Config.ColorBf4, paddingBottom: 10 } },
                        React.createElement(native_base_1.View, { style: { width: '50%', marginTop: 5, justifyContent: 'center' } },
                            React.createElement(native_base_1.Text, { style: { fontWeight: 'bold' } },
                                " ",
                                item.title,
                                " "),
                            React.createElement(native_base_1.Text, { style: { fontSize: 14, color: this.isOverTime(item.endtime) ? 'red' : '#b5b5b5', marginTop: 15 } },
                                " ",
                                this.isOverTime(item.endtime) ? "已过期" : item.endtime,
                                " ")),
                        React.createElement(native_base_1.View, { style: { width: '50%', marginTop: 5, justifyContent: 'center' } },
                            React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorOf8, textAlign: 'right', fontSize: Config_1.px2dp(25), marginBottom: 10 } },
                                " \uFFE5",
                                funcs_1.formatMoney(item.money),
                                " "),
                            React.createElement(native_base_1.Text, { style: { fontSize: Config_1.px2dp(14), color: '#383838', textAlign: 'right', marginBottom: 8 } },
                                " \u6EE1",
                                funcs_1.formatMoney(item.lowmoney),
                                "\u5143\u53EF\u7528 "))));
            }))));
    }
}
exports.default = Coupon;
//# sourceMappingURL=Coupon.js.map