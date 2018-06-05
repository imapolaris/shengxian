"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
const api_1 = require("../http/api");
const http_1 = require("../constants/http");
exports.checkLogin = () => (action_1.createAsyncRequestAction(ActionTypes.START_CHECK_AUTH, {
    returnAction: ActionTypes.FINISH_CHECK_AUTH,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.CHECK_AUTH,
    timeout: false,
    loading: true,
    handleError: true
}));
exports.login = (args) => (action_1.createAsyncRequestAction(ActionTypes.START_USER_LOGIN, {
    returnAction: ActionTypes.FINISH_USER_LOGIN,
    method: api_1.HttpMethod.POST,
    url: http_1.Url.SIGNUP,
    data: args,
    timeout: false,
    loading: true,
    handleError: false
}));
exports.getVCode = (phone) => (action_1.createAsyncRequestAction(ActionTypes.START_USER_GET_VCODE, {
    returnAction: ActionTypes.FINISH_USER_GET_VCODE,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.VCODE,
    params: {
        phone
    },
    timeout: false,
    loading: true,
    handleError: false
}));
exports.loginWeChat = () => (action_1.createAction(ActionTypes.USER_LOGIN_WECHAT));
//# sourceMappingURL=login.js.map