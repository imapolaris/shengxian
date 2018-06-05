"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const Coupon_1 = require("../components/Coupon");
const ui_1 = require("../actions/ui");
const CategoryAction_1 = require("../actions/CategoryAction");
const mapStateToProps = (state) => {
    return {
        Coupon: state.entities.Coupon,
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        setCouponSelect: ui_1.setCouponSelect,
        fetchCoupon: CategoryAction_1.fetchCoupon,
        setSubmitOrderCoupon: ui_1.setSubmitOrderCoupon
    }, dispatch);
};
const CouponContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Coupon_1.default);
exports.default = CouponContainer;
//# sourceMappingURL=CouponContainer.js.map