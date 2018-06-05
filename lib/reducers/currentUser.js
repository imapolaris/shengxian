"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const CurrentUserState_1 = require("../store/CurrentUserState");
const ActionTypes = require("../constants/ActionTypes");
const dotPropImmutable = require("dot-prop-immutable");
const redux_persist_1 = require("redux-persist");
const Config_1 = require("../config/Config");
const native_base_1 = require("native-base");
const distance_1 = require("../common/utils/distance");
//缓存配置
const persistConfig = Object.assign({}, Config_1.basePersistConfig, { key: 'shengxian_currentUser', blacklist: ["temp"] });
/**
 * 当前用户状态
 */
const currentUserReducer = (state = CurrentUserState_1.initCurrentUserState, action) => {
    switch (action.type) {
        case ActionTypes.LOCATION_UPDATE:
            {
                let location = action.payload;
                let dis = distance_1.getDistance(location.lat, location.lng, Config_1.Config.SHOP_LOCATION.lat, Config_1.Config.SHOP_LOCATION.lng);
                if (dis > Config_1.Config.MAX_PEISONG_DISTANCE) {
                    native_base_1.Toast.show({
                        text: "超出配送距离",
                        buttonText: "确定",
                        position: "bottom",
                        type: "danger",
                        duration: 5000
                    });
                }
                return dotPropImmutable.set(state, 'temp.location', location);
            }
        case ActionTypes.USER_LOG_OUT:
            {
                return Object.assign({}, state, { token: "", logged: false });
            }
        case ActionTypes.FINISH_CHECK_AUTH: {
            let r = action;
            if (r.flag === action_1.AsyncActionFlag.FLAG_SUCCESS) {
                return Object.assign({}, state, { logged: true });
            }
            else {
                return Object.assign({}, state, { logged: false, token: "" });
            }
        }
        case ActionTypes.CHANGE_SHOP:
            {
                let id = action.payload;
                return dotPropImmutable.set(state, "temp.shopId", id);
            }
        case ActionTypes.FINISH_USER_LOGIN:
            {
                let token = action.payload;
                return Object.assign({}, state, { token: token.data.token, logged: true });
            }
        case ActionTypes.FINISH_USER_GET_VCODE:
            {
                let data = action.payload;
                native_base_1.Toast.show({
                    text: data.data.msg,
                    buttonText: "确定",
                    position: "bottom",
                    type: "success",
                    duration: 3000
                });
                return Object.assign({}, state, { msg_id: data.data.msg_id });
            }
        case ActionTypes.USER_ACTIVE_LOG_OUT:
            {
                return Object.assign({}, state, { token: "", logged: false });
            }
    }
    return state;
};
exports.default = redux_persist_1.persistReducer(persistConfig, currentUserReducer);
//# sourceMappingURL=currentUser.js.map