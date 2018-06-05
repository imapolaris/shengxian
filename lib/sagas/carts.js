"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const action_1 = require("../common/utils/action");
//import {Toast} from "native-cdbase";
//import Toast from 'react-native-root-toast';
const ActionTypes = require("../constants/ActionTypes");
/**
 * @function watchRequest 监听http网络请求action
 * @param {string} requestAction 监听的action
 * @param {boolean} onlyLast     是不是只保留最后一次action请求
 */
function* watchCartOpFinished() {
    while (true) {
        const action = (yield effects_1.take([ActionTypes.FINISH_ADD_CART_ITEM, ActionTypes.FINISH_EDIT_CART_ITEM]));
        if (action.flag !== action_1.AsyncActionFlag.FLAG_SUCCESS)
            continue;
        if (action.request.extraData && !action.request.extraData.effect)
            continue;
        let desc = "";
        switch (action.type) {
            case ActionTypes.FINISH_ADD_CART_ITEM:
            case ActionTypes.FINISH_EDIT_CART_ITEM:
                desc = "添加购物车成功";
                break;
        }
        if (desc) {
            console.log("call Toast.show");
            /*
            let toast = Toast.show(desc, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                onShow: () => {
                    // calls on toast\`s appear animation start
                },
                onShown: () => {
                    // calls on toast\`s appear animation end.
                },
                onHide: () => {
                    // calls on toast\`s hide animation start.
                },
                onHidden: () => {
                    // calls on toast\`s hide animation end.
                }
            });
            
            // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
            setTimeout(function () {
                Toast.hide(toast);
            }, 2000);
        */
        }
    }
}
exports.watchCartOpFinished = watchCartOpFinished;
//# sourceMappingURL=carts.js.map