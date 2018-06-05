"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTypes = require("../constants/ActionTypes");
const redux_1 = require("redux");
const UIState_1 = require("../store/UIState");
const dotPropImmutable = require("dot-prop-immutable");
const Categoryreducers_1 = require("./Categoryreducers");
const _ = require("lodash");
exports.layoutChange = (state = UIState_1.initLayout, action) => {
    switch (action.type) {
        case ActionTypes.LAYOUT_CHANGE:
            let layout = (action.payload);
            return layout;
        default:
            return state;
    }
};
exports.LookFeelChange = (state = UIState_1.initLookFeel, action) => {
    switch (action.type) {
        case ActionTypes.APP_STARTED:
            return Object.assign({}, state, { started: true });
        default:
            return state;
    }
};
exports.AddAddrChange = (state = UIState_1.initAddAddr, action) => {
    switch (action.type) {
        case ActionTypes.UI_UPDATE_ADDR:
            {
                let addr = action.payload;
                return Object.assign({}, state, { addr: Object.assign({}, state.addr, addr) });
            }
        case ActionTypes.UI_CHANGE_ADDR_LOCATION:
            {
                let location = action.payload;
                return Object.assign({}, state, { addr: Object.assign({}, state.addr, { lat: location.lat, lng: location.lng }) });
            }
        case ActionTypes.UI_SET_ADDR:
            {
                let addr = action.payload;
                return Object.assign({}, addr, { dataSaved: false });
            }
        case ActionTypes.FINISH_EDIT_ADDR:
        case ActionTypes.FINISH_ADD_ADDR:
            {
                return Object.assign({}, state, { dataSaved: true });
            }
    }
    return state;
};
exports.amapChange = (state = UIState_1.initAMapUIState, action) => {
    switch (action.type) {
        case ActionTypes.UI_SET_AMAP_TYPE:
            let type = action.payload;
            return dotPropImmutable.set(state, "opType", type);
    }
    return state;
};
exports.cartsUIChange = (state = UIState_1.initCartsUIState, action) => {
    switch (action.type) {
        case ActionTypes.UI_CARTS_SELECT:
            {
                let ids = action.payload;
                return Object.assign({}, state, { selected: _.union(state.selected, ids) });
            }
        case ActionTypes.UI_CARTS_CANCEL_SELECT:
            {
                let ids = action.payload;
                return Object.assign({}, state, { selected: _.difference(state.selected, ids) });
            }
        case ActionTypes.UI_CARTS_CLEAR_SELECT:
            {
                return Object.assign({}, state, { selected: [] });
            }
    }
    return state;
};
exports.submitOrderUIChange = (state = UIState_1.initSubmitOrderUIState, action) => {
    switch (action.type) {
        case ActionTypes.UI_SUBMIT_ORDER_ITEMS:
            {
                let items = action.payload;
                return Object.assign({}, state, { items });
            }
        case ActionTypes.UI_SUBMIT_ORDER_ADDR: {
            let addr = action.payload;
            return Object.assign({}, state, { addr });
        }
        case ActionTypes.UI_SUBMIT_ORDER_TIME: {
            let time = action.payload;
            return Object.assign({}, state, { time });
        }
        case ActionTypes.UI_SUBMIT_ORDER_MEMO: {
            let memo = action.payload;
            return Object.assign({}, state, { memo });
        }
        case ActionTypes.UI_SUBMIT_ORDER_COUPON: {
            let coupon = action.payload;
            return Object.assign({}, state, { coupon });
        }
    }
    return state;
};
exports.myOrderUIChange = (state = UIState_1.initMyOrderUIState, action) => {
    switch (action.type) {
        case ActionTypes.UI_MY_ORDER_CAHNGE_TAB:
            {
                let page = action.payload;
                return Object.assign({}, state, { page });
            }
    }
    return state;
};
const uiReducer = redux_1.combineReducers({
    layout: exports.layoutChange,
    lookFeel: exports.LookFeelChange,
    addAddr: exports.AddAddrChange,
    Search: Categoryreducers_1.SearchReducer,
    amap: exports.amapChange,
    carts: exports.cartsUIChange,
    submitOrder: exports.submitOrderUIChange,
    myOrder: exports.myOrderUIChange
});
exports.default = uiReducer;
//# sourceMappingURL=ui.js.map