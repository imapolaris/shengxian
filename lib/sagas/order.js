"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
const cart_1 = require("../actions/cart");
const ui_1 = require("../actions/ui");
const ConfigureStore_1 = require("../store/ConfigureStore");
const RouterDefine_1 = require("../constants/RouterDefine");
const order_1 = require("../actions/order");
const EntitiesState_1 = require("../store/EntitiesState");
const CategoryAction_1 = require("../actions/CategoryAction");
/**
 * @function watchRequest 监听http网络请求action
 * @param {string} requestAction 监听的action
 * @param {boolean} onlyLast     是不是只保留最后一次action请求
 */
function* watchFinishNewOrder() {
    while (true) {
        const action = (yield effects_1.take([ActionTypes.FINISH_NEW_ORDER, ActionTypes.FINISH_CANCEL_ORDER, ActionTypes.FINISH_BUY_AGAIN]));
        if (action.flag !== action_1.AsyncActionFlag.FLAG_SUCCESS)
            continue;
        switch (action.type) {
            case ActionTypes.FINISH_NEW_ORDER: {
                // 刷新一下购物车
                const cartVersion = yield effects_1.select((state) => state.entities.cart.version);
                yield effects_1.put(cart_1.fetchCarts(cartVersion, true));
                // 清空一下购物车界面状态
                yield effects_1.put(ui_1.clearSelectedCartsItems());
                let order = action.payload.data;
                console.log("下单完成", action.payload);
                //使用了优惠卷，需要重现请求一次
                if (order.couponprice > 0) {
                    const couponVersion = yield effects_1.select((state) => state.entities.Coupon.version);
                    yield effects_1.put(CategoryAction_1.fetchCoupon(couponVersion, true));
                }
                // 跳转到付款页面
                ConfigureStore_1.default.history.push(RouterDefine_1.PAY, { order: order, from: RouterDefine_1.SUBMITORDER });
                break;
            }
            case ActionTypes.FINISH_CANCEL_ORDER: {
                let page = yield effects_1.select((state) => state.ui.myOrder.page);
                if (action.payload && action.payload.data
                    && (action.payload.data.state == EntitiesState_1.OrderState.OSCancel
                        || action.payload.data.state == EntitiesState_1.OrderState.OSFinish)) {
                    yield effects_1.put(order_1.fetchOrder(page, order_1.ORDER_LIST_TYPE.FINISHED, order_1.ORDER_PAGE_COUNT, true));
                }
                else {
                    yield effects_1.put(order_1.fetchOrder(page, order_1.ORDER_LIST_TYPE.UNFINISHED, order_1.ORDER_PAGE_COUNT, true));
                }
                let { location } = ConfigureStore_1.default.history;
                if (location && location.pathname === RouterDefine_1.ORDERDETAIL) {
                    // StoreConfig.history.goBack();
                    let from = location.state ? location.state.from : '';
                    ConfigureStore_1.default.history.replace(RouterDefine_1.ORDERDETAIL, { order: action.payload.data, from: from });
                }
                break;
            }
            case ActionTypes.FINISH_DELETE_ORDER: {
                let page = yield effects_1.select((state) => state.ui.myOrder.page);
                yield effects_1.put(order_1.fetchOrder(page, 1, order_1.ORDER_PAGE_COUNT, true));
                break;
            }
            case ActionTypes.FINISH_BUY_AGAIN: {
                // 刷新一下购物车
                const cartVersion = yield effects_1.select((state) => state.entities.cart.version);
                yield effects_1.put(cart_1.fetchCarts(cartVersion, true));
                // 跳转到付款页面
                ConfigureStore_1.default.history.push(RouterDefine_1.MAIN_CART, { from: RouterDefine_1.MYORDER });
            }
        }
    }
}
exports.watchFinishNewOrder = watchFinishNewOrder;
//# sourceMappingURL=order.js.map