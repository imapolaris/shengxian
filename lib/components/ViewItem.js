"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const funcs_1 = require("../common/utils/funcs");
const Config_1 = require("../config/Config");
class ViewItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { Item, DynamicPrice } = this.props;
        let tprice = (Item.itemcnt || 0) * (DynamicPrice || 0);
        return (React.createElement(react_native_1.View, { style: { flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, borderWidth: 1, borderRadius: 10, borderColor: Config_1.Config.ColorBf4,
                justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, backgroundColor: Config_1.Config.ColorW, height: 90 } },
            React.createElement(react_native_1.View, { style: { flex: 1 } },
                React.createElement(native_base_1.Thumbnail, { source: { uri: Config_1.Config.DomainName + Item.thumbnailsurl }, style: { marginLeft: 10 } })),
            React.createElement(react_native_1.View, { style: { flex: 3, marginLeft: 10 } },
                React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333, marginBottom: 5 } }, Item.title),
                React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorB333 } }, '单价: ￥' + funcs_1.formatMoney(DynamicPrice || 0) + '   ' + '数量: ' + (Item.itemcnt || ""))),
            React.createElement(react_native_1.View, { style: { marginRight: 0, flex: 1 } },
                React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorB333 } },
                    "\uFFE5",
                    funcs_1.formatMoney(tprice)))));
    }
}
exports.default = ViewItem;
//# sourceMappingURL=ViewItem.js.map