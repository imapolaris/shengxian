import {Action} from "../common/utils/action";
import HttpState, {initHttpState} from "../store/HttpState";
import * as ActionTypes from "../constants/ActionTypes";

/**
 * http请求状态
 */
export const httpReducer  =(state:HttpState=initHttpState, action:Action<any>)=> {
    switch (action.type){
        case ActionTypes.ACTION_HTTP_ERROR:
        {
            return {...state,loading:false};
        }
        case ActionTypes.ACTION_HTTP_TIMEOUT:
        {
            return {...state,loading:false};
        }
        case ActionTypes.ACTION_HTTP_REQUESTING:
        {
             return {...state,loading:true};
        }
        case ActionTypes.ACTION_HTTP_REQUEST_FINISH:
        {
            return {...state,loading:false};
        }
    }
    return state;
};