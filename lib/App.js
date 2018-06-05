"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const ConfigureStore_1 = require("./store/ConfigureStore");
const react_redux_1 = require("react-redux");
const react_1 = require("redux-persist/es/integration/react");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const index_1 = require("./sagas/index");
const ui_1 = require("./actions/ui");
const RouterDefine_1 = require("./constants/RouterDefine");
const MainContainer_1 = require("./containers/MainContainer");
const AddListContainer_1 = require("./containers/AddListContainer");
const AMapContainer_1 = require("./containers/AMapContainer");
const AddAddrContainer_1 = require("./containers/AddAddrContainer");
const CategoryContainer_1 = require("./containers/CategoryContainer");
const cart_1 = require("./actions/cart");
const CategoryDetailContainer_1 = require("./containers/CategoryDetailContainer");
const TimerLaunch_1 = require("./components/TimerLaunch");
const react_navigation_1 = require("react-navigation");
const CartContainer_1 = require("./containers/CartContainer");
let codePush = require("react-native-code-push");
let { store, saga, history, persist } = ConfigureStore_1.default;
// 启动saga
saga.run(index_1.default);
const RootScreen = react_navigation_1.StackNavigator({
    Home: { screen: MainContainer_1.default },
    Search: { screen: CategoryContainer_1.SearchContainer },
    SearchResult: { screen: CategoryContainer_1.SearchResultContainer },
    AddrList: { screen: AddListContainer_1.default },
    Addaddr: { screen: AddAddrContainer_1.default },
    Map: { screen: AMapContainer_1.default },
    Category: { screen: CategoryContainer_1.default },
    CategoryDetail: { screen: CategoryDetailContainer_1.default },
    Cart: { screen: CartContainer_1.default },
}, {
    headerMode: "none",
});
class MainRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { logged } = this.props;
        return (React.createElement(react_native_1.View, { style: { flex: 1 } },
            React.createElement(TimerLaunch_1.default, null),
            React.createElement(RootScreen, null)));
    }
}
const deploymentKey = (react_native_1.Platform.OS === 'ios') ? "dAOqi0E57DSzoyO8PIq607O-i4bKb2ab1975-ba38-4f38-80ef-dd788db75f1c" : "anzhuokey";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.codepushImm = () => {
            codePush.sync({
                mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
                deploymentKey: deploymentKey,
            });
        };
        this.backListener = () => {
            react_native_1.BackHandler.addEventListener('hardwareBackPress', function () {
                if (history) {
                    let pathname = history.location.pathname;
                    console.log('syy-------------------------------------pathname + ' + pathname);
                    if (pathname === RouterDefine_1.MAIN ||
                        pathname === RouterDefine_1.MAIN_CATEGORY ||
                        pathname === RouterDefine_1.MAIN_CART ||
                        pathname === RouterDefine_1.MAIN_MY ||
                        pathname === RouterDefine_1.MAIN_ERROR)
                        return true;
                    history.goBack();
                    console.log('goBack === pathname' + pathname);
                    return true;
                }
                console.log('false');
                return false;
            });
        };
        this.state = {
            logged: store.getState().currentUser.logged || false
        };
        this.onStoreChange = this.onStoreChange.bind(this);
        this.onStart = this.onStart.bind(this);
        store.subscribe(this.onStoreChange);
    }
    onStoreChange() {
        let logged = store.getState().currentUser.logged || false;
        if (this.state.logged != logged) {
            this.setState({ logged });
        }
        if (this.state.logged != logged && logged) {
            let version = store.getState().entities.cart.version;
            store.dispatch(cart_1.fetchCarts(version));
        }
    }
    onStart() {
        store.dispatch(ui_1.startApp());
    }
    componentDidMount() {
        react_native_1.AsyncStorage.multiRemove(['selectIndex', 'offset'], error => {
            if (!error)
                console.log('清除成功');
        });
        this.backListener();
        this.codepushImm();
        //NativeModules.SplashScreen.hide()
        //TODO SplashScreen 3秒隐藏
        setTimeout(() => { react_native_1.NativeModules.SplashScreen.hide(); }, 3000);
    }
    componentWillUnmount() {
        react_native_1.BackHandler.removeEventListener('hardwareBackPress', () => { });
    }
    render() {
        return (React.createElement(react_redux_1.Provider, { store: store },
            React.createElement(react_1.PersistGate, { persistor: persist },
                React.createElement(native_base_1.Root, null,
                    React.createElement(react_router_1.Router, { history: history },
                        React.createElement(MainRouter, { logged: this.state.logged }))))));
    }
}
const CodePushApp = codePush()(App);
exports.default = CodePushApp;
//# sourceMappingURL=App.js.map