import * as ActionTypes from "../constants/ActionTypes";
import {Toast} from "native-base";
import {call, put, select, take} from "redux-saga/effects";
import {AsyncActionFlag, AsyncRequest, AsyncResultAction, createAction} from "../common/utils/action";
import {default as Api} from "../http/api";
import {PinLocation} from "../store/CurrentUserState";
import {changeShop, updateLocation} from "../actions/location";
import {requestReGeoData} from "../actions/addrlist";
import {ACTION_FINISH_REQUEST, ACTION_START_REQUEST, finishChannel, requestChannel, requestData} from "../http/saga";
import RootState from "../store/Store";
import {StringMap} from "../common/utils/types";
import {delay} from "redux-saga";
import {Shop, ShopList} from "../store/EntitiesState";
import {getDistance} from "../common/utils/distance";
import StoreConfig from "../store/ConfigureStore";
import {LOGIN, MAIN_ERROR, MAIN_MY} from "../constants/RouterDefine";

export function* watchChangeShop(){
    while(true){
        let action = yield take(ActionTypes.CHANGE_SHOP);
        //TODO 请求商店道具请求数据
        //yield fork(requestData,<AsyncRequest<any,any>>action.payload,Api.request);
    }
}

export function* watchLoginFinished(){
    while (true){
        let action = <AsyncResultAction<any,any,any>>(yield take(ActionTypes.FINISH_USER_LOGIN));
        if(action.flag === AsyncActionFlag.FLAG_SUCCESS){
            //登录成功
            //界面跳转回登陆前的界面
            let {location} = StoreConfig.history;
            if(location.pathname === LOGIN && location.state.from){
                StoreConfig.history.replace(location.state.from);
            }
            else{
                StoreConfig.history.replace(MAIN_MY);
            }
        }
    }
}