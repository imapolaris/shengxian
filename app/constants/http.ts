import * as _ from "lodash";
/**
 * @class http请求地址
 */
export class Url{
    static  CARTS ="/carts";
    static  CART = _.template("/carts/${id}");

    static  ORDERS ="/order";
    static  ORDER = _.template("/order/${id}");
    static  ORDERLIST=_.template("/order?page=${page}&count=${count}&state=${state}");

	static BUYAGAIN="/again";
    static  ADDRLIST = "/user/address";
	static  ADDR = _.template("/user/address/${id}");
	
	static  TOPBANNER = "/home/topbanner";
	static  SALEITEM = "/home/saleitem";
	static  CATEGORY = "/item/category";
	static  ITEMDYNAMIC = "/home/itemdynamic";
	static  COUPON = "/user/coupon";
	static  MY = "/user/my";
	static SIGNUP = "/user/signup";
    static CHECK_AUTH = "/user/token_isvalid";
	static VCODE = "/base/vcode";
	static FEEDBACK = "/user/feedback";
}
//http://172.19.60.211:1111/api/home/topbanner?version=1
//http://172.19.60.211:1111/api/home/saleitem?version=1
//http://172.19.60.211:1111/api/item/category?version=1
// http://172.19.60.211:1111/api/user/coupon?version=1