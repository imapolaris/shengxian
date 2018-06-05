"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
// import {addItemCount, checkItem, removeItem, subItemCount} from "../actions/cart";
const ItemList_1 = require("../components/ItemList");
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
const ItemListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ItemList_1.default);
exports.default = ItemListContainer;
//# sourceMappingURL=ItemListContainer.js.map