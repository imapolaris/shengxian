"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_redux_1 = require("react-router-redux");
const redux_persist_1 = require("redux-persist");
const Config_1 = require("../config/Config");
const ui_1 = require("./ui");
const entities_1 = require("./entities");
const currentUser_1 = require("./currentUser");
const http_1 = require("./http");
const ActionTypes = require("../constants/ActionTypes");
const reducer_1 = require("../common/utils/reducer");
const EntitiesState_1 = require("../store/EntitiesState");
//缓存配置,不保存route信息
const persistConfig = Object.assign({}, Config_1.basePersistConfig, { key: 'shengxian', blacklist: ['route', "currentUser"] });
//根reducer
const rootReducer = redux_persist_1.persistCombineReducers(persistConfig, {
    route: react_router_redux_1.routerReducer,
    ui: ui_1.default,
    entities: entities_1.default,
    currentUser: currentUser_1.default,
    http: http_1.httpReducer
});
// 清空缓存数据
const clearDataReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.CLEAR_CACHE_DATA:
            {
                //state清空,保留下ui,route,currentUser
                let { ui, route, currentUser } = state;
                return { ui, route, currentUser };
            }
        case ActionTypes.USER_LOG_OUT:
        case ActionTypes.USER_ACTIVE_LOG_OUT:
            {
                return Object.assign({}, state, { entities: Object.assign({}, state.entities, { cart: EntitiesState_1.initCarts, addrs: EntitiesState_1.initAddr }) });
            }
    }
    return state;
};
const indexReducer = reducer_1.reduceReducers(clearDataReducer, rootReducer);
exports.default = indexReducer;
//# sourceMappingURL=index.js.map