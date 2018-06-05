import * as React from 'react';
import {
    StyleSheet, Dimensions, ScrollView, DeviceEventEmitter, TouchableOpacity, TextInput,
    Animated, Easing, BackHandler, UIManager, AsyncStorage, FlatList, Platform,StatusBar,Image
} from 'react-native';
import { Container, Text, View, List, Icon} from 'native-base';

import {
    leftItemModel, leftItemDataModel, getAllItemWithCategoryID, getFirstCategoryID,
    getCategoryID
} from './interfaceUtil/DataUtil';
import {Item, CategoryArray, ItemDynamicArray, Cart, initItems, ItemDynamic} from "../../store/EntitiesState";
import {CATEGORYDETAIL, ADDRLIST, SEARCH, MAIN_CATEGORY, NavScreenKey} from "../../constants/RouterDefine";
import {RouteComponentProps} from "react-router"
import {addItemToCartByID} from '../../components/Cart/DataUtil/DataUtil';
import AnimatedView from '../common/AnimatedView';
import {getInterpolate} from '../../common/utils/animatedUtils';
import LeftItem from './common/CategoryLeftItem';
import RightItem from './common/CategoryRightItem';
import Line from "../Line";
import {Config, IS_IPHONE_X, px2dp} from "../../config/Config";
import MyStatusBar from "../MyStatusBar";
import {canAddToCart} from "../../common/utils/funcs";
import * as search_h from '../../../images/search_h.png';
import {is_iPhoneX, StatusBar_Height} from "../../constants/iOSScreenAuto";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let currentRow = 0;
export interface CategoryProps extends RouteComponentProps<any>{
    
	Category:CategoryArray,
	fetchCategory:(version:number)=>void,
	ItemDynamic:ItemDynamicArray,
	fetchItemDynamic:(version:number)=>void,
    addCartItem:(id:Cart)=>void // 添加
    editCartItem:(id:Cart)=>void // 修改
    carts:Cart[]                // 购物车列表

}
export interface CategoryState {
    selectIndex: number,
    leftDataSource: Array<leftItemModel>,
    rightDataSource: Array<Item>,
    // selectCateID: number,
    offset:number,
    top:any,
    left:any,
    uri:string
}

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class Category extends React.Component<CategoryProps,CategoryState>{

    constructor(props:any){
        super(props);
        this.state = {
            selectIndex: 0,
			leftDataSource: [],		//从本地获取数据
			// leftDataSource: props.Category.data,
            // selectCateID: getFirstCategoryID(),
            rightDataSource: [],
            offset:0,
            // lastItem:null
            top:new Animated.Value(0),
            left:new Animated.Value(0),
            uri:''

        };
        this.addItem = this.addItem.bind(this)
        this.getItemDynamic = this.getItemDynamic.bind(this);
    }

    refs: {
        animatedView: any,
        flatList:any
    };
    addItem(item:Item,e:any){
        let{id} = item;
        if(!canAddToCart(item,this.getItemDynamic(item.id),this.props.carts)) return;
        let cart =this.props.carts.find((val)=>val.id === id);
        if(!!e){

            const target = e.currentTarget
            UIManager.measure(target,(x,y,width,height,winx,winy)=>{

                console.log(target + ' : ' + x+ ' : ' + y + ' : ' + ' : ' + width + ' : '+ height+ ' : ' + winx+ ' : ' + winy)

                this.setState({
                    uri:(Config.DomainName + '/' +(item&&item.thumbnailsurl || ""))
                })
                this.startAnimation(winy,winx)

            })
        }
        if(!cart){
            this.props.addCartItem({id,count:1});
        }else{
            this.props.editCartItem({id,count:cart.count + 1});
        }
    }
    getItemDynamic(id:number):ItemDynamic|undefined{
        return this.props.ItemDynamic.data.find((item)=>item.id == id);
    }

    componentWillMount(){

    }

	componentDidMount(){

        // this.setState({
        //     leftDataSource: leftItemDataModel(0),		//从本地获取数据
        //     rightDataSource: getAllItemWithCategoryID(getFirstCategoryID()),
        // })

        const {fetchItemDynamic} = this.props

        DeviceEventEmitter.addListener('CategoryReload',()=>{
            console.log('DeviceEventEmitter')
            fetchItemDynamic(this.props.ItemDynamic.version);
        } )


		// this.props.fetchCategory(this.props.Category.version);
		this.props.fetchItemDynamic(this.props.ItemDynamic.version);

        AsyncStorage.multiGet(['selectIndex','offset'],(errors:any ,result:any)=>{

            console.log('abcsdsdsd')

            if (errors)  return

            const selectIndex:string = result[0][1]

            const offset:string = result[1][1]
            // console.log('result + ' + result )
            console.log('selectIndex + ' + selectIndex + ',' + 'offset + ' + offset)

            if (selectIndex == null && offset == null) {

                console.log('diyici')

                this.setState({
                    leftDataSource: leftItemDataModel(0),		//从本地获取数据
                    rightDataSource: getAllItemWithCategoryID(getFirstCategoryID()),
                })

            }else {

                console.log('disericicic')

                this.setState({
                    leftDataSource:leftItemDataModel(selectIndex?parseInt(selectIndex):0),
                    selectIndex: parseInt(selectIndex),
                    rightDataSource:getAllItemWithCategoryID(getCategoryID(parseInt(selectIndex)))
                })
                setTimeout(()=>{

                    this.refs.flatList.scrollToOffset({offset:parseInt(offset), animated: false});
                },50)
            }
        })

	}

	componentWillUnmount() {

	    const index = this.state.selectIndex;

	    const offset = this.state.offset

        AsyncStorage.multiSet([['selectIndex',String(index)],['offset',String(offset)]],error=>{


	        console.log('error' + JSON.stringify(error))
        })

        DeviceEventEmitter.removeListener('CategoryReload',()=>{
            console.log('removeListener')
        })

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
	componentWillReceiveProps(props:any){
		// this.setState({
		// 	leftDataSource: props.Category.data,
		// })
		// this.props.ItemDynamic.data.map((ItemD, index)=>{
		// 	console.log("-------index-------"+ ItemD.id, ", ===="+ ItemD.price)
		// 	console.log('-------index-------${ItemD.id}, ====${ItemD.price}')
		// })
	}
    render() {

        return (

            <Container style={styles.container}>
                <StatusBar backgroundColor='transparent' translucent={true} barStyle='dark-content'/>
                <TouchableOpacity style={{height:44, alignSelf: 'center',justifyContent:'center',alignItems:'center', marginTop:Platform.OS == 'ios'?StatusBar_Height:15}} onPress={()=>{this.props.navigation.navigate(NavScreenKey.Search, {from:MAIN_CATEGORY})}}>
                    <View style={styles.searchStyle}>
                        {/* <Icon style={Config.styles.MidIcon} name="search"/> */}
                        <Image  source={search_h} style={{alignItems:'flex-start', height: 20, width: 20, marginRight: -1, marginLeft: 10 }} resizeMode='contain' />
                        <Text style={{fontSize: Config.Font0875, color: Config.ColorB999}}>请输入商品名称</Text>
                    </View>
                </TouchableOpacity>
                <Line color='#f3f3f3' />
                <View style={{flexDirection: 'row'}}>
                    <FlatList
                        style={styles.leftListStyle}
                        keyExtractor={(item,index)=>index.toString()}
                        data={this.state.leftDataSource}
                        renderItem={({item,index})=>{

                            return (
                                <LeftItem key={index} index={index}
                                          item={item}
                                          itemClick={(selectIndex)=>{

                                             // item
                                              // 将当前的item 的 is_Select 设置为 1 ，其他的设置为 0
                                              this.setState({
                                                  leftDataSource: this.state.leftDataSource.map((item:any,i:number)=>{
                                                      return {...item,is_Select:i == selectIndex ? 1 : 0}
                                                  }),
                                                  selectIndex: selectIndex,
                                                  rightDataSource: item.list
                                              })

                                              this.refs.flatList.scrollToOffset({offset:0, animated: false});
                                          }} />
                            )
                        }}
                    />

                    <FlatList
                        ref="flatList"
                        style={{backgroundColor: 'white', width: screenWidth / 4 * 3, marginBottom:60}}
                        scrollEventThrottle={200}
                        onScroll={(event:any)=>{

                                this.setState({
                                    offset:event.nativeEvent.contentOffset.y
                                })
                        }}
                        data={this.state.rightDataSource}
                        keyExtractor={(item,index)=>index.toString()}
                        renderItem={({item,index})=>{
                              return <RightItem key={item.id} item={item}
                                                dynamic={this.getItemDynamic(item.id)}
                                                addItemClick={(e)=>{this.addItem(item,e)}}

                                                itemClick={()=>{

                                                    console.log('selectIndex+' + this.state.selectIndex)

                                                    let section = {id: 1, title: '上海真好吃餐厅',select: true};
                                                    this.props.navigation.navigate(NavScreenKey.CategoryDetail, {
                                                        section: section,
                                                        item: item,
                                                        dynamic:this.getItemDynamic(item.id),
                                                        selectIndex:this.state.selectIndex,
                                                        selectProductIndex:index
                                                    });
                                                }}
                                                isHome={false} />;

                          }}
                    />
                </View>
               {
                   this.state.uri ?
                    <Animated.Image source={{uri:this.state.uri}} style={{width:24,height:24,borderRadius:12,position:'absolute',top:this.state.top,left:this.state.left}}/>
                    : null
               }
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    leftListStyle:{
        width: screenWidth / 4,
        backgroundColor: '#f3f3f3',
        height:screenHeight-Config.HeadHeight-49-16

    },
    rightListStyle: {
        position: 'absolute',
        width: screenWidth / 4 * 3,
        backgroundColor: '#50be07',
        top: 20,
        bottom: 60,
        left: screenWidth / 4
    },
    searchStyle: {
        backgroundColor: Config.ColorBf2,
        marginLeft: 10,
        marginRight: 10,
        height: Config.SearchHeight,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth-20,
        borderRadius: 15,
    },
});