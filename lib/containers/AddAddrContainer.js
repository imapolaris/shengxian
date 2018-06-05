"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const addrlist_1 = require("../actions/addrlist");
const Addaddr_1 = require("../components/Addaddr");
const ui_1 = require("../actions/ui");
const mapStateToProps = (state) => {
    return {
        addrState: state.ui.addAddr,
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        addAddr: addrlist_1.addAddr,
        editAddr: addrlist_1.editAddr,
        deleteAddr: addrlist_1.deleteAddr,
        setAMapOpType: ui_1.setAMapOpType,
        updateUiAddr: ui_1.updateUiAddr
    }, dispatch);
};
const AddaddrContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Addaddr_1.default);
exports.default = AddaddrContainer;
//# sourceMappingURL=AddAddrContainer.js.map