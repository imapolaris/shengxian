import {Action} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {combineReducers} from "redux";
import {
    AddAddrUIState, AMapOpType, AMapUIState, CartsUIState, initAddAddr, initAMapUIState, initCartsUIState, initLayout,
    initLookFeel, initMyOrderUIState, initSubmitOrderUIState,
    Layout,
    LookFeel, MyOrderUIState, SubmitOrderUIState
} from "../store/UIState";
import {PinLocation} from "../store/CurrentUserState";
import {Address, Coupon, ItemBase} from "../store/EntitiesState";
import dotPropImmutable = require("dot-prop-immutable");
import {SearchReducer} from "./Categoryreducers";
import * as _ from "lodash"

export const layoutChange  =(state:Layout=initLayout, action:Action<Layout>)=>{
    switch(action.type){
        case ActionTypes.LAYOUT_CHANGE:
            let layout =<Layout>(action.payload);
            return layout;
        default:
            return state;
    }
};

export const LookFeelChange = (state:LookFeel=initLookFeel,action:Action<any>)=>{
    switch(action.type){
        case ActionTypes.APP_STARTED:
            return {...state,started:true};
        default:
            return state;
    }
};

export const AddAddrChange = (state:AddAddrUIState=initAddAddr, action:Action<any>)=>{
    switch(action.type){
        case ActionTypes.UI_UPDATE_ADDR:
        {
            let addr = <Address>action.payload;
            return {...state,addr:{...state.addr,...addr}};
        }
        case ActionTypes.UI_CHANGE_ADDR_LOCATION:
        {
            let location = <PinLocation>action.payload;
            return {...state,addr:{...state.addr,lat:location.lat,lng:location.lng}};
        }
        case ActionTypes.UI_SET_ADDR:
        {
            let addr = <{add:boolean,addr:Address}>action.payload;
            return {...addr,dataSaved:false};
        }
        case ActionTypes.FINISH_EDIT_ADDR:
        case ActionTypes.FINISH_ADD_ADDR:
        {
            return {...state,dataSaved:true};
        }
    }
    return state;
};

export const amapChange = (state:AMapUIState=initAMapUIState, action:Action<any>)=>{
    switch(action.type){
        case ActionTypes.UI_SET_AMAP_TYPE:
            let type = <AMapOpType> action.payload;
            return dotPropImmutable.set(state,"opType",type);
    }
    return state;
};

export const cartsUIChange = (state:CartsUIState=initCartsUIState, action:Action<any>)=>{
    switch(action.type){
        case ActionTypes.UI_CARTS_SELECT:
        {
            let ids = <number[]> action.payload;
            return {...state,selected:_.union(state.selected,ids)};
        }
        case ActionTypes.UI_CARTS_CANCEL_SELECT:
        {
            let ids = <number[]> action.payload;
            return {...state,selected:_.difference(state.selected,ids)};
        }
        case ActionTypes.UI_CARTS_CLEAR_SELECT:
        {
            return {...state,selected:[]};
        }
    }
    return state;
};

export const submitOrderUIChange = (state:SubmitOrderUIState=initSubmitOrderUIState, action:Action<any>)=>{
    switch(action.type){
        case ActionTypes.UI_SUBMIT_ORDER_ITEMS:
        {
            let items = <ItemBase[]> action.payload;
            return {...state,items}
        }
        case ActionTypes.UI_SUBMIT_ORDER_ADDR:{
            let addr = <Address> action.payload;
            return {...state,addr}
        }
        case ActionTypes.UI_SUBMIT_ORDER_TIME:{
            let time = <Date> action.payload;
            return {...state,time}
        }
        case ActionTypes.UI_SUBMIT_ORDER_MEMO:{
            let memo = <String> action.payload;
            return {...state,memo}
        }
        case ActionTypes.UI_SUBMIT_ORDER_COUPON:{
            let coupon = <Coupon> action.payload;
            return {...state,coupon}
        }
    }
    return state;
};

export const myOrderUIChange = (state:MyOrderUIState=initMyOrderUIState, action:Action<any>)=>{
    switch(action.type){
        case ActionTypes.UI_MY_ORDER_CAHNGE_TAB:
        {
            let page = <number>action.payload;
            return {...state,page}
        }
    }
    return state;
};

const uiReducer = combineReducers({
    layout:layoutChange,
    lookFeel:LookFeelChange,
	addAddr:AddAddrChange,
	Search:SearchReducer,
    amap:amapChange,
    carts:cartsUIChange,
    submitOrder:submitOrderUIChange,
    myOrder:myOrderUIChange
});

export default uiReducer;

