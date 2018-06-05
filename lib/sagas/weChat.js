"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTypes = require("../constants/ActionTypes");
const effects_1 = require("redux-saga/effects");
const WeChat = require("react-native-wechat");
const native_base_1 = require("native-base");
const api_1 = require("../http/api");
const action_1 = require("../common/utils/action");
const Config_1 = require("../config/Config");
const order_1 = require("../actions/order");
const ConfigureStore_1 = require("../store/ConfigureStore");
const RouterDefine_1 = require("../constants/RouterDefine");
const ui_1 = require("../actions/ui");
const ERR_OK = 0;
const ERR_PAY_CANCEL = -2;
/**
 * @function watchWeChatLogin 微信登录
 */
function* watchWeChatLogin() {
    while (true) {
        const action = (yield effects_1.take([ActionTypes.USER_LOGIN_WECHAT]));
        yield effects_1.fork(doWechatLogin);
    }
}
exports.watchWeChatLogin = watchWeChatLogin;
function* doWechatLogin() {
    try {
        //0.判断有没有安装微信
        const installed = yield WeChat.isWXAppInstalled();
        if (!installed) {
            Config_1.MyToast(3000, "您未安装微信客户端");
            return;
        }
        //1.请求服务器state数据
        const state = yield api_1.default.get("/user/get-weixin-state", "");
        //2.请求sendRequest
        const resp = yield WeChat.sendAuthRequest("snsapi_userinfo", state.data);
        console.log("微信登录失败:", resp);
        if (resp.state !== state.data) {
            console.log("state被篡改??", state.data, "返回的:", resp.state);
            return;
        }
        if (resp.errCode != ERR_OK) {
            console.log("用户授权失败!!,错误码", resp.errCode);
            return;
        }
        //3.通知服务器code
        const result = yield api_1.default.post("/user/weixin-signup", { code: resp.code, state: state.data, appid: Config_1.Config.WECHAT_APP_ID });
        //登录成功
        yield effects_1.put({ type: ActionTypes.FINISH_USER_LOGIN, error: false, payload: result, flag: action_1.AsyncActionFlag.FLAG_SUCCESS });
    }
    catch (error) {
        console.log("微信登录错误", error);
        native_base_1.Toast.show({
            text: `微信登录失败${error.toString()}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        });
    }
}
/**
 * @function watchWeChatPay 货到付款
 */
function* watchDaofuPay() {
    while (true) {
        const action = (yield effects_1.take([ActionTypes.USER_PAY_DAOFU]));
        yield effects_1.fork(doDaofu, action.payload);
    }
}
exports.watchDaofuPay = watchDaofuPay;
function* doDaofu(order) {
    try {
        //1.请求服务器state数据
        //获取用户token
        let token = yield effects_1.select((state) => state.currentUser.token);
        let config = {};
        if (token) {
            config = { "headers": { "Authorization": `Bearer ${token}` } };
        }
        const payload = yield api_1.default.request(api_1.HttpMethod.GET, `/pay?pay_type=daofu&order_number=${order.order_number}`, undefined, undefined, config);
        yield effects_1.put(order_1.fetchOrder(order_1.ORDER_LIST_TYPE.UNFINISHED, 1, order_1.ORDER_PAGE_COUNT, true));
        yield effects_1.put(ui_1.changeMyOrderTab(order_1.ORDER_LIST_TYPE.UNFINISHED));
        ConfigureStore_1.default.history.replace(RouterDefine_1.MYORDER);
    }
    catch (error) {
        console.log("支付错误", error);
        native_base_1.Toast.show({
            text: `支付出错${error.toString()}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        });
    }
}
/**
 * @function watchWeChatPay 微信支付
 */
function* watchWeChatPay() {
    while (true) {
        const action = (yield effects_1.take([ActionTypes.USER_PAY_WECHAT]));
        yield effects_1.fork(doWechatPay, action.payload);
    }
}
exports.watchWeChatPay = watchWeChatPay;
function* doWechatPay(order) {
    try {
        //1.请求服务器state数据
        //获取用户token
        let token = yield effects_1.select((state) => state.currentUser.token);
        let config = {};
        if (token) {
            config = { "headers": { "Authorization": `Bearer ${token}` } };
        }
        const payload = yield api_1.default.request(api_1.HttpMethod.GET, `/pay?pay_type=weixinpay&order_number=${order.order_number}`, undefined, undefined, config);
        //2.打开支付页面
        const resp = yield WeChat.pay(payload.data);
        if (resp.errCode == ERR_PAY_CANCEL) {
            console.log(`微信支付,order:${order.order_number},用户取消付款`);
            return;
        }
        if (resp.errCode == ERR_OK) {
            //付款成功
            //刷新订单
            yield effects_1.put(order_1.fetchOrder(order_1.ORDER_LIST_TYPE.UNFINISHED, 1, order_1.ORDER_PAGE_COUNT, true));
            yield effects_1.put(ui_1.changeMyOrderTab(order_1.ORDER_LIST_TYPE.UNFINISHED));
            ConfigureStore_1.default.history.replace(RouterDefine_1.MYORDER);
            console.log(`微信支付,支付成功`);
            return;
        }
        console.log(`微信支付,order:${order.order_number},用户付款出错,${resp.errCode}:${resp.errStr}`);
        native_base_1.Toast.show({
            text: `微信支付错误${resp.errStr}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        });
    }
    catch (error) {
        console.log("微信支付错误", error);
        native_base_1.Toast.show({
            text: `微信支付出错${error.toString()}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        });
    }
}
//# sourceMappingURL=weChat.js.map