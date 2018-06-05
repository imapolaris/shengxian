"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const EntitiesState_1 = require("../store/EntitiesState");
// import {OrderDetailItem} from "../actions/OrderDetail";
const RouterDefine_1 = require("../constants/RouterDefine");
const react_native_2 = require("react-native");
const funcs_1 = require("../common/utils/funcs");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const OrderImg_1 = require("./OrderImg");
const PointLine_1 = require("./PointLine");
const MyStatusBar_1 = require("./MyStatusBar");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const Config_1 = require("../config/Config");
const moment = require("moment");
const home2 = require("../../images/home2.png");
const screenWidth = react_native_1.Dimensions.get('window').width;
let g_from;
exports.styles = react_native_1.StyleSheet.create({
    otherinfo: {
        backgroundColor: Config_1.Config.ColorW,
        height: 40,
        flex: 1,
        textAlign: 'right'
    },
    pic: {
        resizeMode: "cover",
        width: 80,
        height: 80
    },
});
class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.backListenerOrderDe = () => {
            console.log('syy---------------backListenerOrderDe----------------------end + ', g_from);
            if (g_from && (g_from == RouterDefine_1.PAY)) {
                console.log('syy---------------backListenerOrderDe----------------------end 2 + ', g_from);
                // history.push(ORDERDETAIL, {order:g_order, from:PAY})
                return true;
            }
            return false;
        };
        this.tick = this.tick.bind(this);
        this.payAction = this.payAction.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.payTitle = this.payTitle.bind(this);
        this.getStateStr = this.getStateStr.bind(this);
        let order = this.props.location.state.order;
        //待付款
        if (order.state == EntitiesState_1.OrderState.OSUnPay) {
            this.state = {
                lastPayTime: Config_1.Config.GetPayLeftTime(order.created_at),
                timeoutID: setInterval(this.tick, 1000)
            };
        }
    }
    tick() {
        if (!this.state)
            return;
        let { lastPayTime, timeoutID } = this.state;
        console.log("lastPayTime=", lastPayTime);
        if (lastPayTime && lastPayTime > 1000) {
            this.setState({ lastPayTime: (lastPayTime - 1000) });
        }
        else if (timeoutID) {
            this.props.location.state.order.state = EntitiesState_1.OrderState.OSCancel; //修改本地订单状态为 已取消
            clearInterval(timeoutID);
            this.setState({ lastPayTime: 0, timeoutID: 0 });
        }
    }
    componentDidMount() {
        react_native_1.BackHandler.addEventListener('hardwareBackPress', this.backListenerOrderDe);
    }
    componentWillUnmount() {
        react_native_1.BackHandler.removeEventListener('hardwareBackPress', this.backListenerOrderDe);
        if (this.state && this.state.timeoutID) {
            clearInterval(this.state.timeoutID);
        }
    }
    componentWillReceiveProps(nextpops) {
        let order = this.props.location.state.order;
        if (order.state == EntitiesState_1.OrderState.OSUnPay) {
            this.setState({
                lastPayTime: moment(order.created_at).add(30, "m").diff(moment(order.created_at))
            });
        }
    }
    payAction() {
        let order = this.props.location.state.order;
        if (order.state == EntitiesState_1.OrderState.OSUnPay) {
            this.props.history.push(RouterDefine_1.PAY, { order: order, from: RouterDefine_1.ORDERDETAIL });
        }
    }
    payTitle() {
        let order = this.props.location.state.order;
        if (order.state == EntitiesState_1.OrderState.OSUnPay) {
            let { lastPayTime } = this.state;
            return lastPayTime && `去支付(剩余${moment.utc(lastPayTime).format("mm:ss")})` || "去支付";
        }
        return "";
    }
    cancelAction() {
        let order = this.props.location.state.order;
        // if(order.state!=OrderState.OSCancel && order.state==OrderState.OSUnPay)
        {
            // 取消订单
            react_native_1.Alert.alert('提示', '确定要取消当前订单吗？', [
                {
                    text: '取消',
                    onPress: () => { }
                },
                {
                    text: '确定',
                    onPress: () => { this.props.cancelOrder(order.order_number); }
                }
            ]);
        }
    }
    getStateStr(state) {
        switch (state) {
            case EntitiesState_1.OrderState.OSCancel:
                return ['待支付', '已取消'];
            case EntitiesState_1.OrderState.OSCancelVerify:
                return ['待支付', '待拣货', '待配送', '审核中'];
            default:
                return ['待支付', '待拣货', '待配送', '已完成'];
        }
    }
    render() {
        let order = this.props.location.state.order;
        let from = this.props.location.state && this.props.location.state.from || "";
        g_from = from;
        console.log("scsscscc +" + screenWidth);
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            (from == RouterDefine_1.PAY) ?
                React.createElement(ComHeaderWithRouter, { title: "\u8BA2\u5355\u8BE6\u60C5", leftImage: home2, backClick: () => { Config_1.MainHelper.selectedTab = "home", this.props.history.push(RouterDefine_1.MAIN); } }) :
                React.createElement(ComHeaderWithRouter, { title: "\u8BA2\u5355\u8BE6\u60C5" }),
            React.createElement(native_base_1.Content, null,
                React.createElement(react_native_2.View, { style: { height: 10, backgroundColor: '#f4f4f4' } }),
                React.createElement(react_native_2.View, { style: { flex: 1, backgroundColor: 'white', height: 45 } },
                    React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between', alignItems: 'center' } },
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, "\u8BA2\u5355\u7F16\u53F7:"),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, order.order_number),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17, paddingRight: 17 } }, funcs_1.getOrderStateName(order.state)))),
                React.createElement(react_native_2.View, { style: { height: 10, backgroundColor: '#f4f4f4' } }),
                React.createElement(react_native_2.View, { style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: Config_1.Config.ColorW } },
                    React.createElement(PointLine_1.default, { endpoint: false, width: screenWidth, titles: this.getStateStr(order.state), currentStatus: order.state, index: order.state + 1, size: { height: 1, width: 100 }, id: 1, first: true })),
                React.createElement(react_native_2.View, { style: { height: 10, backgroundColor: '#f4f4f4' } }),
                React.createElement(OrderImg_1.default, { items: order.order_item, click: () => { this.props.history.push(RouterDefine_1.ITEMLIST, { orderlist: order.order_item, from: RouterDefine_1.ORDERDETAIL }); }, price: order.productprice }),
                React.createElement(react_native_2.View, { style: { height: 10, backgroundColor: '#f4f4f4' } }),
                React.createElement(react_native_2.View, { style: { flex: 1, backgroundColor: 'white', marginTop: 10 } },
                    React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between', height: 45 } },
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, "\u5546\u54C1\u91D1\u989D:"),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17, paddingRight: 17 } }, funcs_1.formatMoney(order.productprice))),
                    React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between', height: 45 } },
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, "\u914D\u9001\u8D39:"),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17, paddingRight: 17 } }, funcs_1.formatMoney(order.peiprice))),
                    React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between', height: 45 } },
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, "\u4F18\u60E0\u5238:"),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17, paddingRight: 17 } },
                            "-",
                            funcs_1.formatMoney(order.couponprice))),
                    React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between', height: 45 } },
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, "\u5E94\u4ED8\u91D1\u989D:"),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17, paddingRight: 17 } }, funcs_1.formatMoney(order.lastprice))),
                    order.des ?
                        React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between' } },
                            React.createElement(native_base_1.Text, { style: { marginLeft: 17 } }, "\u5176\u4ED6\u4FE1\u606F:"),
                            React.createElement(react_native_2.View, { style: { flex: 1 } },
                                React.createElement(native_base_1.Text, { style: { marginLeft: 17, marginRight: 17, textAlign: 'left' } }, order.des))) : null,
                    React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between', height: 45 } },
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, "\u4E0B\u5355\u65F6\u95F4:"),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17, paddingRight: 17 } }, funcs_1.formatDate(order.created_at))),
                    React.createElement(react_native_2.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, justifyContent: 'space-between', height: 45 } },
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }, "\u9884\u7EA6\u65F6\u95F4:"),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17 } }),
                        React.createElement(native_base_1.Text, { style: { paddingLeft: 17, paddingRight: 17 } }, funcs_1.formatDate(order.apptime))))),
            React.createElement(react_native_2.View, { style: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: Config_1.IS_IPHONE_X() ? 24 + 15 : 15 } },
                (order.state == EntitiesState_1.OrderState.OSUnPay) ?
                    React.createElement(react_native_1.TouchableOpacity, { style: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                            borderColor: Config_1.Config.ColorG2e, borderWidth: 1, marginRight: 10 }, onPress: () => this.payAction() },
                        React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorG2e } }, this.payTitle()))
                    :
                        null,
                ((order.state == EntitiesState_1.OrderState.OSCancel) || (order.state == EntitiesState_1.OrderState.OSFinish)) ?
                    React.createElement(react_native_1.TouchableOpacity, { style: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                            borderColor: Config_1.Config.ColorG2e, borderWidth: 1, marginRight: 10 }, onPress: () => this.props.buyAgain(order.order_number) },
                        React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorG2e } }, "\u518D\u6B21\u8D2D\u4E70"))
                    :
                        null,
                (order.state != EntitiesState_1.OrderState.OSCancel && order.state != EntitiesState_1.OrderState.OSFinish && order.state != EntitiesState_1.OrderState.OSCancelVerify) ?
                    React.createElement(react_native_1.TouchableOpacity, { style: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                            borderColor: Config_1.Config.ColorG2e, borderWidth: 1, marginRight: 10 }, onPress: () => this.cancelAction() },
                        React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorG2e } }, "\u53D6\u6D88\u8BA2\u5355"))
                    :
                        null)));
    }
}
exports.default = OrderDetail;
//# sourceMappingURL=OrderDetail.js.map