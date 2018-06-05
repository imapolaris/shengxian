"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const funcs_1 = require("../common/utils/funcs");
const Config_1 = require("../config/Config");
exports.styles = react_native_1.StyleSheet.create({
    pic: {
        resizeMode: "cover",
        width: 55,
        height: 55
    },
});
class OrderImg extends React.Component {
    constructor(props) {
        super(props);
        this.getTotalMoney = this.getTotalMoney.bind(this);
    }
    GetIMG(items) {
        let rows = [];
        let imgcnt = items.length > Config_1.Config.ShowOrderImageCnt ? Config_1.Config.ShowOrderImageCnt : items.length;
        for (let i = 0; i < imgcnt; i++) {
            rows.push(React.createElement(native_base_1.Thumbnail, { source: { uri: Config_1.Config.DomainName + items[i].thumbnailsurl }, style: exports.styles.pic, key: i }));
        }
        if (items.length > Config_1.Config.ShowOrderImageCnt) {
            rows.push(React.createElement(react_native_1.Text, { key: imgcnt, style: { width: 40, fontSize: 30, marginLeft: 5 } }, " ... "));
        }
        return rows;
    }
    getTotalMoney(itemlist) {
        if (this.props.price) {
            return this.props.price;
        }
        let totalmoney = 0;
        for (let i = 0; i < itemlist.length; i++) {
            totalmoney += itemlist[i].price * (itemlist[i].itemcnt || 0);
        }
        return totalmoney;
    }
    render() {
        let { items, click } = this.props;
        let itemcnt = items.length;
        return (React.createElement(react_native_1.TouchableHighlight, { onPress: () => { click && click(); } },
            React.createElement(native_base_1.CardItem, { style: { paddingLeft: 5, paddingRight: 0, flex: 1, marginRight: 0, paddingBottom: 5, paddingTop: 5 } },
                React.createElement(native_base_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center' } }, this.GetIMG(items)),
                React.createElement(native_base_1.View, { style: { flexDirection: 'column' } },
                    React.createElement(react_native_1.Text, { style: { fontSize: 15, marginBottom: 5 } },
                        funcs_1.formatMoney(this.getTotalMoney(items)),
                        " "),
                    React.createElement(react_native_1.Text, { style: { fontSize: 12 } },
                        "共" + itemcnt + "件",
                        " ")),
                React.createElement(native_base_1.Icon, { name: "arrow-forward", style: [Config_1.Config.styles.ForwardIcon, { textAlign: 'right' }] }))));
    }
}
exports.default = OrderImg;
//# sourceMappingURL=OrderImg.js.map