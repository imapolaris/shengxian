
import {all, fork} from "redux-saga/effects";
import {watchForceRequest, watchHttpRequestStatus, watchRequest} from "../http/saga";
import * as ActionTypes from "../constants/ActionTypes";
import {watchHttpError} from "./httpError";
import {Config} from "../config/Config";
import {watchChangeShop, watchLoginFinished} from "./gpslocation";
import {watchCartOpFinished} from "./carts";
import {watchFinishNewOrder} from "./order";
import {watchDaofuPay, watchWeChatLogin, watchWeChatPay} from "./weChat";
import {watchAliPay} from "./alipay";



export default function* rootSaga(){
    yield all([
        fork(watchRequest,ActionTypes.START_FETCH_ADDRLIST,Config.HTTP_DATA_REFRESH_INTERVAL), //最多10秒钟请求一次数据
        fork(watchRequest,ActionTypes.START_ADD_ADDR),
		fork(watchRequest,ActionTypes.START_EDIT_ADDR),
		fork(watchRequest,ActionTypes.START_FETCH_TOPBANNER,Config.HTTP_DATA_REFRESH_INTERVAL),
		fork(watchRequest,ActionTypes.START_FETCH_ACTIVEITEM,Config.HTTP_DATA_REFRESH_INTERVAL),
		fork(watchRequest,ActionTypes.START_FETCH_CATEGORY,Config.HTTP_DATA_REFRESH_INTERVAL),
		fork(watchRequest,ActionTypes.START_FETCH_ITEMDYNAMIC,Config.HTTP_DATA_REFRESH_INTERVAL),
		fork(watchRequest,ActionTypes.START_FETCH_COUPON,Config.HTTP_DATA_REFRESH_INTERVAL),
		fork(watchRequest,ActionTypes.START_FETCH_MY,Config.HTTP_DATA_REFRESH_INTERVAL),
        fork(watchRequest,ActionTypes.START_DELETE_ADDR),
        fork(watchRequest,ActionTypes.START_EDIT_CART_ITEM),
        fork(watchRequest,ActionTypes.START_ADD_CART_ITEM),
        fork(watchRequest,ActionTypes.START_REMOVE_CART_ITEMS),
        fork(watchRequest,ActionTypes.START_USER_GET_VCODE),
        fork(watchRequest,ActionTypes.START_USER_LOGIN),
        fork(watchRequest,ActionTypes.START_NEW_ORDER),
        fork(watchRequest,ActionTypes.START_FETCH_ORDERLIST,Config.HTTP_DATA_REFRESH_INTERVAL),
        fork(watchRequest,ActionTypes.START_DELETE_ORDER),
        fork(watchRequest,ActionTypes.START_CANCEL_ORDER),
        fork(watchRequest,ActionTypes.START_FEED_BACK),
        fork(watchRequest,ActionTypes.START_BUY_AGAIN),
        fork(watchRequest,ActionTypes.START_CHECK_AUTH),
        fork(watchAliPay),
        fork(watchWeChatPay),
        fork(watchDaofuPay),
        fork(watchForceRequest),
        fork(watchFinishNewOrder),
        fork(watchCartOpFinished),
        fork(watchHttpError),
        fork(watchWeChatLogin),
        fork(watchHttpRequestStatus),
        fork(watchChangeShop),
        //fork(watchLoginFinished),
    ])
}