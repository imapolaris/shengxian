"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const ui_1 = require("../actions/ui");
const Setup_1 = require("../components/Setup");
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        clearCacheData: ui_1.clearCacheData,
        logout: ui_1.logout
    }, dispatch);
};
const SetupContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Setup_1.default);
exports.default = SetupContainer;
//# sourceMappingURL=SetupContainer.js.map