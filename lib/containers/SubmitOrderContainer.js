"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const SubmitOrder_1 = require("../components/SubmitOrder");
const ui_1 = require("../actions/ui");
const order_1 = require("../actions/order");
const mapStateToProps = (state) => {
    return {
        ui: state.ui.submitOrder,
        coupons: state.entities.Coupon.data,
        itemDynamics: state.entities.ItemDynamic
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        setSubmitOrderTime: ui_1.setSubmitOrderTime,
        setSubmitOrderMemo: ui_1.setSubmitOrderMemo,
        newOrder: order_1.newOrder
    }, dispatch);
};
const SubmitOrderContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SubmitOrder_1.default);
exports.default = SubmitOrderContainer;
//# sourceMappingURL=SubmitOrderContainer.js.map