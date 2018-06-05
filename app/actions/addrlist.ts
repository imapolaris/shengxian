import * as ActionTypes from "../constants/ActionTypes";
import {Url} from "../constants/http";
import {createAction, createAsyncRequestAction} from "../common/utils/action";
import {HttpMethod} from "../http/api";
import {Address} from "../store/EntitiesState";
import {Coordinate} from "react-native-smart-amap";
import {Config} from "../config/Config";
import * as _ from "lodash"

export const fetchAddrList =(version:number,force:boolean)=>(createAsyncRequestAction(ActionTypes.START_FETCH_ADDRLIST,{
    returnAction:ActionTypes.FINISH_FETCH_ADDRLIST,
    method:HttpMethod.GET,
    url:Url.ADDRLIST,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false
}));
//新增
export const addAddr =(addr:Address)=>(createAsyncRequestAction(ActionTypes.START_ADD_ADDR,{
    returnAction:ActionTypes.FINISH_ADD_ADDR,
    method:HttpMethod.POST,
    url:Url.ADDRLIST,
    data:addr,
    timeout:false,
    loading:true,
    handleError:false
}));

//修改
export const editAddr =(args:Address)=>(createAsyncRequestAction(ActionTypes.START_EDIT_ADDR,{
    returnAction:ActionTypes.FINISH_EDIT_ADDR,
    method:HttpMethod.PUT,
    url:Url.ADDR({id:args.id}),
    data:args,
    timeout:false,
    loading:true,
    handleError:false
}));

export const deleteAddr =(id:number)=>(createAsyncRequestAction(ActionTypes.START_DELETE_ADDR,{
    returnAction:ActionTypes.FINISH_DELETE_ADDR,
    method:HttpMethod.DELETE,
    url:Url.ADDR({id}),
    timeout:false,
    loading:true,
    handleError:false,
    extraData:{id}  //保存一下删除的id
}));

/**
 * 批量删除
 * @param {number[]} ids
 * @returns {Action<AsyncRequest<any, any>>}
 */
export const deleteAddrBatch =(ids:number[])=>(createAsyncRequestAction(ActionTypes.START_DELETE_ADDR,{
    returnAction:ActionTypes.FINISH_DELETE_ADDR,
    method:HttpMethod.DELETE,
    url:Url.ADDR({id:_.join(ids,",")}),
    timeout:false,
    loading:true,
    handleError:false,
}));

// 请求地址信息
export const requestReGeoData=(coors:Coordinate[])=>{
    let location:string = "";
    for(let coor of coors){
        if(location)location +="|";
        location +=`${coor.longitude},${coor.latitude}`;
    }
    return createAsyncRequestAction(ActionTypes.START_SEARCHING_REGEO_DATA,{
        returnAction:ActionTypes.FINISH_SEARCHING_REGEO_DATA,
        method:HttpMethod.GET,
        url:Config.HTTP_RE_GEO_URL({location,key:Config.HTTP_AMAP_WEB_KEY,batch:true}),
        timeout:false,
        loading:false,
        handleError:false,
        extraData:coors
    })
};