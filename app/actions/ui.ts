import {createAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {AMapOpType, Layout} from "../store/UIState";
import {PinLocation} from "../store/CurrentUserState";
import {Address, Coupon, ItemBase, Order} from "../store/EntitiesState";

export const changeLayout = (layout:Layout)=>(createAction<Layout>(ActionTypes.LAYOUT_CHANGE,layout));
export const startApp = ()=>(createAction(ActionTypes.APP_STARTED));
export const clearCacheData = ()=>(createAction(ActionTypes.CLEAR_CACHE_DATA));

export const changeAddrLocation = (location:PinLocation)=>(createAction(ActionTypes.UI_CHANGE_ADDR_LOCATION,location));
export const setUiAddr = (add:boolean,addr:Address)=>(createAction(ActionTypes.UI_SET_ADDR,{add,addr}));
export const updateUiAddr = (addr:Partial<Address>)=>(createAction(ActionTypes.UI_UPDATE_ADDR,addr));
export const setAMapOpType = (type:AMapOpType)=>(createAction(ActionTypes.UI_SET_AMAP_TYPE,type));
export const setCouponSelect = (id:number)=>(createAction(ActionTypes.SELECT_COUPON,id));
export const logout = ()=>(createAction(ActionTypes.USER_ACTIVE_LOG_OUT));

export const selectCartsItems = (ids:number[])=>(createAction(ActionTypes.UI_CARTS_SELECT,ids));
export const unSelectCartsItems = (ids:number[])=>(createAction(ActionTypes.UI_CARTS_CANCEL_SELECT,ids));
export const clearSelectedCartsItems = ()=>(createAction(ActionTypes.UI_CARTS_CLEAR_SELECT));

export const setSubmitOrderItems = (items:ItemBase[])=>(createAction(ActionTypes.UI_SUBMIT_ORDER_ITEMS,items));
export const setSubmitOrderAddr = (addr:Address)=>(createAction(ActionTypes.UI_SUBMIT_ORDER_ADDR,addr));
export const setSubmitOrderTime = (time:Date)=>(createAction(ActionTypes.UI_SUBMIT_ORDER_TIME,time));
export const setSubmitOrderMemo = (memo:String)=>(createAction(ActionTypes.UI_SUBMIT_ORDER_MEMO,memo));
export const setSubmitOrderCoupon = (memo:Coupon)=>(createAction(ActionTypes.UI_SUBMIT_ORDER_COUPON,memo));
export const changeMyOrderTab = (page:number)=>(createAction(ActionTypes.UI_MY_ORDER_CAHNGE_TAB,page));
export const startAliPay = (order:Order)=>(createAction(ActionTypes.USER_PAY_ALI,order));
export const startWeChatPay = (order:Order)=>(createAction(ActionTypes.USER_PAY_WECHAT,order));
export const startDaoFuPay = (order:Order)=>(createAction(ActionTypes.USER_PAY_DAOFU,order));

