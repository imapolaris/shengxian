"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const cart_1 = require("./cart");
const homereducers_1 = require("./homereducers");
const storages_1 = require("./storages");
// import {shopSalesReducer} from "./saleItems";
const items_1 = require("./items");
const shopList_1 = require("./shopList");
const Categoryreducers_1 = require("./Categoryreducers");
const orders_1 = require("./orders");
const addrs_1 = require("./addrs");
const entitiesReducer = redux_1.combineReducers({
    cart: cart_1.cartReducer,
    topBanner: homereducers_1.topBannerReducer,
    SaleItem: homereducers_1.ActiveitemReducer,
    storages: storages_1.shopStorageReducer,
    // sales:shopSalesReducer,
    items: items_1.itemsReducer,
    shopList: shopList_1.shopListReducer,
    Category: Categoryreducers_1.CategoryReducer,
    ItemDynamic: Categoryreducers_1.ItemDynamicReducer,
    Coupon: Categoryreducers_1.CouponReducer,
    My: Categoryreducers_1.MyReducer,
    orders: orders_1.orderReducer,
    addrs: addrs_1.addrListReducer,
});
exports.default = entitiesReducer;
//# sourceMappingURL=entities.js.map