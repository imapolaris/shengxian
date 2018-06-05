"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitiesState_1 = require("../store/EntitiesState");
const ActionTypes = require("../constants/ActionTypes");
const order_1 = require("../actions/order");
/**
 * 我的订单
 */
exports.orderReducer = (state = EntitiesState_1.initOrders, action) => {
    switch (action.type) {
        case ActionTypes.FINISH_FETCH_ORDERLIST: {
            let ac = action;
            let payload = action.payload[0];
            // 未完成列表
            if (ac.request.extraData.state == order_1.ORDER_LIST_TYPE.UNFINISHED) {
                let orders = Object.assign({}, state.unfinished);
                orders.currentPage = payload.current_page;
                orders.totalPage = payload.last_page;
                if (orders.currentPage <= 1) {
                    orders.orders = payload.data;
                }
                else {
                    orders.orders.concat(payload.data);
                }
                return Object.assign({}, state, { unfinished: orders });
            }
            else {
                //已完成列表
                let orders = Object.assign({}, state.finished);
                orders.currentPage = payload.current_page;
                orders.totalPage = payload.last_page;
                if (orders.currentPage <= 1) {
                    orders.orders = payload.data;
                }
                else {
                    orders.orders.concat(payload.data);
                }
                return Object.assign({}, state, { finished: orders });
            }
        }
    }
    return state;
};
//# sourceMappingURL=orders.js.map