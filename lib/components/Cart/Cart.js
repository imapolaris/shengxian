"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const CartBuyItem_1 = require("./common/CartBuyItem");
const react_native_1 = require("react-native");
const funcs_1 = require("../../common/utils/funcs");
const RouterDefine_1 = require("../../constants/RouterDefine");
const react_router_1 = require("react-router");
const CarSectionItem_1 = require("./common/CarSectionItem");
const Config_1 = require("../../config/Config");
const Config_2 = require("../../config/Config");
const _ = require("lodash");
const iOSScreenAuto_1 = require("../../constants/iOSScreenAuto");
const CartBuyItemWithRouter = react_router_1.withRouter(CartBuyItem_1.default);
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPrice: 0
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.isSectionSelected = this.isSectionSelected.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onSubItem = this.onSubItem.bind(this);
        this.onSectionSelected = this.onSectionSelected.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.isItemChecked = this.isItemChecked.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.reCalcAllPrice = this.reCalcAllPrice.bind(this);
        this.onSubmitOrder = this.onSubmitOrder.bind(this);
        this.getItemDynamic = this.getItemDynamic.bind(this);
    }
    componentDidMount() {
        this.reCalcAllPrice(this.props);
        //tab切换的时候调用
        react_native_1.DeviceEventEmitter.addListener('CartReload', () => {
            if (this.props.logined && (!this.props.carts || this.props.carts.length <= 0)) {
                this.props.fetchCarts(this.props.version, true);
            }
            else {
                this.props.fetchCarts(this.props.version, false); //这里有问题 5秒后没有请求
            }
        });
        //刷新购物车
        if (this.props.logined && (!this.props.carts || this.props.carts.length <= 0)) {
            this.props.fetchCarts(this.props.version, true);
        }
        else {
            this.props.fetchCarts(this.props.version, false); //这里有问题 5秒后没有请求
        }
        this.props.fetchItemDynamic(this.props.itemDynamics.version, false);
    }
    componentWillReceiveProps(nextProps) {
        this.reCalcAllPrice(nextProps);
    }
    reCalcAllPrice(props) {
        let { items, carts } = props;
        let { selected } = props.ui;
        let allPrice = _.reduce(selected, (sum, id) => {
            do {
                let itemData = items[id];
                if (!itemData)
                    break;
                let cart = carts.find((cart) => cart.id == id);
                if (!cart)
                    break;
                let dynamic = this.getItemDynamic(cart.id);
                let price = dynamic ? dynamic.price : 10000;
                return sum + price * cart.count;
            } while (false);
            return sum;
        }, 0);
        this.setState({ allPrice });
    }
    onDeleteConfirm() {
        let { selected } = this.props.ui;
        this.props.unSelectCartsItems(selected);
        this.props.deleteCartItem(selected);
    }
    isSectionSelected(id) {
        let { carts } = this.props;
        let { selected } = this.props.ui;
        return carts.length <= selected.length;
    }
    onAddItem(cart) {
        let { items, carts, itemDynamics } = this.props;
        if (!funcs_1.canAddToCart(items[cart.id], this.getItemDynamic(cart.id), carts))
            return;
        this.props.editCartItem({ id: cart.id, count: cart.count + 1 }, false);
    }
    getItemDynamic(id) {
        return this.props.itemDynamics.data.find((item) => item.id == id);
    }
    onSubItem(cart) {
        if (cart.count <= 1) {
            this.props.deleteCartItem([cart.id]);
            this.props.unSelectCartsItems([cart.id]);
        }
        else {
            this.props.editCartItem({ id: cart.id, count: cart.count - 1 }, false);
        }
    }
    onSectionSelected(id) {
        let { carts } = this.props;
        let { selected } = this.props.ui;
        if (this.isSectionSelected(id)) {
            // 取消全选
            this.props.unSelectCartsItems(selected);
        }
        else {
            // 全选
            this.props.selectCartsItems(_.map(carts, (cart) => cart.id));
        }
    }
    onSelected(id) {
        if (this.isItemChecked(id)) {
            this.props.unSelectCartsItems([id]);
        }
        else {
            this.props.selectCartsItems([id]);
        }
    }
    isItemChecked(id) {
        let { selected } = this.props.ui;
        return _.includes(selected, id);
    }
    onSubmitOrder() {
        let { items, carts } = this.props;
        let { selected } = this.props.ui;
        let orders = _.map(selected, (id) => {
            do {
                let itemData = items[id];
                if (!itemData)
                    break;
                let cart = carts.find((cart) => cart.id == id);
                if (!cart)
                    break;
                return {
                    itemcnt: cart.count,
                    item_id: cart.id,
                    price: itemData.price,
                    title: itemData.title,
                    shortdesc: itemData.shortdesc,
                    thumbnailsurl: itemData.thumbnailsurl,
                    bigimgurl: itemData.bigimgurl,
                    description: itemData.description,
                    marketprice: itemData.marketprice,
                    costprice: itemData.costprice,
                    saleprice: itemData.saleprice,
                };
            } while (false);
            return {
                itemcnt: 0,
                item_id: 0,
                price: 0,
                title: "",
                shortdesc: "",
                thumbnailsurl: "",
                bigimgurl: "",
                description: "",
                marketprice: 0,
                costprice: 0,
                saleprice: 0,
            };
        }).filter((item) => item.item_id > 0);
        if (orders.length > 0) {
            this.props.setSubmitOrderItems(orders);
            this.props.history.push(RouterDefine_1.SUBMITORDER, { from: RouterDefine_1.MAIN_CART });
        }
        else {
            Config_2.MyToast(2000, "请选择商品后再结算");
        }
    }
    onDelete() {
        let { carts } = this.props;
        let { selected } = this.props.ui;
        if (carts.length == 0)
            return;
        if (selected.length > 0) {
            // 所有的选中状态的物品，全部删除，剩下的全部设置为 选中
            react_native_1.Alert.alert('提示', '确定删除勾选的商品吗？', [
                {
                    text: '取消',
                    onPress: () => { }
                },
                {
                    text: '确定',
                    onPress: () => { this.onDeleteConfirm(); }
                }
            ]);
        }
    }
    render() {
        let { carts, items } = this.props;
        let { selected } = this.props.ui;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(react_native_1.StatusBar, { backgroundColor: 'transparent', translucent: true, barStyle: 'dark-content' }),
            React.createElement(react_native_1.View, { style: { flexDirection: 'row', width: '100%', height: 44, marginTop: iOSScreenAuto_1.StatusBar_Height,
                    justifyContent: 'space-between', alignItems: 'center', backgroundColor: Config_1.Config.ColorW } },
                React.createElement(react_native_1.View, { style: { width: '20%' } }),
                React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorB333, fontSize: Config_1.Config.Font1125 } }, "\u8D2D\u7269\u8F66")),
                React.createElement(react_native_1.View, { style: { width: '20%', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(native_base_1.Button, { transparent: true, onPress: () => { this.onDelete(); } },
                        React.createElement(native_base_1.Text, { style: { color: selected.length > 0 ? Config_1.Config.ColorG2e : Config_1.Config.ColorB999 } }, "\u5220\u9664")))),
            React.createElement(react_native_1.View, { style: { height: 8, backgroundColor: '#f3f3f3' } }),
            React.createElement(native_base_1.Content, null,
                React.createElement(native_base_1.List, null,
                    React.createElement(react_native_1.View, null,
                        React.createElement(CarSectionItem_1.default, { sectionID: 0, sectionData: { select: this.isSectionSelected(0), id: 0, title: "" }, sectionClick: (i) => {
                                this.onSectionSelected(i);
                            } }),
                        React.createElement(react_native_1.View, { style: { height: 1, backgroundColor: '#e8e8e8' } }),
                        carts.map((cart, i) => {
                            let itemData = items[cart.id];
                            return React.createElement(native_base_1.ListItem, { key: i, style: { marginLeft: 0, paddingLeft: 10 } },
                                React.createElement(CartBuyItemWithRouter, { sectionID: 0, checked: this.isItemChecked(cart.id), dynamic: this.getItemDynamic(cart.id), itemID: cart.id, count: cart.count, itemData: itemData, onAddItem: (itemIndex) => {
                                        this.onAddItem(cart);
                                    }, onSubItem: (itemIndex) => {
                                        this.onSubItem(cart);
                                    }, checkItem: (itemIndex) => {
                                        this.onSelected(cart.id);
                                    } }));
                        })))),
            React.createElement(native_base_1.Footer, { style: { alignItems: "center", height: Config_1.IS_IPHONE_X() ? 40 + 24 : 40, backgroundColor: 'white' } },
                React.createElement(react_native_1.View, { style: { flex: 1 } },
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', flex: 1 } },
                        React.createElement(react_native_1.View, { style: { flex: 1, flexDirection: "row", height: 40, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 30 } },
                            React.createElement(native_base_1.Text, { style: { marginLeft: 10 } }, "\u5546\u54C1\u5408\u8BA1\uFF1A"),
                            React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorB666 } },
                                "\uFFE5",
                                funcs_1.formatMoney(this.state.allPrice)),
                            ((this.state.allPrice >= Config_1.Config.NOPEISONGRMBMIN) || (this.state.allPrice == 0)) ?
                                React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorB666, marginLeft: 3 }, note: true }, "(\u514D\u8FD0\u8D39)") :
                                React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorB666, marginLeft: 3 }, note: true },
                                    "(\u8FD0\u8D39",
                                    funcs_1.formatMoneyEx(Config_1.Config.PEISONGRMB),
                                    "\u5143)")),
                        React.createElement(react_native_1.TouchableOpacity, { style: { backgroundColor: Config_1.Config.ColorOff, height: 40, paddingVertical: 10, paddingHorizontal: 30 }, onPress: this.onSubmitOrder },
                            React.createElement(native_base_1.Text, { style: { color: 'white', fontSize: Config_1.Config.Font1125 } }, "\u53BB\u7ED3\u7B97")))))));
    }
}
exports.default = Cart;
//# sourceMappingURL=Cart.js.map