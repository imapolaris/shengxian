import {Reducer} from "redux";
import {BaseAction} from "./action";
/**
 * 合并多个reducer为一个
 * @param {Reducer<any>} reducers 要合并的reducer
 * @returns {(state: any, action: AnyAction) => Reducer<any>} 合并后的新reducer
 */
export const reduceReducers = (...reducers:Reducer<any>[])=>{
    return (state:any,action:BaseAction)=>reducers.reduce((state,r)=>r(state,action),state)
}