import {routerReducer} from "react-router-redux";
import {persistCombineReducers} from "redux-persist";
import {basePersistConfig} from "../config/Config";
import RootState from "../store/Store";
import uiReducer from "./ui";
import entitiesReducer from "./entities";
import currentUserReducer from "./currentUser";
import {httpReducer} from "./http";
import {Action} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {reduceReducers} from "../common/utils/reducer";
import {initAddr, initCarts} from "../store/EntitiesState";

//缓存配置,不保存route信息
const persistConfig={...basePersistConfig,
    key:'shengxian',
    blacklist:['route',"currentUser"]
};

//根reducer
const rootReducer = persistCombineReducers<RootState>(persistConfig,{
    route:routerReducer,
    ui:uiReducer,
    entities:entitiesReducer,
    currentUser:currentUserReducer,
    http:httpReducer
});

// 清空缓存数据
const clearDataReducer =(state:RootState, action:Action<any>)=> {
    switch (action.type){
        case ActionTypes.CLEAR_CACHE_DATA:
        {
            //state清空,保留下ui,route,currentUser
            let {ui,route,currentUser} = state;
            return {ui,route,currentUser};
        }
        case ActionTypes.USER_LOG_OUT:
        case ActionTypes.USER_ACTIVE_LOG_OUT:
        {
            return {...state,entities:{...state.entities,cart:initCarts,addrs:initAddr}}
        }
    }
    return state;
};

const indexReducer = reduceReducers(clearDataReducer,rootReducer);

export default indexReducer;
