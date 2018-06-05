import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import rootReducer from '../reducers/index';
import RootState from "./Store";
import {persistStore} from "redux-persist";
import {Dimensions} from "react-native";
import {changeLayout} from "../actions/ui";

import * as WeChat from 'react-native-wechat'
import {Config} from "../config/Config";
import ExceptionHandler from "react-native-exception-handler"
import {checkLogin} from "../actions/login";

const saga  = createSagaMiddleware()

const history = createMemoryHistory();
const route = routerMiddleware(history);
const store =createStore<RootState>(rootReducer,applyMiddleware(saga,route));

const persist = persistStore(store,undefined,()=>{
    //从缓存初始化store成功之后的回调处理
    //计算一下窗口大小
    let {width,height} =Dimensions.get("window");
    store.dispatch(changeLayout({width,height}));
    console.log("store",store.getState());
    //检查登录状态
    store.dispatch(checkLogin());
    Dimensions.addEventListener("change",()=>{
        let {width,height} =Dimensions.get("window");
        store.dispatch(changeLayout({width,height}))
    });
})

//注册微信
WeChat.registerApp(Config.WECHAT_APP_ID).then((val)=>{
    console.log("registerWecahtApp return ",val);
});

//异常处理
ExceptionHandler.setJSExceptionHandler((err,fatal)=>{
    console.log("exception",err,fatal);
},true);
// Native异常
ExceptionHandler.setNativeExceptionHandler((err)=>{
    console.log("native exception",err);
});

export default {
    store,
    saga,
    history,
    persist
}