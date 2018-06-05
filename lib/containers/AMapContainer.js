"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const AMap_1 = require("../components/AMap");
const location_1 = require("../actions/location");
const ui_1 = require("../actions/ui");
const AMapSearch_1 = require("../components/AMapSearch");
const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentUser.temp.location,
        uiData: state.ui.amap
    };
};
const mapDispatchToProps = (dispatch) => {
    let updateLocation = redux_1.bindActionCreators(location_1.updateLocation, dispatch);
    let changeAddr = redux_1.bindActionCreators(ui_1.changeAddrLocation, dispatch);
    let updateUiAddr = redux_1.bindActionCreators(ui_1.updateUiAddr, dispatch);
    return { updateLocation, updateUiAddr };
};
const AMapContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AMap_1.default);
exports.AMapSearchContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AMapSearch_1.default);
exports.default = AMapContainer;
//# sourceMappingURL=AMapContainer.js.map