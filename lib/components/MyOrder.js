"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const EntitiesState_1 = require("../store/EntitiesState");
// import {MyOrderItem} from "../actions/MyOrder";
const RouterDefine_1 = require("../constants/RouterDefine");
const react_native_2 = require("react-native");
const funcs_1 = require("../common/utils/funcs");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const OrderImg_1 = require("./OrderImg");
const Line_1 = require("./Line");
const MyStatusBar_1 = require("./MyStatusBar");
const order_1 = require("../actions/order");
const Config_1 = require("../config/Config");
const PropTypes = require("prop-types");
const moment = require("moment");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
let g_bfrommy;
exports.styles = react_native_1.StyleSheet.create({
    tabbk: {
        backgroundColor: '#fff',
    },
    dftxtcolor: {
        color: Config_1.Config.ColorB333,
        fontSize: Config_1.Config.FontBase,
    },
    activetxtcolor: {
        color: Config_1.Config.ColorOf8,
        fontSize: Config_1.Config.FontBase,
    },
    pic: {
        resizeMode: "cover",
        width: 80,
        height: 80
    },
});
class OneOrder extends React.Component {
    constructor(props) {
        super(props);
        this.onPay = this.onPay.bind(this);
        this.delOrder = this.delOrder.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.tick = this.tick.bind(this);
        //待付款
        if (props.order.state == EntitiesState_1.OrderState.OSUnPay) {
            let lastPayTime1 = Config_1.Config.GetPayLeftTime(props.order.created_at);
            this.state = {
                lastPayTime: lastPayTime1,
                timeoutID: setInterval(this.tick, 1000),
                actions: this.updateActions(props, lastPayTime1)
            };
        }
        else {
            this.state = {
                actions: this.updateActions(props, 0)
            };
        }
    }
    tick() {
        if (!this.state)
            return;
        let { lastPayTime, timeoutID } = this.state;
        console.log("lastPayTime=", lastPayTime);
        if (lastPayTime && lastPayTime > 1000) {
            this.setState({ lastPayTime: (lastPayTime - 1000), actions: this.updateActions(this.props, lastPayTime) });
        }
        else if (timeoutID) {
            this.props.order.state = EntitiesState_1.OrderState.OSCancel; //修改本地订单状态为 已取消
            clearInterval(timeoutID);
            this.setState({ lastPayTime: 0, timeoutID: 0, actions: this.updateActions(this.props, 0) });
        }
    }
    updateActions(props, lastPayTime1 = 0) {
        let actions = [];
        switch (props.order.state) {
            case EntitiesState_1.OrderState.OSUnPay: {
                // let lastPayTime1 = this.state? this.state.lastPayTime : 0
                if (lastPayTime1 == 0) {
                    lastPayTime1 = Config_1.Config.GetPayLeftTime(props.order.created_at.toString());
                }
                let titlebtn = lastPayTime1 && `去支付(剩余${moment.utc(lastPayTime1).format("mm:ss")})` || "去支付";
                actions.push({ title: titlebtn, order: props.order, action: () => { this.onPay(props.order); } });
                actions.push({ title: "取消订单", order: props.order, action: () => { this.cancelAction(props.order); } });
                break;
            }
            case EntitiesState_1.OrderState.OSPack:
            case EntitiesState_1.OrderState.OSPeisoning: {
                actions.push({ title: "取消订单", order: props.order, action: () => { this.cancelAction(props.order); } });
                break;
            }
            case EntitiesState_1.OrderState.OSFinish: {
                actions.push({ title: "再次购买", order: props.order, action: () => { this.props.buyAgain(props.order.order_number); } });
                break;
            }
            case EntitiesState_1.OrderState.OSCancel: {
                actions.push({ title: "再次购买", order: props.order, action: () => { this.props.buyAgain(props.order.order_number); } });
                break;
            }
        }
        return actions;
    }
    componentWillUnmount() {
        if (this.state && this.state.timeoutID) {
            clearInterval(this.state.timeoutID);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ actions: this.updateActions(nextProps) });
    }
    onPay(order) {
        if (order.state == EntitiesState_1.OrderState.OSUnPay) {
            if (order.state == EntitiesState_1.OrderState.OSUnPay) {
                this.context.router.history && this.context.router.history.push(RouterDefine_1.PAY, { order: order, from: RouterDefine_1.MYORDER });
            }
        }
    }
    delOrder(order) {
        react_native_1.Alert.alert('提示', '确定要删除当前订单记录吗？', [
            {
                text: '取消',
                onPress: () => { }
            },
            {
                text: '确定',
                onPress: () => { this.props.delOrder(order.order_number); }
            }
        ]);
    }
    cancelAction(order) {
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
    render() {
        let { order, click } = this.props;
        // let lastPayTime = this.state? this.state.lastPayTime : 0
        // 		let titlebtn = lastPayTime && `去支付(剩余${moment.utc(lastPayTime).format("mm:ss")})` || "去支付"
        return (React.createElement(react_native_2.View, null,
            React.createElement(react_native_2.View, { style: { backgroundColor: '#f5f5f5', height: 10 } }),
            React.createElement(react_native_2.View, { style: { flexDirection: 'row', paddingVertical: 10 } },
                React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB666, flex: 1, marginLeft: 5 } },
                    "下单时间:" + ' ' + funcs_1.formatDate(order.created_at),
                    " "),
                React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorOf8, marginRight: 10, fontSize: Config_1.Config.Font09375 } }, funcs_1.getOrderStateName(order.state))),
            React.createElement(Line_1.default, { color: '#f3f3f3' }),
            React.createElement(OrderImg_1.default, { items: order.order_item, click: () => { click(); }, price: order.lastprice }),
            React.createElement(Line_1.default, { color: '#f3f3f3' }),
            React.createElement(react_native_2.View, { style: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingVertical: 10 } }, this.state.actions.map((action, index) => (React.createElement(react_native_1.TouchableOpacity, { key: index, onPress: () => action.action(), style: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                    borderColor: Config_1.Config.ColorG2e, borderWidth: 1, marginRight: 10 } },
                React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorG2e } }, action.title)))))));
    }
}
OneOrder.contextTypes = {
    router: PropTypes.object
};
class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.backListenerMyOrder = () => {
            console.log('syy---------------backListenerMyOrder----------------------end + ', g_bfrommy);
            if (!g_bfrommy) {
                this.props.history.push(RouterDefine_1.MAIN_CART);
                return true;
            }
            return false;
        };
        this.ds = new react_native_2.ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.onChangeTab = this.onChangeTab.bind(this);
        this.fetchOrder = this.fetchOrder.bind(this);
        this.state = {
            page: this.props.ui.page
        };
    }
    componentDidMount() {
        react_native_1.BackHandler.addEventListener('hardwareBackPress', this.backListenerMyOrder);
        this.fetchOrder(this.state.page, true, false, false);
    }
    componentWillUpdate(nextProps, nextState) {
        react_native_1.BackHandler.removeEventListener('hardwareBackPress', this.backListenerMyOrder);
        if (nextState.page != this.state.page) {
            if (this.getOrdersCount(nextState.page) == 0) {
                this.fetchOrder(nextState.page, true, false, true);
            }
        }
    }
    componentWillUnmount() {
        this.props.changeMyOrderTab(this.state.page);
    }
    fetchOrder(page, first, next, force) {
        let { finished, unfinished } = this.props.orders;
        let currentPage = page == order_1.ORDER_LIST_TYPE.UNFINISHED ? unfinished.currentPage : finished.currentPage;
        if (next) {
            // 已经到最后一页了
            if (page == order_1.ORDER_LIST_TYPE.FINISHED && finished.currentPage >= finished.totalPage) {
                return;
            }
            if (page == order_1.ORDER_LIST_TYPE.UNFINISHED && unfinished.currentPage >= unfinished.totalPage) {
                return;
            }
        }
        if (next)
            currentPage += 1;
        if (first)
            currentPage = 1;
        this.props.fetchOrder(page, currentPage, order_1.ORDER_PAGE_COUNT, true);
    }
    getOrdersCount(page) {
        let { finished, unfinished } = this.props.orders;
        if (page == order_1.ORDER_LIST_TYPE.UNFINISHED) {
            return unfinished.orders.length;
        }
        else {
            return finished.orders.length;
        }
    }
    onChangeTab(currentPage) {
        this.setState({ page: currentPage.i });
    }
    render() {
        let { page } = this.state;
        let { finished, unfinished } = this.props.orders;
        console.log(page);
        let orders = (page == order_1.ORDER_LIST_TYPE.FINISHED) ? finished.orders : unfinished.orders;
        let bfrommy = (this.props.location && this.props.location.state && (this.props.location.state.from == RouterDefine_1.MAIN_MY)) ? true : false;
        g_bfrommy = bfrommy;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            bfrommy ?
                React.createElement(ComHeaderWithRouter, { title: "\u6211\u7684\u8BA2\u5355" }) :
                React.createElement(ComHeaderWithRouter, { title: "\u6211\u7684\u8BA2\u5355", backClick: () => { this.props.history.push(RouterDefine_1.MAIN_CART); } }),
            React.createElement(native_base_1.Tabs, { tabBarUnderlineStyle: { backgroundColor: Config_1.Config.ColorOf8 }, initialPage: this.props.ui.page, onChangeTab: this.onChangeTab, locked: true },
                React.createElement(native_base_1.Tab, { heading: "\u672A\u5B8C\u6210", tabStyle: exports.styles.tabbk, activeTabStyle: exports.styles.tabbk, textStyle: exports.styles.dftxtcolor, activeTextStyle: exports.styles.activetxtcolor },
                    React.createElement(react_native_1.FlatList, { data: orders, renderItem: ({ item }) => React.createElement(OneOrder, { key: item.order_number, cancelOrder: this.props.cancelOrder, delOrder: this.props.delOrder, buyAgain: this.props.buyAgain, order: item, click: () => { this.props.history.push(RouterDefine_1.ORDERDETAIL, { order: item, from: RouterDefine_1.MYORDER }); } }), keyExtractor: (item, index) => { console.log(index); return index.toString(); }, onRefresh: () => this.fetchOrder(page, true, false, true), refreshing: this.props.loading, onEndReachedThreshold: 0.5, onEndReached: () => this.fetchOrder(page, false, true, false) })),
                React.createElement(native_base_1.Tab, { heading: "\u5DF2\u5B8C\u6210", tabStyle: exports.styles.tabbk, activeTabStyle: exports.styles.tabbk, textStyle: exports.styles.dftxtcolor, activeTextStyle: exports.styles.activetxtcolor },
                    React.createElement(react_native_1.FlatList, { data: orders, keyExtractor: (item, index) => index.toString(), onRefresh: () => this.fetchOrder(page, true, false, true), refreshing: this.props.loading, onEndReachedThreshold: 0.5, onEndReached: () => this.fetchOrder(page, false, true, false), renderItem: ({ item }) => React.createElement(OneOrder, { key: item.order_number, cancelOrder: this.props.cancelOrder, buyAgain: this.props.buyAgain, delOrder: this.props.delOrder, order: item, click: () => { this.props.history.push(RouterDefine_1.ORDERDETAIL, { order: item, from: RouterDefine_1.MYORDER }); } }) })))));
    }
}
exports.default = MyOrder;
//# sourceMappingURL=MyOrder.js.map