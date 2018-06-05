"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_router_1 = require("react-router");
const RouterDefine_1 = require("../../constants/RouterDefine");
class PrivateRoute extends react_1.Component {
    render() {
        let props = Object.assign({}, this.props, { component: undefined });
        let { component: Component, logged } = this.props;
        return (React.createElement(react_router_1.Route, Object.assign({}, props, { render: props => (logged ? (React.createElement(Component, Object.assign({}, props))) : (React.createElement(react_router_1.Redirect, { to: { pathname: RouterDefine_1.LOGIN, state: { from: props.location } } }))) })));
    }
}
exports.PrivateRoute = PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map