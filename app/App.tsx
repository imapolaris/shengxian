/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {NativeAppEventEmitter, NativeModules, View, Text, Platform, BackHandler,AppState, AsyncStorage} from 'react-native';
import StoreConfig from "./store/ConfigureStore";
import {Provider} from "react-redux";
import {PersistGate} from  'redux-persist/es/integration/react'
import {Root} from "native-base";
import {Router} from "react-router";
import rootSaga from './sagas/index';
import IntroSwiper from "./components/IntroSwiper";
import {startAliPay, startApp} from "./actions/ui";
import {Redirect, Route, Switch, withRouter} from "react-router";
import Recharge from "./components/Recharge"
import More from "./components/More";
import Help from "./components/Help";
import Pay from "./components/Pay";
import UseCoupon from "./components/UseCoupon";
import Protocol from "./components/Protocol";

import {
    LOGIN, MAIN, MAIN_CATEGORY, MAIN_CART, MAIN_ERROR,MAIN_MY, ADDRLIST, MORE, SEARCH, SHOPLIST, SETUP, HELP, 
    COUPON, RECHARGE, ITEMLIST, ORDERDETAIL, MYORDER, PAY, ADDADDR, SEARCHRESULT, CATEGORYDETAIL, SUBMITORDER, 
    MAP, MAP_SEARCH, FEEDBACK,USECOUPON, PROTOCOL
} from "./constants/RouterDefine";
import MainContainer from "./containers/MainContainer";
import Addrlist, {default as AddrlistContainer} from "./containers/AddListContainer"

import MyOrderlContainer from "./containers/MyOrderlContainer";
import CategoryDetail from "./components/Category/CategoryDetail"
import AMapContainer, {default as AMapContainer, AMapSearchContainer} from "./containers/AMapContainer";
import AddaddrContainer from "./containers/AddAddrContainer";
import SetupContainer from "./containers/SetupContainer";
import {
    SearchContainer, SearchResultContainer, ItemListContainer,
    default as CategoryContainer
} from "./containers/CategoryContainer";
import CouponContainer from "./containers/CouponContainer";
import {startGpsLocation} from "./actions/location";
import {fetchCarts} from "./actions/cart";
import ShoplistContainer from "./containers/ShopListContainer";
import LoginContainer from "./containers/LoginContainer";
import SubmitOrderContainer from "./containers/SubmitOrderContainer";


import FeedbackContainer from "./containers/FeedbackContainer"
import CategoryDetailContainer from "./containers/CategoryDetailContainer";
import {Address, AddrList, defaultAddress, ItemBase} from "./store/EntitiesState";
import PayContainer from "./containers/PayContainer";
import OrderDetailContainer from "./containers/OrderDetailContainer";
import TimerLaunch from "./components/TimerLaunch";
import {LocationHelper} from "./util/locationHelper";
import {PrivateRoute} from "./components/common/PrivateRoute";
import {checkLogin} from "./actions/login";

import {StackNavigator} from 'react-navigation';
import CartContainer from "./containers/CartContainer";

let codePush = require("react-native-code-push");

let {store,saga,history,persist} = StoreConfig;
// 启动saga
saga.run(rootSaga);


interface AppProps{
}

interface MainAppState{
    logged:boolean
}

interface MainRouterProps{
    logged:boolean
}

const RootScreen = StackNavigator({
    Home:{screen: MainContainer},
    Search: {screen: SearchContainer},
    SearchResult: {screen: SearchResultContainer},
    AddrList: {screen: AddrlistContainer},
    Addaddr: {screen: AddaddrContainer},
    Map: {screen: AMapContainer},
    Category: {screen: CategoryContainer},
    CategoryDetail: {screen: CategoryDetailContainer},
    Cart: {screen: CartContainer},
}, {
    headerMode: "none",
});

class MainRouter extends React.Component<MainRouterProps>{
    constructor(props:any){
        super(props)
    }
    render(){
        let {logged} = this.props;
        return (
            <View style={{flex:1}}>
                <TimerLaunch/>
                <RootScreen/>
                {/*<Switch>
                    <Route path={FEEDBACK} component={withRouter(FeedbackContainer)}/>

                    <Route path={LOGIN} component={withRouter(LoginContainer)}/>
                    <Route path={MAIN} component={withRouter(MainContainer)}/>
                    <PrivateRoute path={ADDRLIST} component={withRouter(AddrlistContainer)} logged={logged}/>
                    <Route path={COUPON} component={withRouter(CouponContainer)}/>
                    <Route path={RECHARGE} component={withRouter(Recharge)}/>
                    <Route path={MORE} component={withRouter(More)}/>

                    <Route path={SEARCH} component={withRouter(SearchContainer)}/>
                    <Route path={SEARCHRESULT} component={withRouter(SearchResultContainer)}/>
                    <Route path={SHOPLIST} component={withRouter(ShoplistContainer)}/>
                    <Route path={SETUP} component={withRouter(SetupContainer)}/>
                    <Route path={HELP} component={withRouter(Help)}/>
                    <Route path={ITEMLIST} component={withRouter(ItemListContainer)}/>
                    <Route path={ORDERDETAIL} component={withRouter(OrderDetailContainer)}/>
                    <Route path={PAY} component={withRouter(PayContainer)}/>
                    <PrivateRoute path={MYORDER} component={withRouter(MyOrderlContainer)} logged={logged}/>
                    <PrivateRoute path={ADDADDR} component={withRouter(AddaddrContainer)} logged={logged}/>
                    <Route path={SUBMITORDER} component={withRouter(SubmitOrderContainer)}/>
                    <Route path={CATEGORYDETAIL} component={withRouter(CategoryDetailContainer)}/>
                    <Route path={MAP} component={withRouter(AMapContainer)}/>
                    <Route path={USECOUPON} component={withRouter(UseCoupon)}/>
                    <Route path={PROTOCOL} component={withRouter(Protocol)}/>
                    <Route path={MAP_SEARCH} component={AMapSearchContainer}/>
                    <Redirect path={"/"} to={MAIN} exact/>
                </Switch>*/}

            </View>
        );
    }
}


const deploymentKey =  (Platform.OS === 'ios') ?  "dAOqi0E57DSzoyO8PIq607O-i4bKb2ab1975-ba38-4f38-80ef-dd788db75f1c":"anzhuokey"


class App extends React.Component<AppProps,MainAppState>{
    constructor(props:any){
        super(props);

        this.state={
            logged:store.getState().currentUser.logged || false
        };

        this.onStoreChange = this.onStoreChange.bind(this);
        this.onStart = this.onStart.bind(this);
        store.subscribe(this.onStoreChange);
    }

    codepushImm = ()=>{

        codePush.sync({
            mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
            deploymentKey: deploymentKey,
        });
    };
    onStoreChange(){
        let logged = store.getState().currentUser.logged || false;
        if(this.state.logged != logged){
            this.setState({logged})
        }
        if(this.state.logged != logged && logged){
            let version = store.getState().entities.cart.version;
            store.dispatch(fetchCarts(version));
        }
    }
    onStart(){
        store.dispatch(startApp());
    }

    backListener = ()=>{
        BackHandler.addEventListener('hardwareBackPress', function() {
            if (history) {

                let pathname =  history.location.pathname;

                console.log('syy-------------------------------------pathname + ' + pathname)
                if (pathname === MAIN ||
                    pathname === MAIN_CATEGORY ||
                    pathname === MAIN_CART ||
                    pathname === MAIN_MY ||
                    pathname === MAIN_ERROR) return true

                history.goBack()

                console.log('goBack === pathname'+ pathname)
                return true;
            }

            console.log('false')
            return false;
        });
    };
    componentDidMount(){
        AsyncStorage.multiRemove(['selectIndex','offset'],error=>{
            if (!error) console.log('清除成功')
        })

        this.backListener()
        this.codepushImm()
        //NativeModules.SplashScreen.hide()
        //TODO SplashScreen 3秒隐藏
        setTimeout(()=>{NativeModules.SplashScreen.hide()},3000);

    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',()=>{})
    }


    render(){
        return (
            <Provider store={store}>
                <PersistGate persistor={persist}>
                    <Root>
                        <Router history={history}>
                            <MainRouter logged={this.state.logged} />
                        </Router>
                    </Root>
                </PersistGate>
            </Provider>
        )
    }
}

const CodePushApp = codePush()(App);
export default  CodePushApp;
