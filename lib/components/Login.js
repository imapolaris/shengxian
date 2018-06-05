"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
//const pichead = require("./splashscreen.png");
const pichead = { uri: "screen" };
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const MyStatusBar_1 = require("./MyStatusBar");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const RouterDefine_1 = require("../constants/RouterDefine");
// import * as login_top_icon from '../images/login_top_icon.png';
// import * as login_wechat_icon from '../images/login_weChat_icon.png';
const WeChat = require("react-native-wechat");
const login_weChat_icon = require("../../images/login_weChat_icon.png");
const TimerButton_1 = require("./TimerButton");
const funcs_1 = require("../common/utils/funcs");
const Config_1 = require("../config/Config");
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: Config_1.Config.ColorB999, fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
});
exports.saddr = react_native_1.StyleSheet.create({
    bk: { flex: 1, backgroundColor: Config_1.Config.ColorW },
    box1: { height: 146, marginTop: 10, backgroundColor: '#fff' },
    box2: { flexDirection: "row", alignItems: "center" },
    fontkm: { color: '#50be07', fontSize: 20, marginRight: 10, margin: 5 },
    fonttxtleft: { color: '#000', fontSize: 20, marginLeft: 10, margin: 5 },
    fonticon: { color: '#000', fontSize: 30 },
    fontgreen: { color: '#50be07' },
    phone: { alignSelf: "center", marginRight: 20, marginLeft: 20, marginBottom: 10 },
    fontservice: { color: Config_1.Config.ColorG2e, fontSize: 13, marginTop: 10 },
    blackline: { height: 1, backgroundColor: '#f3f3f3' },
});
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneError: false,
            codeError: false,
            phone: '',
            code: "",
            isInstallWeChat: false
        };
        this.onGetCode = this.onGetCode.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.isPhoneValid = this.isPhoneValid.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.isAble = this.isAble.bind(this);
        this.onBack = this.onBack.bind(this);
    }
    onPhoneChange(phone) {
        this.setState({ phone, phoneError: !this.isPhoneValid(phone) });
    }
    onCodeChange(code) {
        this.setState({ code });
    }
    onGetCode() {
        if (this.isPhoneValid(this.state.phone)) {
            this.props.getVCode(this.state.phone);
            return true;
        }
        else {
            Config_1.MyToast(2000, "请输入手机号");
        }
        return false;
    }
    onBack() {
        // hack:为了解决主页的跳转
        let maintab = this.props.location && this.props.location.state && this.props.location.state.tab || "";
        if (maintab) {
            Config_1.MainHelper.selectedTab = maintab;
        }
        this.props.history && this.props.history.goBack();
    }
    onLogin() {
        let { phone, code } = this.state;
        if (this.isPhoneValid(phone)) {
            if (this.state.code) {
                this.props.login({ phone, code, msg_id: this.props.msg_id });
            }
        }
        else {
            Config_1.MyToast(2000, "请输入正确的手机号");
        }
    }
    isPhoneValid(phone) {
        return funcs_1.checkPhone(phone);
    }
    isAble() {
        let { phone, code } = this.state;
        if (this.isPhoneValid(phone) && code.length >= 4) {
            return true;
        }
        return false;
    }
    componentDidMount() {
        WeChat.isWXAppInstalled().then(result => {
            console.log('isinstall +' + !!result);
            this.setState({
                isInstallWeChat: !!result
            });
        });
    }
    render() {
        const { from } = this.props.location && this.props.location.state || { from: { pathname: RouterDefine_1.MAIN } };
        return this.props.logged ? React.createElement(react_router_1.Redirect, { to: from }) : (React.createElement(react_native_1.KeyboardAvoidingView, { behavior: 'height', keyboardVerticalOffset: -330 },
            React.createElement(react_native_1.ScrollView, null,
                React.createElement(native_base_1.View, { style: { flex: 1 } },
                    React.createElement(native_base_1.Container, null,
                        React.createElement(MyStatusBar_1.default, null),
                        React.createElement(ComHeaderWithRouter, { title: "\u767B\u5F55/\u6CE8\u518C", backClick: () => this.onBack() }),
                        React.createElement(native_base_1.View, { style: exports.saddr.bk },
                            React.createElement(native_base_1.View, null,
                                React.createElement(native_base_1.Item, { style: exports.saddr.phone, error: this.state.phoneError },
                                    React.createElement(native_base_1.Icon, { active: true, name: "phone-portrait", style: { color: '#999' } }),
                                    React.createElement(native_base_1.Input, { style: { color: '#999' }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7", value: this.state.phone, keyboardType: "numeric", onChangeText: this.onPhoneChange }),
                                    React.createElement(TimerButton_1.default, { timerCount: 60, timerTitle: '\u83B7\u53D6\u9A8C\u8BC1\u7801', onClick: this.onGetCode, phoneInValid: this.isPhoneValid(this.state.phone) })),
                                React.createElement(native_base_1.Item, { style: exports.saddr.phone, error: this.state.codeError },
                                    React.createElement(native_base_1.Icon, { active: true, name: "unlock", style: { color: '#999' } }),
                                    React.createElement(native_base_1.Input, { style: { color: '#999' }, placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801", keyboardType: "numeric", value: this.state.code, onChangeText: this.onCodeChange })),
                                React.createElement(native_base_1.Button, { full: true, style: { height: Config_1.Config.BtnComHeight, backgroundColor: this.isAble() ? Config_1.Config.ColorG3c : Config_1.Config.ColorBb2,
                                        marginHorizontal: 10, marginTop: 30, borderRadius: 10 }, onPress: this.onLogin },
                                    React.createElement(native_base_1.Text, { style: [exports.saddr.fontgreen, { alignSelf: 'center', color: this.isAble() ? Config_1.Config.ColorW : Config_1.Config.ColorBf2 }] }, "\u767B\u5F55")))),
                        React.createElement(native_base_1.View, { style: { position: 'absolute', bottom: 0, right: 0, left: 0, paddingBottom: 30, alignItems: 'center' } },
                            this.state.isInstallWeChat ? React.createElement(native_base_1.View, { style: { flexDirection: 'row', justifyContent: 'center',
                                    alignItems: 'center' } },
                                React.createElement(native_base_1.View, { style: { marginLeft: 10, marginRight: 5, flex: 1, height: 1, borderBottomWidth: 0.5, borderColor: Config_1.Config.ColorBb2 } }),
                                React.createElement(native_base_1.View, null,
                                    React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorB999 } }, "\u7B2C\u4E09\u65B9\u5E10\u53F7\u767B\u5F55")),
                                React.createElement(native_base_1.View, { style: { marginRight: 10, marginLeft: 5, flex: 1, height: 1, borderBottomWidth: 0.5, borderColor: Config_1.Config.ColorBb2 } })) : null,
                            (this.state.isInstallWeChat ? React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.props.loginWeChat(); } },
                                React.createElement(react_native_1.Image, { source: login_weChat_icon, style: { alignSelf: 'center', margin: 10 } }),
                                React.createElement(native_base_1.Text, { style: [exports.shead.fonttxt, { alignSelf: 'center', padding: 0, fontSize: 13 }] }, "\u5FAE\u4FE1\u767B\u5F55")) : null),
                            React.createElement(native_base_1.View, { style: { flexDirection: 'row', height: 30, justifyContent: 'center' } },
                                React.createElement(native_base_1.Text, { style: [exports.saddr.fontservice, { alignSelf: 'center', color: '#999', marginTop: 30 }] }, "\u70B9\u51FB\u767B\u5F55\u8868\u793A\u60A8\u540C\u610F"),
                                React.createElement(native_base_1.Button, { transparent: true, style: { justifyContent: 'flex-start' }, onPress: () => { this.props.history && this.props.history.push(RouterDefine_1.PROTOCOL); } },
                                    React.createElement(native_base_1.Text, { style: [exports.saddr.fontservice, { alignSelf: 'center', paddingLeft: 0 }] }, "\u300A\u751F\u9C9C\u670D\u52A1\u534F\u8BAE\u6761\u6B3E\u300B")))))))));
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map