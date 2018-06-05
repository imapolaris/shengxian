"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Config_1 = require("../../config/Config");
const MAX_MEMO_LEN = 50;
class OrderRemainItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remainds: [
                { isSelect: false, title: '送点葱吧' },
                { isSelect: false, title: '现金支付，自带零钱' },
                { isSelect: false, title: '如果没有人就房门口' },
                { isSelect: false, title: '到了打电话不要敲门' },
            ],
            selectRemains: [],
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.View, { style: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' } },
                React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333, flex: 1 } }, "\u5907\u6CE8"),
                React.createElement(react_native_1.View, { style: { flex: 9, backgroundColor: '#f5f5f5', marginLeft: 5, borderRadius: 5, borderWidth: 1, borderColor: '#fff' } },
                    React.createElement(react_native_1.TextInput, { style: { height: 40, marginLeft: 5, fontSize: Config_1.Config.Font0875, color: Config_1.Config.ColorB666 }, placeholder: '\u9009\u586B,\u544A\u8BC9\u5C0F\u4E8C\u60A8\u7684\u7279\u6B8A\u8981\u6C42', maxLength: MAX_MEMO_LEN, onFocus: () => {
                            this.props.onFocus();
                        }, onChangeText: (text) => {
                            let newStr = text.replace("...", "");
                            if (newStr.length >= MAX_MEMO_LEN) {
                                return;
                            }
                            this.props.changeText(newStr);
                        }, value: this.props.memo, underlineColorAndroid: 'transparent' }))),
            React.createElement(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10 } }, this.state.remainds.map((item, i) => {
                return (React.createElement(react_native_1.TouchableOpacity, { key: i, onPress: () => {
                        if (this.props.memo.length >= MAX_MEMO_LEN) {
                            return;
                        }
                        let strFlag = "";
                        if (this.props.memo.length > 0) {
                            strFlag = "，";
                        }
                        let str = this.props.memo + strFlag + item.title;
                        str = str.length < MAX_MEMO_LEN ? str : (str.substr(0, MAX_MEMO_LEN - 3) + "...");
                        this.props.changeText(str);
                        { /*let data = this.state.remainds;*/ }
                        { /*data[i].isSelect = !item.isSelect*/ }
                        { /*this.setState({*/ }
                        { /*remainds: data*/ }
                        { /*});*/ }
                        { /*let selectItem: any = [];*/ }
                        { /*this.state.remainds.map((item:any,i)=>{*/ }
                        { /*if (item.isSelect){*/ }
                        { /*selectItem.push(item.title);*/ }
                        { /*}*/ }
                        { /*})*/ }
                        { /*this.setState({*/ }
                        { /*selectRemains: selectItem*/ }
                        { /*}, ()=>{*/ }
                        { /*console.log('selectRemains=', this.state.selectRemains);*/ }
                        { /*});*/ }
                    } },
                    React.createElement(react_native_1.View, { style: [styles.itemStyle, { backgroundColor: item.isSelect ? '#F68A0A' : 'white' }] },
                        React.createElement(react_native_1.Text, { style: { color: item.isSelect ? 'white' : Config_1.Config.ColorB666, fontSize: Config_1.Config.Font0875 } }, item.title))));
            }))));
    }
}
exports.default = OrderRemainItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    itemStyle: {
        borderRadius: 15,
        height: 30,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        marginLeft: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5
    }
});
//# sourceMappingURL=OrderRemainItem.js.map