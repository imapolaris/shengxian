"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testItems = (require("../../test_data/t_item.json"));
const testOrders = require("../../test_data/t_order.json");
exports.initTopBanner = {
    version: 0,
    data: []
};
exports.initActiveitemArry = {
    version: 0,
    data: []
};
exports.initItems = {};
//测试数据
testItems.reduce((items, item) => {
    items[item.id] = item;
    return items;
}, exports.initItems);
/*返回首页物品数据*/
exports.itemDataModel = () => {
    const modelArr = testItems;
    return modelArr;
};
const testShops = [
    { id: 1, name: "梅川路店", phone: "13761002668‬", addr: "普陀区梅川路898号", time: "07:00-21:00", dis: 1.1, lat: 31.23694913, lng: 121.38143778 },
];
exports.initShopList = {
    version: 0,
    shops: testShops
};
exports.initShopStorages = {
    1: {
        shopId: 1,
        storage: {
            1: 20,
            2: 20,
            3: 30,
        }
    }
};
exports.initCategory = {
    version: 0,
    data: []
};
exports.initCoupon = {
    version: 0,
    data: [],
    select: -1
};
exports.initMy = {
    version: 0,
    data: {
        "userid": 0,
        "title": "",
        "phone": "",
        "headurl": "",
        "money": 0,
        "couponcnt": 0,
        "version": 0
    }
};
exports.defaultAddress = {
    id: 0,
    name: "",
    phone: "",
    building: "",
    address: "",
    sex: 0,
    area_province_id: 0,
    area_city_id: 0,
    area_district_id: 0,
    user_address_tag_id: 0,
    lat: 0,
    lng: 0,
    isdefault: 0,
};
exports.initAddr = {
    version: 0,
    addrs: []
};
exports.initCarts = {
    version: 0,
    carts: []
};
exports.initOrders = {
    finished: { currentPage: 1, totalPage: 1, orders: [] },
    unfinished: { currentPage: 1, totalPage: 1, orders: [] },
};
exports.initItemDynamic = {
    version: 0,
    data: []
};
exports.modifyItemDynamic = (itemD) => {
    exports.initItems[itemD.id].price = itemD.price;
    exports.initItems[itemD.id].marketprice = itemD.marketprice;
    exports.initItems[itemD.id].saleprice = itemD.saleprice;
    exports.initItems[itemD.id].leftcnt = itemD.leftcnt;
};
// 订单状态 状态0待支付1待拣货2待配送3完成4取消
var OrderState;
(function (OrderState) {
    OrderState[OrderState["OSUnPay"] = 0] = "OSUnPay";
    OrderState[OrderState["OSPack"] = 1] = "OSPack";
    OrderState[OrderState["OSPeisoning"] = 2] = "OSPeisoning";
    OrderState[OrderState["OSFinish"] = 3] = "OSFinish";
    OrderState[OrderState["OSCancel"] = 4] = "OSCancel";
    OrderState[OrderState["OSCancelVerify"] = 5] = "OSCancelVerify";
})(OrderState = exports.OrderState || (exports.OrderState = {}));
//# sourceMappingURL=EntitiesState.js.map