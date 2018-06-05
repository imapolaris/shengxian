"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const Config_1 = require("../../config/Config");
const RouterDefine_1 = require("../../constants/RouterDefine");
const TopBanner_1 = require("../TopBanner");
const detailInfoItem_1 = require("./common/detailInfoItem");
const detailSubInfo_1 = require("./common/detailSubInfo");
const MyStatusBar_1 = require("../MyStatusBar");
const Config_2 = require("../../config/Config");
const funcs_1 = require("../../common/utils/funcs");
const screenWidth = react_native_1.Dimensions.get('window').width;
const screenHeight = react_native_1.Dimensions.get('window').height;
const cart2 = require("../../../images/cart2.png");
const home2 = require("../../../images/home2.png");
const goback = require("../../../images/goback.png");
//http:\/\/shengxian.qiniu.zhangqing.site/upload\/image\/\u53f6\u83dc\u7c7b\/\u7d2b\u7518\u84dd \u7ea6800g.jpg
let pic2 = [
    "upload\/image\/\u53f6\u83dc\u7c7b\/\u7d2b\u7518\u84dd \u7ea6800g.jpg"
];
let pic1111 = ["\/upload\/image\/2018-04-16\/2cf666a32837899807a5ddb3fa2becdc.jpeg", "\/upload\/image\/2018-04-14\/93d7f4a3c0040bfcbf58bc52b9a893c2.jpeg"];
class CategoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.startAnimation = (bottom, left) => {
            this.state.bottom.setValue(bottom);
            this.state.left.setValue(left);
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(this.state.bottom, {
                    toValue: 1,
                    // easing:Easing.linear,
                    duration: 1000,
                }),
                react_native_1.Animated.timing(this.state.left, {
                    toValue: 1,
                    // easing:Easing.linear,
                    duration: 1000,
                })
            ]).start(() => {
                console.log('kaishi');
            });
        };
        this.state = {
            topViewOpacity: 0,
            webViewHeight: 500,
            bottom: new react_native_1.Animated.Value(0),
            left: new react_native_1.Animated.Value(0),
            uri: ''
        };
        this.addItem = this.addItem.bind(this);
    }
    componentDidMount() {
        this.setState({
            uri: Config_1.Config.DomainName + '/' + this.props.navigation.state.params.item.bigimgurl[0]
        });
        // this.refs.animatedView.press(e,Config.DomainName +'/' + this.props.location.state.item.bigimgurl[0]);
    }
    addItem(item, e) {
        console.log(e);
        let dynamic = this.props.navigation.state.params.dynamic;
        if (!funcs_1.canAddToCart(item, dynamic, this.props.carts))
            return;
        let { id } = item;
        // this.refs.animatedView.press(e,Config.DomainName +'/' + this.props.location.state.item.bigimgurl[0]);
        console.log('kasihishishishihsihisish');
        this.startAnimation(0, 0);
        let cart = this.props.carts.find((val) => val.id === id);
        //
        console.log('cart' + JSON.stringify(cart));
        if (!cart) {
            this.props.addCartItem({ id, count: 1 });
        }
        else {
            console.log("edit cart", cart, { id, count: cart.count + 1 });
            this.props.editCartItem({ id, count: cart.count + 1 });
        }
    }
    render() {
        const bottomValue = this.state.bottom.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [Config_2.px2dp(15), Config_2.px2dp(45), Config_2.px2dp(70), Config_2.px2dp(45), Config_2.px2dp(15)]
        });
        const leftValue = this.state.left.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [screenWidth * 4 / 5, screenWidth * 3 / 5, screenWidth * 2 / 5, screenWidth * 1 / 5, screenWidth / 10]
        });
        let cartCount = this.props.carts.length;
        let item = this.props.navigation.state.params.item;
        let dynamic = this.props.navigation.state.params.dynamic;
        let selectIndex = this.props.navigation.state.params.selectIndex;
        let selectProductIndex = this.props.navigation.state.params.selectProductIndex;
        console.log(JSON.stringify(selectIndex) + ' + ' + JSON.stringify(selectProductIndex));
        /*const font = this.state.fontValue.interpolate({
         inputRange: [0, 0.5, 1],
         outputRange: [16, 22, 16]
         });*/
        return (React.createElement(native_base_1.Container, { style: styles.container },
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(native_base_1.View, { style: { flexDirection: 'row' } },
                React.createElement(react_native_1.ScrollView, { ref: 'scrollView', style: styles.scrollStyle, scrollEventThrottle: 200, bounces: false, onScroll: (e) => {
                        if (e.nativeEvent.contentOffset.y == 0) {
                            this.setState({ topViewOpacity: 0.0 });
                        }
                        else if (e.nativeEvent.contentOffset.y > 0 && e.nativeEvent.contentOffset.y <= 400) {
                            this.setState({ topViewOpacity: e.nativeEvent.contentOffset.y / 400 });
                        }
                        else if (e.nativeEvent.contentOffset.y > 100) {
                            this.setState({ topViewOpacity: 1 });
                        }
                    } },
                    React.createElement(TopBanner_1.TopBanner, { item: item.bigimgurl, imageHeight: Config_2.px2dp(400), autoplay: false, indexClick: (linkurl) => { linkurl && this.props.navigation && this.props.history.push(linkurl); }, indexChange: (index) => { } }),
                    React.createElement(detailInfoItem_1.default, { item: item, dynamic: dynamic }),
                    React.createElement(detailSubInfo_1.default, { item: item }),
                    React.createElement(react_native_1.WebView, { style: { flex: 1, height: this.state.webViewHeight }, onMessage: (event) => {
                            // console.log( event.nativeEvent.data);
                            // this.setState({
                            //     webViewHeight: parseInt(event.nativeEvent.data)
                            //                                 // });
                        }, source: { html: `
<html>
<head>
<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>
<body>
<div id="rn_content">
 ${item.description}
 </div>

                                <style>img{width:100%;}*{padding:0;margin:0;}body{overflow: hidden}</style>
                                <script>
                                setInterval(function(){
                                     window.postMessage(document.getElementById('rn_content').clientHeight+"");
                                },500);
                                </script>
</body>
</html>

                            ` } }))),
            React.createElement(native_base_1.View, { style: styles.topViewStyle },
                React.createElement(native_base_1.View, { style: {
                        position: 'absolute',
                        width: screenWidth,
                        height: Config_2.px2dp(45),
                        top: 0,
                        left: 0,
                        opacity: this.state.topViewOpacity,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    } },
                    React.createElement(native_base_1.Text, { style: Config_1.Config.styles.Heard }, "\u5546\u54C1\u8BE6\u60C5")),
                React.createElement(native_base_1.Button, { transparent: true, onPress: () => {
                        this.props.navigation && this.props.navigation.goBack();
                    } },
                    React.createElement(react_native_1.Image, { source: goback, style: { width: Config_2.px2dp(23), height: Config_2.px2dp(23), marginLeft: 12 } })),
                React.createElement(native_base_1.Button, { transparent: true, onPress: () => {
                        Config_1.MainHelper.selectedTab = "home";
                        this.props.history.push(RouterDefine_1.MAIN);
                    } },
                    React.createElement(react_native_1.Image, { source: home2, style: { height: 23, width: 23, marginRight: 20 } }))),
            this.state.uri ?
                React.createElement(react_native_1.Animated.Image, { source: { uri: this.state.uri }, style: { width: 24, height: 24, borderRadius: 12, position: 'absolute', bottom: bottomValue, left: leftValue } })
                : null,
            React.createElement(native_base_1.Footer, { style: { height: Config_1.IS_IPHONE_X() ? Config_1.Config.BtnComHeight + 24 : Config_1.Config.BtnComHeight, position: 'absolute', bottom: 0 } },
                React.createElement(native_base_1.FooterTab, { style: { backgroundColor: Config_1.Config.ColorBf4 } },
                    React.createElement(native_base_1.Button, { vertical: true, style: { flex: 1 }, onPress: () => { this.props.navigation.navigate(RouterDefine_1.NavScreenKey.Cart); }, badge: cartCount > 0 },
                        cartCount > 0 ? React.createElement(native_base_1.Badge, { info: true, style: { backgroundColor: Config_1.Config.ColorOff, top: 10 } },
                            React.createElement(native_base_1.Text, null,
                                " ",
                                cartCount)) : null,
                        React.createElement(react_native_1.Image, { source: cart2, style: { width: 25, height: 25 } })),
                    React.createElement(native_base_1.View, { style: { flex: 2 } }),
                    React.createElement(react_native_1.TouchableOpacity, { style: styles.cartStyle, disabled: (!dynamic || dynamic.leftcnt <= 0), onPress: (e) => {
                            react_native_1.InteractionManager.runAfterInteractions(() => {
                                this.addItem(item, e);
                            });
                        } },
                        React.createElement(native_base_1.Text, { style: { textAlign: 'center', color: 'white', fontSize: Config_1.Config.FontBase } }, (!dynamic || dynamic.leftcnt <= 0) ? "已售罄" : "加入购物车"))))));
    }
}
exports.default = CategoryDetail;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topViewStyle: {
        width: screenWidth,
        height: 64,
        justifyContent: 'space-between',
        flexDirection: 'row',
        // ...Platform.select({
        //     ios: {
        //         paddingTop: 20,
        //     },
        //     android: {
        //         paddingTop: 0,
        //     },
        // }),
        alignItems: 'center'
    },
    scrollStyle: {
        width: screenWidth,
        height: screenHeight - 40,
        position: 'absolute',
        backgroundColor: 'white',
        top: 0
    },
    topBannerStyle: {
        //marginTop: 64,
        backgroundColor: 'white',
        height: 200,
        width: screenWidth,
    },
    imageStyle: {
        height: 200,
        width: screenWidth,
        marginTop: 5,
    },
    cartStyle: {
        flex: 2,
        width: Config_2.px2dp(200),
        height: Config_2.px2dp(40),
        backgroundColor: Config_1.Config.ColorOff,
        justifyContent: 'center'
    }
});
//# sourceMappingURL=CategoryDetail.js.map