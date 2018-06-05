


import AnimatedView from '../common/AnimatedView';
import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
    Image,
    DeviceEventEmitter,
    StatusBar,
    WebView,
    TouchableOpacity,
    Animated,
    Easing,
    Alert,
    BackHandler, InteractionManager
} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, Footer, FooterTab, Badge} from 'native-base';
import {RouteComponentProps, withRouter} from "react-router"
import {getInterpolate} from '../../common/utils/animatedUtils';
import {ComHeader, ComHeaderBtn} from "../ComHeader";
import {Config, IS_IPHONE_X, MainHelper} from "../../config/Config";
//const  ComHeaderWithRouter= withRouter(ComHeader);
import {addItemToCartByID} from '../../components/Cart/DataUtil/DataUtil';
import {MAIN, MAIN_CART, NavScreenKey} from "../../constants/RouterDefine";
import {TopBanner} from '../TopBanner';

import ItemTitlInfo from './common/detailInfoItem';
import ItemTitSublInfo from './common/detailSubInfo';
import ItemBottomView from './common/detailBottomView';
import MyStatusBar from "../MyStatusBar";
import {Cart, initItems, ItemDynamic} from "../../store/EntitiesState";
import {px2dp} from "../../config/Config";
import {canAddToCart, formatLeftCnt} from "../../common/utils/funcs";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import * as cart2 from '../../../images/cart2.png';
import * as home2 from '../../../images/home2.png';
import * as goback from '../../../images/goback.png';
//http:\/\/shengxian.qiniu.zhangqing.site/upload\/image\/\u53f6\u83dc\u7c7b\/\u7d2b\u7518\u84dd \u7ea6800g.jpg
let pic2 = [
    "upload\/image\/\u53f6\u83dc\u7c7b\/\u7d2b\u7518\u84dd \u7ea6800g.jpg"
]
let pic1111 = ["\/upload\/image\/2018-04-16\/2cf666a32837899807a5ddb3fa2becdc.jpeg","\/upload\/image\/2018-04-14\/93d7f4a3c0040bfcbf58bc52b9a893c2.jpeg"]
export interface CategoryDetailProps extends RouteComponentProps<any>{
    carts:Cart[]                // 购物车列表
    addCartItem:(id:Cart)=>void // 购买
    editCartItem:(id:Cart)=>void // 购买
}
export interface CategoryDetailState{
    topViewOpacity: number,
    webViewHeight:number,
    bottom:any,
    left:any,
    uri:string
}
export default class CategoryDetail extends React.Component<CategoryDetailProps,CategoryDetailState>{
    constructor(props:any){
        super(props);
        this.state = {
            topViewOpacity: 0,
            webViewHeight:500,
            bottom:new Animated.Value(0),
            left:new Animated.Value(0),
            uri:''
        };
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {


        this.setState({
            uri:Config.DomainName +'/' + this.props.navigation.state.params.item.bigimgurl[0]
        })
        // this.refs.animatedView.press(e,Config.DomainName +'/' + this.props.location.state.item.bigimgurl[0]);

    }
    refs: {
        animatedView: any
    };
    addItem(item:any,e:any){
        console.log(e);
        let dynamic = this.props.navigation.state.params.dynamic;

        if(!canAddToCart(item,dynamic,this.props.carts)) return;
        let{id}=item;
        // this.refs.animatedView.press(e,Config.DomainName +'/' + this.props.location.state.item.bigimgurl[0]);

        console.log('kasihishishishihsihisish')

        this.startAnimation(0,0)

        let cart =this.props.carts.find((val)=>val.id === id);
        //

        console.log('cart' + JSON.stringify(cart))
        if(!cart){

            this.props.addCartItem({id,count:1});

        }else{
            console.log("edit cart",cart,{id,count:cart.count + 1});
            this.props.editCartItem({id,count:cart.count + 1});
        }
    }

    startAnimation = (bottom:number, left:number)=>{

        this.state.bottom.setValue(bottom)
        this.state.left.setValue(left)

        Animated.parallel([
            Animated.timing(this.state.bottom,{
                toValue:1,
                // easing:Easing.linear,
                duration:1000,
                // useNativeDriver:true
            }),
            Animated.timing(this.state.left,{
                toValue:1,
                // easing:Easing.linear,
                duration:1000,
                // useNativeDriver:true
            })

        ]).start(()=>{

            console.log('kaishi')
        })
    }


    render(){

        const bottomValue = this.state.bottom.interpolate({
            inputRange:[0,0.25,0.5,0.75,1],
            outputRange:[px2dp(15), px2dp(45),px2dp(70),px2dp(45),px2dp(15)]
        })
        const leftValue = this.state.left.interpolate({
            inputRange:[0,0.25,0.5,0.75,1],
            outputRange:[screenWidth*4/5, screenWidth*3/5,screenWidth*2/5,screenWidth*1/5,screenWidth/10]
        })
        let cartCount = this.props.carts.length
        let item = this.props.navigation.state.params.item;
        let dynamic:ItemDynamic = this.props.navigation.state.params.dynamic;

        let selectIndex = this.props.navigation.state.params.selectIndex;
        let selectProductIndex = this.props.navigation.state.params.selectProductIndex;

        console.log(JSON.stringify(selectIndex )+' + '+ JSON.stringify(selectProductIndex))

        /*const font = this.state.fontValue.interpolate({
         inputRange: [0, 0.5, 1],
         outputRange: [16, 22, 16]
         });*/

        return(
            <Container style={styles.container} >
                <MyStatusBar />
                <View style={{flexDirection: 'row'}}>
                    <ScrollView ref='scrollView'
                                style={styles.scrollStyle}
                                scrollEventThrottle={200}
                                bounces={false}
                                onScroll={(e:any)=>{
                                    if (e.nativeEvent.contentOffset.y == 0){
                                        this.setState({topViewOpacity: 0.0})
                                    } else if (e.nativeEvent.contentOffset.y > 0 && e.nativeEvent.contentOffset.y <= 400){
                                        this.setState({topViewOpacity: e.nativeEvent.contentOffset.y / 400})
                                    } else if (e.nativeEvent.contentOffset.y > 100){
                                        this.setState({topViewOpacity: 1})
                                    }
                                }}
                    >
                        {/* 最上面的图片 */}
                        <TopBanner item={item.bigimgurl}  imageHeight = { px2dp(400)} autoplay = {false}
                                   indexClick={(linkurl)=>{linkurl && this.props.navigation && this.props.history.push(linkurl)}}
                                   indexChange={(index)=>{}}  />

                        {/* 描述 */}
                        <ItemTitlInfo item={item} dynamic={dynamic}/>
                        {/* 规格 */}
                        <ItemTitSublInfo item={item}/>
                        <WebView
                            style={{flex:1,height:this.state.webViewHeight}}
                            onMessage={(event)=>{
                                // console.log( event.nativeEvent.data);
                                // this.setState({
                                //     webViewHeight: parseInt(event.nativeEvent.data)
                                //                                 // });
                            }}
                            source={{html:`
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

                            `}}
                        />
                    </ScrollView>
                </View>

                {/* 标题栏 */}
                <View style={styles.topViewStyle}>
                    <View style={{
                        position: 'absolute',
                        width: screenWidth,
                        height:px2dp(45),
                        top: 0,
                        left:0,
                        opacity: this.state.topViewOpacity,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    }}>
                        <Text style={Config.styles.Heard}>商品详情</Text>
                    </View>
                    <Button transparent
                            onPress={()=>{
                                this.props.navigation && this.props.navigation.goBack()
                            }}
                    >
                        
                        <Image source={goback} style={{width: px2dp(23),height: px2dp(23), marginLeft: 12}} />
                    </Button>

                    <Button transparent onPress={()=>{
                        MainHelper.selectedTab = "home"
                        this.props.history.push(MAIN)
                    }}>
                        <Image source={home2} style={{height: 23, width: 23, marginRight: 20}} />
                    </Button>
                </View>
                {
                   this.state.uri ?
                <Animated.Image source={{uri:this.state.uri}} style={{width:24,height:24,borderRadius:12,position:'absolute',bottom:bottomValue,left:leftValue}}/>
                : null
                }
                {/* 下面的加入购物车按钮 */}
                <Footer style={{height: IS_IPHONE_X() ?Config.BtnComHeight + 24:Config.BtnComHeight, position:'absolute', bottom:0}}>
                    <FooterTab style={{backgroundColor: Config.ColorBf4}}>
                        <Button vertical style={{flex: 1}} onPress={() => {this.props.navigation.navigate(NavScreenKey.Cart)}} badge={cartCount > 0}>
                            {
                                cartCount > 0 ? <Badge info style={{backgroundColor:Config.ColorOff, top: 10}}><Text> {cartCount}</Text></Badge>: null
                            }
                            <Image source={cart2} style={{width: 25, height: 25}} />
                            {/* <Text style={{color: Config.ColorB333}}>购物车</Text> */}
                        </Button>
                        <View style={{flex: 2}} >
                        </View>
                        <TouchableOpacity
                            style={styles.cartStyle}
                            disabled={(!dynamic || dynamic.leftcnt <=0)}
                            onPress={(e)=>{
                             InteractionManager.runAfterInteractions(()=>{
                                this.addItem(item,e)
                             })

                            }}
                        >
                            <Text style={{textAlign: 'center', color: 'white', fontSize: Config.FontBase}}>{(!dynamic || dynamic.leftcnt <=0)?"已售罄":"加入购物车"}</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>
                {/* <ItemBottomView cartCount={this.props.carts.length} clickCart={()=>{this.props.history.push(MAIN_CART)}} addCart={()=>{
                    this.addItem(item.id);
                }}/> */}
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topViewStyle:{
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
        height: screenHeight-40,
        position: 'absolute',
        backgroundColor: 'white',
        top: 0
    },
    topBannerStyle:{
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
    cartStyle:{
        flex: 2,
        width: px2dp(200),
        height: px2dp(40),
        backgroundColor: Config.ColorOff,
        justifyContent: 'center'
    }
});