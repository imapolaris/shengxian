import {combineReducers} from "redux";
import {cartReducer} from "./cart";
import {topBannerReducer, ActiveitemReducer} from "./homereducers";
import {shopStorageReducer} from "./storages";
// import {shopSalesReducer} from "./saleItems";
import {itemsReducer} from "./items";
import {shopListReducer} from "./shopList";
import {CategoryReducer, CouponReducer, MyReducer, ItemDynamicReducer} from "./Categoryreducers";
import {orderReducer} from "./orders";
import {addrListReducer} from "./addrs"

const entitiesReducer = combineReducers({
    cart:cartReducer,
	topBanner:topBannerReducer,
	SaleItem:ActiveitemReducer,
    storages:shopStorageReducer,
    // sales:shopSalesReducer,
    items:itemsReducer,
    shopList:shopListReducer,
	Category:CategoryReducer,
	ItemDynamic:ItemDynamicReducer,
	Coupon:CouponReducer,	
	My:MyReducer,
    orders:orderReducer,
    addrs:addrListReducer,
    });
export default entitiesReducer;