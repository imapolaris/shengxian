"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Shoplist_1 = require("../components/Shoplist");
const location_1 = require("../actions/location");
const redux_1 = require("redux");
const mapStateToProps = (state) => {
    return {
        shops: state.entities.shopList.shops
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        changeShop: location_1.changeShop
    }, dispatch);
};
const ShoplistContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Shoplist_1.default);
exports.default = ShoplistContainer;
//# sourceMappingURL=ShopListContainer.js.map