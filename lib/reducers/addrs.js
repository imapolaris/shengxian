"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitiesState_1 = require("../store/EntitiesState");
const ActionTypes = require("../constants/ActionTypes");
/**
 * 地址
 */
exports.addrListReducer = (state = EntitiesState_1.initAddr, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_ADDRLIST:
            {
                let rData = action.payload;
                if (state.version !== rData.version) {
                    return { version: rData.version, addrs: rData.data } || [];
                }
            }
            break;
        case ActionTypes.FINISH_DELETE_ADDR:
        case ActionTypes.FINISH_ADD_ADDR:
        case ActionTypes.FINISH_EDIT_ADDR:
            {
                let rData = action.payload;
                return { version: rData.version, addrs: rData.data };
            }
    }
    return state;
};
//# sourceMappingURL=addrs.js.map