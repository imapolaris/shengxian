import {initCategory, Category, CategoryArray, Coupon, CouponArray, initCoupon, MyData, initMy, ItemDynamic, ItemDynamicArray, initItemDynamic, Item} from "../store/EntitiesState";
import {SearchUIState, initSearch} from "../store/UIState";
import {Action} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";

/**
 * 首页活动
 * @param {TopBanner[]} state
 * @param {Action<any>} action
 */

interface ReturnData{
    version:number,
    data?:Category[] | Category
}
export const CategoryReducer  =(state:CategoryArray=initCategory, action:Action<any>)=> {
	switch (action.type){
        case ActionTypes.FINISH_FETCH_CATEGORY:
        {
            let rData:ReturnData = <ReturnData> action.payload;
            if(state.version !== rData.version){
                return {version:rData.version,data:rData.data} || []
            }
        }
		break;
	}
    return state;
}

interface ReturnDataItemDynamic{
    version:number,
    data?:ItemDynamic[] | ItemDynamic
}
export const ItemDynamicReducer  =(state:ItemDynamicArray=initItemDynamic, action:Action<any>)=> {
	switch (action.type){
        case ActionTypes.FINISH_FETCH_ITEMDYNAMIC:
        {
            let rData:ReturnDataItemDynamic = <ReturnDataItemDynamic> action.payload;
            if(state.version !== rData.version){
                return {version:rData.version,data:rData.data} || []
            }
        }
		break;
	}
    return state;
}

interface ReturnDataCoupon{
    version:number,
    data?:Coupon[] | Coupon
}
export const CouponReducer  =(state:CouponArray=initCoupon, action:Action<any>)=> {
	switch (action.type){
        case ActionTypes.FINISH_FETCH_COUPON:
        {
            let rData:ReturnDataCoupon = <ReturnDataCoupon> action.payload;
            if(state.version !== rData.version){
                return {version:rData.version,data:rData.data} || []
            }
        }
        break;
        case ActionTypes.SELECT_COUPON:
        {
            let id:number = <number> action.payload;
            return {...state,select:id}
        }
        //break;
	}
    return state;
}

interface ReturnDataMy{
    version:number,
    data?:MyData[] |MyData
}
export const MyReducer  =(state:MyData=initMy, action:Action<any>)=> {
	switch (action.type){
        case ActionTypes.FINISH_FETCH_MY:
        {
            let rData:ReturnDataMy = <ReturnDataMy> action.payload;
            //if(state.version !== rData.version)
            {
                return {version:rData.version,data:rData.data} || []
            }
        }
	//	break;
	}
    return state;
}


interface ReturnDataSearch{
	lastsearchtext:string,
	data: Array<Item>
}
export const SearchReducer  =(state:SearchUIState=initSearch, action:Action<any>)=> {
	switch (action.type){
        case ActionTypes.START_FETCH_SEARCH:
        {
			let rData:ReturnDataSearch = <ReturnDataSearch> action.payload;
			return {lastsearchtext:rData.lastsearchtext,data:rData.data} || [];
		}
		case ActionTypes.CLEAR_SEARCH:
        {			
			return {lastsearchtext:'',data:[]};
        }
		// break;
	}
    return state;
}
