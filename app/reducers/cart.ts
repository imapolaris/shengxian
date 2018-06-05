import {Action} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {CartList, initCarts} from "../store/EntitiesState";
import * as _ from "lodash"
export const cartReducer  =(state:CartList=initCarts, action:Action<any>)=>{
    switch(action.type){
        case ActionTypes.FINISH_ADD_CART_ITEM:
        case ActionTypes.FINISH_EDIT_CART_ITEM:
        case ActionTypes.FINISH_REMOVE_CART_ITEMS:
            console.log("new carts",action.payload.data);
            return {version:action.payload.version,carts:_.map(action.payload.data,(data:any)=>{return {id:data.item_id,count:data.itemcnt}})};
        case ActionTypes.FINISH_FETCH_CART_LIST:
        {
            if(state.version != action.payload.version){
                return {version:action.payload.version,carts:_.map(action.payload.data,(data:any)=>{return {id:data.item_id,count:data.itemcnt}})};
            }
        }
    }
    return state;
};