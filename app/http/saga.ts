import {actionChannel, call, flush, fork, put, race, select, take} from 'redux-saga/effects'
import Api from "./api";
import {
    Action, ActionError, AsyncActionFlag, AsyncRequest, createAction,
    createAsyncResultAction
} from "../common/utils/action";
import {buffers, channel, delay} from "redux-saga";
import {ErrorCode} from "../constants/ErrorCode";
import * as ActionTypes from "../constants/ActionTypes"
import {httpError, httpTimeout} from "../actions/http";
import {Config} from "../config/Config";
import {AxiosRequestConfig} from "axios";
import RootState from "../store/Store";

export const ACTION_START_REQUEST = "@http/saga/request";
export const ACTION_FINISH_REQUEST = "@http/saga/finish";
export const requestChannel = channel(buffers.expanding());
export const finishChannel = channel(buffers.expanding());

/**
 * @function requestData 请求数据
 * @param {AsyncRequest<any,any>} 请求参数
 */
export function* requestData(action:AsyncRequest<any,any>,func:(method:string,url:string,params?:any,data?:any,config?:AxiosRequestConfig)=>void){
    console.log("request:",action);
    const {returnAction,method,timeout,loading,url,params,data,handleError,callback} = action;
    try{
        if (loading) yield put(requestChannel,createAction(ACTION_START_REQUEST));
        //获取用户token
        let token:string = yield select((state:RootState)=>{console.log(state);return state.currentUser.token});
        let config={};
        if(token){
            config = {"headers":{"Authorization":`Bearer ${token}`}}
        }
       // console.log(new Date(),"request:",action);
        // const {result,_timeout} = yield race({
        //     result: call(func,method,url,params,data,config),
        //     _timeout: call(delay,Config.HTTP_DEFAULT_TIMEOUT,true)
        // });
        let _timeout = false;
        let result = yield call(func,method,url,params,data,config)
        //console.log(new Date(),"request end:",action,_timeout);
        if(_timeout){
            // 超时
            yield put(httpTimeout(!timeout,action));
            // 自己处理超时
            if(timeout) yield put(createAsyncResultAction(returnAction,AsyncActionFlag.FLAG_TIMEOUT,action))
        }else{
            // 成功
            yield put(createAsyncResultAction(returnAction,AsyncActionFlag.FLAG_SUCCESS,action,result));
            // 额外的回调
            if(callback) yield call(callback);
        }
    }catch(error){
        let err= null;
        if(error && error.errorCode ){
            err = error
        }else{
            err = new ActionError(ErrorCode.SAGA_HTTP_ERROR,error.toString())
        }
        // 出错
        yield put(httpError({error:err,handle:!handleError}));
        if(handleError) yield put(createAsyncResultAction(returnAction,AsyncActionFlag.FLAG_FAILURE,action,err))
    }finally{
        if(loading) yield put(finishChannel,createAction(ACTION_FINISH_REQUEST));
    }
}

/**
 * @function 检查http请求状态,1秒钟check一次
 */
export function* watchHttpRequestStatus(throttle:number=100){
    let requestCount = 0;
    let finishCount =0;
    let isRequesting = false;
    while(true) {
        let  requestActions:Action<any>[] = yield flush(requestChannel);
        let finishActions:Action<any>[]  = yield flush(finishChannel);

        requestCount += requestActions.length;
        finishCount +=finishActions.length;

        if(requestCount > finishCount){
            isRequesting = true;
            yield put(createAction(ActionTypes.ACTION_HTTP_REQUESTING));
        }else if(isRequesting){
            isRequesting =false;
            yield put(createAction(ActionTypes.ACTION_HTTP_REQUEST_FINISH));
        }
        yield call(delay,throttle);
    }
}

/**
 * @function watchRequest 监听http网络请求action
 * @param {string} requestAction 监听的action
 * @param {number} throttle      ms值,这段时间内多个匹配的action只处理一次
 */
export function* watchRequest(requestAction:string,throttle:number=0){
    let channel = null;
    if(throttle <= 0){
        channel = yield actionChannel(requestAction,buffers.sliding(1));
    }
    while(true) {
        const action = <Action< AsyncRequest<any,any> >>(yield take(channel || requestAction));
        console.log("handle request",requestAction,new Date().toLocaleString());
        if(action && action.meta && action.meta.force)continue;
        yield fork(requestData,<AsyncRequest<any,any>>action.payload,Api.request);
        if(throttle > 0) yield call(delay,throttle);
    }
}

/**
 * @function watchRequest 监听http网络请求action
 * @param {string} requestAction 监听的action
 * @param {number} throttle      ms值,这段时间内多个匹配的action只处理一次
 */
export function* watchForceRequest(){
    while(true) {
        const action = <Action< AsyncRequest<any,any> >>(yield take((ac:Action<any>)=>{
            return ac.type.startsWith("START_FETCH");
        }));
        /**
         * 处理强制的数据刷新请求
         */
        if(action && action.meta && action.meta.force){
            console.log("force request",action)
            yield fork(requestData,<AsyncRequest<any,any>>action.payload,Api.request);
        }
    }
}