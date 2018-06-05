/**
 * @interface Layout 界面大小
 */
import {Address, Coupon, defaultAddress, initAddr, Item, ItemBase, Order} from "./EntitiesState";

export interface Layout{
    width:number;                   // 窗口宽度
    height:number;                  // 窗口高度
}

export const initLayout:Layout={
    width:0,
    height:0
}

/**
 *@interface LookFeel 界面展示相关
 */
export interface LookFeel{
    started:boolean;        //是不是安装好还没有启动过
}

export const initLookFeel:LookFeel={
    started:false,
};

export  interface AddAddrUIState{
    add:boolean
    dataSaved:boolean
    addr:Address
};

export const initAddAddr:AddAddrUIState={
    addr:defaultAddress,
    add:false,
    dataSaved:false
};

/**
 * 地图操作类型
 */
export enum AMapOpType{
    location,       //定位
    selelctAddAddr, // 编辑收货地址
}

export interface AMapUIState{
    opType:AMapOpType
}
export const initAMapUIState:AMapUIState={
    opType:AMapOpType.location
};

// 搜索界面
export  interface SearchUIState{
	lastsearchtext:string,
	data: Array<string>
};

export const initSearch:SearchUIState={
    lastsearchtext:'菜 肉 鱼 米 油',
    data:[]
};

/**
 * 购物车界面
 */
export interface CartsUIState{
    selected:number[]
    selectedPrice:number
}
export const initCartsUIState:CartsUIState={
    selected:[],
    selectedPrice:0
};

export interface SubmitOrderUIState{
    items:ItemBase[],
    addr:Address,
    time:Date,
    memo:string,
    coupon?:Coupon,
}

export const initSubmitOrderUIState:SubmitOrderUIState={
    items:[],
    addr:defaultAddress,
    coupon:{
        id:0,
        title:"'",
        type:0,
        endtime:"",
        money:0,
        lowmoney:0,
    },
    time:new Date,
    memo:""
};

export interface  MyOrderUIState{
    page:number,
}

export const initMyOrderUIState:MyOrderUIState={
    page:0,
};

/**
 *
 */

/**
 * @interface UIState UI状态
 */
export default interface UIState{
    layout:Layout;                   // 布局
    lookFeel:LookFeel;               // 界面展示
    addAddr:AddAddrUIState;            // 地址界面用户选择的地址
	amap:AMapUIState;                //地图界面
	Search:SearchUIState;        //搜索界面
	SearchResult:SearchUIState;        //搜索界面
    carts:CartsUIState;                 //购物车
    submitOrder:SubmitOrderUIState;     //订单提交界面
    myOrder:MyOrderUIState;             //我的订单
}