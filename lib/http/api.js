"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const action_1 = require("../common/utils/action");
const ErrorCode_1 = require("../constants/ErrorCode");
const Config_1 = require("../config/Config");
const QueryString = require("qs");
axios_1.default.defaults.baseURL = Config_1.Config.bNeiWang ? Config_1.Config.HTTP_BASE_URL_NEI : Config_1.Config.HTTP_BASE_URL_WAY;
axios_1.default.defaults.timeout = Config_1.Config.HTTP_DEFAULT_TIMEOUT + 2000;
axios_1.default.defaults.responseType = "json";
axios_1.default.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
axios_1.default.defaults.headers.post['Accept'] = "application/vnd.sx.v1+json";
axios_1.default.defaults.headers.get['Content-Type'] = "application/x-www-form-urlencoded";
axios_1.default.defaults.headers.get['Accept'] = "application/vnd.sx.v1+json";
axios_1.default.defaults.headers.put['Content-Type'] = "application/x-www-form-urlencoded";
axios_1.default.defaults.headers.put['Accept'] = "application/vnd.sx.v1+json";
axios_1.default.defaults.headers.delete['Content-Type'] = "application/x-www-form-urlencoded";
axios_1.default.defaults.headers.delete['Accept'] = "application/vnd.sx.v1+json";
//
// const api = axios.create({
//     baseURL:Config.HTTP_BASE_URL,
//     timeout: Config.HTTP_DEFAULT_TIMEOUT + 2000, // 默认值再多加2秒
//     responseType: "json",
//     headers:{"Content-Type":"application/x-www-form-urlencoded"}
// });
/**
 *  @class HttpError
 */
class HttpError extends action_1.ActionError {
    constructor(status, request, response) {
        super(ErrorCode_1.ErrorCode.HTTP_REQUEST_ERROR, ErrorCode_1.getErrorMessage(ErrorCode_1.ErrorCode.HTTP_REQUEST_ERROR));
        this.status = status;
        this.request = request;
        this.response = response;
    }
}
exports.HttpError = HttpError;
/**
 * @enum HttpMethod 支持的http请求类型
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
    HttpMethod["DELETE"] = "delete";
    HttpMethod["HEAD"] = "head";
    HttpMethod["PATCH"] = "patch";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
/**
 * @class AxiosHttpError
 */
class AxiosHttpError extends action_1.ActionError {
    constructor(message, code, request, response) {
        super(ErrorCode_1.ErrorCode.AXIOS_HTTP_ERROR, message);
        this.request = request;
        this.response = response;
        this.code = code;
    }
}
exports.AxiosHttpError = AxiosHttpError;
/**
 * @class Api
 */
class Api {
    static handleRequest(promise, external) {
        return new Promise((resolve, reject) => {
            promise.then((response) => {
                //console.log("handleRequest:url",response.request._url);
                if (response.status >= 200 && response.status < 300) {
                    // 数据不对的话
                    if (!response.data) {
                        console.log("收到服务器数据解析失败:", response);
                        reject(new action_1.ActionError(ErrorCode_1.ErrorCode.HTTP_RESPONSE_DATA_ERROR, ErrorCode_1.getErrorMessage(ErrorCode_1.ErrorCode.HTTP_RESPONSE_DATA_ERROR) || ""));
                        return;
                    }
                    let resData = Object.assign({}, response.data);
                    if (external) {
                        // 外部接口
                        resolve(resData);
                        return;
                    }
                    if (!resData.ec) {
                        // 成功
                        resolve(resData.em);
                    }
                    else {
                        // 失败
                        reject(new action_1.ActionError(resData.ec, resData.ec && ErrorCode_1.getErrorMessage(resData.ec, resData.em) || "", resData.em));
                    }
                }
                else {
                    // 失败
                    reject(new HttpError(response.status, response.request, response));
                }
            }).catch((error) => {
                if (error.response && error.response.status) {
                    reject(new HttpError(error.response.status, error.response.request, error.response));
                }
                else {
                    reject(new AxiosHttpError(error.message, error.code, error.request, error.response));
                }
            });
        });
    }
    static requestWithAbsoluteUrl(method, url, params, data, config) {
        return Api.handleRequest(axios_1.default(Object.assign({ method, url, params, data }, config)), true);
    }
    static request(method, url, params, data, config) {
        if (data) {
            data = QueryString.stringify(data);
        }
        if (config)
            config = Object.assign({}, config, { headers: Object.assign({}, axios_1.default.defaults.headers, config.headers) });
        console.log("config", config);
        return Api.handleRequest(axios_1.default.request(Object.assign({ method, url, params, data }, config)), false);
    }
    static get(url, params) {
        return Api.request(HttpMethod.GET, url, params);
    }
    static put(url, params, data) {
        return Api.request(HttpMethod.PUT, url, params, data);
    }
    static post(url, params, data) {
        return Api.request(HttpMethod.POST, url, params, data);
    }
    static delete(url, params) {
        return Api.request(HttpMethod.DELETE, url, params);
    }
    static head(url, params) {
        return Api.request(HttpMethod.HEAD, url, params);
    }
    static patch(url, params, data) {
        return Api.request(HttpMethod.PATCH, url, params, data);
    }
}
exports.default = Api;
//# sourceMappingURL=api.js.map