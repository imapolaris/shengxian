"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitiesState_1 = require("../store/EntitiesState");
const UIState_1 = require("../store/UIState");
const ActionTypes = require("../constants/ActionTypes");
exports.CategoryReducer = (state = EntitiesState_1.initCategory, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_CATEGORY:
            {
                let rData = action.payload;
                if (state.version !== rData.version) {
                    return { version: rData.version, data: rData.data } || [];
                }
            }
            break;
    }
    return state;
};
exports.ItemDynamicReducer = (state = EntitiesState_1.initItemDynamic, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_ITEMDYNAMIC:
            {
                let rData = action.payload;
                if (state.version !== rData.version) {
                    return { version: rData.version, data: rData.data } || [];
                }
            }
            break;
    }
    return state;
};
exports.CouponReducer = (state = EntitiesState_1.initCoupon, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_COUPON:
            {
                let rData = action.payload;
                if (state.version !== rData.version) {
                    return { version: rData.version, data: rData.data } || [];
                }
            }
            break;
        case ActionTypes.SELECT_COUPON:
            {
                let id = action.payload;
                return Object.assign({}, state, { select: id });
            }
        //break;
    }
    return state;
};
exports.MyReducer = (state = EntitiesState_1.initMy, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_MY:
            {
                let rData = action.payload;
                //if(state.version !== rData.version)
                {
                    return { version: rData.version, data: rData.data } || [];
                }
            }
        //	break;
    }
    return state;
};
exports.SearchReducer = (state = UIState_1.initSearch, action) => {
    switch (action.type) {
        case ActionTypes.START_FETCH_SEARCH:
            {
                let rData = action.payload;
                return { lastsearchtext: rData.lastsearchtext, data: rData.data } || [];
            }
        case ActionTypes.CLEAR_SEARCH:
            {
                return { lastsearchtext: '', data: [] };
            }
        // break;
    }
    return state;
};
//# sourceMappingURL=Categoryreducers.js.map