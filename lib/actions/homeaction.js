"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTypes = require("../constants/ActionTypes");
const http_1 = require("../constants/http");
const action_1 = require("../common/utils/action");
const api_1 = require("../http/api");
exports.fetchTopbanner = (version, force = false) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_TOPBANNER, {
    returnAction: ActionTypes.FINISH_FETCH_TOPBANNER,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.TOPBANNER,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false,
    force
}));
exports.fetchSaleItem = (version, force = false) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_ACTIVEITEM, {
    returnAction: ActionTypes.FINISH_FETCH_ACTIVEITEM,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.SALEITEM,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false,
    force
}));
//# sourceMappingURL=homeaction.js.map