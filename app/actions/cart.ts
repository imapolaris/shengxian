import {createAsyncRequestAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {HttpMethod} from "../http/api";
import {Url} from "../constants/http";
import {Cart} from "../store/EntitiesState";
import * as _ from "lodash";

export const editCartItem  = (item:Cart,effect:boolean=true)=>(createAsyncRequestAction(ActionTypes.START_EDIT_CART_ITEM,{
    returnAction:ActionTypes.FINISH_EDIT_CART_ITEM,
    method:HttpMethod.PUT,
    url:Url.CART({id:item.id}),
    data:{
        count:item.count
    },
    timeout:false,
    loading:false,
    extraData:{
        effect
    },
    handleError:false
}));

export const addCartItem  = (item:Cart,effect:boolean=true)=>(createAsyncRequestAction(ActionTypes.START_ADD_CART_ITEM,{
    returnAction:ActionTypes.FINISH_ADD_CART_ITEM,
    method:HttpMethod.POST,
    url:Url.CARTS,
    data:{
        id:item.id,
        count:item.count
    },
    timeout:false,
    loading:false,
    extraData:{
        effect
    },
    handleError:false
}));

export const deleteCartItem = (ids:number[])=>createAsyncRequestAction(ActionTypes.START_REMOVE_CART_ITEMS,{
    returnAction:ActionTypes.FINISH_REMOVE_CART_ITEMS,
    method:HttpMethod.DELETE,
    url:Url.CART({id:_.join(ids,',')}),
    timeout:false,
    loading:false,
    handleError:false
});

export const fetchCarts =(version:number,force:boolean=false)=>(createAsyncRequestAction(ActionTypes.START_FETCH_CART_LIST,{
    returnAction:ActionTypes.FINISH_FETCH_CART_LIST,
    method:HttpMethod.GET,
    url:Url.CARTS,
    params:{
        version
    },
    timeout:false,
    loading:true,
    handleError:false,
    force
    })
);