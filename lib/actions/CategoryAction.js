"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTypes = require("../constants/ActionTypes");
const http_1 = require("../constants/http");
const action_1 = require("../common/utils/action");
const api_1 = require("../http/api");
exports.fetchCategory = (version, force = false) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_CATEGORY, {
    returnAction: ActionTypes.FINISH_FETCH_CATEGORY,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.CATEGORY,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false,
    force
}));
exports.fetchItemDynamic = (version, force = false) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_ITEMDYNAMIC, {
    returnAction: ActionTypes.FINISH_FETCH_ITEMDYNAMIC,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.ITEMDYNAMIC,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false,
    force
}));
exports.fetchCoupon = (version, force = false) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_COUPON, {
    returnAction: ActionTypes.FINISH_FETCH_COUPON,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.COUPON,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false,
    force
}));
exports.fetchMy = (version, force = false) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_MY, {
    returnAction: ActionTypes.FINISH_FETCH_MY,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.MY,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false,
    force
}));
exports.fetchSearch = (lastsearchtext, data) => (action_1.createAction(ActionTypes.START_FETCH_SEARCH, { lastsearchtext: lastsearchtext, data: data }));
exports.clearSearch = () => (action_1.createAction(ActionTypes.CLEAR_SEARCH));
// const createAction=<Payload>(type:string,payload:Payload|ActionError|undefined = undefined):Action<Payload>=>{
//# sourceMappingURL=CategoryAction.js.map