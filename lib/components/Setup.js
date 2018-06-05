"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const MyStatusBar_1 = require("./MyStatusBar");
const ConfigureStore_1 = require("../store/ConfigureStore");
const Config_1 = require("../config/Config");
const funcs_1 = require("../common/utils/funcs");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
let RNFS = require('react-native-fs');
// import {Util} from "../common/utils/util";
const pichead = { uri: "screen" };
const axios_1 = require("axios");
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
});
//f4f4f4
exports.saddr = react_native_1.StyleSheet.create({
    bk: { backgroundColor: '#f3f3f3' },
    fontright: { flexDirection: 'row', justifyContent: 'flex-end' },
});
const alipay = require("react-native-alipay");
const screenWidth = react_native_1.Dimensions.get('window').width;
const reqest1 = 'app_id=2018041802577856&biz_content={"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http://sx.zhangqing.site/test&sign_type=RSA2&timestamp=2018-04-21 16:10:31&version=1.0&sign=anfC6fYyvq52N8qBhYn0LTD75PPTPrIoiUCEFOcBcNTK0xZ9C/xwJKMvoHMCl3eePOH+PlPiAtZLJe89nCTA1aJJj34SvbXI8ooMIvMqF7thHYQXEyumWFWhPLXe+meTBQeZ9Dib6P6Ig1R8oAB5e3BYIpUHTRVQIt6TS3bdJK6q8NRsscgcfKj3K8/UB5LQT/kRN2SB2PSyCUXbv0+hXwZpxjye9+MH9vCCP3BHs8W0+Q3oi/Hv4ZDnBnGUoOL6nV1c1VHvOE9W2UBZKxexky+bwJr290LNBKtuSy2pV6Jjvaor6L1sVO7f9RcPx08uAhejO+D8RvalEBFMefKodA==';
const requestencod = "app_id%3d2018041802577856%26biz_content%3d%7b%22timeout_express%22%3a%2230m%22%2c%22product_code%22%3a%22QUICK_MSECURITY_PAY%22%2c%22total_amount%22%3a%220.01%22%2c%22subject%22%3a%221%22%2c%22body%22%3a%22%e6%88%91%e6%98%af%e6%b5%8b%e8%af%95%e6%95%b0%e6%8d%ae%22%2c%22out_trade_no%22%3a%22IQJZSRC1YMQB5HU%22%7d%26charset%3dutf-8%26format%3djson%26method%3dalipay.trade.app.pay%26notify_url%3dhttp%3a%2f%2fsx.zhangqing.site%2ftest%26sign_type%3dRSA2%26timestamp%3d2018-04-21+16%3a10%3a31%26version%3d1.0%26sign%3danfC6fYyvq52N8qBhYn0LTD75PPTPrIoiUCEFOcBcNTK0xZ9C%2fxwJKMvoHMCl3eePOH%2bPlPiAtZLJe89nCTA1aJJj34SvbXI8ooMIvMqF7thHYQXEyumWFWhPLXe%2bmeTBQeZ9Dib6P6Ig1R8oAB5e3BYIpUHTRVQIt6TS3bdJK6q8NRsscgcfKj3K8%2fUB5LQT%2fkRN2SB2PSyCUXbv0%2bhXwZpxjye9%2bMH9vCCP3BHs8W0%2bQ3oi%2fHv4ZDnBnGUoOL6nV1c1VHvOE9W2UBZKxexky%2bbwJr290LNBKtuSy2pV6Jjvaor6L1sVO7f9RcPx08uAhejO%2bD8RvalEBFMefKodA%3d%3d";
let app_id = '2018041802577856';
let biz_content = '{"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}';
let notify_url = 'http://sx.zhangqing.site/callback/alipay';
let sign = 'pC6cy/lyglq4wL/8ZimHBsyE6e+pa+fDR4jvCISVGx0pbo+GUlIYCU4mlPo2VKVu4y2s1y1KZm4G1ZveDu4Gy82McfwL40Wc+ArQQxkf2w6rxS9uZj52hs6E1ZZYlgTi1Hzslk++yxHMDv1d/Z/66C9YDcuCEakEdnKb8rCWJygzyeZufvdA8brpYJcZbJDrP17kWx69mWxrNzJ/ghq5wfe4WdqbTjOdjD0Wd5jIkK5IRlPgYeRJ+PkIFalY2/wIFuInOmzr37/O8iMmcIhoy7JONYzxPrPipPYG50eJ21AjUNjmx/T/v1iymL/tJDAJdzcQ2gmEkuQt48OOilk9PA==';
function getVaue(key, value, add = true) {
    return (add ? '&' : '') + key + '=' + encodeURIComponent(value);
    //'app_id=' + encodeURIComponent(app_id)
}
let orderText = getVaue('app_id', app_id, false) + getVaue('biz_content', biz_content) + getVaue('charset', 'utf-8') + getVaue('format', 'json') +
    getVaue('method', 'alipay.trade.app.pay') + getVaue('notify_url', notify_url) + getVaue('sign_type', 'RSA2') + getVaue('timestamp', '2018-04-21 17:10:31') +
    getVaue('version', '1.0') + getVaue('sign', sign);
class Setup extends React.Component {
    constructor(props) {
        super(props);
        this.onResetData = this.onResetData.bind(this);
        this.startCalcCacheSize = this.startCalcCacheSize.bind(this);
        this.state = {
            cacheSize: ""
        };
    }
    onResetData() {
        //TODO 什么清,什么不清
        ConfigureStore_1.default.persist.purge();
        this.props.clearCacheData();
        setTimeout(() => { this.startCalcCacheSize(); }, 2000);
    }
    componentDidMount() {
        this.startCalcCacheSize();
    }
    startCalcCacheSize() {
        RNFS.readDir(Config_1.baseCacheFolder) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((results) => {
            let size = results.reduce((size, val) => {
                size += val.size;
                return size;
            }, 0);
            this.setState({ cacheSize: funcs_1.fileSize(size) });
        })
            .catch((err) => {
            console.log(err.message);
        });
    }
    Logout() {
        this.props.logout();
        this.props.history.goBack();
    }
    testAliPay() {
        //const orderInfo = requestencod	;//encodeURIComponent(reqest1);
        console.log("-----------------testAliPay-orderText:", orderText);
        // console.log("-----------------testAliPay-alipay:", orderInfo)
        // alipay(res){
        let self = this;
        alipay.pay(orderText, true).then(function (result) {
            console.log("-----------------testAliPayOK-" + result);
            // let data=''
            // if (Platform.OS === 'ios'){
            //     data=result[0].resultStatus
            // }else {
            //     if (typeof result=='string'){
            //         let parse_data_result=parse_data(result)
            //         data=parse_data_result.resultStatus
            //     }
            // }
            // if (data === '9000') {
            //     welog('pay', 'pay_action', {status: 'success',pay_action:'alipay_success',payRes:result,step: '8'})
            // } else if (data === '8000') {
            // } else if (data == '6001') {
            //               } else {
            // }
        }, function (err) {
            console.log(`---alipay--err------${JSON.stringify(err)}`);
        });
        // async function doPay() 
        // {
        // 	// const orderInfo = await post('/createOrder');
        // 	const orderInfo = "fsdfasdfadf";
        // 	console.log("-----------------testAliPay-send")
        // 	const result = await alipay.pay(orderInfo, true);
        // 	console.log("-----------------testAliPay-ret")
        //     if (result.resultStatus === '9000') {
        //         Alert.alert('提示', '支付成功');
        //     } else if (result.resultStatus === '8000') {
        //         Alert.alert('提示', '支付结果确认中,请稍后查看您的账户确认支付结果');
        //     } else if (result.resultStatus !== '6001') {
        //         // 如果用户不是主动取消
        //         Alert.alert('提示', '支付失败');
        //     }
        // }
        // doPay()
    }
    render() {
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: "\u8BBE\u7F6E\u4E2D\u5FC3" }),
            React.createElement(native_base_1.View, { style: [exports.saddr.bk, { flex: 1 }] },
                React.createElement(native_base_1.List, { style: [{ backgroundColor: '#fff', marginTop: 10 }] },
                    React.createElement(native_base_1.ListItem, { button: true, onPress: this.onResetData },
                        React.createElement(native_base_1.Text, { style: { flex: 1 } }, "\u6E05\u9664\u672C\u5730\u7F13\u5B58"),
                        React.createElement(native_base_1.Right, { style: { flexDirection: 'row', justifyContent: 'flex-end', flex: 0.5 } },
                            React.createElement(native_base_1.Text, null, this.state.cacheSize),
                            React.createElement(native_base_1.Icon, { name: "arrow-forward", style: Config_1.Config.styles.ForwardIcon }))),
                    React.createElement(native_base_1.ListItem, { button: true, onPress: () => {
                            native_base_1.Toast.show({
                                text: '测试提示',
                                buttonText: "确定",
                                position: "bottom",
                                type: "success",
                                duration: 3000
                            });
                        } },
                        React.createElement(native_base_1.Text, { style: { flex: 1 } }, "\u5F53\u524D\u7248\u672C\u53F7"),
                        React.createElement(native_base_1.Right, { style: exports.saddr.fontright },
                            React.createElement(native_base_1.Text, null, "5.0.1"),
                            React.createElement(native_base_1.Icon, { name: "arrow-forward", style: Config_1.Config.styles.ForwardIcon }))),
                    React.createElement(native_base_1.ListItem, { button: true, onPress: () => {
                            Config_1.Config.bNeiWang = !Config_1.Config.bNeiWang;
                            axios_1.default.defaults.baseURL = Config_1.Config.bNeiWang ? Config_1.Config.HTTP_BASE_URL_NEI : Config_1.Config.HTTP_BASE_URL_WAY;
                            react_native_1.Alert.alert('提示', Config_1.Config.bNeiWang ? '已切换到内网' : '已切换到外网', [
                                {
                                    text: '取消',
                                    onPress: () => { }
                                },
                                {
                                    text: '确定',
                                    onPress: () => { }
                                }
                            ]);
                        } },
                        React.createElement(native_base_1.Text, { style: { flex: 1 } }, "\u5185/\u5916\u7F51\u5207\u6362"),
                        React.createElement(native_base_1.Right, { style: exports.saddr.fontright },
                            React.createElement(native_base_1.Icon, { name: "arrow-forward", style: Config_1.Config.styles.ForwardIcon })))),
                React.createElement(native_base_1.View, { style: { justifyContent: 'center', width: screenWidth, height: 60, marginTop: 10 } },
                    React.createElement(native_base_1.Button, { style: { height: Config_1.Config.BtnComHeight, marginLeft: 10, width: screenWidth - 20,
                            backgroundColor: Config_1.Config.ColorOff, borderRadius: 5, justifyContent: 'center' }, onPress: () => this.Logout() },
                        React.createElement(native_base_1.Text, null, "\u9000\u51FA\u767B\u5F55"))))));
    }
}
exports.default = Setup;
//# sourceMappingURL=Setup.js.map