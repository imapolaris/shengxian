"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @interface Layout 界面大小
 */
const EntitiesState_1 = require("./EntitiesState");
exports.initLayout = {
    width: 0,
    height: 0
};
exports.initLookFeel = {
    started: false,
};
;
exports.initAddAddr = {
    addr: EntitiesState_1.defaultAddress,
    add: false,
    dataSaved: false
};
/**
 * 地图操作类型
 */
var AMapOpType;
(function (AMapOpType) {
    AMapOpType[AMapOpType["location"] = 0] = "location";
    AMapOpType[AMapOpType["selelctAddAddr"] = 1] = "selelctAddAddr";
})(AMapOpType = exports.AMapOpType || (exports.AMapOpType = {}));
exports.initAMapUIState = {
    opType: AMapOpType.location
};
;
exports.initSearch = {
    lastsearchtext: '菜 肉 鱼 米 油',
    data: []
};
exports.initCartsUIState = {
    selected: [],
    selectedPrice: 0
};
exports.initSubmitOrderUIState = {
    items: [],
    addr: EntitiesState_1.defaultAddress,
    coupon: {
        id: 0,
        title: "'",
        type: 0,
        endtime: "",
        money: 0,
        lowmoney: 0,
    },
    time: new Date,
    memo: ""
};
exports.initMyOrderUIState = {
    page: 0,
};
//# sourceMappingURL=UIState.js.map