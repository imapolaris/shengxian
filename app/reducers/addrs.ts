import {Address, AddrList, initAddr} from "../store/EntitiesState";
import {Action} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";

interface ReturnData{
    version:number,
    data?:Address[] | Address
}
/**
 * 地址
 */
export const addrListReducer  =(state:AddrList=initAddr, action:Action<any>)=> {
    switch (action.type){
        case ActionTypes.FINISH_FETCH_ADDRLIST:
        {
            let rData:ReturnData = <ReturnData> action.payload;
            if(state.version !== rData.version){
                return {version:rData.version,addrs:rData.data} || []
            }
        }
        break;
        case ActionTypes.FINISH_DELETE_ADDR:
        case ActionTypes.FINISH_ADD_ADDR:
        case ActionTypes.FINISH_EDIT_ADDR:
        {
            let rData:ReturnData = <ReturnData> action.payload;
            return {version:rData.version,addrs:rData.data};
        }
    }
    return state;
}