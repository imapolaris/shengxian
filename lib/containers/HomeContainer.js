"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const Home_1 = require("../components/HomePage/Home");
const homeaction_1 = require("../actions/homeaction");
const cart_1 = require("../actions/cart");
const location_1 = require("../actions/location");
const CategoryAction_1 = require("../actions/CategoryAction");
const mapStateToProps = (state) => {
    const shopId = state.currentUser.temp.shopId;
    const shop = state.entities.shopList.shops.find((shop) => shop.id === shopId);
    const shopTitle = shop && shop.name || "";
    return {
        topBanner: state.entities.topBanner,
        saleItem: state.entities.SaleItem,
        width: state.ui.layout.width,
        items: state.entities.items,
        carts: state.entities.cart,
        itemDynamics: state.entities.ItemDynamic,
        locate: state.currentUser.temp.location,
        shopId,
        shopTitle,
        logged: (state.currentUser.logged || false)
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({ editCartItem: cart_1.editCartItem, addCartItem: cart_1.addCartItem, fetchCarts: cart_1.fetchCarts, fetchTopbanner: homeaction_1.fetchTopbanner, fetchSaleItem: homeaction_1.fetchSaleItem, startGpsLocation: location_1.startGpsLocation, fetchItemDynamic: CategoryAction_1.fetchItemDynamic }, dispatch);
};
const HomeContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Home_1.default);
exports.default = HomeContainer;
//# sourceMappingURL=HomeContainer.js.map