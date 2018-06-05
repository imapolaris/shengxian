"use strict";
/**
 * @class ActionError
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ActionError extends Error {
    constructor(errorCode, message, param) {
        super(message);
        this.errorCode = errorCode;
        this.name = 'ActionError';
        this.param = param;
        //TODO react-native 不支持
        //Object.setPrototypeOf(this,new.target.prototype)
        //@ts-ignore
        //Object.setPrototypeOf ? Object.setPrototypeOf(this, Error.prototype) : this.__proto__ = Error.prototype
        if (Error.captureStackTrace) {
            //@ts-ignore
            Error.captureStackTrace(this, ActionError);
        }
    }
}
exports.ActionError = ActionError;
/**
 * @interface AsyncActionFlag 异步action分类
 */
var AsyncActionFlag;
(function (AsyncActionFlag) {
    /**
     * @field 操作成功的action,payload中保存的是成功的返回值
     */
    AsyncActionFlag[AsyncActionFlag["FLAG_SUCCESS"] = 0] = "FLAG_SUCCESS";
    /**
     * @field 操作失败的action,error为true,payload中保存的是ActionError
     */
    AsyncActionFlag[AsyncActionFlag["FLAG_FAILURE"] = 1] = "FLAG_FAILURE";
    /**
     * @field 操作超时的action,error为true,payload中保存的是ActionError
     */
    AsyncActionFlag[AsyncActionFlag["FLAG_TIMEOUT"] = 2] = "FLAG_TIMEOUT";
})(AsyncActionFlag = exports.AsyncActionFlag || (exports.AsyncActionFlag = {}));
/**
 * @function createAction 返回一个Action
 * @param {string} type 类型
 * @param {ActionError | Payload} payload action附带的其他数据
 * @returns {Action<Payload>} 返回的action对象
 */
exports.createAction = (type, payload = undefined) => {
    let error = (payload instanceof Error);
    return {
        type,
        payload,
        error
    };
};
/**
 * @function createAsyncResultAction 返回一个异步结果Action
 * @param {string} type 类型
 * @param {AsyncRequest} payload   请求参数
 * @returns {Action<Payload>} 返回的action对象
 */
exports.createAsyncRequestAction = (type, payload) => {
    //强制
    if (payload.force) {
        return {
            type,
            payload,
            meta: {
                force: true
            },
            error: false
        };
    }
    return {
        type,
        payload,
        error: false
    };
};
/**
 * @function createAsyncResultAction 返回一个异步结果Action
 * @param {string} type 类型
 * @param {AsyncActionFlag} flag   标记类型
 * @param {ActionError | Payload} payload action附带的其他数据
 * @returns {Action<Payload>} 返回的action对象
 */
exports.createAsyncResultAction = (type, flag, request, payload = undefined) => {
    let error = (payload instanceof Error);
    return {
        type,
        flag,
        request,
        payload,
        error
    };
};
//# sourceMappingURL=action.js.map