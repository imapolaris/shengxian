"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const Addrlist_1 = require("../components/Addrlist");
const addrlist_1 = require("../actions/addrlist");
const ui_1 = require("../actions/ui");
const location_1 = require("../actions/location");
const mapStateToProps = (state) => {
    return {
        addrs: state.entities.addrs,
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        fetchAddrList: addrlist_1.fetchAddrList,
        setUiAddr: ui_1.setUiAddr,
        updateLocation: location_1.updateLocation,
        setSubmitOrderAddr: ui_1.setSubmitOrderAddr
    }, dispatch);
};
const AddrlistContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Addrlist_1.default);
exports.default = AddrlistContainer;
//# sourceMappingURL=AddListContainer.js.map