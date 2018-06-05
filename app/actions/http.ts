import {createAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";

export const httpTimeout = (handle:boolean,request:any)=>(createAction<any>(ActionTypes.ACTION_HTTP_TIMEOUT,{handle,request}));

export interface ErrorData{
    error:Error;
    handle:boolean;
}
export const httpError = (error:ErrorData)=>(createAction<ErrorData>(ActionTypes.ACTION_HTTP_ERROR,error));
