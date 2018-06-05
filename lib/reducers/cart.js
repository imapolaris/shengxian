"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTypes = require("../constants/ActionTypes");
const EntitiesState_1 = require("../store/EntitiesState");
const _ = require("lodash");
exports.cartReducer = (state = EntitiesState_1.initCarts, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_ADD_CART_ITEM:
        case ActionTypes.FINISH_EDIT_CART_ITEM:
        case ActionTypes.FINISH_REMOVE_CART_ITEMS:
            console.log("new carts", action.payload.data);
            return { version: action.payload.version, carts: _.map(action.payload.data, (data) => { return { id: data.item_id, count: data.itemcnt }; }) };
        case ActionTypes.FINISH_FETCH_CART_LIST:
            {
                if (state.version != action.payload.version) {
                    return { version: action.payload.version, carts: _.map(action.payload.data, (data) => { return { id: data.item_id, count: data.itemcnt }; }) };
                }
            }
    }
    return state;
};
//# sourceMappingURL=cart.js.map