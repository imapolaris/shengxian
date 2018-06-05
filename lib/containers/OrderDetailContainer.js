"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
// import {addItemCount, checkItem, removeItem, subItemCount} from "../actions/cart";
const OrderDetail_1 = require("../components/OrderDetail");
const order_1 = require("../actions/order");
const order_2 = require("../actions/order");
const mapStateToProps = (state, props) => {
    return {
    // orders:state.entities.orders,
    //order:state.entities.orders[props.match.params.key]
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        cancelOrder: order_2.cancelOrder,
        buyAgain: order_1.buyAgain
    }, dispatch);
};
const OrderDetailContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OrderDetail_1.default);
exports.default = OrderDetailContainer;
//# sourceMappingURL=OrderDetailContainer.js.map