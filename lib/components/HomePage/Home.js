"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const EntitiesState_1 = require("../../store/EntitiesState");
const RouterDefine_1 = require("../../constants/RouterDefine");
const funcs_1 = require("../../common/utils/funcs");
/*首页 - 页面相关控件*/
const HomeTopBar_1 = require("./common/HomeTopBar");
const TopBanner_1 = require("../TopBanner");
const HomeItem_1 = require("./common/HomeItem");
const HomeChangeShop_1 = require("./common/HomeChangeShop");
const CategoryRightItem_1 = require("../../components/Category/common/CategoryRightItem");
const Config_1 = require("../../config/Config");
const home_top = require("../../../images/home_top.png");
const screenWidth = react_native_1.Dimensions.get('window').width;
const SCREEN_HEIGHT = react_native_1.Dimensions.get('window').height;
const SCREEN_WIDTH = react_native_1.Dimensions.get('window').width;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            top: new react_native_1.Animated.Value(0),
            left: new react_native_1.Animated.Value(0),
            uri: ''
        };
        this.startAnimation = (top, left) => {
            this.state.top.setValue(top);
            this.state.left.setValue(left);
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(this.state.top, {
                    toValue: SCREEN_HEIGHT,
                    easing: react_native_1.Easing.linear,
                    duration: 1000,
                }),
                react_native_1.Animated.timing(this.state.left, {
                    toValue: SCREEN_WIDTH * 3 / 4 - 50,
                    easing: react_native_1.Easing.bezier(0, .16, 0, .85),
                    duration: 1000,
                })
            ]).start(() => {
                console.log('kaishi');
            });
        };
        this.renderItem = this.renderItem.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.addItem = this.addItem.bind(this);
        this.getItemDynamic = this.getItemDynamic.bind(this);
        this.bannerClick = this.bannerClick.bind(this);
    }
    componentDidMount() {
        // if(!this.props.locate || !this.props.locate.name || this.props.locate.name.length < 0){
        //     this.props.startGpsLocation();
        //     return;
        // }
        //tab切换的时候调用
        react_native_1.DeviceEventEmitter.addListener('HomeReload', () => {
            console.log('DeviceEventEmitter');
            this.onRefreshData();
        });
        // console.log("this.props.topBanner",this.props.topBanner);
        this.onRefreshData();
    }
    onRefreshData() {
        //没有数据强制刷新
        if (!this.props.topBanner || this.props.topBanner.data.length <= 0) {
            this.props.fetchTopbanner(this.props.topBanner.version, true);
        }
        else {
            this.props.fetchTopbanner(this.props.topBanner.version, false);
        }
        if (!this.props.saleItem.data || this.props.saleItem.data.length <= 0) {
            this.props.fetchSaleItem(this.props.saleItem.version, true);
        }
        else {
            this.props.fetchSaleItem(this.props.saleItem.version, false);
        }
        if (this.props.logged && (!this.props.carts || this.props.carts.carts.length <= 0)) {
            this.props.fetchCarts(this.props.carts.version, true);
        }
        else {
            this.props.fetchCarts(this.props.carts.version, false);
        }
        if (this.props.logged && (!this.props.itemDynamics || this.props.itemDynamics.data.length <= 0)) {
            this.props.fetchItemDynamic(this.props.itemDynamics.version, true);
        }
        else {
            this.props.fetchItemDynamic(this.props.itemDynamics.version, false);
        }
    }
    getAddress() {
        return this.props.locate && this.props.locate.name || "";
    }
    addItem(item, e) {
        console.log('asdasdas' + Config_1.Config.DomainName + '/' + (item && item.thumbnailsurl || ""));
        let { id } = item;
        if (!funcs_1.canAddToCart(item, this.getItemDynamic(item.id), this.props.carts.carts))
            return;
        let cart = this.props.carts.carts.find((val) => val.id === id);
        if (!!e) {
            // this.start()
            const target = e.currentTarget;
            react_native_1.UIManager.measure(target, (x, y, width, height, winx, winy) => {
                console.log(target + ' : ' + x + ' : ' + y + ' : ' + ' : ' + width + ' : ' + height + ' : ' + winx + ' : ' + winy);
                this.setState({
                    uri: (Config_1.Config.DomainName + '/' + (item && item.thumbnailsurl || ""))
                });
                this.startAnimation(winy, winx);
            });
            // this.refs.animatedView.press(e,Config.DomainName + '/' +(initItems[id]&&initItems[id].thumbnailsurl || ""));
        }
        setTimeout(() => {
            if (!cart) {
                this.props.addCartItem({ id, count: 1 });
            }
            else {
                console.log("edit cart", cart, { id, count: cart.count + 1 });
                this.props.editCartItem({ id, count: cart.count + 1 });
            }
        });
    }
    getItemDynamic(id) {
        return this.props.itemDynamics.data.find((item) => item.id == id);
    }
    /*item*/
    renderItem(itemEx) {
        let item = EntitiesState_1.initItems[itemEx.item_id];
        return item ? React.createElement(CategoryRightItem_1.default, { key: item.id, item: item, addItemClick: (e) => this.addItem(item, e), itemClick: () => {
                let section = { id: 2, title: '上海真美味餐厅', select: true };
                this.props.navigation && this.props.navigation.navigate(RouterDefine_1.NavScreenKey.CategoryDetail, { section: section, item: item, dynamic: this.getItemDynamic(item.id) });
            }, isHome: true }) : React.createElement(react_native_1.View, null);
    }
    renderItemNew(item) {
        return item ? React.createElement(HomeItem_1.default, { item: item, dynamic: this.getItemDynamic(item.id), addItemClick: (e) => this.addItem(item, e), itemClick: () => {
                let section = { id: 2, title: '上海真美味餐厅', select: true };
                this.props.navigation && this.props.navigation.navigate(RouterDefine_1.NavScreenKey.CategoryDetail, { section: section, item: item, dynamic: this.getItemDynamic(item.id) });
            } }) : React.createElement(react_native_1.View, null);
    }
    renderItemNewEx(item1, item2) {
        return React.createElement(react_native_1.View, { style: { flex: 1, height: 270, backgroundColor: Config_1.Config.ColorBf4 }, key: item1.id },
            React.createElement(react_native_1.View, { style: { flex: 1, flexDirection: 'row', backgroundColor: Config_1.Config.ColorW, height: 120,
                    marginLeft: 10, marginRight: 10, marginBottom: 10 } },
                this.renderItemNew(item1),
                React.createElement(react_native_1.View, { style: { width: 10, backgroundColor: Config_1.Config.ColorBf4 } }),
                item2 ? this.renderItemNew(item2) : React.createElement(react_native_1.View, { style: { flex: 1, backgroundColor: Config_1.Config.ColorBf4 } })));
    }
    renderItemNewEx2() {
        let rows = [];
        let length = this.props.saleItem.data.length;
        let len = Math.ceil(length / 2);
        for (var i = 0; i < len; ++i) {
            let pos1 = 2 * i;
            let pos2 = 2 * i + 1;
            let item1 = EntitiesState_1.initItems[this.props.saleItem.data[pos1].item_id];
            let item2 = undefined;
            if (pos2 < length) {
                item2 = EntitiesState_1.initItems[this.props.saleItem.data[pos2].item_id];
            }
            rows.push(this.renderItemNewEx(item1, item2));
        }
        return rows;
    }
    bannerClick(linkurl) {
        if (!this.props.history || !linkurl)
            return;
        let path = this.props.history.location.pathname;
        if (linkurl == RouterDefine_1.LOGIN && this.props.logged)
            return;
        if (linkurl != path) {
            this.props.history.push(linkurl);
        }
    }
    render() {
        return (React.createElement(native_base_1.Container, { style: styles.container },
            React.createElement(react_native_1.StatusBar, { backgroundColor: 'transparent', translucent: true, barStyle: 'light-content' }),
            React.createElement(react_native_1.ImageBackground, { source: home_top, style: { height: Config_1.IS_IPHONE_X() ? 22 + 64 : 64 }, resizeMode: 'cover' },
                React.createElement(HomeTopBar_1.default, { address: this.getAddress(), addressClick: () => { this.props.navigation && this.props.navigation.navigate(RouterDefine_1.NavScreenKey.AddrList, { from: RouterDefine_1.MAIN_MY }); }, searchClick: () => { this.props.navigation && this.props.navigation.navigate(RouterDefine_1.NavScreenKey.Search); } })),
            React.createElement(native_base_1.Content, null,
                React.createElement(TopBanner_1.HomeBanner, { item: this.props.topBanner.data, imageHeight: Config_1.px2dp(150), autoplay: true, address: this.getAddress(), indexClick: this.bannerClick, indexChange: (index) => { }, addressClick: () => { this.props.history && this.props.history.push(RouterDefine_1.ADDRLIST, { from: RouterDefine_1.MAIN }); }, searchClick: () => { this.props.history && this.props.history.push(RouterDefine_1.SEARCH, { from: RouterDefine_1.MAIN }); } }),
                React.createElement(HomeChangeShop_1.default, { changeClick: () => { this.props.history && this.props.history.push(RouterDefine_1.SHOPLIST); }, shopName: this.props.shopTitle }),
                React.createElement(react_native_1.View, { style: { height: 10, backgroundColor: Config_1.Config.ColorBf4 } }),
                this.renderItemNewEx2()),
            this.state.uri ?
                React.createElement(react_native_1.Animated.Image, { source: { uri: this.state.uri }, style: { width: 24, height: 24, borderRadius: 12, position: 'absolute', top: this.state.top, left: this.state.left } })
                : null));
    }
}
exports.default = Home;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    addressStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 15,
        height: Config_1.Config.SearchHeight,
        paddingLeft: 10,
        width: screenWidth / 2 - 30,
    },
    textStyle: {
        fontSize: 15,
        marginLeft: 5,
    },
    searchStyle: {
        backgroundColor: Config_1.Config.ColorBf2,
        marginLeft: 10,
        marginRight: 10,
        height: Config_1.Config.SearchHeight,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth / 2,
        borderRadius: 15
    },
});
//# sourceMappingURL=Home.js.map