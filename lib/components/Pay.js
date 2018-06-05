"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const WeChat = require("react-native-wechat");
// import {PayItem} from "../actions/Pay";
const RouterDefine_1 = require("../constants/RouterDefine");
const react_native_2 = require("react-native");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const OrderImg_1 = require("./OrderImg");
const Config_1 = require("../config/Config");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const login_weChat_icon = require("../../images/login_weChat_icon.png");
const alipay_logo = require("../../images/alipay_logo.png");
const huodaofukuan = require("../../images/huodaofukuan.png");
const MyStatusBar_1 = require("./MyStatusBar");
const moment = require("moment");
const ConfigureStore_1 = require("../store/ConfigureStore");
let { history } = ConfigureStore_1.default;
let g_order;
let g_from;
exports.PayList = [
    { id: 1, name: "微信支付", addr: "上海普陀区金沙江路1518弄2号楼611室", sex: 1, city: "上海", tag: 1, area: "近铁城市广场1", img: login_weChat_icon },
    { id: 2, name: "支付宝", addr: "上海普陀区金沙江路1518弄2号楼612室", sex: 2, city: "北京", tag: 2, area: "近铁城市广场2", img: alipay_logo },
    { id: 3, name: "货到付款", addr: "上海普陀区金沙江路1518弄2号楼614室", sex: 2, city: "广州", tag: 4, area: "近铁城市广场4", img: huodaofukuan },
];
exports.styles = react_native_1.StyleSheet.create({
    otherinfo: {
        backgroundColor: 'lightgrey',
        height: 40
    },
    pic: {
        resizeMode: "cover",
        width: 80,
        height: 80
    },
});
class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.backListenerPay = () => {
            console.log('syy---------------backListenerPay----------------------end + ', g_from);
            if (g_from && (g_from == RouterDefine_1.SUBMITORDER)) {
                history.push(RouterDefine_1.ORDERDETAIL, { order: g_order, from: RouterDefine_1.PAY });
                return true;
            }
            return false;
        };
        this.ds = new react_native_2.ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.tick = this.tick.bind(this);
        this.payCountdown = this.payCountdown.bind(this);
        this.onPay = this.onPay.bind(this);
        let { order } = this.props.location.state;
        // var now     = moment().valueOf();
        // var create  = moment(order.created_at).valueOf();
        // let count   = (create+Config.PAY_COUNT_DOWN*60*1000-now)/(60*1000)
        // if(count < 0)
        // {
        //     count = 0;
        // }
        // console.log("count = ", count)
        this.state = {
            activeid: 1,
            // lastPayTime: moment(order.created_at).add(count,"m").diff(moment()),
            lastPayTime: Config_1.Config.GetPayLeftTime(order.created_at),
            timeoutID: setInterval(this.tick, 1000),
            isInstallWeChat: false
        };
    }
    componentDidMount() {
        react_native_1.BackHandler.addEventListener('hardwareBackPress', this.backListenerPay);
        WeChat.isWXAppInstalled().then(result => {
            console.log('isinstall +' + !!result);
            this.setState({
                isInstallWeChat: !!result
            });
        });
    }
    componentWillUnmount() {
        react_native_1.BackHandler.removeEventListener('hardwareBackPress', this.backListenerPay);
        if (this.state && this.state.timeoutID) {
            clearInterval(this.state.timeoutID);
        }
    }
    // backListener1 = ()=>{		
    //     BackHandler.addEventListener('hardwareBackPress', this.backListenerPay);
    // }
    tick() {
        if (!this.state) {
            return;
        }
        let { lastPayTime, timeoutID } = this.state;
        console.log("lastPayTime=", lastPayTime);
        if (lastPayTime && lastPayTime > 1000) {
            this.setState({ lastPayTime: (lastPayTime - 1000) });
        }
        else if (timeoutID) {
            clearInterval(timeoutID);
            this.setState({
                lastPayTime: 0,
                timeoutID: 0
            });
            this.props.history.push(RouterDefine_1.MAIN);
        }
    }
    SetChange(id) {
        this.setState({
            activeid: id
        });
    }
    onPay() {
        if (!this.props.location.state)
            return;
        let { order } = this.props.location.state;
        if (this.state.activeid == 1) {
            this.props.startWeChatPay(order);
        }
        else if (this.state.activeid == 2) {
            this.props.startAliPay(order);
        }
        else {
            this.props.startDaoFuPay(order);
        }
    }
    payCountdown() {
        let order = this.props.location.state.order;
        let { lastPayTime } = this.state;
        return lastPayTime && `${moment.utc(lastPayTime).format("mm:ss")}`;
    }
    render() {
        // this.props.match.params.order		
        let order = this.props.location.state && this.props.location.state.order;
        // let aa = (order.state == OrderState.OSFinish) ? true : false
        let from = this.props.location.state && this.props.location.state.from || "";
        g_order = order;
        g_from = from;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            (from == RouterDefine_1.SUBMITORDER) ?
                React.createElement(ComHeaderWithRouter, { title: "\u652F\u4ED8", backClick: () => { this.props.history.push(RouterDefine_1.ORDERDETAIL, { order: order, from: RouterDefine_1.PAY }); } }) :
                React.createElement(ComHeaderWithRouter, { title: "\u652F\u4ED8" }),
            React.createElement(native_base_1.Content, null,
                React.createElement(OrderImg_1.default, { items: order.order_item, click: () => { this.props.history.push(RouterDefine_1.ITEMLIST, { orderlist: order.order_item, from: RouterDefine_1.PAY }); }, price: order.lastprice }),
                React.createElement(native_base_1.ListItem, { itemDivider: true }),
                React.createElement(native_base_1.Text, { style: { alignSelf: 'center', fontSize: 20 } }, "\u652F\u4ED8\u5269\u4F59\u65F6\u95F4"),
                React.createElement(native_base_1.Text, { style: { alignSelf: 'center', fontSize: 30 } }, this.payCountdown()),
                React.createElement(native_base_1.Text, { style: { backgroundColor: '#f3f3f3', marginTop: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 10 } }, "\u7B2C\u4E09\u65B9\u652F\u4ED8"),
                exports.PayList.map((PayData) => {
                    if (!this.state.isInstallWeChat && PayData.name === '微信支付')
                        return null;
                    return React.createElement(react_native_1.TouchableOpacity, { key: PayData.id, onPress: () => {
                            this.setState({ activeid: PayData.id });
                        } },
                        React.createElement(react_native_2.View, { style: { height: 5, flex: 1, backgroundColor: '#f3f3f3' } }),
                        React.createElement(react_native_2.View, { style: { flex: 1, height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 } },
                            React.createElement(native_base_1.Thumbnail, { source: PayData.img, style: { marginLeft: 5, width: 35, height: 35 } }),
                            React.createElement(native_base_1.Text, { style: { width: '40%', textAlign: 'left' } }, PayData.name),
                            React.createElement(react_native_2.View, { style: { paddingRight: 15 } },
                                React.createElement(native_base_1.CheckBox, { checked: this.state.activeid == PayData.id, color: Config_1.Config.ColorOff, onPress: () => {
                                        this.setState({ activeid: PayData.id });
                                    } }))));
                }),
                React.createElement(native_base_1.Button, { style: { backgroundColor: Config_1.Config.ColorOff, borderRadius: 10, marginTop: Config_1.px2dp(30), height: Config_1.Config.BtnComHeight, marginLeft: 10, marginRight: 10 }, full: true, onPress: this.onPay },
                    React.createElement(native_base_1.Text, null, "\u786E\u8BA4\u652F\u4ED8")))));
    }
}
exports.default = Pay;
//# sourceMappingURL=Pay.js.map