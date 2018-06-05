import * as React from 'react';
import {Container,Footer,FooterTab,Button,Icon,Badge} from 'native-base';
import {Redirect, Route, RouterProps, Switch, withRouter} from "react-router";
// import Category from "./Category/Category";
// import My from "./My";
import HomeContainer from "../containers/HomeContainer";
import CategoryContainer, {MyContainer} from "../containers/CategoryContainer";
import {LOGIN, MAIN, MAIN_CART, MAIN_CATEGORY, MAIN_ERROR, MAIN_MY} from "../constants/RouterDefine";
import CartContainer from "../containers/CartContainer";
import Loading from "./Loading";
import {PrivateRoute} from "./common/PrivateRoute";
import {ErrorPageProps} from "./ErrorPage";
import * as LOCATION_ERROR from '../../images/location_error.png'
import Permissions from "react-native-permissions"
import * as PropTypes from "prop-types";
import {PermissionsAndroid, Image, StyleSheet, Dimensions, View,Text, DeviceEventEmitter, SafeAreaView} from "react-native";
import ErrorPageContainer from "../containers/ErrorPageContainer";
import {Config, IS_IPHONE_X, MainHelper} from "../config/Config";
import * as my1 from '../../images/my1.png';
import * as my2 from '../../images/my2.png';
import * as home1 from '../../images/home1.png';
import * as home2 from '../../images/home2.png';
import * as cart1 from '../../images/cart1.png';
import * as cart2 from '../../images/cart2.png';
import * as category1 from '../../images/category1.png';
import * as category2 from '../../images/category2.png';
import TabNavigator from "react-native-tab-navigator";
import LoginContainer from "../containers/LoginContainer";

const TabItem = TabNavigator.Item;
//const  HomeWithRouter= withRouter(HomeContainer);
//const  CategoryWithRouter= withRouter(CategoryContainer);
const  CartWithRouter= withRouter(CartContainer);
const  MyWithRouter= withRouter(MyContainer);
const  ErrorWithRouter= withRouter(ErrorPageContainer);

const SCREEN_WIDTH = Dimensions.get('window').width

export interface MainProps extends RouterProps{
    cartCount:number,
    logged:boolean,
    startGpsLocation:()=>any
}

export interface MainState {
    oldTab:string  //我的界面登录返回路由处理==>
    selectedTab: string;
}
//<switch/>
//<footer/>
const homeTabs=[
    {path:MAIN,name:"首页",icon1:home1,icon2:home2}
    ,{path:MAIN_CATEGORY,name:"分类",icon1:category1,icon2:category2}
    ,{path:MAIN_CART,name:"购物车",icon1:cart1,icon2:cart2}
    ,{path:MAIN_MY,name:"我的",icon1:my1,icon2:my2}];

let g_index = 1;
export default class Main extends React.Component<MainProps,MainState>{
    static contextTypes={
        router:PropTypes.object
    };

    constructor(props:any){
        super(props);

        this.state = {
            oldTab:"home",
            selectedTab: MainHelper.selectedTab?MainHelper.selectedTab:'home'
        };
        // this.onChangePage = this.onChangePage.bind(this);
        // this.GetColor = this.GetColor.bind(this);
        // this.GetImage = this.GetImage.bind(this);
    }
    onChangeTab(selectedTab: string) {
        this.setState({
            oldTab:this.state.selectedTab,
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

    componentWillUnmount(){

        MainHelper.selectedTab = this.state.selectedTab

    }

    render() {
        let {cartCount,logged, navigation} = this.props;
        return (

                <TabNavigator
                    tabBarStyle={{height:IS_IPHONE_X()?24+49:49, paddingBottom:IS_IPHONE_X()?24:0}}
                >
                    <TabItem
                        selected={this.state.selectedTab === "home"}
                        title="首页"
                        selectedTitleStyle={{color:Config.ColorG3c}}
                        renderIcon={() =>  <Image source={home2} style={styles.img} />}
                        renderSelectedIcon={() => <Image source={home1} style={styles.img} />}
                        onPress={()=>{
							this.onChangeTab('home')
							DeviceEventEmitter.emit('HomeReload')
                        }}
                    >
                        <HomeContainer navigation={navigation} />
                    </TabItem>
                    <TabItem
                        selected={this.state.selectedTab === "category"}
                        title="分类"
                        selectedTitleStyle={{color:Config.ColorG3c}}
                        renderIcon={() =>  <Image source={category2} style={styles.img} />}
                        renderSelectedIcon={() => <Image source={category1} style={styles.img} />}
                        onPress={()=>{
                            this.onChangeTab('category')
                            DeviceEventEmitter.emit('CategoryReload')
                        }}
                    >
                        <CategoryContainer navigation={navigation} />
                    </TabItem>
                    <TabItem
                        selected={this.state.selectedTab === "cart"}
                        title="购物车"
                        selectedTitleStyle={{color:Config.ColorG3c}}
                        renderIcon={() =>  <Image source={cart2} style={styles.img} />}
                        renderSelectedIcon={() => <Image source={cart1} style={styles.img} />}
                        onPress={()=>{
							// this.onChangeTab.bind(this, "cart")
                            this.onChangeTab('cart')
                            DeviceEventEmitter.emit('CartReload')
                        }}							
                        renderBadge={()=>cartCount > 0 ? <Badge info style={{backgroundColor:Config.ColorOff,marginTop: 2, height:20}}><Text style={{color:'white'}}>{cartCount}</Text></Badge>: <View/>}
                    >
                        <CartWithRouter />
                    </TabItem>
                    <TabItem
                        selected={this.state.selectedTab === "person"}
                        title="我的"
                        selectedTitleStyle={{color:Config.ColorG3c}}
                        renderIcon={() =>  <Image source={my2} style={styles.img} />}
                        renderSelectedIcon={() => <Image source={my1} style={styles.img} />}
						// onPress={this.onChangeTab.bind(this, "person")}
						onPress={()=>{
							// this.onChangeTab.bind(this, "person")
                            this.onChangeTab('person')
                            DeviceEventEmitter.emit('MyReload')
                        }}		
                    >
                        {
                            logged?<MyWithRouter/>:<Redirect to={{pathname:LOGIN,state:{tab:this.state.oldTab}}} push/>
                        }
                    </TabItem>
                </TabNavigator>


        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 25,
        width: 25,
    }
});