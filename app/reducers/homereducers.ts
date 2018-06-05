import {initTopBanner, TopBanner, TopBannerArray, SaleItemArray, initActiveitemArry, SaleItem} from "../store/EntitiesState";
import {Action} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";

/**
 * 首页活动
 * @param {TopBanner[]} state
 * @param {Action<any>} action
 */

interface ReturnDatatopBanner{
    version:number,
    data?:TopBanner[] | TopBanner
}
export const topBannerReducer  =(state:TopBannerArray=initTopBanner, action:Action<any>)=> {
	switch (action.type){
        case ActionTypes.FINISH_FETCH_TOPBANNER:
        {
            let rData:ReturnDatatopBanner = <ReturnDatatopBanner> action.payload;
            if(state.version !== rData.version){
                return {version:rData.version,data:rData.data} || []
            }
        }
		break;
	}
    return state;
}

interface ReturnDataActiveitem{
    version:number,
    data?:SaleItem[] | SaleItem
}
export const ActiveitemReducer  =(state:SaleItemArray=initActiveitemArry, action:Action<any>)=> {
	switch (action.type){
        case ActionTypes.FINISH_FETCH_ACTIVEITEM:
        {
            let rData:ReturnDataActiveitem = <ReturnDataActiveitem> action.payload;
            if(state.version !== rData.version){
                return {version:rData.version,data:rData.data} || []
            }
        }
		break;
	}
    return state;
}
