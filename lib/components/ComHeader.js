"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const Line_1 = require("./Line");
const goback = require("../../images/goback.png");
const Config_1 = require("../config/Config");
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 44 },
    body: { justifyContent: "center", flexDirection: "row" },
});
class ComHeader extends React.Component {
    onGoback() {
        Config_1.hideKeyboard();
        this.props.backClick ? this.props.backClick() : (this.props.navigation && this.props.navigation.goBack());
        // if(this.props.history)
        // {
        //     this.props.history.goBack();
        // }
    }
    render() {
        // let leftIcon = this.props.leftIcon || goback
        // let leftImage = goback
        let leftImage = this.props.leftImage;
        return (React.createElement(react_native_1.View, { style: { width: '100%', height: Config_1.Config.HeadHeight, backgroundColor: Config_1.Config.ColorW } },
            React.createElement(react_native_1.View, { style: { width: '100%', flexDirection: 'row', height: Config_1.Config.HeadHeight, justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement(react_native_1.View, { style: { marginLeft: 5, width: '20%', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(native_base_1.Button, { transparent: true, onPress: () => { this.onGoback(); } }, leftImage ? React.createElement(react_native_1.Image, { source: leftImage, style: { height: Config_1.px2dp(23), width: Config_1.px2dp(23), marginLeft: 12 } })
                        : React.createElement(react_native_1.Image, { source: goback, style: { height: Config_1.px2dp(23), width: Config_1.px2dp(23), marginLeft: 12 } }))),
                React.createElement(react_native_1.View, { style: { justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB333, fontSize: Config_1.Config.Font1125 } }, this.props.title)),
                React.createElement(react_native_1.View, { style: { marginRight: 20, width: '20%', justifyContent: 'center', alignItems: 'center' } }, this.props.righttext ? React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB333, fontSize: Config_1.Config.Font1125, } }, this.props.righttext) : null)),
            React.createElement(Line_1.default, { color: '#f3f3f3' })));
    }
}
exports.ComHeader = ComHeader;
class ComHeaderBtn extends React.Component {
    render() {
        let leftIcon = this.props.leftIcon || "arrow-back";
        return (React.createElement(react_native_1.View, { style: { width: '100%', height: Config_1.Config.HeadHeight, backgroundColor: 'white' } },
            React.createElement(react_native_1.View, { style: { width: '100%', flexDirection: 'row', height: Config_1.Config.HeadHeight, justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement(react_native_1.View, { style: { marginLeft: 5 } },
                    React.createElement(native_base_1.Button, { transparent: true, onPress: () => { this.props.history && this.props.history.goBack(); } },
                        React.createElement(react_native_1.Image, { source: goback, style: { width: Config_1.px2dp(23), height: Config_1.px2dp(23), marginLeft: 12 } }))),
                React.createElement(react_native_1.View, { style: { justifyContent: 'center' } },
                    React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB333, fontSize: Config_1.Config.Font1125 } }, this.props.title)),
                React.createElement(react_native_1.View, { style: { marginRight: 20 } },
                    React.createElement(native_base_1.Button, { transparent: true, onPress: () => {
                            react_native_1.Alert.alert('提示', '确定要删除吗？', [
                                {
                                    text: '取消',
                                    onPress: () => { }
                                },
                                {
                                    text: '确定',
                                    onPress: () => { this.props.btnClick && this.props.btnClick(); }
                                }
                            ]);
                        } },
                        React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorG2e } }, this.props.btntext)))),
            React.createElement(Line_1.default, { color: '#f3f3f3' })));
    }
}
exports.ComHeaderBtn = ComHeaderBtn;
//# sourceMappingURL=ComHeader.js.map