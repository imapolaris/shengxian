import * as React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    DeviceEventEmitter,
    Image,
    UIManager,
    TouchableOpacity,
    Animated,Easing,Dimensions,StatusBar,ImageBackground,
    Alert
} from 'react-native';
import {Toast, Content, Container, List, Icon} from 'native-base';
import {RouteComponentProps} from "react-router"
import {
    SaleItem,
    Cart,
    TopBannerArray,
    SaleItemArray,
    ItemMap,
    itemDataModel,
    Item,
    initItems,
    CartList, ItemDynamicArray, ItemDynamic
} from "../../store/EntitiesState";
import {getInterpolate} from '../../common/utils/animatedUtils';
import {PinLocation} from "../../store/CurrentUserState";
import {
    CATEGORYDETAIL,
    SHOPLIST,
    ADDRLIST,
    SEARCH,
    RECHARGE,
    MAIN,
    MAIN_ERROR,
    LOGIN, NavScreenKey, MAIN_MY
} from "../../constants/RouterDefine";
import * as login_top_icon from '../../images/login_top_icon.png';
import {canAddToCart, formatMoney} from "../../common/utils/funcs";
/*首页 - 页面相关控件*/
import HomeTopBar from './common/HomeTopBar'
import {HomeBanner} from '../TopBanner';
import HomeItem from './common/HomeItem';
import HomeChangeShop from './common/HomeChangeShop';
import AnimatedView from '../common/AnimatedView';
import RightItem from '../../components/Category/common/CategoryRightItem';
import {addItemToCartByID} from '../../components/Cart/DataUtil/DataUtil';
import MyStatusBar from "../MyStatusBar"
import {ErrorPageProps} from "../ErrorPage";
import {startGpsLocation} from "../../actions/location";
import {addCartItem, editCartItem, fetchCarts} from "../../actions/cart";
import {Config, IS_IPHONE_X, px2dp} from "../../config/Config";
import * as login_weChat_icon from '../../../images/login_weChat_icon.png';
import * as home_top from '../../../images/home_top.png';
import * as search from '../../../images/search.png';
import * as postion from '../../../images/postion.png';
import * as down from '../../../images/down.png';
import {Component, ReactType} from "react";
const screenWidth:number = Dimensions.get('window').width;

export interface HomeProps extends Partial<RouteComponentProps<any>>{
	topBanner:TopBannerArray          //主页活动
	saleItem:SaleItemArray          //当前门店热销商品列表
	ShopInfo:SaleItemArray          //当前门店热销商品列表
    itemDynamics:ItemDynamicArray   //库存
	fetchTopbanner:(version:number,force:boolean)=>void,
	fetchSaleItem:(version:number,force:boolean)=>void,
    fetchItemDynamic:(version:number,force:boolean)=>void,
    startGpsLocation:()=>void
    width:number                //页面宽度
    shopTitle:string           // 当前门店
    shopId:number              // 当前门店ID
    carts:CartList                // 购物车列表
    addCartItem:(id:Cart)=>void // 购买
    editCartItem:(id:Cart)=>void // 购买
    fetchCarts:(version:number,force:boolean)=>void
    items:ItemMap               // 物品列表
	locate:PinLocation          // 定位地址
    logged:boolean
}

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export interface HOmeStates {

    top:any,
    left:any,
    uri:string
}

export default class Home extends React.Component<HomeProps,HOmeStates>{


    state = {

        isShow:false,
        top:new Animated.Value(0),
        left:new Animated.Value(0),
        uri:''
    }

    constructor(props:any){
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.addItem = this.addItem.bind(this);
        this.getItemDynamic = this.getItemDynamic.bind(this);
        this.bannerClick = this.bannerClick.bind(this);
    }
	componentDidMount(){

        // if(!this.props.locate || !this.props.locate.name || this.props.locate.name.length < 0){
        //     this.props.startGpsLocation();
        //     return;
        // }

		//tab切换的时候调用
		DeviceEventEmitter.addListener('HomeReload',()=>{
            console.log('DeviceEventEmitter')
            this.onRefreshData();
        } )

        // console.log("this.props.topBanner",this.props.topBanner);
         this.onRefreshData();

    }




    startAnimation = (top:number, left:number)=>{

        this.state.top.setValue(top)
        this.state.left.setValue(left)

        Animated.parallel([
            Animated.timing(this.state.top,{
                toValue:SCREEN_HEIGHT,
                easing:Easing.linear,
                duration:1000,
                // useNativeDriver:true
            }),
            Animated.timing(this.state.left,{
                toValue:SCREEN_WIDTH*3/4 - 50,
                easing:Easing.bezier(0,.16,0,.85),
                duration:1000,
                // useNativeDriver:true
            })

        ]).start(()=>{

            console.log('kaishi')
        })
    }

    onRefreshData(){
        //没有数据强制刷新
        if(!this.props.topBanner || this.props.topBanner.data.length <= 0){
            this.props.fetchTopbanner(this.props.topBanner.version,true);
        }else{
            this.props.fetchTopbanner(this.props.topBanner.version,false);
        }
        if(!this.props.saleItem.data || this.props.saleItem.data.length<= 0){
            this.props.fetchSaleItem(this.props.saleItem.version,true);
        }else{
            this.props.fetchSaleItem(this.props.saleItem.version,false);
        }
        if(this.props.logged && (!this.props.carts || this.props.carts.carts.length<= 0)){
            this.props.fetchCarts(this.props.carts.version,true);
        }else{
            this.props.fetchCarts(this.props.carts.version,false);
        }
        if(this.props.logged && (!this.props.itemDynamics || this.props.itemDynamics.data.length<= 0)){
            this.props.fetchItemDynamic(this.props.itemDynamics.version,true);
        }else{
            this.props.fetchItemDynamic(this.props.itemDynamics.version,false);
        }

    }
    getAddress(){
        return this.props.locate && this.props.locate.name || ""
    }

    addItem(item:Item,e?:any){

        console.log('asdasdas' + Config.DomainName + '/' +(item&&item.thumbnailsurl || ""))

        let{id} = item;
        if(!canAddToCart(item,this.getItemDynamic(item.id),this.props.carts.carts)) return;
        let cart =this.props.carts.carts.find((val)=>val.id === id);
        if(!!e){
            // this.start()



            const target = e.currentTarget
            UIManager.measure(target,(x,y,width,height,winx,winy)=>{

                console.log(target + ' : ' + x+ ' : ' + y + ' : ' + ' : ' + width + ' : '+ height+ ' : ' + winx+ ' : ' + winy)

                this.setState({
                    uri:(Config.DomainName + '/' +(item&&item.thumbnailsurl || ""))
                })
                this.startAnimation(winy,winx)

            })

            // this.refs.animatedView.press(e,Config.DomainName + '/' +(initItems[id]&&initItems[id].thumbnailsurl || ""));
        }
        setTimeout(()=>{
            if(!cart){
                this.props.addCartItem({id,count:1});
            }else{
                console.log("edit cart",cart,{id,count:cart.count + 1});
                this.props.editCartItem({id,count:cart.count + 1});
            }
        })

    }

    getItemDynamic(id:number):ItemDynamic|undefined{
        return this.props.itemDynamics.data.find((item)=>item.id == id);
    }

    /*item*/
	renderItem(itemEx:SaleItem){

		let item  = initItems[itemEx.item_id];
		return item ?  <RightItem key={item.id} item={item}
						addItemClick={(e)=>this.addItem(item,e)}
						itemClick={()=>{
							let section = {id: 2, title: '上海真美味餐厅',select: true};
							this.props.navigation && this.props.navigation.navigate(NavScreenKey.CategoryDetail, {section: section, item: item,dynamic:this.getItemDynamic(item.id)});
						}}
						isHome={true}
				/> : <View/>
    }

    renderItemNew(item: Item) {
        return item ? <HomeItem   item={item} dynamic={this.getItemDynamic(item.id)}
                        addItemClick={(e)=>this.addItem(item,e)}
			            itemClick={()=>{
				        let section = {id: 2, title: '上海真美味餐厅',select: true};
			        this.props.navigation && this.props.navigation.navigate(NavScreenKey.CategoryDetail, {section: section, item: item,dynamic:this.getItemDynamic(item.id)    });
		}} /> : <View />
    }

    renderItemNewEx(item1: Item, item2: Item|undefined){
        return <View style={{flex: 1, height: 270, backgroundColor: Config.ColorBf4}} key={item1.id}>
			        <View style={{flex:1, flexDirection: 'row', backgroundColor: Config.ColorW, height: 120,
			                     marginLeft: 10, marginRight: 10, marginBottom: 10}}>
			            {this.renderItemNew(item1)}

			            <View style={{width: 10, backgroundColor: Config.ColorBf4}} />                        
			            						
						{item2 ? this.renderItemNew(item2) :<View style={{flex:1, backgroundColor:Config.ColorBf4}} />}
			        </View>
				</View>
    }

    renderItemNewEx2()
    {
		let rows=[]
        let length = this.props.saleItem.data.length;
        let len = Math.ceil(length/2);
        for(var i=0; i<len; ++i)
        {
            let pos1 = 2*i;
            let pos2 = 2*i+1;
            let item1 =  initItems[this.props.saleItem.data[pos1].item_id];
			let item2 = undefined
			if (pos2 < length){
				item2 = initItems[this.props.saleItem.data[pos2].item_id];
			}			
			rows.push(this.renderItemNewEx(item1, item2))
		}
		return rows;
	}
    bannerClick(linkurl:string){
	    if(!this.props.history || !linkurl)return;
	    let path = this.props.history.location.pathname;
	    if(linkurl == LOGIN && this.props.logged) return;
	    if(linkurl != path){
            this.props.history.push(linkurl)
        }
    }
    render() {
        return(
            <Container style={styles.container}>
                <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>
                <ImageBackground source={home_top} style={{ height: IS_IPHONE_X() ? 22+64: 64}} resizeMode='cover'>
                    <HomeTopBar address={this.getAddress()}
                                addressClick={()=>{this.props.navigation && this.props.navigation.navigate(NavScreenKey.AddrList, {from: MAIN_MY})}}
                                searchClick={()=>{this.props.navigation && this.props.navigation.navigate(NavScreenKey.Search)}}
                    />               
                </ImageBackground>
                {/* <HomeTopBar address={this.getAddress()}
                            addressClick={()=>{this.props.history && this.props.history.push(ADDRLIST, {from:MAIN})}}
                            searchClick={()=>{this.props.history && this.props.history.push(SEARCH, {from:MAIN})}}
                /> */}

{/* 加一个Content 有上下滚动效果 */}
			<Content >
				<HomeBanner item={this.props.topBanner.data} imageHeight = {px2dp(150)} autoplay = {true} address={this.getAddress()}
					indexClick={this.bannerClick}
					indexChange={(index)=>{}}  addressClick={()=>{this.props.history && this.props.history.push(ADDRLIST, {from:MAIN})}}
                    searchClick={()=>{this.props.history && this.props.history.push(SEARCH, {from:MAIN})}}  />

                <HomeChangeShop changeClick={()=>{this.props.history && this.props.history.push(SHOPLIST)}} shopName={this.props.shopTitle}/>

                <View style={{height: 10, backgroundColor: Config.ColorBf4}} />

                {this.renderItemNewEx2()}
			</Content>
            {
                this.state.uri ?
                    <Animated.Image source={{uri:this.state.uri}} style={{width:24,height:24,borderRadius:12,position:'absolute',top:this.state.top,left:this.state.left}}/>
                :   null
            }
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    addressStyle: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#f3f3f3', 
        borderRadius: 15, 
        height: Config.SearchHeight, 
        paddingLeft: 10, 
        width: screenWidth/2-30,
    },
    textStyle: {
        fontSize: 15,
        marginLeft: 5,
    },
    searchStyle: {
        backgroundColor: Config.ColorBf2,
        marginLeft: 10,
        marginRight: 10,
        height: Config.SearchHeight,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth / 2,
        borderRadius: 15
    },
});