"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const funcs_1 = require("../../../common/utils/funcs");
const Config_1 = require("../../../config/Config");
const RouterDefine_1 = require("../../../constants/RouterDefine");
const screenWidth = react_native_1.Dimensions.get('window').width;
class CartBuyItem extends React.Component {
    constructor(props) {
        super(props);
        this.onAddItem = this.onAddItem.bind(this);
        this.onSubItem = this.onSubItem.bind(this);
        this.getLeftCnt = this.getLeftCnt.bind(this);
    }
    /*减少物品数量*/
    onSubItem() {
        this.props.onSubItem(this.props.itemID);
    }
    /*增加物品数量*/
    onAddItem() {
        this.props.onAddItem(this.props.itemID);
    }
    getLeftCnt() {
        if (!this.props.dynamic)
            return 0;
        return this.props.dynamic.leftcnt;
    }
    clickItem() {
        let section = { id: 1, title: '上海真好吃餐厅', select: true };
        let { dynamic } = this.props;
        this.props.history && this.props.history.push(RouterDefine_1.CATEGORYDETAIL, { section: section, item: this.props.itemData, dynamic });
    }
    render() {
        let leftcnt = this.getLeftCnt();
        let fmtcnt = funcs_1.formatLeftCnt(leftcnt);
        let item = this.props.itemData;
        let { dynamic } = this.props;
        let price = dynamic ? dynamic.price : 10000;
        let marketprice = dynamic ? dynamic.marketprice : 10000;
        return (React.createElement(react_native_1.View, { style: { flexDirection: 'row', height: Config_1.Config.CarItemHeight } },
            React.createElement(react_native_1.View, { style: { alignItems: 'center', flexDirection: 'row' } },
                React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.props.checkItem(this.props.itemID); } },
                    React.createElement(react_native_1.View, { style: { width: 20, height: Config_1.px2dp(70), justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(native_base_1.CheckBox, { onPress: () => {
                                this.props.checkItem(this.props.itemID);
                            }, checked: this.props.checked, color: Config_1.Config.ColorG3c }))),
                React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.clickItem(); } },
                    React.createElement(native_base_1.Thumbnail, { source: { uri: Config_1.Config.DomainName + this.props.itemData.thumbnailsurl }, style: { marginLeft: 10, width: Config_1.px2dp(90), height: Config_1.px2dp(70) } }))),
            React.createElement(react_native_1.View, null,
                React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.clickItem(); } },
                    React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333 } }, this.props.itemData.title)),
                React.createElement(react_native_1.View, { style: { width: screenWidth - 150 - 10, flexDirection: "row", marginTop: 10, alignItems: "center", justifyContent: 'space-between' } },
                    React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.clickItem(); } },
                        fmtcnt ? React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorOf8, marginLeft: 2, fontSize: Config_1.Config.Font08125 } }, fmtcnt) : null,
                        item.allow_place_type ? React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorOf8, marginLeft: 2, fontSize: Config_1.Config.Font08125 } },
                            "\u9650\u8D2D",
                            item.allow_place_type,
                            "\u4EF6") : null,
                        React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorOf8, fontSize: Config_1.Config.Font10625 } },
                            "\uFFE5",
                            funcs_1.formatMoney(price || 0))),
                    React.createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: 'center' } },
                        React.createElement(native_base_1.Button, { style: { justifyContent: 'center', width: 45, height: 45 }, iconLeft: true, onPress: this.onSubItem, transparent: true },
                            React.createElement(native_base_1.Icon, { name: "remove-circle", style: Config_1.Config.styles.addCircle })),
                        React.createElement(react_native_1.Text, { style: { width: 35, textAlign: 'center' } }, this.props.count),
                        React.createElement(native_base_1.Button, { style: { justifyContent: 'center', width: 45, height: 45 }, iconRight: true, onPress: this.onAddItem, transparent: true },
                            React.createElement(native_base_1.Icon, { name: "add-circle", style: Config_1.Config.styles.addCircle })))))));
    }
}
exports.default = CartBuyItem;
//# sourceMappingURL=CartBuyItem.js.map