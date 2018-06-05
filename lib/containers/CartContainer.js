"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Cart_1 = require("../components/Cart/Cart");
const redux_1 = require("redux");
const ui_1 = require("../actions/ui");
const cart_1 = require("../actions/cart");
const CategoryAction_1 = require("../actions/CategoryAction");
const mapStateToProps = (state) => {
    return {
        items: state.entities.items,
        carts: state.entities.cart.carts,
        itemDynamics: state.entities.ItemDynamic,
        version: state.entities.cart.version,
        logined: (state.currentUser.token && state.currentUser.token.length > 0 || false),
        ui: state.ui.carts,
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        selectCartsItems: ui_1.selectCartsItems,
        editCartItem: cart_1.editCartItem,
        fetchCarts: cart_1.fetchCarts,
        deleteCartItem: cart_1.deleteCartItem,
        unSelectCartsItems: ui_1.unSelectCartsItems,
        setSubmitOrderItems: ui_1.setSubmitOrderItems,
        fetchItemDynamic: CategoryAction_1.fetchItemDynamic
    }, dispatch);
};
const CartContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Cart_1.default);
exports.default = CartContainer;
//# sourceMappingURL=CartContainer.js.map