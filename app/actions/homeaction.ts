import * as ActionTypes from "../constants/ActionTypes";
import {Url} from "../constants/http";
import {createAction, createAsyncRequestAction} from "../common/utils/action";
import {HttpMethod} from "../http/api";

export const fetchTopbanner =(version:number,force:boolean=false)=>(createAsyncRequestAction(ActionTypes.START_FETCH_TOPBANNER,{
    returnAction:ActionTypes.FINISH_FETCH_TOPBANNER,
    method:HttpMethod.GET,
    url:Url.TOPBANNER,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false,
    force
}));

export const fetchSaleItem =(version:number,force:boolean=false)=>(createAsyncRequestAction(ActionTypes.START_FETCH_ACTIVEITEM,{
    returnAction:ActionTypes.FINISH_FETCH_ACTIVEITEM,
    method:HttpMethod.GET,
    url:Url.SALEITEM,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false,
    force
}));
