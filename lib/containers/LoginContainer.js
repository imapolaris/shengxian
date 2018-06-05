"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Login_1 = require("../components/Login");
const redux_1 = require("redux");
const login_1 = require("../actions/login");
const mapStateToProps = (state) => {
    return {
        phone: state.currentUser.phone,
        msg_id: state.currentUser.msg_id,
        logged: state.currentUser.logged
    };
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({ login: login_1.login, getVCode: login_1.getVCode, loginWeChat: login_1.loginWeChat }, dispatch);
};
const LoginContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login_1.default);
exports.default = LoginContainer;
//# sourceMappingURL=LoginContainer.js.map