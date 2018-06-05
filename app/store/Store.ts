import {RouterState} from "react-router-redux";
import UIState from "./UIState";
import EntitiesState from "./EntitiesState";
import CurrentUserState from "./CurrentUserState";
import HttpState from "./HttpState";


/**
 * @interface   RootState APP状态
 */
export default interface RootState{
    ui:UIState;                     // UI状态
    route:RouterState;              // 路由状态
    entities:EntitiesState;         // 实体
    currentUser:CurrentUserState    // 用户状态
    http:HttpState                  // http请求状态
}