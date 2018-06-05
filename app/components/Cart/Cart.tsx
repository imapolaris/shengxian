import * as React from "react";
import {Container,List,Button,Text,Content,Footer,ListItem} from 'native-base';
import CartBuyItem from "./common/CartBuyItem";
import {Cart as CartEntity, ItemBase, ItemDynamic, ItemDynamicArray, ItemMap} from "../../store/EntitiesState"

import {View,Alert,TouchableOpacity, StatusBar, DeviceEventEmitter} from "react-native";
import {canAddToCart, formatMoney, formatMoneyEx} from "../../common/utils/funcs";
import {SUBMITORDER, MAIN_CART} from "../../constants/RouterDefine";
import {RouteComponentProps, withRouter} from "react-router";
import SectionItem from "./common/CarSectionItem";
import MyStatusBar from "../MyStatusBar";
import {Config, IS_IPHONE_X} from "../../config/Config";
import {CartsUIState} from "../../store/UIState";
import {MyToast} from "../../config/Config";
import * as _ from "lodash"
import {StatusBar_Height} from "../../constants/iOSScreenAuto";

const  CartBuyItemWithRouter= withRouter(CartBuyItem);

export interface CartProps  extends RouteComponentProps<any>{        
    carts:CartEntity[]
    itemDynamics:ItemDynamicArray
    version:number// 购物车列表
    logined:boolean
    selectCartsItems:(ids:number[])=>void
    unSelectCartsItems:(ids:number[])=>void
    editCartItem:(item:CartEntity,effect:boolean)=>void
    deleteCartItem:(ids:number[])=>void
    fetchItemDynamic:(version:number,force:boolean)=>void,
    setSubmitOrderItems:(items:ItemBase[])=>void
    fetchCarts:(version:number,force:boolean)=>void
    ui:CartsUIState
    items:ItemMap// 商品
}

export interface CartState {
    allPrice:number
}

export default class Cart extends React.Component<CartProps, CartState>{
    constructor(props:any){
        super(props);
        this.state ={
            allPrice:0
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.isSectionSelected=this.isSectionSelected.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onSubItem = this.onSubItem.bind(this);
        this.onSectionSelected = this.onSectionSelected.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.isItemChecked = this.isItemChecked.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.reCalcAllPrice = this.reCalcAllPrice.bind(this);
        this.onSubmitOrder = this.onSubmitOrder.bind(this);
        this.getItemDynamic = this.getItemDynamic.bind(this);
    }

    componentDidMount(){
		this.reCalcAllPrice(this.props);
		
		//tab切换的时候调用
		DeviceEventEmitter.addListener('CartReload',()=>{
            if(this.props.logined && (!this.props.carts || this.props.carts.length<= 0)){
				this.props.fetchCarts(this.props.version,true);
			}else{
				this.props.fetchCarts(this.props.version,false);		//这里有问题 5秒后没有请求
			}
		} )
		
        //刷新购物车
        if(this.props.logined && (!this.props.carts || this.props.carts.length<= 0)){
            this.props.fetchCarts(this.props.version,true);
        }else{
            this.props.fetchCarts(this.props.version,false);		//这里有问题 5秒后没有请求
        }
        this.props.fetchItemDynamic(this.props.itemDynamics.version,false)
    }

    componentWillReceiveProps(nextProps:CartProps){
        this.reCalcAllPrice(nextProps);
    }
    reCalcAllPrice(props:CartProps){
        let {items,carts} = props;
        let {selected} =props.ui;
        let allPrice = _.reduce(selected,(sum:number,id:number)=>{

            do{
                let itemData = items[id];
                if(!itemData) break;
                let cart = carts.find((cart)=>cart.id==id);
                if(!cart) break;
                let dynamic = this.getItemDynamic(cart.id);
                let price = dynamic ? dynamic.price : 10000;
                return sum + price * cart.count;
            }while(false);
            return sum;
        },0)
        this.setState({allPrice});
    }

    onDeleteConfirm(){
        let {selected} =this.props.ui;
        this.props.unSelectCartsItems(selected);
        this.props.deleteCartItem(selected);
    }

    isSectionSelected(id:number){
        let {carts} = this.props;
        let {selected} =this.props.ui;
        return carts.length <= selected.length;
    }

    onAddItem(cart:CartEntity){
        let {items,carts,itemDynamics} = this.props;
        if(!canAddToCart(items[cart.id],this.getItemDynamic(cart.id),carts)) return
        this.props.editCartItem({id:cart.id,count:cart.count + 1},false);
    }
    getItemDynamic(id:number):ItemDynamic|undefined{
        return this.props.itemDynamics.data.find((item)=>item.id == id);
    }
    onSubItem(cart:CartEntity){
        if(cart.count <= 1 ){
            this.props.deleteCartItem([cart.id]);
            this.props.unSelectCartsItems([cart.id]);
        }else{
            this.props.editCartItem({id:cart.id,count:cart.count - 1},false);
        }
    }

    onSectionSelected(id:number){
        let {carts} = this.props;
        let {selected} =this.props.ui;

        if(this.isSectionSelected(id)){
            // 取消全选
            this.props.unSelectCartsItems(selected);
        }else{
            // 全选
            this.props.selectCartsItems(_.map(carts,(cart:CartEntity)=>cart.id));
        }
    }

    onSelected(id:number){
        if(this.isItemChecked(id)){
            this.props.unSelectCartsItems([id]);
        }else{
            this.props.selectCartsItems([id]);
        }
    }

    isItemChecked(id:number){
        let {selected} =this.props.ui;
        return _.includes(selected,id)
    }

    onSubmitOrder(){
        let {items,carts} = this.props;
        let {selected} =this.props.ui;
        let orders:ItemBase[] = _.map(selected,(id:number)=>{
            do{
                let itemData = items[id];
                if(!itemData) break;
                let cart = carts.find((cart)=>cart.id==id);
                if(!cart) break;
                return {
                    itemcnt : cart.count,
                    item_id : cart.id,
                    price : itemData.price,
                    title : itemData.title,
                    shortdesc : itemData.shortdesc,
                    thumbnailsurl : itemData.thumbnailsurl,
                    bigimgurl:itemData.bigimgurl,
                    description:itemData.description,
                    marketprice: itemData.marketprice,
                    costprice: itemData.costprice,
                    saleprice: itemData.saleprice,
                }
            }while(false);
            
            return {
                itemcnt : 0,
                item_id : 0,
                price : 0,
                title : "",
                shortdesc : "",
                thumbnailsurl : "",
                bigimgurl:"",
                description:"",
                marketprice: 0,
                costprice: 0,
                saleprice: 0,
            }
        }).filter((item)=>item.item_id > 0);

        if(orders.length > 0){
            this.props.setSubmitOrderItems(orders);
            this.props.history.push(SUBMITORDER, {from:MAIN_CART});
		}
        else
        {
            MyToast(2000, "请选择商品后再结算");  
        }        
    }

    onDelete(){
        let {carts} = this.props;
        let {selected} =this.props.ui;
        if(carts.length == 0) return;
        if (selected.length > 0) {
            // 所有的选中状态的物品，全部删除，剩下的全部设置为 选中
            Alert.alert('提示', '确定删除勾选的商品吗？', [
                {
                    text: '取消',
                    onPress:()=>{}
                },
                {
                    text: '确定',
                    onPress:()=>{ this.onDeleteConfirm()}
                }
            ]);
        }
    }

    render(){
		let {carts,items} = this.props;
		let {selected} =this.props.ui;
        return(
            <Container>
                <StatusBar backgroundColor='transparent' translucent={true} barStyle='dark-content'/>
                <View style={{flexDirection: 'row', width: '100%', height: 44, marginTop: StatusBar_Height,
                            justifyContent: 'space-between', alignItems: 'center', backgroundColor: Config.ColorW}}>
                    <View style={{width: '20%'}}>

                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: Config.ColorB333,  fontSize: Config.Font1125}}>
                            购物车
                        </Text>
                    </View>
                    <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                        <Button transparent onPress={()=>{this.onDelete();}}>
                        <Text style={{color: selected.length > 0 ? Config.ColorG2e : Config.ColorB999}}>删除</Text>
                        </Button>
                    </View>
                </View>

                <View style={{height: 8, backgroundColor: '#f3f3f3'}} />
                <Content>
                    {/*商品列表*/}
                    <List>
                        <View>
                            {/*这里现在固定一个及时达,TODO 第一版临时*/}
                            <SectionItem sectionID={0}
                                             sectionData={{select:this.isSectionSelected(0),id:0,title:""}}
                                             sectionClick={(i)=>{
                                                 this.onSectionSelected(i);
                                             }}
                            />
                            <View style={{height:1, backgroundColor: '#e8e8e8'}} />
                            {
                                carts.map((cart: CartEntity, i: number)=>{
                                    let itemData = items[cart.id];
                                    return <ListItem key={i} style={{marginLeft: 0, paddingLeft: 10}}>
                                        <CartBuyItemWithRouter sectionID={0}
                                                 checked={this.isItemChecked(cart.id)}
                                                 dynamic={this.getItemDynamic(cart.id)}
                                                 itemID={cart.id}
                                                 count={cart.count}
                                                 itemData={itemData}
                                                 onAddItem={(itemIndex)=>{
                                                     this.onAddItem(cart);
                                                 }}
                                                 onSubItem={(itemIndex)=>{
                                                     this.onSubItem(cart);
                                                 }}
                                                 checkItem={(itemIndex)=>{
                                                     this.onSelected(cart.id)
                                                 }}
                                        />
                                    </ListItem>
                                })
                            }
                        </View>
                    </List>
                </Content>
                <Footer style={{alignItems:"center", height: IS_IPHONE_X()?40+24:40, backgroundColor: 'white'}}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row',flex:1}}>
                            <View style={{flex:1,flexDirection:"row",height: 40, alignItems: 'center',paddingVertical: 10, paddingHorizontal: 30}}>
                                <Text style={{marginLeft: 10}}>商品合计：</Text>
								<Text style={{color: Config.ColorB666}}>￥{formatMoney(this.state.allPrice)}</Text>
								{
									((this.state.allPrice >= Config.NOPEISONGRMBMIN) || (this.state.allPrice == 0)) ?
									<Text style={{color: Config.ColorB666, marginLeft: 3}} note>(免运费)</Text>	:
									<Text style={{color: Config.ColorB666, marginLeft: 3}} note>(运费{formatMoneyEx(Config.PEISONGRMB)}元)</Text>												
								}
                            </View>
                            <TouchableOpacity style={{ backgroundColor:Config.ColorOff, height: 40, paddingVertical: 10, paddingHorizontal: 30}}
                                      onPress={this.onSubmitOrder}>
                                    <Text style={{color: 'white', fontSize: Config.Font1125}}>去结算</Text>
                            </TouchableOpacity>
                        </View>
                        {/*<View style={{height: 1, width: '100%', backgroundColor: '#f3f3f3'}} />*/}
                    </View>
                </Footer>
            </Container>);
    }
}