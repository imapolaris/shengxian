"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const Category_1 = require("../components/Category/Category");
const CategoryAction_1 = require("../actions/CategoryAction");
const My_1 = require("../components/My");
const Search_1 = require("../components/Search");
const SearchResult_1 = require("../components/SearchResult");
const ItemList_1 = require("../components/ItemList");
const cart_1 = require("../actions/cart");
const mapStateToProps = (state) => {
    // const shopId = state.currentUser.shopId
    // const saleItems = shopId && state.entities.sales[shopId] && state.entities.sales[shopId].saleItems || []
    // const shop = state.entities.shopList.shops.find((shop)=>shop.id===shopId)
    // const shopTitle = shop && shop.title || "";
    return {
        carts: state.entities.cart.carts,
        Category: state.entities.Category,
        ItemDynamic: state.entities.ItemDynamic,
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({ editCartItem: cart_1.editCartItem, addCartItem: cart_1.addCartItem, fetchCategory: CategoryAction_1.fetchCategory, fetchItemDynamic: CategoryAction_1.fetchItemDynamic }, dispatch);
};
const CategoryContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Category_1.default);
exports.default = CategoryContainer;
//my
const mapStateToPropsMy = (state) => {
    return {
        My: state.entities.My,
    };
};
const mapDispatchToPropsMy = (dispatch) => {
    return redux_1.bindActionCreators({ fetchMy: CategoryAction_1.fetchMy }, dispatch);
};
exports.MyContainer = react_redux_1.connect(mapStateToPropsMy, mapDispatchToPropsMy)(My_1.default);
//Search
const mapStateToPropsSearch = (state) => {
    return {
        Search: state.ui.Search,
    };
};
const mapDispatchToPropsSearch = (dispatch) => {
    return redux_1.bindActionCreators({ fetchSearch: CategoryAction_1.fetchSearch, clearSearch: CategoryAction_1.clearSearch }, dispatch);
};
exports.SearchContainer = react_redux_1.connect(mapStateToPropsSearch, mapDispatchToPropsSearch)(Search_1.default);
//SearchResult
const mapStateToPropsSearchResult = (state) => {
    return {
        carts: state.entities.cart.carts,
        SearchResult: state.ui.SearchResult,
        itemDynamics: state.entities.ItemDynamic
    };
};
const mapDispatchToPropsSearchResult = (dispatch) => {
    return redux_1.bindActionCreators({ editCartItem: cart_1.editCartItem, addCartItem: cart_1.addCartItem }, dispatch);
};
exports.SearchResultContainer = react_redux_1.connect(mapStateToPropsSearchResult, mapDispatchToPropsSearchResult)(SearchResult_1.default);
//ItemList
const mapStateToPropsItemList = (state) => {
    return {
        itemDynamics: state.entities.ItemDynamic
    };
};
const mapDispatchToPropsItemList = (dispatch) => {
    return redux_1.bindActionCreators({}, dispatch);
};
exports.ItemListContainer = react_redux_1.connect(mapStateToPropsItemList, mapDispatchToPropsItemList)(ItemList_1.default);
//# sourceMappingURL=CategoryContainer.js.map