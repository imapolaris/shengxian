import {createAsyncRequestAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {HttpMethod} from "../http/api";
import {Url} from "../constants/http";

export enum ORDER_LIST_TYPE{
    UNFINISHED=0,
    FINISHED = 1
}
export const ORDER_PAGE_COUNT = 30;

export interface OrderRequest{
    itemlist:number[]
    addr_id:number
    apptime:string
    coupon_id:number
    des:string
}

export const newOrder  = (order:OrderRequest)=>(createAsyncRequestAction(ActionTypes.START_NEW_ORDER,{
    returnAction:ActionTypes.FINISH_NEW_ORDER,
    method:HttpMethod.POST,
    url:Url.ORDERS,
    data:order,
    timeout:false,
    loading:false,
    handleError:false
}));

export const cancelOrder  = (id:string)=>(createAsyncRequestAction(ActionTypes.START_CANCEL_ORDER,{
    returnAction:ActionTypes.FINISH_CANCEL_ORDER,
    method:HttpMethod.PUT,
    url:Url.ORDER({id}),
    timeout:false,
    loading:false,
    handleError:false
}));

export const fetchOrder  = (state:ORDER_LIST_TYPE,page:number,count:number,force:boolean)=>(createAsyncRequestAction(ActionTypes.START_FETCH_ORDERLIST,{
    returnAction:ActionTypes.FINISH_FETCH_ORDERLIST,
    method:HttpMethod.GET,
    url:Url.ORDERLIST({state,page,count}),
    timeout:false,
    loading:false,
    handleError:false,
    force,
    extraData:{
        state,
        page,
    }
}));


export const delOrder  = (order:String)=>(createAsyncRequestAction(ActionTypes.START_DELETE_ORDER,{
    returnAction:ActionTypes.FINISH_DELETE_ORDER,
    method:HttpMethod.DELETE,
    url:Url.ORDER({id:order}),
    timeout:false,
    loading:false,
    handleError:false
}));

export const buyAgain  = (order:String)=>(createAsyncRequestAction(ActionTypes.START_BUY_AGAIN,{
    returnAction:ActionTypes.FINISH_BUY_AGAIN,
    method:HttpMethod.POST,
    url:Url.BUYAGAIN,
    data:{
        order_number:order
    },
    timeout:false,
    loading:false,
    handleError:false
}));