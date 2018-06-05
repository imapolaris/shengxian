"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitiesState_1 = require("../store/EntitiesState");
const ActionTypes = require("../constants/ActionTypes");
exports.topBannerReducer = (state = EntitiesState_1.initTopBanner, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_TOPBANNER:
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
exports.ActiveitemReducer = (state = EntitiesState_1.initActiveitemArry, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_ACTIVEITEM:
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
//# sourceMappingURL=homereducers.js.map