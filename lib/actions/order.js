"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
const api_1 = require("../http/api");
const http_1 = require("../constants/http");
var ORDER_LIST_TYPE;
(function (ORDER_LIST_TYPE) {
    ORDER_LIST_TYPE[ORDER_LIST_TYPE["UNFINISHED"] = 0] = "UNFINISHED";
    ORDER_LIST_TYPE[ORDER_LIST_TYPE["FINISHED"] = 1] = "FINISHED";
})(ORDER_LIST_TYPE = exports.ORDER_LIST_TYPE || (exports.ORDER_LIST_TYPE = {}));
exports.ORDER_PAGE_COUNT = 30;
exports.newOrder = (order) => (action_1.createAsyncRequestAction(ActionTypes.START_NEW_ORDER, {
    returnAction: ActionTypes.FINISH_NEW_ORDER,
    method: api_1.HttpMethod.POST,
    url: http_1.Url.ORDERS,
    data: order,
    timeout: false,
    loading: false,
    handleError: false
}));
exports.cancelOrder = (id) => (action_1.createAsyncRequestAction(ActionTypes.START_CANCEL_ORDER, {
    returnAction: ActionTypes.FINISH_CANCEL_ORDER,
    method: api_1.HttpMethod.PUT,
    url: http_1.Url.ORDER({ id }),
    timeout: false,
    loading: false,
    handleError: false
}));
exports.fetchOrder = (state, page, count, force) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_ORDERLIST, {
    returnAction: ActionTypes.FINISH_FETCH_ORDERLIST,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.ORDERLIST({ state, page, count }),
    timeout: false,
    loading: false,
    handleError: false,
    force,
    extraData: {
        state,
        page,
    }
}));
exports.delOrder = (order) => (action_1.createAsyncRequestAction(ActionTypes.START_DELETE_ORDER, {
    returnAction: ActionTypes.FINISH_DELETE_ORDER,
    method: api_1.HttpMethod.DELETE,
    url: http_1.Url.ORDER({ id: order }),
    timeout: false,
    loading: false,
    handleError: false
}));
exports.buyAgain = (order) => (action_1.createAsyncRequestAction(ActionTypes.START_BUY_AGAIN, {
    returnAction: ActionTypes.FINISH_BUY_AGAIN,
    method: api_1.HttpMethod.POST,
    url: http_1.Url.BUYAGAIN,
    data: {
        order_number: order
    },
    timeout: false,
    loading: false,
    handleError: false
}));
//# sourceMappingURL=order.js.map