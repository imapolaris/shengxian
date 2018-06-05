"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpState_1 = require("../store/HttpState");
const ActionTypes = require("../constants/ActionTypes");
/**
 * http请求状态
 */
exports.httpReducer = (state = HttpState_1.initHttpState, action) => {
    switch (action.type) {
        case ActionTypes.ACTION_HTTP_ERROR:
            {
                return Object.assign({}, state, { loading: false });
            }
        case ActionTypes.ACTION_HTTP_TIMEOUT:
            {
                return Object.assign({}, state, { loading: false });
            }
        case ActionTypes.ACTION_HTTP_REQUESTING:
            {
                return Object.assign({}, state, { loading: true });
            }
        case ActionTypes.ACTION_HTTP_REQUEST_FINISH:
            {
                return Object.assign({}, state, { loading: false });
            }
    }
    return state;
};
//# sourceMappingURL=http.js.map