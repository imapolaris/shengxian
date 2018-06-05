"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const funcs_1 = require("../common/utils/funcs");
const Config_1 = require("../config/Config");
class BuyItem11111111111 extends React.Component {
    constructor(props) {
        super(props);
        this.onAddItem = this.onAddItem.bind(this);
        this.onSubItem = this.onSubItem.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }
    onAddItem() {
        const { id, onAddItem } = this.props;
        if (id && onAddItem)
            onAddItem(id);
    }
    onSubItem() {
        const { id, onSubItem } = this.props;
        if (id && onSubItem)
            onSubItem(id);
    }
    onCheckChange() {
        const { id, onCheckChange } = this.props;
        if (id && onCheckChange)
            onCheckChange(id);
    }
    render() {
        const { thumbnailsurl, shortdesc, title, price, funceffect, buyCount, showSub, showCheck, checked } = this.props;
        const needShowSub = showSub && buyCount && buyCount > 0;
        return (React.createElement(native_base_1.ListItem, { style: { marginHorizontal: 3, marginVertical: 0, paddingVertical: 2 } },
            showCheck ? React.createElement(native_base_1.CheckBox, { checked: checked, onPress: this.onCheckChange }) : null,
            React.createElement(native_base_1.Thumbnail, { source: { uri: "default_th" }, style: { marginLeft: 10 } }),
            React.createElement(native_base_1.Body, null,
                React.createElement(native_base_1.Text, null, title),
                React.createElement(native_base_1.Text, { style: { flex: 1, paddingHorizontal: 10 }, note: true }, funceffect),
                React.createElement(react_native_1.View, { style: { flexDirection: "row", marginTop: 10, alignItems: "center" } },
                    React.createElement(native_base_1.Text, null, funcs_1.formatMoney(price || 0)),
                    React.createElement(native_base_1.Text, { note: true, style: { flex: 1 } }, shortdesc),
                    needShowSub ? (React.createElement(native_base_1.Button, { iconLeft: true, onPress: this.onSubItem, transparent: true },
                        React.createElement(native_base_1.Icon, { style: Config_1.Config.styles.addCircle, name: "remove-circle" }))) : null,
                    needShowSub ? (React.createElement(native_base_1.Text, null, buyCount)) : null,
                    React.createElement(native_base_1.Button, { onPress: this.onAddItem, transparent: true },
                        React.createElement(native_base_1.Icon, { style: Config_1.Config.styles.addCircle, name: "add-circle" }))))));
    }
}
exports.default = BuyItem11111111111;
//# sourceMappingURL=BuyItem.js.map