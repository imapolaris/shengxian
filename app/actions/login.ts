import {createAction, createAsyncRequestAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {HttpMethod} from "../http/api";
import {Url} from "../constants/http";


export interface LoginData{
    phone:string
    code:string
    msg_id?:string
}

export const checkLogin =()=>(createAsyncRequestAction(ActionTypes.START_CHECK_AUTH,{
    returnAction:ActionTypes.FINISH_CHECK_AUTH,
    method:HttpMethod.GET,
    url:Url.CHECK_AUTH,
    timeout:false,
    loading:true,
    handleError:true
}));

export const login =(args:LoginData)=>(createAsyncRequestAction(ActionTypes.START_USER_LOGIN,{
    returnAction:ActionTypes.FINISH_USER_LOGIN,
    method:HttpMethod.POST,
    url:Url.SIGNUP,
    data:args,
    timeout:false,
    loading:true,
    handleError:false
}));

export const getVCode =(phone:string)=>(createAsyncRequestAction(ActionTypes.START_USER_GET_VCODE,{
    returnAction:ActionTypes.FINISH_USER_GET_VCODE,
    method:HttpMethod.GET,
    url:Url.VCODE,
    params:{
      phone
    },
    timeout:false,
    loading:true,
    handleError:false
}));

export const loginWeChat = ()=>(createAction(ActionTypes.USER_LOGIN_WECHAT));
