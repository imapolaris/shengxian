import {put, select, take} from "redux-saga/effects";
import {AsyncActionFlag, AsyncResultAction} from "../common/utils/action";
import RootState from "../store/Store";
import * as ActionTypes from "../constants/ActionTypes";
import {fetchCarts} from "../actions/cart";
import {clearSelectedCartsItems} from "../actions/ui";
import StoreConfig from "../store/ConfigureStore";
import {MYORDER, ORDERDETAIL, PAY, SUBMITORDER,MAIN_CART} from "../constants/RouterDefine";
import {fetchOrder, ORDER_LIST_TYPE, ORDER_PAGE_COUNT} from "../actions/order";
import { OrderState } from "../store/EntitiesState";
import {fetchCoupon} from "../actions/CategoryAction"

/**
 * @function watchRequest 监听http网络请求action
 * @param {string} requestAction 监听的action
 * @param {boolean} onlyLast     是不是只保留最后一次action请求
 */
export function* watchFinishNewOrder(){
    while(true) {
        const action = <AsyncResultAction<any,any,any>>(yield take([ActionTypes.FINISH_NEW_ORDER,ActionTypes.FINISH_CANCEL_ORDER,ActionTypes.FINISH_BUY_AGAIN]));
        if(action.flag !== AsyncActionFlag.FLAG_SUCCESS) continue;
        switch(action.type){
            case ActionTypes.FINISH_NEW_ORDER:{
                // 刷新一下购物车
                const cartVersion = yield select((state:RootState)=>state.entities.cart.version);
				yield put(fetchCarts(cartVersion,true));
							
                // 清空一下购物车界面状态
                yield put(clearSelectedCartsItems());
                let order = action.payload.data;
				console.log("下单完成",action.payload);
				
				//使用了优惠卷，需要重现请求一次
				if (order.couponprice > 0)
				{
					const couponVersion = yield select((state:RootState)=>state.entities.Coupon.version);
					yield put(fetchCoupon(couponVersion,true));
				}
				
                // 跳转到付款页面
                StoreConfig.history.push(PAY, {order:order, from:SUBMITORDER});
                break;
            }
            case ActionTypes.FINISH_CANCEL_ORDER:{
                let page = yield select((state:RootState)=>state.ui.myOrder.page);
                if(action.payload && action.payload.data 
                    && (action.payload.data.state == OrderState.OSCancel 
                        || action.payload.data.state == OrderState.OSFinish)){
                        yield put(fetchOrder(page,ORDER_LIST_TYPE.FINISHED,ORDER_PAGE_COUNT,true));
                }else{
                    yield put(fetchOrder(page,ORDER_LIST_TYPE.UNFINISHED,ORDER_PAGE_COUNT,true));
                }
                
                let {location} = StoreConfig.history;
                if(location && location.pathname === ORDERDETAIL){
					// StoreConfig.history.goBack();
					let from = location.state ?  location.state.from : ''
					StoreConfig.history.replace(ORDERDETAIL,{order:action.payload.data, from:from});
                }
                break;
            }
            case ActionTypes.FINISH_DELETE_ORDER:{
                let page = yield select((state:RootState)=>state.ui.myOrder.page);
                yield put(fetchOrder(page,1,ORDER_PAGE_COUNT,true));
                break;
            }
            case ActionTypes.FINISH_BUY_AGAIN:{
                 // 刷新一下购物车
                const cartVersion = yield select((state:RootState)=>state.entities.cart.version);
                yield put(fetchCarts(cartVersion,true)); 
                // 跳转到付款页面
                StoreConfig.history.push(MAIN_CART, {from:MYORDER});  
            }
        }
    }
}