import * as ActionTypes from "../constants/ActionTypes";
import {Url} from "../constants/http";
import {createAction, createAsyncRequestAction} from "../common/utils/action";
import {HttpMethod} from "../http/api";
import {Item} from "../store/EntitiesState";
import {SearchUIState} from "../store/UIState";

export const fetchCategory =(version:number,force:boolean=false)=>(createAsyncRequestAction(ActionTypes.START_FETCH_CATEGORY,{
    returnAction:ActionTypes.FINISH_FETCH_CATEGORY,
    method:HttpMethod.GET,
    url:Url.CATEGORY,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false,
    force
}));

export const fetchItemDynamic =(version:number,force:boolean=false)=>(createAsyncRequestAction(ActionTypes.START_FETCH_ITEMDYNAMIC,{
    returnAction:ActionTypes.FINISH_FETCH_ITEMDYNAMIC,
    method:HttpMethod.GET,
    url:Url.ITEMDYNAMIC,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false,
    force
}));


export const fetchCoupon =(version:number,force:boolean=false)=>(createAsyncRequestAction(ActionTypes.START_FETCH_COUPON,{
    returnAction:ActionTypes.FINISH_FETCH_COUPON,
    method:HttpMethod.GET,
    url:Url.COUPON,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false,
    force
}));

export const fetchMy =(version:number,force:boolean=false)=>(createAsyncRequestAction(ActionTypes.START_FETCH_MY,{
    returnAction:ActionTypes.FINISH_FETCH_MY,
    method:HttpMethod.GET,
    url:Url.MY,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false,
    force
}));

export const fetchSearch = (lastsearchtext:string, data:Array<string>)=>(createAction<SearchUIState>(ActionTypes.START_FETCH_SEARCH,
	{lastsearchtext:lastsearchtext, data:data}));


export const clearSearch = ()=>(createAction<SearchUIState>(ActionTypes.CLEAR_SEARCH,
	));

	// const createAction=<Payload>(type:string,payload:Payload|ActionError|undefined = undefined):Action<Payload>=>{