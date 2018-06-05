"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const ui_1 = require("../actions/ui");
const Pay_1 = require("../components/Pay");
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        startAliPay: ui_1.startAliPay,
        startWeChatPay: ui_1.startWeChatPay,
        startDaoFuPay: ui_1.startDaoFuPay
    }, dispatch);
};
const PayContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Pay_1.default);
exports.default = PayContainer;
//# sourceMappingURL=PayContainer.js.map