import {initOrders,Orderlist, OrdersState} from "../store/EntitiesState";
import {Action, AsyncResultAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {ORDER_LIST_TYPE} from "../actions/order";
/**
 * 我的订单
 */
export const orderReducer  =(state:OrdersState=initOrders, action:Action<any>)=> {
    switch(action.type){
        case ActionTypes.FINISH_FETCH_ORDERLIST:{
            let ac = action as AsyncResultAction<any,any,any>;
            let payload = (action.payload as any[])[0];
            // 未完成列表
            if(ac.request.extraData.state == ORDER_LIST_TYPE.UNFINISHED){
                let orders:Orderlist = {...state.unfinished};
                orders.currentPage = payload.current_page;
                orders.totalPage = payload.last_page;
                if(orders.currentPage <= 1){
                    orders.orders = payload.data;
                }else{
                    orders.orders.concat(payload.data);
                }
                return {...state,unfinished:orders}
            }else{
                //已完成列表
                let orders:Orderlist = {...state.finished};
                orders.currentPage = payload.current_page;
                orders.totalPage = payload.last_page;
                if(orders.currentPage <= 1){
                    orders.orders = payload.data;
                }else{
                    orders.orders.concat(payload.data);
                }
                return {...state,finished:orders}
            }
        }
    }
    return state;
};
