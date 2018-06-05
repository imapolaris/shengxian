"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const location_1 = require("../actions/location");
const ErrorPage_1 = require("../components/ErrorPage");
const mapStateToProps = (state) => {
    return { location: state.currentUser.temp.location };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({ startGpsLocation: location_1.startGpsLocation }, dispatch);
};
const ErrorPageContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ErrorPage_1.default);
exports.default = ErrorPageContainer;
//# sourceMappingURL=ErrorPageContainer.js.map