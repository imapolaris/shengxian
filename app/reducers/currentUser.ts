import {Action, AsyncActionFlag, AsyncResultAction} from "../common/utils/action";
import CurrentUserState, {initCurrentUserState, PinLocation} from "../store/CurrentUserState";
import * as ActionTypes from "../constants/ActionTypes"
import dotPropImmutable = require("dot-prop-immutable");
import {persistReducer} from "redux-persist";
import {basePersistConfig, Config} from "../config/Config";
import {Toast} from 'native-base';
import {getDistance} from "../common/utils/distance";
//缓存配置
const persistConfig={...basePersistConfig,
    key:'shengxian_currentUser',
    blacklist:["temp"]
};

/**
 * 当前用户状态
 */
const currentUserReducer  =(state:CurrentUserState=initCurrentUserState, action:Action<any>)=> {
    switch (action.type){
        case ActionTypes.LOCATION_UPDATE:
        {
            let location:PinLocation = <PinLocation>action.payload;
            let dis = getDistance(location.lat,location.lng,Config.SHOP_LOCATION.lat,Config.SHOP_LOCATION.lng);
            if(dis > Config.MAX_PEISONG_DISTANCE){
                Toast.show({
                    text: "超出配送距离",
                    buttonText: "确定",
                    position: "bottom",
                    type: "danger",
                    duration: 5000
                })
            }
            return dotPropImmutable.set(state,'temp.location',location);
        }
        case ActionTypes.USER_LOG_OUT:
        {
            return {...state,token:"",logged:false};
        }
        case ActionTypes.FINISH_CHECK_AUTH:{
            let r:AsyncResultAction<any,any,any> = <AsyncResultAction<any,any,any>>action;
            if(r.flag ===AsyncActionFlag.FLAG_SUCCESS){
                return {...state,logged:true}
            }else{
                return {...state,logged:false,token:""}
            }
        }
        case ActionTypes.CHANGE_SHOP:
        {
            let id:number =<number>action.payload;
            return dotPropImmutable.set(state,"temp.shopId",id);
        }
        case ActionTypes.FINISH_USER_LOGIN:
        {
            let token=<{data:{token:string}}>action.payload;
            return {...state,token:token.data.token,logged:true};
        }
        case ActionTypes.FINISH_USER_GET_VCODE:
        {
            let data=<{data:{msg_id:string,msg:string}}>action.payload;
            Toast.show({
                text: data.data.msg,
                buttonText: "确定",
                position: "bottom",
                type: "success",
                duration: 3000
            })
            return {...state,msg_id:data.data.msg_id}
        }
        case ActionTypes.USER_ACTIVE_LOG_OUT:
        {
            return {...state,token:"",logged:false};
        }
    }
    return state;
};

export default persistReducer(persistConfig,currentUserReducer)