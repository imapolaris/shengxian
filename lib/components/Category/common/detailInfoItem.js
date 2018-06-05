"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const funcs_1 = require("../../../common/utils/funcs");
const Config_1 = require("../../../config/Config");
class detailInfoItem extends React.Component {
    constructor(props) {
        super(props);
    }
    getLeftCnt(dynamic) {
        if (!dynamic)
            return 0;
        return dynamic.leftcnt;
    }
    render() {
        let { item, dynamic } = this.props;
        let leftcnt = this.getLeftCnt(dynamic);
        let fmtCnt = funcs_1.formatLeftCnt(leftcnt);
        let price = dynamic ? dynamic.price : 10000;
        let marketprice = dynamic ? dynamic.marketprice : 10000;
        return (React.createElement(react_native_1.View, { style: { backgroundColor: 'white' } },
            React.createElement(react_native_1.View, { style: { backgroundColor: '#F6F6F9', height: 10 } }),
            React.createElement(react_native_1.View, { style: styles.container },
                React.createElement(native_base_1.Text, { style: { fontSize: 17, fontWeight: 'bold', color: '#0b0b0b' } }, this.props.item.title),
                React.createElement(native_base_1.Text, { style: { fontSize: 14, color: '#848484', marginTop: 5 } }, this.props.item.funceffect),
                React.createElement(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 } },
                    React.createElement(native_base_1.Text, { style: { fontWeight: 'bold', marginRight: 5, fontSize: Config_1.Config.Font1125, color: Config_1.Config.ColorOf8 } },
                        "\uFFE5",
                        funcs_1.formatMoney(price)),
                    React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.FontBase, textDecorationLine: 'line-through',
                            color: Config_1.Config.ColorBb2 } },
                        "\uFFE5",
                        funcs_1.formatMoney(marketprice)),
                    fmtCnt ? (React.createElement(native_base_1.Text, { style: { marginLeft: 5, fontSize: Config_1.Config.Font0875,
                            color: Config_1.Config.ColorOf8 } }, fmtCnt)) : null,
                    (item.allow_place_type && item.allow_place_type > 0) ? React.createElement(native_base_1.Text, { style: { marginLeft: 5, fontSize: Config_1.Config.Font0875,
                            color: Config_1.Config.ColorOf8 } },
                        "\u9650\u8D2D",
                        item.allow_place_type,
                        "\u4EF6") : null))));
    }
}
exports.default = detailInfoItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5
    },
});
//# sourceMappingURL=detailInfoItem.js.map