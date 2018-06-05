"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const saga_1 = require("../http/saga");
const ActionTypes = require("../constants/ActionTypes");
const httpError_1 = require("./httpError");
const Config_1 = require("../config/Config");
const gpslocation_1 = require("./gpslocation");
const carts_1 = require("./carts");
const order_1 = require("./order");
const weChat_1 = require("./weChat");
const alipay_1 = require("./alipay");
function* rootSaga() {
    yield effects_1.all([
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_ADDRLIST, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_ADD_ADDR),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_EDIT_ADDR),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_TOPBANNER, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_ACTIVEITEM, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_CATEGORY, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_ITEMDYNAMIC, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_COUPON, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_MY, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_DELETE_ADDR),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_EDIT_CART_ITEM),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_ADD_CART_ITEM),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_REMOVE_CART_ITEMS),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_USER_GET_VCODE),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_USER_LOGIN),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_NEW_ORDER),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FETCH_ORDERLIST, Config_1.Config.HTTP_DATA_REFRESH_INTERVAL),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_DELETE_ORDER),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_CANCEL_ORDER),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_FEED_BACK),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_BUY_AGAIN),
        effects_1.fork(saga_1.watchRequest, ActionTypes.START_CHECK_AUTH),
        effects_1.fork(alipay_1.watchAliPay),
        effects_1.fork(weChat_1.watchWeChatPay),
        effects_1.fork(weChat_1.watchDaofuPay),
        effects_1.fork(saga_1.watchForceRequest),
        effects_1.fork(order_1.watchFinishNewOrder),
        effects_1.fork(carts_1.watchCartOpFinished),
        effects_1.fork(httpError_1.watchHttpError),
        effects_1.fork(weChat_1.watchWeChatLogin),
        effects_1.fork(saga_1.watchHttpRequestStatus),
        effects_1.fork(gpslocation_1.watchChangeShop),
    ]);
}
exports.default = rootSaga;
//# sourceMappingURL=index.js.map