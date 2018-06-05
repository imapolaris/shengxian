import * as React from 'react';
import {StyleSheet, TouchableHighlight, TouchableOpacity, Image, UIManager, Animated, Dimensions, Easing} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, Badge, FooterTab} from 'native-base';
import {RouteComponentProps} from "react-router"
import Line from "./Line"
import MyStatusBar from "./MyStatusBar"
// import {Util} from "../common/utils/util";
const pichead = {uri:"screen"}
import {Item, CategoryArray, ItemDynamicArray, Cart, ItemDynamic} from "../store/EntitiesState";
import {SearchUIState} from "../store/UIState";
import {leftItemModel, leftItemDataModel, getAllItemWithCategoryID, getFirstCategoryID, searchItem} from './Category/interfaceUtil/DataUtil';
import RightItem from './Category/common/CategoryRightItem';
import {CATEGORYDETAIL, SEARCH, SEARCHRESULT, MAIN_CART, NavScreenKey} from "../constants/RouterDefine";
import {Config, IS_IPHONE_X, px2dp} from "../config/Config";
import * as cart2 from '../../images/cart2.png';
import * as goback from '../../images/goback.png';
import * as search_h from '../../images/search_h.png';

const SCREEN_WIDTH = Dimensions.get('window').width
export const shead = StyleSheet.create({
    head:{ backgroundColor: Config.ColorW, height: Config.HeadHeight },
    body:{ flexDirection:"row" ,flex:1},    
    // fonttxt: {color:'#000', fontSize:15 },
    fonticon: {color:Config.ColorB999, fontSize:20},
})
//f4f4f4
export const saddr = StyleSheet.create({
    bk:{backgroundColor:'#f4f4f4'},
    btndel:{backgroundColor:'#fff'},  
    fonticon: {color:'dimgray', fontSize:15, height: 20, width: 20},
    // fonttxt: {backgroundColor:'#f4f4f4',   borderRadius:5},
    fontbtn: {backgroundColor:'transparent', margin:5, height:25, borderWidth: 1,
    borderRadius: 10, borderColor: 'lightgray'},
	// fontbtn: {backgroundColor:'#f4f4f4', margin:5, borderRadius:5, },    
})

export interface SearName{
    name:string;
}
export interface SearchResultProps/* extends RouteComponentProps<any>*/{
	SearchResult:SearchUIState,
	addCartItem:(id:Cart)=>void // 添加
	editCartItem:(id:Cart)=>void // 修改
    carts:Cart[]                // 购物车列表
    itemDynamics:ItemDynamicArray   //库存
}
export interface SearchResultState{
	title:string
	shistory:Array<SearName>,
    right:any,
    top:any,
    uri:string
}
export default class SearchResult extends React.Component<SearchResultProps,SearchResultState>{
    constructor(props:any){
        super(props)
        this.state = {
			title: this.props.navigation.state.params.title,
			shistory:[],
            top:new Animated.Value(0),
            right:new Animated.Value(0),
            uri:''
        }
        this.getItemDynamic = this.getItemDynamic.bind(this);
	}
	addItem(item:Item,e?:any){

        const target = e.currentTarget
        UIManager.measure(target,(x,y,width,height,winx,winy)=>{

            console.log(target + ' : ' + x+ ' : ' + y + ' : ' + ' : ' + width + ' : '+ height+ ' : ' + winx+ ' : ' + winy)

            this.setState({
                uri:(Config.DomainName + '/' +(item&&item.thumbnailsurl || ""))
            })
            this.startAnimation(winy,SCREEN_WIDTH - winx)

        })



        let cart =this.props.carts.find((val)=>val.id === item.id);
        if(!cart){
            this.props.addCartItem({id:item.id,count:1});
        }else{
            this.props.editCartItem({id:item.id,count:cart.count + 1});
        }
    }
    getItemDynamic(id:number):ItemDynamic|undefined{
        return this.props.itemDynamics.data.find((item)=>item.id == id);
    }

    startAnimation = (top:number, right:number)=>{

        this.state.top.setValue(top)
        this.state.right.setValue(right)

        Animated.parallel([
            Animated.timing(this.state.top,{
                toValue:px2dp(25),
                easing:Easing.linear,
                duration:1000,
                // useNativeDriver:true
            }),
            Animated.timing(this.state.right,{
                toValue:15,
                easing:Easing.bezier(.23,.01,.71,.27),
                duration:1000,
                // useNativeDriver:true
            })

        ]).start(()=>{

            console.log('abcabc')

            this.setState({
                uri:''
            })
        })
    }

    render() {
		let rightDataSource: Array<Item> = (this.state.title.length == 0)?[] : searchItem(this.state.title)	
        let cartCount = this.props.carts.length;
        return (
            <Container>
            <MyStatusBar />
{/* 头部 */}


                <View style={{height: 3, backgroundColor: Config.ColorBf4, marginTop:Config.HeadHeight}}>

                </View>
{/* 下面 */}
				<List style={{marginBottom:IS_IPHONE_X()?24:0}}
	                    dataArray = {rightDataSource}
						renderRow={(item: Item)=>{
                            return <RightItem key={item.id} item={item}
                                              dynamic={this.getItemDynamic(item.id)}
											  addItemClick={(e)=>{this.addItem(item,e)}}
											  itemClick={()=>{
												let section = {id: 2, title: '上海真美味餐厅',select: true};
												this.props.navigation && this.props.navigation.navigate(NavScreenKey.CategoryDetail, {section: section, item: item,dynamic: this.getItemDynamic(item.id)});
											}}
											  isHome={true} />;

						}}
	                />
                {
                    this.state.uri ?
                    <Animated.Image source={{uri:this.state.uri}} style={{width:24,height:24,borderRadius:12,position:'absolute',top:this.state.top,right:this.state.right}}/>
                    :   null
                }
                <View style={{width: '100%', height:IS_IPHONE_X()?88:64,paddingTop:IS_IPHONE_X()?44:20, backgroundColor: Config.ColorW ,
                    flexDirection: 'row' , marginRight: 10, alignItems:'flex-end', position:'absolute',top:0,left:0,right:0}}>
                    <Button transparent onPress={()=>{this.props.history.push(this.props.location.state.from)}}>            
                        <Image source={goback} style={{width: px2dp(23),height: px2dp(23), marginLeft: 16, marginTop: 5, marginRight: 5}} />
                    </Button>

                    <Button style={{flex: 1, height: Config.SearchHeight, flexDirection: 'row', alignItems: 'center', width: '83%',
                        backgroundColor: Config.ColorBf2, borderRadius: 15, marginRight: 10, marginTop: 10}}>
                        {/* <Icon name='search' style={[Config.styles.MidIcon,{alignItems: 'center',justifyContent:'center', marginRight: 0, marginLeft: 10}]} /> */}
                        <Image  source={search_h} style={{ height: 20, width: 20,alignItems: 'center',justifyContent:'center', marginRight: -1, marginLeft: 10, marginTop: 2 }} resizeMode='contain' />
                        <Input style={{fontSize: Config.Font0875, color: Config.ColorB999, textAlign: 'left', marginLeft: 0, justifyContent: 'center', alignItems: 'center'}}  placeholder={this.state.title} value={this.state.title}  onChangeText={(text) => this.setState({title : text})}
                               onFocus = {()=>{this.props.history.push(SEARCH, {from:this.props.location.state.from, from2:SEARCHRESULT})}}/>
                    </Button>

                    <View style={{backgroundColor:'transparent', width:40, paddingRight:10}}>
                        <FooterTab style={{backgroundColor: 'transparent'}} >
                            <Button style={{width:50, backgroundColor: 'transparent'}} vertical onPress={() => {this.props.history.push(MAIN_CART)}} badge={cartCount > 0}>
                                {
                                    cartCount > 0 ? <Badge info style={{backgroundColor:Config.ColorOff, position: 'absolute',top:0, left: 12}}><Text>{cartCount}</Text></Badge>: null
                                }
                                <Image source={cart2} style={{width: 25, height: 25}} />
                            </Button>
                        </FooterTab>
                    </View>

                </View>
            </Container>
        );
    }
}