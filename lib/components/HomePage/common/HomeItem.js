"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const Config_1 = require("../../../config/Config");
const funcs_1 = require("../../../common/utils/funcs");
class HomeItem extends React.Component {
    constructor(props) {
        super(props);
        this.getLeftCnt = this.getLeftCnt.bind(this);
    }
    getLeftCnt() {
        if (!this.props.dynamic)
            return 0;
        return this.props.dynamic.leftcnt;
    }
    render() {
        let { item, dynamic } = this.props;
        let leftcnt = funcs_1.formatLeftCnt(this.getLeftCnt());
        let price = dynamic ? dynamic.price : 10000;
        let marketprice = dynamic ? dynamic.marketprice : 10000;
        return (React.createElement(react_native_1.TouchableOpacity, { style: { flex: 1 }, onPress: () => { this.props.itemClick(); } },
            React.createElement(react_native_1.View, { style: { flex: 1 } },
                React.createElement(react_native_1.View, { style: { flex: 1 } },
                    React.createElement(react_native_1.Image, { source: { uri: Config_1.Config.DomainName + '/' + (item && item.bigimgurl || "") }, style: { width: Config_1.px2dp(165), height: Config_1.px2dp(165), alignSelf: 'center', marginLeft: 10 } })),
                React.createElement(react_native_1.View, { style: { marginLeft: 10, marginBottom: 5 } },
                    React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333 } }, item && item.title)),
                React.createElement(react_native_1.View, { style: { marginLeft: 10, marginBottom: 5 } },
                    React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font075, color: Config_1.Config.ColorB999 } }, item && item.funceffect)),
                leftcnt ? (React.createElement(react_native_1.Text, { style: { marginLeft: 10, marginBottom: 5, fontSize: Config_1.Config.Font0875,
                        color: Config_1.Config.ColorBb2 } }, leftcnt)) : null,
                React.createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, alignItems: 'flex-end',
                        marginRight: 10, marginBottom: 5 } },
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end' } },
                        React.createElement(react_native_1.Text, { style: { fontWeight: 'bold', marginRight: 5, fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorOf8 } },
                            "\uFFE5",
                            funcs_1.formatMoney(price)),
                        React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font0875, textDecorationLine: 'line-through',
                                color: Config_1.Config.ColorBb2 } },
                            "\uFFE5",
                            funcs_1.formatMoney(marketprice)),
                        (item.allow_place_type && item.allow_place_type > 0) ? React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font0875,
                                color: Config_1.Config.ColorBb2 } },
                            "\u9650\u8D2D$",
                            item.allow_place_type,
                            "\u4EF6") : null),
                    React.createElement(react_native_1.TouchableOpacity, { style: { height: Config_1.px2dp(28), width: Config_1.px2dp(25), position: 'absolute', right: 0, bottom: 5, }, onPress: (e) => { this.props.addItemClick(e); } },
                        React.createElement(native_base_1.Icon, { style: Config_1.Config.styles.addCircle, name: "md-add-circle" }))))));
    }
}
exports.default = HomeItem;
//# sourceMappingURL=HomeItem.js.map