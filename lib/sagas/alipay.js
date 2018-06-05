"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const ActionTypes = require("../constants/ActionTypes");
const react_native_alipay_1 = require("react-native-alipay");
const api_1 = require("../http/api");
const RouterDefine_1 = require("../constants/RouterDefine");
const native_base_1 = require("native-base");
const order_1 = require("../actions/order");
const ui_1 = require("../actions/ui");
const ConfigureStore_1 = require("../store/ConfigureStore");
/**
 * @function watchAliPay 支付宝支付
 */
function* watchAliPay() {
    while (true) {
        const action = (yield effects_1.take([ActionTypes.USER_PAY_ALI]));
        yield effects_1.fork(doAliPay, action.payload);
    }
}
exports.watchAliPay = watchAliPay;
function* doAliPay(order) {
    try {
        //1.请求服务器state数据
        //获取用户token
        let token = yield effects_1.select((state) => state.currentUser.token);
        let config = {};
        if (token) {
            config = { "headers": { "Authorization": `Bearer ${token}` } };
        }
        const payload = yield api_1.default.request(api_1.HttpMethod.GET, `/pay?pay_type=alipay&order_number=${order.order_number}`, undefined, undefined, config);
        //2.打开支付页面
        const resp = yield react_native_alipay_1.pay(payload.data, true);
        if (resp.resultStatus === "6001") {
            console.log(`支付宝支付,order:${order.order_number},用户取消付款`);
            return;
        }
        if (resp.resultStatus === "9000") {
            //付款成功
            //刷新订单
            yield effects_1.put(order_1.fetchOrder(order_1.ORDER_LIST_TYPE.UNFINISHED, 1, order_1.ORDER_PAGE_COUNT, true));
            yield effects_1.put(ui_1.changeMyOrderTab(order_1.ORDER_LIST_TYPE.UNFINISHED));
            ConfigureStore_1.default.history.replace(RouterDefine_1.MYORDER);
            console.log(`支付宝支付,支付成功`);
            return;
        }
        else if (resp.resultStatus === '8000') {
            native_base_1.Toast.show({
                text: `支付结果确认中,请稍后查看订单状态`,
                buttonText: "确定",
                position: "bottom",
                type: "success",
                duration: 3000
            });
            return;
        }
        console.log(`支付宝支付,order:${order.order_number},用户付款出错,${resp.errCode}:${resp.errStr}`);
        native_base_1.Toast.show({
            text: `支付宝支付错误${resp.errStr}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        });
    }
    catch (error) {
        console.log("支付宝支付错误", error);
        native_base_1.Toast.show({
            text: `支付宝支付出错${error.toString()}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        });
    }
}
//# sourceMappingURL=alipay.js.map