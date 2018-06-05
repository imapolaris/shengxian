import {createAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {PinLocation} from "../store/CurrentUserState";

export const updateLocation = (item:PinLocation)=>(createAction<PinLocation>(ActionTypes.LOCATION_UPDATE,item));
export const startGpsLocation = ()=>(createAction<PinLocation>(ActionTypes.START_GPS_LOCATION));
export const changeShop     =(id:number)=>(createAction(ActionTypes.CHANGE_SHOP,id));
