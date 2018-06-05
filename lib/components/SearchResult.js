"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const MyStatusBar_1 = require("./MyStatusBar");
// import {Util} from "../common/utils/util";
const pichead = { uri: "screen" };
const DataUtil_1 = require("./Category/interfaceUtil/DataUtil");
const CategoryRightItem_1 = require("./Category/common/CategoryRightItem");
const RouterDefine_1 = require("../constants/RouterDefine");
const Config_1 = require("../config/Config");
const cart2 = require("../../images/cart2.png");
const goback = require("../../images/goback.png");
const search_h = require("../../images/search_h.png");
const SCREEN_WIDTH = react_native_1.Dimensions.get('window').width;
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: Config_1.Config.ColorW, height: Config_1.Config.HeadHeight },
    body: { flexDirection: "row", flex: 1 },
    // fonttxt: {color:'#000', fontSize:15 },
    fonticon: { color: Config_1.Config.ColorB999, fontSize: 20 },
});
//f4f4f4
exports.saddr = react_native_1.StyleSheet.create({
    bk: { backgroundColor: '#f4f4f4' },
    btndel: { backgroundColor: '#fff' },
    fonticon: { color: 'dimgray', fontSize: 15, height: 20, width: 20 },
    // fonttxt: {backgroundColor:'#f4f4f4',   borderRadius:5},
    fontbtn: { backgroundColor: 'transparent', margin: 5, height: 25, borderWidth: 1,
        borderRadius: 10, borderColor: 'lightgray' },
});
class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.startAnimation = (top, right) => {
            this.state.top.setValue(top);
            this.state.right.setValue(right);
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(this.state.top, {
                    toValue: Config_1.px2dp(25),
                    easing: react_native_1.Easing.linear,
                    duration: 1000,
                }),
                react_native_1.Animated.timing(this.state.right, {
                    toValue: 15,
                    easing: react_native_1.Easing.bezier(.23, .01, .71, .27),
                    duration: 1000,
                })
            ]).start(() => {
                console.log('abcabc');
                this.setState({
                    uri: ''
                });
            });
        };
        this.state = {
            title: this.props.navigation.state.params.title,
            shistory: [],
            top: new react_native_1.Animated.Value(0),
            right: new react_native_1.Animated.Value(0),
            uri: ''
        };
        this.getItemDynamic = this.getItemDynamic.bind(this);
    }
    addItem(item, e) {
        const target = e.currentTarget;
        react_native_1.UIManager.measure(target, (x, y, width, height, winx, winy) => {
            console.log(target + ' : ' + x + ' : ' + y + ' : ' + ' : ' + width + ' : ' + height + ' : ' + winx + ' : ' + winy);
            this.setState({
                uri: (Config_1.Config.DomainName + '/' + (item && item.thumbnailsurl || ""))
            });
            this.startAnimation(winy, SCREEN_WIDTH - winx);
        });
        let cart = this.props.carts.find((val) => val.id === item.id);
        if (!cart) {
            this.props.addCartItem({ id: item.id, count: 1 });
        }
        else {
            this.props.editCartItem({ id: item.id, count: cart.count + 1 });
        }
    }
    getItemDynamic(id) {
        return this.props.itemDynamics.data.find((item) => item.id == id);
    }
    render() {
        let rightDataSource = (this.state.title.length == 0) ? [] : DataUtil_1.searchItem(this.state.title);
        let cartCount = this.props.carts.length;
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(native_base_1.View, { style: { height: 3, backgroundColor: Config_1.Config.ColorBf4, marginTop: Config_1.Config.HeadHeight } }),
            React.createElement(native_base_1.List, { style: { marginBottom: Config_1.IS_IPHONE_X() ? 24 : 0 }, dataArray: rightDataSource, renderRow: (item) => {
                    return React.createElement(CategoryRightItem_1.default, { key: item.id, item: item, dynamic: this.getItemDynamic(item.id), addItemClick: (e) => { this.addItem(item, e); }, itemClick: () => {
                            let section = { id: 2, title: '上海真美味餐厅', select: true };
                            this.props.navigation && this.props.navigation.navigate(RouterDefine_1.NavScreenKey.CategoryDetail, { section: section, item: item, dynamic: this.getItemDynamic(item.id) });
                        }, isHome: true });
                } }),
            this.state.uri ?
                React.createElement(react_native_1.Animated.Image, { source: { uri: this.state.uri }, style: { width: 24, height: 24, borderRadius: 12, position: 'absolute', top: this.state.top, right: this.state.right } })
                : null,
            React.createElement(native_base_1.View, { style: { width: '100%', height: Config_1.IS_IPHONE_X() ? 88 : 64, paddingTop: Config_1.IS_IPHONE_X() ? 44 : 20, backgroundColor: Config_1.Config.ColorW,
                    flexDirection: 'row', marginRight: 10, alignItems: 'flex-end', position: 'absolute', top: 0, left: 0, right: 0 } },
                React.createElement(native_base_1.Button, { transparent: true, onPress: () => { this.props.history.push(this.props.location.state.from); } },
                    React.createElement(react_native_1.Image, { source: goback, style: { width: Config_1.px2dp(23), height: Config_1.px2dp(23), marginLeft: 16, marginTop: 5, marginRight: 5 } })),
                React.createElement(native_base_1.Button, { style: { flex: 1, height: Config_1.Config.SearchHeight, flexDirection: 'row', alignItems: 'center', width: '83%',
                        backgroundColor: Config_1.Config.ColorBf2, borderRadius: 15, marginRight: 10, marginTop: 10 } },
                    React.createElement(react_native_1.Image, { source: search_h, style: { height: 20, width: 20, alignItems: 'center', justifyContent: 'center', marginRight: -1, marginLeft: 10, marginTop: 2 }, resizeMode: 'contain' }),
                    React.createElement(native_base_1.Input, { style: { fontSize: Config_1.Config.Font0875, color: Config_1.Config.ColorB999, textAlign: 'left', marginLeft: 0, justifyContent: 'center', alignItems: 'center' }, placeholder: this.state.title, value: this.state.title, onChangeText: (text) => this.setState({ title: text }), onFocus: () => { this.props.history.push(RouterDefine_1.SEARCH, { from: this.props.location.state.from, from2: RouterDefine_1.SEARCHRESULT }); } })),
                React.createElement(native_base_1.View, { style: { backgroundColor: 'transparent', width: 40, paddingRight: 10 } },
                    React.createElement(native_base_1.FooterTab, { style: { backgroundColor: 'transparent' } },
                        React.createElement(native_base_1.Button, { style: { width: 50, backgroundColor: 'transparent' }, vertical: true, onPress: () => { this.props.history.push(RouterDefine_1.MAIN_CART); }, badge: cartCount > 0 },
                            cartCount > 0 ? React.createElement(native_base_1.Badge, { info: true, style: { backgroundColor: Config_1.Config.ColorOff, position: 'absolute', top: 0, left: 12 } },
                                React.createElement(native_base_1.Text, null, cartCount)) : null,
                            React.createElement(react_native_1.Image, { source: cart2, style: { width: 25, height: 25 } })))))));
    }
}
exports.default = SearchResult;
//# sourceMappingURL=SearchResult.js.map