"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const CategoryDetail_1 = require("../components/Category/CategoryDetail");
const cart_1 = require("../actions/cart");
const mapStateToProps = (state, props) => {
    return {
        carts: state.entities.cart.carts
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        editCartItem: cart_1.editCartItem,
        addCartItem: cart_1.addCartItem
    }, dispatch);
};
const CategoryDetailContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CategoryDetail_1.default);
exports.default = CategoryDetailContainer;
//# sourceMappingURL=CategoryDetailContainer.js.map