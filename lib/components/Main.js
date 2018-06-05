"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
// import Category from "./Category/Category";
// import My from "./My";
const HomeContainer_1 = require("../containers/HomeContainer");
const CategoryContainer_1 = require("../containers/CategoryContainer");
const RouterDefine_1 = require("../constants/RouterDefine");
const CartContainer_1 = require("../containers/CartContainer");
const PropTypes = require("prop-types");
const react_native_1 = require("react-native");
const ErrorPageContainer_1 = require("../containers/ErrorPageContainer");
const Config_1 = require("../config/Config");
const my1 = require("../../images/my1.png");
const my2 = require("../../images/my2.png");
const home1 = require("../../images/home1.png");
const home2 = require("../../images/home2.png");
const cart1 = require("../../images/cart1.png");
const cart2 = require("../../images/cart2.png");
const category1 = require("../../images/category1.png");
const category2 = require("../../images/category2.png");
const react_native_tab_navigator_1 = require("react-native-tab-navigator");
const TabItem = react_native_tab_navigator_1.default.Item;
//const  HomeWithRouter= withRouter(HomeContainer);
//const  CategoryWithRouter= withRouter(CategoryContainer);
const CartWithRouter = react_router_1.withRouter(CartContainer_1.default);
const MyWithRouter = react_router_1.withRouter(CategoryContainer_1.MyContainer);
const ErrorWithRouter = react_router_1.withRouter(ErrorPageContainer_1.default);
const SCREEN_WIDTH = react_native_1.Dimensions.get('window').width;
//<switch/>
//<footer/>
const homeTabs = [
    { path: RouterDefine_1.MAIN, name: "首页", icon1: home1, icon2: home2 },
    { path: RouterDefine_1.MAIN_CATEGORY, name: "分类", icon1: category1, icon2: category2 },
    { path: RouterDefine_1.MAIN_CART, name: "购物车", icon1: cart1, icon2: cart2 },
    { path: RouterDefine_1.MAIN_MY, name: "我的", icon1: my1, icon2: my2 }
];
let g_index = 1;
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldTab: "home",
            selectedTab: Config_1.MainHelper.selectedTab ? Config_1.MainHelper.selectedTab : 'home'
        };
        // this.onChangePage = this.onChangePage.bind(this);
        // this.GetColor = this.GetColor.bind(this);
        // this.GetImage = this.GetImage.bind(this);
    }
    onChangeTab(selectedTab) {
        this.setState({
            oldTab: this.state.selectedTab,
            selectedTab
        });
    }
    componentDidMount() {
        // if (MainHelper.selectedTab) {
        //
        //     this.setState({
        //         selectedTab: MainHelper.selectedTab
        //     })
        // }
    }
    componentWillUnmount() {
        Config_1.MainHelper.selectedTab = this.state.selectedTab;
    }
    render() {
        let { cartCount, logged, navigation } = this.props;
        return (React.createElement(react_native_tab_navigator_1.default, { tabBarStyle: { height: Config_1.IS_IPHONE_X() ? 24 + 49 : 49, paddingBottom: Config_1.IS_IPHONE_X() ? 24 : 0 } },
            React.createElement(TabItem, { selected: this.state.selectedTab === "home", title: "\u9996\u9875", selectedTitleStyle: { color: Config_1.Config.ColorG3c }, renderIcon: () => React.createElement(react_native_1.Image, { source: home2, style: styles.img }), renderSelectedIcon: () => React.createElement(react_native_1.Image, { source: home1, style: styles.img }), onPress: () => {
                    this.onChangeTab('home');
                    react_native_1.DeviceEventEmitter.emit('HomeReload');
                } },
                React.createElement(HomeContainer_1.default, { navigation: navigation })),
            React.createElement(TabItem, { selected: this.state.selectedTab === "category", title: "\u5206\u7C7B", selectedTitleStyle: { color: Config_1.Config.ColorG3c }, renderIcon: () => React.createElement(react_native_1.Image, { source: category2, style: styles.img }), renderSelectedIcon: () => React.createElement(react_native_1.Image, { source: category1, style: styles.img }), onPress: () => {
                    this.onChangeTab('category');
                    react_native_1.DeviceEventEmitter.emit('CategoryReload');
                } },
                React.createElement(CategoryContainer_1.default, { navigation: navigation })),
            React.createElement(TabItem, { selected: this.state.selectedTab === "cart", title: "\u8D2D\u7269\u8F66", selectedTitleStyle: { color: Config_1.Config.ColorG3c }, renderIcon: () => React.createElement(react_native_1.Image, { source: cart2, style: styles.img }), renderSelectedIcon: () => React.createElement(react_native_1.Image, { source: cart1, style: styles.img }), onPress: () => {
                    // this.onChangeTab.bind(this, "cart")
                    this.onChangeTab('cart');
                    react_native_1.DeviceEventEmitter.emit('CartReload');
                }, renderBadge: () => cartCount > 0 ? React.createElement(native_base_1.Badge, { info: true, style: { backgroundColor: Config_1.Config.ColorOff, marginTop: 2, height: 20 } },
                    React.createElement(react_native_1.Text, { style: { color: 'white' } }, cartCount)) : React.createElement(react_native_1.View, null) },
                React.createElement(CartWithRouter, null)),
            React.createElement(TabItem, { selected: this.state.selectedTab === "person", title: "\u6211\u7684", selectedTitleStyle: { color: Config_1.Config.ColorG3c }, renderIcon: () => React.createElement(react_native_1.Image, { source: my2, style: styles.img }), renderSelectedIcon: () => React.createElement(react_native_1.Image, { source: my1, style: styles.img }), 
                // onPress={this.onChangeTab.bind(this, "person")}
                onPress: () => {
                    // this.onChangeTab.bind(this, "person")
                    this.onChangeTab('person');
                    react_native_1.DeviceEventEmitter.emit('MyReload');
                } }, logged ? React.createElement(MyWithRouter, null) : React.createElement(react_router_1.Redirect, { to: { pathname: RouterDefine_1.LOGIN, state: { tab: this.state.oldTab } }, push: true }))));
    }
}
Main.contextTypes = {
    router: PropTypes.object
};
exports.default = Main;
const styles = react_native_1.StyleSheet.create({
    img: {
        height: 25,
        width: 25,
    }
});
//# sourceMappingURL=Main.js.map