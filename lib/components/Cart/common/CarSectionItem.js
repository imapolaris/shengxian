"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
//import {checkItem} from "../../../actions/cart";
const react_native_1 = require("react-native");
const Config_1 = require("../../../config/Config");
const funcs_1 = require("../../../common/utils/funcs");
class CarSectionItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(native_base_1.View, { style: { flexDirection: 'row', paddingBottom: 10, paddingTop: 10, backgroundColor: Config_1.Config.ColorW, alignItems: 'center' } },
            React.createElement(react_native_1.TouchableOpacity, { style: { width: 40 }, onPress: () => { this.props.sectionClick(this.props.sectionID); } },
                React.createElement(native_base_1.View, { style: { width: 20, height: 30, justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(native_base_1.CheckBox, { onPress: () => {
                            this.props.sectionClick(this.props.sectionID);
                        }, checked: this.props.sectionData.select, color: Config_1.Config.ColorG3c }))),
            React.createElement(native_base_1.Text, { style: { marginLeft: 15, fontSize: Config_1.Config.Font08125, color: Config_1.Config.ColorB333 } }, "\u5168\u9009"),
            React.createElement(native_base_1.Text, { style: { marginLeft: 5, color: Config_1.Config.ColorOf8, fontSize: Config_1.Config.Font08125, textAlign: 'center' } },
                "\u6EE1\uFFE5",
                funcs_1.formatMoneyEx(Config_1.Config.NOPEISONGRMBMIN),
                "\u5143\u514D\u8FD0\u8D39")));
    }
}
exports.default = CarSectionItem;
//# sourceMappingURL=CarSectionItem.js.map