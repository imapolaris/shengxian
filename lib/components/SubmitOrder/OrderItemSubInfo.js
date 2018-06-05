"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const OrderLineItem_1 = require("./OrderLineItem");
const native_base_1 = require("native-base");
const funcs_1 = require("../../common/utils/funcs");
const Config_1 = require("../../config/Config");
class OrderItemSubInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: true
        };
        this.isCouponValid = this.isCouponValid.bind(this);
        this.couponText = this.couponText.bind(this);
    }
    isCouponValid() {
        return this.props.coupon && this.props.coupon.id > 0;
    }
    couponText() {
        if (!this.props.coupon) {
            return "";
        }
        let { lowmoney, money } = this.props.coupon;
        return `满${funcs_1.formatMoney(lowmoney)}元减${funcs_1.formatMoney(money)}元`;
    }
    render() {
        let { coupon, couponCount } = this.props;
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.TouchableOpacity, { style: { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row' }, onPress: () => { this.props.CouponClick(); } },
                React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                    React.createElement(react_native_1.Text, { style: { marginLeft: 10, color: Config_1.Config.ColorB333, fontSize: Config_1.Config.Font09375 } }, "\u4F18\u60E0\u5238"),
                    this.isCouponValid() ? React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB999, fontSize: Config_1.Config.Font0875 } }, this.couponText()) : null,
                    !this.isCouponValid() ? React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB999, fontSize: Config_1.Config.Font0875 } }, "(\u53EF\u7528") : null,
                    !this.isCouponValid() ? React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorOf8, fontSize: Config_1.Config.Font0875 } },
                        couponCount,
                        "\u5F20") : null,
                    !this.isCouponValid() ? React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB999, fontSize: Config_1.Config.Font0875 } }, ")") : null),
                React.createElement(native_base_1.Icon, { name: "arrow-forward", style: Config_1.Config.styles.ForwardIcon })),
            React.createElement(OrderLineItem_1.default, { height: 1 }),
            React.createElement(OrderLineItem_1.default, { height: 10 }),
            React.createElement(react_native_1.View, { style: { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row' } },
                React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                    React.createElement(react_native_1.Text, { style: { marginLeft: 10, fontSize: Config_1.Config.Font09375 } }, "\u5546\u54C1\u91D1\u989D")),
                React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333, marginRight: 10 } },
                    "\uFFE5",
                    funcs_1.formatMoney(this.props.allprice))),
            React.createElement(react_native_1.View, { style: { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row' } },
                React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                    React.createElement(react_native_1.Text, { style: { marginLeft: 10, fontSize: Config_1.Config.Font09375 } }, "\u914D\u9001\u8D39")),
                React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333, marginRight: 10 } },
                    "\uFFE5",
                    this.props.allprice < Config_1.Config.NOPEISONGRMBMIN ? funcs_1.formatMoney(Config_1.Config.PEISONGRMB) : funcs_1.formatMoney(0)))));
    }
}
exports.default = OrderItemSubInfo;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
});
//# sourceMappingURL=OrderItemSubInfo.js.map