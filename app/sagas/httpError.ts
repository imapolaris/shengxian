import {Action, ActionError, createAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {AxiosHttpError, HttpError} from "../http/api";
import {put, take} from "redux-saga/effects";
import {Toast} from "native-base";
import {ErrorCode, getErrorMessage} from "../constants/ErrorCode";
import {push, replace} from "react-router-redux";
import {LOGIN, MAIN} from "../constants/RouterDefine";
import StoreConfig from "../store/ConfigureStore";
import {ErrorData} from "../actions/http";
/**
 * @function watchHttpError 监听http 403错误,跳转到登录页面
 */
export function* watchHttpError(){
    while(true) {
        const action = (yield take([ActionTypes.ACTION_HTTP_ERROR,ActionTypes.ACTION_HTTP_TIMEOUT]));
        switch(action.type)
        {
        case ActionTypes.ACTION_HTTP_ERROR:
        {
            let data = <ErrorData>action.payload;
            let err = <ActionError>data.error;
            // 403登录跳转
            if(err.errorCode === ErrorCode.HTTP_REQUEST_ERROR){
                let httpErr = <HttpError>err;
                if(httpErr.status === 403){
                    console.log("收到服务器403错误,跳转到登录界面",data);
                    yield put(createAction(ActionTypes.USER_LOG_OUT));
                    let location = StoreConfig.history.location;
                    // if(location.pathname != MAIN){
                    //      yield put(push({pathname:LOGIN,state:{from:location}}))
                    // }else{
                        yield put(push({pathname:LOGIN,state:{from:location}}));
                    //}
                    break;
                }
            }
            // 错误处理
            if(data.handle){
                let message="";
                switch (err.errorCode) {
                    case ErrorCode.HTTP_REQUEST_ERROR: {
                        //http 请求错误,收到了返回包:但是返回了200~299之外的http状态码
                        let httpErr = <HttpError>err;
                        console.log("http请求返回错误=>http返回码:",httpErr.status," request:",httpErr.request," response:",httpErr.response);
                        message=`http请求返回错误,code:${httpErr.status}`;
                        break;
                    }
                    case ErrorCode.SAGA_HTTP_ERROR: {
                        //saga处理的地方出现了其他的错误
                        console.log("saga处理失败请求返回错误=>错误:",err.message);
                        message=`http请求处理出错:${err.message}`;
                        break;
                    }
                    case ErrorCode.AXIOS_HTTP_ERROR: {
                        // http请求出现了错误,Eg:没有连上服务器
                        let axiosErr = <AxiosHttpError>err;
                        console.log("请求http服务器失败=>code:",axiosErr.code," request:",axiosErr.request," response:",axiosErr.response," message:",axiosErr.message);
						// message=`服务器连接出错:${axiosErr.message}`;
						message='网络不太给力哦'
                        break;
                    }
                    default: {
                        message =getErrorMessage(err.errorCode || 0,err.param);
                        break
                    }
                }
                Toast.show({
                    text: message,
                    buttonText: "确定",
                    position: "bottom",
                    type: "danger",
                    duration: 3000
                })
            }
            break;
        }
        case ActionTypes.ACTION_HTTP_TIMEOUT:
        {
            let {handle,request} = action.payload;
            console.log(handle)
            if(handle) {
                Toast.show({
                    text:`请求超时,请稍后再试!!==>${request && request.url}`,
                    buttonText:"确定",
                    position:"bottom",
                    type:"danger",
                    duration:3000
                })
            }
            break;
        }
        }


    }
}