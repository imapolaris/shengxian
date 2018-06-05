"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTypes = require("../constants/ActionTypes");
const effects_1 = require("redux-saga/effects");
const action_1 = require("../common/utils/action");
const ConfigureStore_1 = require("../store/ConfigureStore");
const RouterDefine_1 = require("../constants/RouterDefine");
function* watchChangeShop() {
    while (true) {
        let action = yield effects_1.take(ActionTypes.CHANGE_SHOP);
        //TODO 请求商店道具请求数据
        //yield fork(requestData,<AsyncRequest<any,any>>action.payload,Api.request);
    }
}
exports.watchChangeShop = watchChangeShop;
function* watchLoginFinished() {
    while (true) {
        let action = (yield effects_1.take(ActionTypes.FINISH_USER_LOGIN));
        if (action.flag === action_1.AsyncActionFlag.FLAG_SUCCESS) {
            //登录成功
            //界面跳转回登陆前的界面
            let { location } = ConfigureStore_1.default.history;
            if (location.pathname === RouterDefine_1.LOGIN && location.state.from) {
                ConfigureStore_1.default.history.replace(location.state.from);
            }
            else {
                ConfigureStore_1.default.history.replace(RouterDefine_1.MAIN_MY);
            }
        }
    }
}
exports.watchLoginFinished = watchLoginFinished;
//# sourceMappingURL=gpslocation.js.map