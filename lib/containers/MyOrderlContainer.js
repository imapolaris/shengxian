"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
// import {addItemCount, checkItem, removeItem, subItemCount} from "../actions/cart";
const MyOrder_1 = require("../components/MyOrder");
const order_1 = require("../actions/order");
const ui_1 = require("../actions/ui");
const mapStateToProps = (state) => {
    return {
        orders: state.entities.orders,
        loading: state.http.loading,
        ui: state.ui.myOrder
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        fetchOrder: order_1.fetchOrder,
        changeMyOrderTab: ui_1.changeMyOrderTab,
        cancelOrder: order_1.cancelOrder,
        delOrder: order_1.delOrder,
        buyAgain: order_1.buyAgain,
    }, dispatch);
};
const MyOrderlContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MyOrder_1.default);
exports.default = MyOrderlContainer;
//# sourceMappingURL=MyOrderlContainer.js.map