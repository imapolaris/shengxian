"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Main_1 = require("../components/Main");
const mapStateToProps = (state) => {
    return {
        cartCount: state.entities.cart.carts.length,
        logged: !!(state.currentUser.logged)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
const MainContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Main_1.default);
exports.default = MainContainer;
//# sourceMappingURL=MainContainer.js.map