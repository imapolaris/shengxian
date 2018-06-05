"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
/**
 * @class http请求地址
 */
class Url {
}
Url.CARTS = "/carts";
Url.CART = _.template("/carts/${id}");
Url.ORDERS = "/order";
Url.ORDER = _.template("/order/${id}");
Url.ORDERLIST = _.template("/order?page=${page}&count=${count}&state=${state}");
Url.BUYAGAIN = "/again";
Url.ADDRLIST = "/user/address";
Url.ADDR = _.template("/user/address/${id}");
Url.TOPBANNER = "/home/topbanner";
Url.SALEITEM = "/home/saleitem";
Url.CATEGORY = "/item/category";
Url.ITEMDYNAMIC = "/home/itemdynamic";
Url.COUPON = "/user/coupon";
Url.MY = "/user/my";
Url.SIGNUP = "/user/signup";
Url.CHECK_AUTH = "/user/token_isvalid";
Url.VCODE = "/base/vcode";
Url.FEEDBACK = "/user/feedback";
exports.Url = Url;
//http://172.19.60.211:1111/api/home/topbanner?version=1
//http://172.19.60.211:1111/api/home/saleitem?version=1
//http://172.19.60.211:1111/api/item/category?version=1
// http://172.19.60.211:1111/api/user/coupon?version=1
//# sourceMappingURL=http.js.map