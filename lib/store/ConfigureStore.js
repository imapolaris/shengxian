"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_saga_1 = require("redux-saga");
const redux_1 = require("redux");
const react_router_redux_1 = require("react-router-redux");
const createMemoryHistory_1 = require("history/createMemoryHistory");
const index_1 = require("../reducers/index");
const redux_persist_1 = require("redux-persist");
const react_native_1 = require("react-native");
const ui_1 = require("../actions/ui");
const WeChat = require("react-native-wechat");
const Config_1 = require("../config/Config");
const react_native_exception_handler_1 = require("react-native-exception-handler");
const login_1 = require("../actions/login");
const saga = redux_saga_1.default();
const history = createMemoryHistory_1.default();
const route = react_router_redux_1.routerMiddleware(history);
const store = redux_1.createStore(index_1.default, redux_1.applyMiddleware(saga, route));
const persist = redux_persist_1.persistStore(store, undefined, () => {
    //从缓存初始化store成功之后的回调处理
    //计算一下窗口大小
    let { width, height } = react_native_1.Dimensions.get("window");
    store.dispatch(ui_1.changeLayout({ width, height }));
    console.log("store", store.getState());
    //检查登录状态
    store.dispatch(login_1.checkLogin());
    react_native_1.Dimensions.addEventListener("change", () => {
        let { width, height } = react_native_1.Dimensions.get("window");
        store.dispatch(ui_1.changeLayout({ width, height }));
    });
});
//注册微信
WeChat.registerApp(Config_1.Config.WECHAT_APP_ID).then((val) => {
    console.log("registerWecahtApp return ", val);
});
//异常处理
react_native_exception_handler_1.default.setJSExceptionHandler((err, fatal) => {
    console.log("exception", err, fatal);
}, true);
// Native异常
react_native_exception_handler_1.default.setNativeExceptionHandler((err) => {
    console.log("native exception", err);
});
exports.default = {
    store,
    saga,
    history,
    persist
};
//# sourceMappingURL=ConfigureStore.js.map