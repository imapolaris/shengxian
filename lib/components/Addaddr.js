"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const Tags_1 = require("../constants/Tags");
const common_1 = require("../constants/common");
const RouterDefine_1 = require("../constants/RouterDefine");
const UIState_1 = require("../store/UIState");
const MyStatusBar_1 = require("./MyStatusBar");
const funcs_1 = require("../common/utils/funcs");
const Config_1 = require("../config/Config");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const ComHeaderBtnWithRouter = react_router_1.withRouter(ComHeader_1.ComHeaderBtn);
const screenWidth = react_native_1.Dimensions.get('window').width;
const screenHeight = react_native_1.Dimensions.get('window').height;
exports.saddr = react_native_1.StyleSheet.create({
    bk: { flex: 1, backgroundColor: '#f3f3f3', margin: 10 },
    inputStyle: { marginLeft: 10, marginRight: 10, fontSize: 14 },
    textStyle: { fontWeight: 'bold', marginLeft: 10, width: 50, fontSize: 14 },
    box1: { height: 146, marginTop: 10, backgroundColor: '#fff' },
    box2: { flexDirection: "row", alignItems: "center" },
    fontkm: { color: '#50be07', fontSize: 20, marginRight: 10, margin: 5 },
    fonttxtleft: { color: '#000', fontSize: 20, marginLeft: 10, margin: 5 },
    fonticon: { color: '#000', fontSize: 30 },
});
class SexUI extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.data;
        let sex = this.props.sex;
        let select = data.sex == sex;
        let color = select ? Config_1.Config.ColorG3c : Config_1.Config.ColorB999;
        return (React.createElement(native_base_1.View, { style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: sex == common_1.SexType.Male ? 50 : 0 } },
            React.createElement(native_base_1.CheckBox, { color: color, checked: select, onPress: () => this.props.setSex() }),
            React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.props.setSex(); } },
                React.createElement(native_base_1.Text, { style: { marginLeft: 20, fontWeight: 'bold', marginRight: 10, color: color } }, sex == common_1.SexType.Female ? '女士' : '男士'))));
    }
}
exports.SexUI = SexUI;
class Addaddr extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.state = this.props.addrState;
    }
    componentWillReceiveProps(nextprops) {
        // 数据保存成功返回
        if (nextprops.addrState.dataSaved) {
            this.props.history && this.props.history.go(-1);
        }
        else {
            // 更新数据
            this.setState(nextprops.addrState);
        }
    }
    checkAddrInfo(data) {
        if (!data.name) {
            Config_1.MyToast(2000, "联系人不能为空");
            return false;
        }
        if (data.sex == 0) {
            Config_1.MyToast(2000, "请选择性别");
            return false;
        }
        if (!funcs_1.checkPhone(data.phone)) //手机号
         {
            Config_1.MyToast(2000, "请输入正确的手机号");
            return false;
        }
        if (data.address == "") //门牌号
         {
            Config_1.MyToast(2000, "门牌号不能为空");
            return false;
        }
        if (!data.building) //收货地址
         {
            Config_1.MyToast(2000, "收货地址不能为空");
            return false;
        }
        return true;
    }
    onSave() {
        //条件判断
        let { add, addr } = this.state;
        if (!this.checkAddrInfo(addr)) {
            return;
        }
        Config_1.hideKeyboard();
        let { addAddr, editAddr } = this.props;
        add ? addAddr(addr) : editAddr(addr);
    }
    setSex(sex) {
        this.props.updateUiAddr({ sex });
    }
    setTag(user_address_tag_id) {
        this.props.updateUiAddr({ user_address_tag_id });
    }
    setName(name) {
        this.props.updateUiAddr({ name });
    }
    setPhone(phone) {
        this.props.updateUiAddr({ phone });
    }
    setAddr(address) {
        this.props.updateUiAddr({ address });
    }
    getTitle() {
        return this.state.add && "新加地址" || "修改地址";
    }
    getBtnTitle() {
        return this.state.add && "保存并使用" || "保存";
    }
    onLocation() {
        this.props.setAMapOpType(UIState_1.AMapOpType.selelctAddAddr);
        this.props.navigation && this.props.navigation.navigate(RouterDefine_1.NavScreenKey.Map, { state: this.state.addr });
    }
    render() {
        let { addr: data } = this.state;
        return (React.createElement(native_base_1.View, { style: { flex: 1 } },
            React.createElement(MyStatusBar_1.default, null),
            this.state.add ?
                React.createElement(ComHeaderWithRouter, { title: this.getTitle() }) :
                React.createElement(ComHeaderBtnWithRouter, { title: this.getTitle(), btntext: "\u5220\u9664", btnClick: () => { this.props.deleteAddr(data.id); this.props.history && this.props.history.goBack(); } }),
            React.createElement(react_native_1.KeyboardAvoidingView, { behavior: 'height', keyboardVerticalOffset: -100 },
                React.createElement(react_native_1.ScrollView, null,
                    React.createElement(native_base_1.Container, { style: { width: screenWidth, height: screenHeight } },
                        React.createElement(native_base_1.View, { style: { flex: 1, backgroundColor: '#f5f5f5' } },
                            React.createElement(native_base_1.View, { style: { backgroundColor: 'white', marginTop: 10 } },
                                React.createElement(native_base_1.View, { style: { flexDirection: 'row', alignItems: 'center' } },
                                    React.createElement(native_base_1.Text, { style: exports.saddr.textStyle }, "\u8054\u7CFB\u4EBA"),
                                    React.createElement(native_base_1.Input, { selectTextOnFocus: true, style: exports.saddr.inputStyle, placeholder: "\u6536\u8D27\u4EBA\u59D3\u540D", onChangeText: (text) => this.setName(text), value: data.name })),
                                React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3', marginLeft: 10 } }),
                                React.createElement(native_base_1.View, { style: { marginLeft: 70, flexDirection: 'row', paddingVertical: 20, } },
                                    React.createElement(SexUI, { data: data, sex: 2, setSex: () => this.setSex(2) }),
                                    React.createElement(SexUI, { data: data, sex: 1, setSex: () => this.setSex(1) })),
                                React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3', marginLeft: 10 } }),
                                React.createElement(native_base_1.View, { style: { flexDirection: 'row', alignItems: 'center' } },
                                    React.createElement(native_base_1.Text, { style: exports.saddr.textStyle }, "\u624B\u673A\u53F7"),
                                    React.createElement(native_base_1.Input, { selectTextOnFocus: true, style: exports.saddr.inputStyle, placeholder: "\u6536\u8D27\u4EBA\u624B\u673A\u53F7\u7801", keyboardType: "numeric", onChangeText: (text) => this.setPhone(text), value: data.phone })),
                                React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3', marginLeft: 10 } }),
                                React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3', marginLeft: 10 } }),
                                React.createElement(native_base_1.View, { style: { flexDirection: 'row', alignItems: 'center' } },
                                    React.createElement(native_base_1.Text, { style: [exports.saddr.textStyle, { width: 70 }] }, "\u6536\u8D27\u5730\u5740"),
                                    React.createElement(native_base_1.Input, { selectTextOnFocus: true, style: exports.saddr.inputStyle, placeholder: "\u8FD1\u94C1\u57CE\u5E02\u5E7F\u573A", value: data.building, onFocus: this.onLocation })),
                                React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3', marginLeft: 10 } }),
                                React.createElement(native_base_1.View, { style: { flexDirection: 'row', alignItems: 'center' } },
                                    React.createElement(native_base_1.Text, { style: exports.saddr.textStyle }, "\u95E8\u724C\u53F7"),
                                    React.createElement(native_base_1.Input, { selectTextOnFocus: true, style: exports.saddr.inputStyle, placeholder: "\u4F8B 16\u53F7\u697C302\u5BA4", onChangeText: (text) => this.setAddr(text), value: data.address })),
                                React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3', marginLeft: 10 } }),
                                React.createElement(native_base_1.View, { style: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 } },
                                    React.createElement(native_base_1.Text, { style: exports.saddr.textStyle }, "\u6807\u7B7E"),
                                    Tags_1.default.map((tagData) => (React.createElement(react_native_1.TouchableOpacity, { key: tagData.id, style: {
                                            backgroundColor: data.user_address_tag_id == tagData.id ? Config_1.Config.ColorG3c : 'transparent',
                                            paddingVertical: 5,
                                            paddingHorizontal: 10,
                                            borderRadius: 3
                                        }, onPress: () => this.setTag(tagData.id) },
                                        React.createElement(native_base_1.Text, { style: { color: data.user_address_tag_id == tagData.id ? 'white' : '#383838' } }, tagData.name)))))),
                            React.createElement(native_base_1.View, { style: { height: Config_1.Config.BtnComHeight, marginTop: Config_1.px2dp(30), width: screenWidth } },
                                React.createElement(react_native_1.TouchableOpacity, { style: { backgroundColor: Config_1.Config.ColorG3c, flex: 1, alignItems: 'center', marginLeft: 10,
                                        marginRight: 10, borderRadius: 10, justifyContent: 'center' }, onPress: this.onSave },
                                    React.createElement(native_base_1.Text, { style: { color: 'white' } }, this.getBtnTitle())))))))));
    }
}
exports.default = Addaddr;
//# sourceMappingURL=Addaddr.js.map