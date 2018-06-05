"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
const effects_1 = require("redux-saga/effects");
const native_base_1 = require("native-base");
const ErrorCode_1 = require("../constants/ErrorCode");
const react_router_redux_1 = require("react-router-redux");
const RouterDefine_1 = require("../constants/RouterDefine");
const ConfigureStore_1 = require("../store/ConfigureStore");
/**
 * @function watchHttpError 监听http 403错误,跳转到登录页面
 */
function* watchHttpError() {
    while (true) {
        const action = (yield effects_1.take([ActionTypes.ACTION_HTTP_ERROR, ActionTypes.ACTION_HTTP_TIMEOUT]));
        switch (action.type) {
            case ActionTypes.ACTION_HTTP_ERROR:
                {
                    let data = action.payload;
                    let err = data.error;
                    // 403登录跳转
                    if (err.errorCode === ErrorCode_1.ErrorCode.HTTP_REQUEST_ERROR) {
                        let httpErr = err;
                        if (httpErr.status === 403) {
                            console.log("收到服务器403错误,跳转到登录界面", data);
                            yield effects_1.put(action_1.createAction(ActionTypes.USER_LOG_OUT));
                            let location = ConfigureStore_1.default.history.location;
                            // if(location.pathname != MAIN){
                            //      yield put(push({pathname:LOGIN,state:{from:location}}))
                            // }else{
                            yield effects_1.put(react_router_redux_1.push({ pathname: RouterDefine_1.LOGIN, state: { from: location } }));
                            //}
                            break;
                        }
                    }
                    // 错误处理
                    if (data.handle) {
                        let message = "";
                        switch (err.errorCode) {
                            case ErrorCode_1.ErrorCode.HTTP_REQUEST_ERROR: {
                                //http 请求错误,收到了返回包:但是返回了200~299之外的http状态码
                                let httpErr = err;
                                console.log("http请求返回错误=>http返回码:", httpErr.status, " request:", httpErr.request, " response:", httpErr.response);
                                message = `http请求返回错误,code:${httpErr.status}`;
                                break;
                            }
                            case ErrorCode_1.ErrorCode.SAGA_HTTP_ERROR: {
                                //saga处理的地方出现了其他的错误
                                console.log("saga处理失败请求返回错误=>错误:", err.message);
                                message = `http请求处理出错:${err.message}`;
                                break;
                            }
                            case ErrorCode_1.ErrorCode.AXIOS_HTTP_ERROR: {
                                // http请求出现了错误,Eg:没有连上服务器
                                let axiosErr = err;
                                console.log("请求http服务器失败=>code:", axiosErr.code, " request:", axiosErr.request, " response:", axiosErr.response, " message:", axiosErr.message);
                                // message=`服务器连接出错:${axiosErr.message}`;
                                message = '网络不太给力哦';
                                break;
                            }
                            default: {
                                message = ErrorCode_1.getErrorMessage(err.errorCode || 0, err.param);
                                break;
                            }
                        }
                        native_base_1.Toast.show({
                            text: message,
                            buttonText: "确定",
                            position: "bottom",
                            type: "danger",
                            duration: 3000
                        });
                    }
                    break;
                }
            case ActionTypes.ACTION_HTTP_TIMEOUT:
                {
                    let { handle, request } = action.payload;
                    console.log(handle);
                    if (handle) {
                        native_base_1.Toast.show({
                            text: `请求超时,请稍后再试!!==>${request && request.url}`,
                            buttonText: "确定",
                            position: "bottom",
                            type: "danger",
                            duration: 3000
                        });
                    }
                    break;
                }
        }
    }
}
exports.watchHttpError = watchHttpError;
//# sourceMappingURL=httpError.js.map