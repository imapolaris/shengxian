"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
const api_1 = require("../http/api");
const http_1 = require("../constants/http");
const _ = require("lodash");
exports.editCartItem = (item, effect = true) => (action_1.createAsyncRequestAction(ActionTypes.START_EDIT_CART_ITEM, {
    returnAction: ActionTypes.FINISH_EDIT_CART_ITEM,
    method: api_1.HttpMethod.PUT,
    url: http_1.Url.CART({ id: item.id }),
    data: {
        count: item.count
    },
    timeout: false,
    loading: false,
    extraData: {
        effect
    },
    handleError: false
}));
exports.addCartItem = (item, effect = true) => (action_1.createAsyncRequestAction(ActionTypes.START_ADD_CART_ITEM, {
    returnAction: ActionTypes.FINISH_ADD_CART_ITEM,
    method: api_1.HttpMethod.POST,
    url: http_1.Url.CARTS,
    data: {
        id: item.id,
        count: item.count
    },
    timeout: false,
    loading: false,
    extraData: {
        effect
    },
    handleError: false
}));
exports.deleteCartItem = (ids) => action_1.createAsyncRequestAction(ActionTypes.START_REMOVE_CART_ITEMS, {
    returnAction: ActionTypes.FINISH_REMOVE_CART_ITEMS,
    method: api_1.HttpMethod.DELETE,
    url: http_1.Url.CART({ id: _.join(ids, ',') }),
    timeout: false,
    loading: false,
    handleError: false
});
exports.fetchCarts = (version, force = false) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_CART_LIST, {
    returnAction: ActionTypes.FINISH_FETCH_CART_LIST,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.CARTS,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false,
    force
}));
//# sourceMappingURL=cart.js.map