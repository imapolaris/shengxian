"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitiesState_1 = require("../store/EntitiesState");
const ActionTypes = require("../constants/ActionTypes");
const distance_1 = require("../common/utils/distance");
/**
 * 门店列表
 */
exports.shopListReducer = (state = EntitiesState_1.initShopList, action) => {
    switch (action.type) {
        case ActionTypes.LOCATION_UPDATE:
            {
                let location = action.payload;
                let shops = state.shops.map((shop) => {
                    let dis = distance_1.getDistance(shop.lat, shop.lng, location.lat, location.lng);
                    return Object.assign({}, shop, { dis });
                }).sort((a, b) => (a.dis || 0) - (b.dis || 0));
                return Object.assign({}, state, { shops });
            }
    }
    return state;
};
//# sourceMappingURL=shopList.js.map