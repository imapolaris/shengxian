"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const RouterDefine_1 = require("../constants/RouterDefine");
const RouterDefine_2 = require("../constants/RouterDefine");
const Config_1 = require("../config/Config");
const addr = require("../../images/addr.png");
const coupon = require("../../images/coupon.png");
const feedback = require("../../images/feedback.png");
const head_icon = require("../../images/head_icon.png");
const help = require("../../images/help.png");
const my_head_back = require("../../images/my_head_back.png");
const order = require("../../images/order.png");
const service = require("../../images/service.png");
const set = require("../../images/set.png");
const SCREEN_WIDTH = react_native_1.Dimensions.get('window').width;
// import {Util} from "../common/utils/util";
//const pichead = require("./splashscreen.png");
const pichead = { uri: "screen" };
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: 'transparent', height: 150 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { backgroundColor: 'transparent', color: '#fff', fontSize: 16 },
    fonttxt2: { color: 'orange', fontSize: 20 },
    fontcoupon: { color: 'red', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
});
//f4f4f4
exports.saddr = react_native_1.StyleSheet.create({
    bk: { backgroundColor: '#f3f3f3' },
    bk2: { backgroundColor: '#f3f3f3', flexDirection: 'row', height: 80 },
    //bk3:{backgroundColor:'#f3f3f3', flex:1, flexDirection:'row', paddingTop:10},
    bk3: { backgroundColor: '#f3f3f3', flexDirection: 'row', paddingTop: 10 },
    btn: { backgroundColor: '#fff', flex: 1, margin: 1 },
    btn3: { backgroundColor: '#fff', height: 80, flex: 1, flexDirection: 'column', margin: 1 },
    fonticon: { color: '#000', fontSize: 30, textAlign: 'center' },
    vw1: { borderBottomWidth: 0.5, borderColor: '#b2b2b2', width: '25%', height: 100, paddingTop: 10 },
    tx1: { fontSize: Config_1.Config.FontBase, color: Config_1.Config.ColorB333, alignSelf: 'center', paddingTop: 15 },
});
class MineCell extends React.Component {
    render() {
        const { index, item, onPress, MyData } = this.props;
        return (React.createElement(react_native_1.TouchableOpacity, { style: [cellStyles.container, { borderRightWidth: (index == 3) ? 0 : 1, borderTopWidth: (index / 4 < 1) ? 1 : 0 }], onPress: onPress },
            index == 1 && MyData.couponcnt > 0 ?
                React.createElement(native_base_1.Badge, { info: true, style: {
                        backgroundColor: Config_1.Config.ColorOff, height: 20, minWidth: 20, paddingLeft: 0, paddingRight: 0,
                        alignSelf: 'center', zIndex: 999, top: 10, position: 'absolute', left: SCREEN_WIDTH / 8 + 5,
                        justifyContent: 'center', alignItems: 'center'
                    } },
                    React.createElement(native_base_1.Text, { style: { lineHeight: 17, textAlign: 'center', paddingLeft: 0, paddingRight: 0, fontSize: 10 } }, MyData.couponcnt))
                : null,
            React.createElement(react_native_1.Image, { style: cellStyles.image, source: item.source }),
            React.createElement(native_base_1.Text, { style: exports.saddr.tx1 }, item.title)));
    }
}
const cellStyles = react_native_1.StyleSheet.create({
    container: {
        width: (SCREEN_WIDTH) / 4,
        justifyContent: 'center',
        // marginLeft:-0.5,
        alignItems: 'center',
        height: (SCREEN_WIDTH) / 4,
        backgroundColor: 'white',
        borderColor: Config_1.Config.ColorBf4,
        borderBottomWidth: 1
    },
    image: {
        width: 40,
        height: 40
    }
});
class My extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            {
                title: '我的订单',
                source: order,
                route: RouterDefine_1.MYORDER
            },
            {
                title: '优惠券',
                source: coupon,
                route: RouterDefine_1.COUPON
            },
            {
                title: '收货地址',
                source: addr,
                route: RouterDefine_1.ADDRLIST
            },
            {
                title: '客服中心',
                source: service,
                route: RouterDefine_1.SHOPLIST
            },
            {
                title: '意见反馈',
                source: feedback,
                route: RouterDefine_2.FEEDBACK
            },
            {
                title: '帮助中心',
                source: help,
                route: RouterDefine_2.HELP
            },
            {
                title: '设置中心',
                source: set,
                route: RouterDefine_2.SETUP
            },
        ];
        this.isLogin = this.isLogin.bind(this);
    }
    componentDidMount() {
        // this.props.fetchMy(this.props.My.version);
        //tab切换的时候调用
        react_native_1.DeviceEventEmitter.addListener('MyReload', () => {
            this.props.fetchMy(0);
        });
        this.props.fetchMy(0);
    }
    isLogin(data) {
        if (data && (data.data.phone && data.data.phone.length > 0 || data.data.title.length > 0)) {
            return true;
        }
        return false;
    }
    render() {
        let MyData = this.props.My.data;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(react_native_1.StatusBar, { backgroundColor: 'transparent', translucent: true }),
            React.createElement(react_native_1.ImageBackground, { source: my_head_back, style: { height: 150, top: 0 }, resizeMode: 'cover' },
                React.createElement(native_base_1.View, { style: { flexDirection: 'row', flex: 1 } },
                    React.createElement(native_base_1.View, { style: { height: 70, alignContent: 'center', marginTop: 50, marginLeft: 20 } }, MyData && MyData.headurl ?
                        React.createElement(react_native_1.Image, { source: { uri: MyData.headurl }, style: { width: 80, height: 80, borderRadius: 40 } })
                        :
                            React.createElement(react_native_1.Image, { source: head_icon, style: { width: 80, height: 80, borderRadius: 40 } })),
                    React.createElement(native_base_1.View, { style: { height: 70, justifyContent: 'center', alignSelf: 'center', marginLeft: 15 } }, this.isLogin(this.props.My) ?
                        React.createElement(native_base_1.View, null,
                            MyData && MyData.title && MyData.title.length > 0 ? React.createElement(native_base_1.Text, { note: true, style: exports.shead.fonttxt }, MyData.title) : null,
                            MyData && MyData.phone && MyData.phone.length > 0 ? React.createElement(native_base_1.Text, { note: true, style: exports.shead.fonttxt }, MyData.phone) : null)
                        :
                            React.createElement(native_base_1.Text, { style: { fontSize: 20, fontWeight: '200', color: Config_1.Config.ColorW } }, "\u767B\u5F55 / \u6CE8\u518C")))),
            React.createElement(react_native_1.FlatList, { scrollEnabled: false, style: { flex: 1, width: SCREEN_WIDTH }, keyExtractor: (item, index) => index.toString(), data: this.data, renderItem: ({ item, index, separators }) => (React.createElement(MineCell, { item: item, index: index, MyData: MyData, onPress: () => {
                        this.props.history.push(item.route, { from: RouterDefine_1.MAIN_MY });
                    } })), numColumns: 4 })));
    }
}
exports.default = My;
const styles = react_native_1.StyleSheet.create({
    img: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        zIndex: 1
    }
});
//# sourceMappingURL=My.js.map