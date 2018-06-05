"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const ErrorMessages = {};
function errMessage(message) {
    return function (target, propertyKey) {
        let key = parseInt(target[propertyKey]);
        ErrorMessages[key] = _.template(message);
    };
}
/**
 * @class ErrorCode 错误码
 */
class ErrorCode {
}
ErrorCode.SUCCESS = 0;
ErrorCode.HTTP_REQUEST_ERROR = 1;
ErrorCode.AXIOS_HTTP_ERROR = 2;
ErrorCode.SAGA_HTTP_ERROR = 3;
ErrorCode.TIMEOUT = 4;
ErrorCode.HTTP_RESPONSE_DATA_ERROR = 5;
ErrorCode.TEST_ERROR = 10000;
ErrorCode.TEST_ERROR_WITH_PARAM = 10001;
__decorate([
    errMessage("成功")
], ErrorCode, "SUCCESS", void 0);
__decorate([
    errMessage("HTTP请求返回码错误")
], ErrorCode, "HTTP_REQUEST_ERROR", void 0);
__decorate([
    errMessage("AXIOS网络请求失败")
], ErrorCode, "AXIOS_HTTP_ERROR", void 0);
__decorate([
    errMessage("SAGA错误")
], ErrorCode, "SAGA_HTTP_ERROR", void 0);
__decorate([
    errMessage("请求超时")
], ErrorCode, "TIMEOUT", void 0);
__decorate([
    errMessage("收到服务器数据解析失败")
], ErrorCode, "HTTP_RESPONSE_DATA_ERROR", void 0);
__decorate([
    errMessage("网络请求错误")
], ErrorCode, "TEST_ERROR", void 0);
__decorate([
    errMessage("网络请求错误${error}")
], ErrorCode, "TEST_ERROR_WITH_PARAM", void 0);
exports.ErrorCode = ErrorCode;
exports.getErrorMessage = (code, param) => {
    const msg = ErrorMessages[code];
    if (msg) {
        return msg(param);
    }
    else {
        console.log("客户端不存在的错误码=>code:", code, " param:", param);
        // return `错误code:${code},param:${param}`;
        return param; //苹果审核期先不加错误码
    }
};
//# sourceMappingURL=ErrorCode.js.map