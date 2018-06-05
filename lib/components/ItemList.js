"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const ViewItem_1 = require("./ViewItem");
const react_native_1 = require("react-native");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const MyStatusBar_1 = require("./MyStatusBar");
const PropTypes = require("prop-types");
const Config_1 = require("../config/Config");
const RouterDefine_1 = require("../constants/RouterDefine");
const goback = require("../../images/goback.png");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    getItemDynamic(id) {
        return this.props.itemDynamics.data.find((item) => item.id == id);
    }
    getItemDynamicPrice(id) {
        let dynamic = this.getItemDynamic(id);
        let price = dynamic ? dynamic.price : 10000;
        return price;
    }
    render() {
        let items = this.context.router.route.location.state.orderlist;
        let from = this.context.router.route.location.state.from;
        let bshowDynamicPrice = (from != RouterDefine_1.ORDERDETAIL) ? true : false;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(react_native_1.View, { style: { flexDirection: 'row', width: '100%', height: Config_1.Config.HeadHeight,
                    justifyContent: 'space-between', alignItems: 'center', backgroundColor: Config_1.Config.ColorW } },
                React.createElement(react_native_1.View, { style: { width: '20%', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(native_base_1.Button, { transparent: true, onPress: () => { this.props.history && this.props.history.goBack(); } },
                        React.createElement(react_native_1.Image, { source: goback, style: { width: Config_1.px2dp(23), height: Config_1.px2dp(23), marginLeft: 16 } }))),
                React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorB333, fontSize: Config_1.Config.Font1125, marginLeft: -20 } }, "\u5546\u54C1\u6E05\u5355")),
                React.createElement(react_native_1.View, { style: { marginRight: 20, width: '20%', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(react_native_1.Text, { style: { textAlign: 'right', marginRight: 16, fontSize: Config_1.Config.Font0875 } },
                        "共" + items.length + "件",
                        " "))),
            React.createElement(react_native_1.View, { style: { height: 10, backgroundColor: '#f3f3f3' } }),
            React.createElement(native_base_1.List, { dataArray: items, renderRow: (item) => {
                    return React.createElement(ViewItem_1.default, { Item: item, DynamicPrice: bshowDynamicPrice ? this.getItemDynamicPrice(item.item_id) : item.price });
                } })));
    }
}
ItemList.contextTypes = {
    router: PropTypes.object
};
exports.default = ItemList;
//# sourceMappingURL=ItemList.js.map