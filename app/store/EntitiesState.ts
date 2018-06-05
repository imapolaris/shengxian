import {NumberMap, Version} from "../common/utils/types";
import { select } from "redux-saga/effects";

const testItems = <Item[]>(require("../../test_data/t_item.json"));
const testOrders =<Order[]>require("../../test_data/t_order.json");
/**
 * @interface 主页活动
 */
export interface TopBanner {
    id:number;
    title:string;
    content:string;
    addtime:Date;
    endtime:Date;
    imgurl:string;
    linkurl:string;
	sortid:number;
}
export interface TopBannerArray extends Version {
    data: TopBanner[]
}
export const initTopBanner:TopBannerArray = {
    version: 0,
    data: []
};
/**
 * @interface saleItem 热销商品
 */
export interface SaleItem{
    item_id:number,
    sortId:number,
}

export interface SaleItemArray extends Version {
    data: SaleItem[]
}
export const initActiveitemArry:SaleItemArray = {
    version: 0,
    data: []
};

/*首页轮播图数据模型*/
export interface bannerModel {
    addtime:string          // 时间
    content:string          // 内容
    endtime:string          // 时间
    filepath:string         // 图片路径
    id:number               // id
    isvalid:number          // 是否可点击
    linkurl:string          // 跳转页面名称
    sortid:number           // sortid
    starttime:string        // 时间
    title:string            // 标题
}

/*返回首页轮播图数据*/
// export const topBannerDataModel = ()=>{
//     const modelArr:Array<bannerModel> = testTopBanners;

//     return modelArr;
// };
/**
 * 商品
 */
export interface Item{
    id : number,
    item_category_id : number,
    price : number,
    marketprice : number,
    costprice : number,
	saleprice : number,
	leftcnt:number,
    T1: number,
    title : string,
    funceffect : string,
    shortdesc : string,
    keywords : string,
    T2 : number,
    usebuy : number,
    weight : number,
    unit: string,
    from : string,
    storetype : string,
    nvalue : string,
    T3 : string,
    description : string,
    thumbnailsurl : string,
    bigimgurl : string,
    linkurl : string,
	T4 : number,	
    buycnt : number,
    visitcnt : number,
    refundcnt : number,
    is_valid: number,
	sort : number,
	hits : number,
    created_at : string,
    updated_at : string,
    allow_place_type:number,
    itemcnt?:number,         //扩展字段
    isCheck? :boolean, // 购物车使用字段
}

export const initItems:NumberMap<Item>={};
//测试数据
testItems.reduce<NumberMap<Item>>((items:NumberMap<Item>,item:Item)=>{
    items[item.id] =item;
    return items;
},initItems)

/*返回首页物品数据*/
export const itemDataModel = ()=>{
    const modelArr:Array<Item> = testItems;
    return modelArr;
};


/**
 * @interface Shop 商店
 */
export interface Shop{
    id:number
    name:string
    phone:string
    addr:string
    time:string
    lat:number
    lng:number
    dis?:number
}

/**
 * 门店列表
 */
export interface ShopList extends Version{
    shops:Shop[]
}
const testShops=[
    { id:1, name: "梅川路店",    phone:  "13761002668‬" 	,	addr:   "普陀区梅川路898号"	,	time: "07:00-21:00" ,   dis:1.1,lat:31.23694913 ,lng: 121.38143778              },
]
export const initShopList:ShopList ={
    version:0,
    shops:testShops
}
/**
 * 商店库存
 */
export interface  ShopStorage{
    shopId:number,
    storage:NumberMap<number>, //{item_id:数量}
}
export const initShopStorages:NumberMap<ShopStorage>={
    1:{
        shopId:1,
        storage:{
            1:20,
            2:20,
            3:30,
        }
    }
}

/**
 * @interface Category 分类
 */
export interface Category{
    id:number,
    title:string,
}

export interface CategoryArray extends Version {
    data: Category[]
}
export const initCategory:CategoryArray = {
    version: 0,
    data: []
};

/**
 * @interface Coupon 优惠卷
 */

export interface Coupon{
    id:number,
	title:string,
	type:number,
	endtime:string,
	money:number,
	lowmoney:number,
}

export interface CouponArray extends Version {
    data: Coupon[]
    select: number
}
export const initCoupon:CouponArray = {
    version: 0,
    data: [],
    select: -1
};
				
export interface My{
    userid:number,
	title:string,
	phone:string,
	headurl:string,
	money:number,
    couponcnt:number,
    version:number,
}

export interface MyData extends Version {
    data: My
}
export const initMy:MyData = {
    version: 0,
    data: {
		"userid": 0,
		"title": "",
		"phone": "",
		"headurl": "",
		"money": 0,
        "couponcnt": 0,
        "version":0
	}
};

/*
* @interface Address  收货地址
*/
export interface Address {
    id              : number,             //唯一id
    name            : string,             //收货人姓名
    phone           : string,             //电话
    building        : string,             //小区
    address         : string,             //地址
    sex             : number,             //性别
    area_province_id: number              //省
    area_city_id    : number              //市
    area_district_id: number              //区
    user_address_tag_id: number           //标签
    lat             : number              //纬度
    lng             : number              //经度
    isdefault   	: number,		     //是否默认
}
export const defaultAddress:Address={
    id              : 0,             //唯一id
    name            : "",             //收货人姓名
    phone           : "",             //电话
    building        : "",             //小区
    address         : "",             //地址
    sex             : 0,             //性别
    area_province_id: 0,              //省
    area_city_id    : 0,              //市
    area_district_id: 0,              //区
    user_address_tag_id: 0,           //标签
    lat             : 0,              //纬度
    lng             : 0,              //经度
    isdefault   	: 0,		     //是否默认
};

export interface AddrList extends Version {
    addrs: Address[]
}

export const initAddr:AddrList = {
    version: 0,
    addrs: []
};

/**
 * @interface Cart 购物车
 */
export interface Cart{
    id:number           //物品id
    count:number       // 数量
}

export interface CartList extends Version{
    carts:Cart[]
}

export const initCarts:CartList ={
    version:0,
    carts:[]
};

/**
 * 商品基本信息，活动，订单，里面的物品
 */
export interface ItemBase{
	itemcnt : number,
    item_id : number,
    price : number,
    title : string,    
    shortdesc : string,    
    thumbnailsurl : string,
    bigimgurl:string,
    description:string,
    marketprice: number,
    costprice: number,
    saleprice: number,
}

/**
 * @interface Order 我的订单
 */
export interface Order{
    user_id:number
    order_number : string,
    order_item :ItemBase[],
    state : number,
    couponprice : number,
    peiprice : number,
    scoreprice : number,
    ye : number,
    productprice : number,
    lastprice : number,
    created_at : Date,
    apptime : Date,
    address:Address,
    shopid : number,
    shopname : string
    des:string
}

export interface Orderlist{
    currentPage:number
    totalPage:number
    orders:Order[]
}

export interface  OrdersState{
    finished:Orderlist,
    unfinished:Orderlist,
}

export const initOrders:OrdersState={
    finished:{currentPage:1,totalPage:1,orders:[]},
    unfinished:{currentPage:1,totalPage:1,orders:[]},
};

/**
 * @interface ItemDynamic 物品动态信息
 */
export interface ItemDynamic{
	id:number,
	price:number,
	marketprice:number,
	saleprice:number,
	leftcnt:number
}

export interface ItemDynamicArray extends Version {
    data: ItemDynamic[]
}
export const initItemDynamic:ItemDynamicArray = {
    version: 0,
    data: []
};

export const modifyItemDynamic = (itemD: ItemDynamic)=>{

	initItems[itemD.id].price = itemD.price
	initItems[itemD.id].marketprice = itemD.marketprice
	initItems[itemD.id].saleprice = itemD.saleprice
	initItems[itemD.id].leftcnt = itemD.leftcnt
};

export type ItemMap = NumberMap<Item>
// export type ShopSalesMap = NumberMap<ShopSales>
export type ShopStorageMap = NumberMap<ShopStorage>
export type OrderMap = NumberMap<Order>
export type AddrMap = NumberMap<Address>

/**
 * @interface EntitiesState 所有entity
 */
export default interface EntitiesState {
	topBanner:TopBannerArray              // 首页活动
	SaleItem:SaleItemArray          //当前门店热销商品列表
    storages:ShopStorageMap             // 店铺库存
    items:ItemMap                       // 商品
    cart:CartList                         // 购物车
    shopList:ShopList                   // 商店列表
	Category:CategoryArray           	// 商品分类列表    
	ItemDynamic:ItemDynamicArray        // 物品动态信息    
	Coupon:CouponArray           		// 优惠卷    
    orders:OrdersState                  // 我的订单
	addrs:AddrList                      // 收货地址列表
    My:MyData							// 我的数据
}


// 订单状态 状态0待支付1待拣货2待配送3完成4取消
export enum OrderState {
    OSUnPay     = 0 ,   //   待支付
    OSPack          ,   //   待拣货
    OSPeisoning     ,   //   待配送
    OSFinish        ,   //   已完成
    OSCancel        ,    //   已取消
    OSCancelVerify  ,    //   取消审核
}
