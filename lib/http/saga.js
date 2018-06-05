"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("./api");
const action_1 = require("../common/utils/action");
const redux_saga_1 = require("redux-saga");
const ErrorCode_1 = require("../constants/ErrorCode");
const ActionTypes = require("../constants/ActionTypes");
const http_1 = require("../actions/http");
exports.ACTION_START_REQUEST = "@http/saga/request";
exports.ACTION_FINISH_REQUEST = "@http/saga/finish";
exports.requestChannel = redux_saga_1.channel(redux_saga_1.buffers.expanding());
exports.finishChannel = redux_saga_1.channel(redux_saga_1.buffers.expanding());
/**
 * @function requestData 请求数据
 * @param {AsyncRequest<any,any>} 请求参数
 */
function* requestData(action, func) {
    console.log("request:", action);
    const { returnAction, method, timeout, loading, url, params, data, handleError, callback } = action;
    try {
        if (loading)
            yield effects_1.put(exports.requestChannel, action_1.createAction(exports.ACTION_START_REQUEST));
        //获取用户token
        let token = yield effects_1.select((state) => { console.log(state); return state.currentUser.token; });
        let config = {};
        if (token) {
            config = { "headers": { "Authorization": `Bearer ${token}` } };
        }
        // console.log(new Date(),"request:",action);
        // const {result,_timeout} = yield race({
        //     result: call(func,method,url,params,data,config),
        //     _timeout: call(delay,Config.HTTP_DEFAULT_TIMEOUT,true)
        // });
        let _timeout = false;
        let result = yield effects_1.call(func, method, url, params, data, config);
        //console.log(new Date(),"request end:",action,_timeout);
        if (_timeout) {
            // 超时
            yield effects_1.put(http_1.httpTimeout(!timeout, action));
            // 自己处理超时
            if (timeout)
                yield effects_1.put(action_1.createAsyncResultAction(returnAction, action_1.AsyncActionFlag.FLAG_TIMEOUT, action));
        }
        else {
            // 成功
            yield effects_1.put(action_1.createAsyncResultAction(returnAction, action_1.AsyncActionFlag.FLAG_SUCCESS, action, result));
            // 额外的回调
            if (callback)
                yield effects_1.call(callback);
        }
    }
    catch (error) {
        let err = null;
        if (error && error.errorCode) {
            err = error;
        }
        else {
            err = new action_1.ActionError(ErrorCode_1.ErrorCode.SAGA_HTTP_ERROR, error.toString());
        }
        // 出错
        yield effects_1.put(http_1.httpError({ error: err, handle: !handleError }));
        if (handleError)
            yield effects_1.put(action_1.createAsyncResultAction(returnAction, action_1.AsyncActionFlag.FLAG_FAILURE, action, err));
    }
    finally {
        if (loading)
            yield effects_1.put(exports.finishChannel, action_1.createAction(exports.ACTION_FINISH_REQUEST));
    }
}
exports.requestData = requestData;
/**
 * @function 检查http请求状态,1秒钟check一次
 */
function* watchHttpRequestStatus(throttle = 100) {
    let requestCount = 0;
    let finishCount = 0;
    let isRequesting = false;
    while (true) {
        let requestActions = yield effects_1.flush(exports.requestChannel);
        let finishActions = yield effects_1.flush(exports.finishChannel);
        requestCount += requestActions.length;
        finishCount += finishActions.length;
        if (requestCount > finishCount) {
            isRequesting = true;
            yield effects_1.put(action_1.createAction(ActionTypes.ACTION_HTTP_REQUESTING));
        }
        else if (isRequesting) {
            isRequesting = false;
            yield effects_1.put(action_1.createAction(ActionTypes.ACTION_HTTP_REQUEST_FINISH));
        }
        yield effects_1.call(redux_saga_1.delay, throttle);
    }
}
exports.watchHttpRequestStatus = watchHttpRequestStatus;
/**
 * @function watchRequest 监听http网络请求action
 * @param {string} requestAction 监听的action
 * @param {number} throttle      ms值,这段时间内多个匹配的action只处理一次
 */
function* watchRequest(requestAction, throttle = 0) {
    let channel = null;
    if (throttle <= 0) {
        channel = yield effects_1.actionChannel(requestAction, redux_saga_1.buffers.sliding(1));
    }
    while (true) {
        const action = (yield effects_1.take(channel || requestAction));
        console.log("handle request", requestAction, new Date().toLocaleString());
        if (action && action.meta && action.meta.force)
            continue;
        yield effects_1.fork(requestData, action.payload, api_1.default.request);
        if (throttle > 0)
            yield effects_1.call(redux_saga_1.delay, throttle);
    }
}
exports.watchRequest = watchRequest;
/**
 * @function watchRequest 监听http网络请求action
 * @param {string} requestAction 监听的action
 * @param {number} throttle      ms值,这段时间内多个匹配的action只处理一次
 */
function* watchForceRequest() {
    while (true) {
        const action = (yield effects_1.take((ac) => {
            return ac.type.startsWith("START_FETCH");
        }));
        /**
         * 处理强制的数据刷新请求
         */
        if (action && action.meta && action.meta.force) {
            console.log("force request", action);
            yield effects_1.fork(requestData, action.payload, api_1.default.request);
        }
    }
}
exports.watchForceRequest = watchForceRequest;
//# sourceMappingURL=saga.js.map