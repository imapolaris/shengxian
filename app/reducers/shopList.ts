import {initShopList, Shop, ShopList} from "../store/EntitiesState";
import {Action} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {PinLocation} from "../store/CurrentUserState";
import {getDistance} from "../common/utils/distance";
/**
 * 门店列表
 */
export const shopListReducer  =(state:ShopList=initShopList, action:Action<any>)=> {
    switch (action.type){
        case ActionTypes.LOCATION_UPDATE:
        {
            let location:PinLocation = <PinLocation>action.payload;
            let shops = state.shops.map((shop:Shop)=>{
                let dis = getDistance(shop.lat,shop.lng,location.lat,location.lng);
                return {...shop,dis}
            }).sort((a:Shop,b:Shop)=>(a.dis||0) - (b.dis||0))
            return {...state,shops}
        }
    }
    return state;
}