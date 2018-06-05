import * as React from "react";
import {FlatList, StyleSheet, TouchableOpacity, Alert, BackHandler} from 'react-native'
import {Container,Header,Title,List,Button,Icon,Text,Content,Footer, CardItem, Thumbnail, ListItem, Tabs, Tab, TabHeading} from 'native-base';
import ViewItem from "./ViewItem";
import BuyItem from "./BuyItem";
import {
    Item as OrderEntity, ItemMap, Item, Order, OrderMap, OrderState,
    OrdersState
} from "../store/EntitiesState"
// import {MyOrderItem} from "../actions/MyOrder";
import {ORDERDETAIL, PAY, MYORDER,MAIN_CART, MAIN_MY} from "../constants/RouterDefine";
import {ListView, ListViewDataSource, View} from "react-native";
import {formatDate, formatMoney, getOrderStateName} from "../common/utils/funcs";
import {RouteComponentProps, withRouter} from "react-router";
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import OrderImg from "./OrderImg";
import Line from "./Line";
import MyStatusBar from "./MyStatusBar";
import {MyOrderUIState} from "../store/UIState";
import {ORDER_LIST_TYPE, ORDER_PAGE_COUNT} from "../actions/order";
import {transpileIfTypescript} from "ts-jest/dist/transpile-if-ts";
import {Config} from "../config/Config";
import * as PropTypes from 'prop-types';
import * as moment from "moment";

const  ComHeaderWithRouter= withRouter(ComHeader);
let g_bfrommy:boolean;
export const styles = StyleSheet.create({
    tabbk:   {
        backgroundColor: '#fff',
    }  ,
    dftxtcolor:   {
        color: Config.ColorB333,
        fontSize: Config.FontBase,
    }  ,
    activetxtcolor:   {
        color: Config.ColorOf8,
        fontSize: Config.FontBase,
    }  ,
    pic:   {
        resizeMode: "cover",
        width: 80,
        height: 80
    },
})

export interface OneOrderProps extends  Partial<RouteComponentProps<any>> {      
    order:Order,
    cancelOrder:(id:string)=>void, 
    delOrder:(id:string)=>void,    
    buyAgain:(id:string)=>void,
    click:()=>void          // 增加    
}

export interface OrderAction {
    title:string
    order:Order
    action:()=>any
}

export interface OneOrderState {
	actions:OrderAction[],
	lastPayTime?:number,
    timeoutID?:number,
}

class OneOrder extends React.Component<OneOrderProps,OneOrderState>{
    static contextTypes={
        router:PropTypes.object
    };
    constructor(props:any){
       super(props);
       this.onPay           = this.onPay.bind(this);
        this.delOrder       = this.delOrder.bind(this);
		this.cancelAction   = this.cancelAction.bind(this);
		this.tick = this.tick.bind(this);

		//待付款
        if(props.order.state == OrderState.OSUnPay){
			let lastPayTime1 = Config.GetPayLeftTime(props.order.created_at)
			this.state ={				
				lastPayTime: lastPayTime1, 		// moment(props.order.created_at).add(Config.PAY_COUNT_DOWN,"m").diff(moment()),
				timeoutID:setInterval(this.tick,1000),
				actions:this.updateActions(props, lastPayTime1)
			}
		}
		else{
			this.state ={
				actions:this.updateActions(props, 0)
			}
		}       
	}
	tick() {
        if (!this.state) return;
		let {lastPayTime,timeoutID} = this.state;
		console.log("lastPayTime=", lastPayTime);
        if(lastPayTime && lastPayTime > 1000){
			this.setState({lastPayTime:(lastPayTime - 1000), actions:this.updateActions(this.props, lastPayTime)})
        }else if(timeoutID){
			this.props.order.state = OrderState.OSCancel	//修改本地订单状态为 已取消
            clearInterval(timeoutID);
            this.setState({lastPayTime:0,timeoutID:0, actions:this.updateActions(this.props, 0)})
        }
    }
    updateActions(props:OneOrderProps, lastPayTime1:number = 0):OrderAction[]{
        let actions:OrderAction[] = [];
        switch (props.order.state){
            case OrderState.OSUnPay:{
				// let lastPayTime1 = this.state? this.state.lastPayTime : 0
				if (lastPayTime1 == 0)
				{
					lastPayTime1 = Config.GetPayLeftTime(props.order.created_at.toString())
				}
				let titlebtn = lastPayTime1 && `去支付(剩余${moment.utc(lastPayTime1).format("mm:ss")})` || "去支付"
                actions.push({title:titlebtn,order:props.order,action:()=>{this.onPay(props.order)}});
                actions.push({title:"取消订单",order:props.order,action:()=>{this.cancelAction(props.order)}});
                break;
            }
            case OrderState.OSPack:
            case OrderState.OSPeisoning:{
                actions.push({title:"取消订单",order:props.order,action:()=>{this.cancelAction(props.order)}});
                break;
            }
            case OrderState.OSFinish:{
                actions.push({title:"再次购买",order:props.order,action:()=>{this.props.buyAgain(props.order.order_number)}});
                break;
            }
            case OrderState.OSCancel:{
                actions.push({title:"再次购买",order:props.order,action:()=>{this.props.buyAgain(props.order.order_number)}});
                break;
            }
        }
        return actions
	}
	componentWillUnmount(){
        if(this.state && this.state.timeoutID){
            clearInterval(this.state.timeoutID);
        }
    }
    componentWillReceiveProps(nextProps:OneOrderProps){
        this.setState({actions:this.updateActions(nextProps)})
    }
    onPay(order:Order) {
        if(order.state == OrderState.OSUnPay)
        {
            if(order.state == OrderState.OSUnPay ){
                this.context.router.history &&  this.context.router.history.push(PAY, {order:order, from:MYORDER});
            }
        }
    }

    delOrder(order:Order){
        Alert.alert('提示', '确定要删除当前订单记录吗？', [
            {
                text: '取消',
                onPress:()=>{}
            },
            {
                text: '确定',
                onPress:()=>{ this.props.delOrder(order.order_number);}
            }
        ]);
    }

    cancelAction(order:Order){
        // 取消订单
        Alert.alert('提示', '确定要取消当前订单吗？', [
            {
                text: '取消',
                onPress:()=>{}
            },
            {
                text: '确定',
                onPress:()=>{ this.props.cancelOrder(order.order_number);}
            }
        ]);
    }

    render() {
		let {order, click} = this.props
		
		// let lastPayTime = this.state? this.state.lastPayTime : 0
		// 		let titlebtn = lastPayTime && `去支付(剩余${moment.utc(lastPayTime).format("mm:ss")})` || "去支付"
        return (
                <View>
                    <View style={{backgroundColor: '#f5f5f5', height: 10}}/>
                    <View style = {{flexDirection:'row', paddingVertical: 10}}>
                        {/* <Text style = {{color:'orange', marginLeft:10}}>[配送]</Text>
                        <Text style = {{flex:1, marginLeft: 5}}>{order.shopname} </Text> */}
						<Text style = {{fontSize: Config.Font09375, color:Config.ColorB666,flex:1, marginLeft: 5}}>{"下单时间:" + ' ' + formatDate(order.created_at)} </Text>
                        <Text style = {{color:Config.ColorOf8, marginRight:10, fontSize: Config.Font09375}}>{getOrderStateName(order.state)}</Text>
                    </View>

                    <Line color = '#f3f3f3'/>
                    <OrderImg items = {order.order_item} click = {()=>{ click()}} price={order.lastprice}/>
                    <Line color = '#f3f3f3'/>

                    <View style = {{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center',paddingVertical: 10}}>
                        {
                            this.state.actions.map((action:OrderAction,index:number)=>(
                                <TouchableOpacity key={index} onPress={()=>action.action()}  style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                                    borderColor: Config.ColorG2e, borderWidth: 1, marginRight: 10}}>
									<Text style={{fontSize: Config.Font09375, color: Config.ColorG2e}}>{action.title}</Text>
                                </TouchableOpacity>)
                            )
                        }
                    </View>
                </View>
            );
    }
}

export interface MyOrderProps  extends RouteComponentProps<any>{
    orders:OrdersState,
    loading:boolean,
    ui:MyOrderUIState
    fetchOrder:(state:number,page:number,count:number,force:boolean)=>void
    changeMyOrderTab:(page:number)=>void,
    cancelOrder:(id:string)=>void,
    buyAgain:(id:string)=>void,
    delOrder:(id:string)=>void,
}
export interface MyOrderState {
    page:number
}
export default class MyOrder extends React.Component<MyOrderProps,MyOrderState>{
    private ds:ListViewDataSource;
    constructor(props:any){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.onChangeTab = this.onChangeTab.bind(this)
        this.fetchOrder = this.fetchOrder.bind(this)
        this.state={
            page:this.props.ui.page
        }
    }

    componentDidMount(){
		BackHandler.addEventListener('hardwareBackPress', this.backListenerMyOrder);
		this.fetchOrder(this.state.page,true,false,false);		
    }
    componentWillUpdate(nextProps:MyOrderProps, nextState:MyOrderState){
		BackHandler.removeEventListener('hardwareBackPress', this.backListenerMyOrder);
        if(nextState.page != this.state.page){
            if(this.getOrdersCount(nextState.page) == 0){
                this.fetchOrder(nextState.page,true,false,true);
            }
		}		
    }
    componentWillUnmount(){
        this.props.changeMyOrderTab(this.state.page);
	}
	backListenerMyOrder = ()=>{
		console.log('syy---------------backListenerMyOrder----------------------end + ',g_bfrommy )		
			if (!g_bfrommy)
			{
				this.props.history.push(MAIN_CART)
                return true
			}
			return false;
    }

    fetchOrder(page:number,first:boolean,next:boolean,force:boolean){
        let {finished,unfinished} = this.props.orders;
        let currentPage= page == ORDER_LIST_TYPE.UNFINISHED ? unfinished.currentPage:finished.currentPage;
        if(next){
            // 已经到最后一页了
            if(page == ORDER_LIST_TYPE.FINISHED && finished.currentPage>=finished.totalPage){
                return
            }
            if(page == ORDER_LIST_TYPE.UNFINISHED && unfinished.currentPage>=unfinished.totalPage){
                return;
            }
        }
        if(next) currentPage += 1;
        if(first) currentPage=1;
        this.props.fetchOrder(page,currentPage,ORDER_PAGE_COUNT,true);
    }
    getOrdersCount(page:number){
        let {finished,unfinished} = this.props.orders;
        if(page == ORDER_LIST_TYPE.UNFINISHED){
            return unfinished.orders.length
        }else{
            return finished.orders.length
        }
    }

    onChangeTab(currentPage:any){
        this.setState({page:currentPage.i});
    }

    render(){
        let {page} = this.state;
        let {finished,unfinished} = this.props.orders;
        console.log(page);
		let orders = (page == ORDER_LIST_TYPE.FINISHED)?finished.orders:unfinished.orders;

		let bfrommy = (this.props.location && this.props.location.state && (this.props.location.state.from == MAIN_MY)) ? true :false
		g_bfrommy = bfrommy
		
        return(
            <Container>
                <MyStatusBar />
				{
					bfrommy ?
					<ComHeaderWithRouter title="我的订单" />	:
					<ComHeaderWithRouter title="我的订单" backClick ={() => {this.props.history.push(MAIN_CART)}} />
				}
                
                    <Tabs tabBarUnderlineStyle={{backgroundColor: Config.ColorOf8}} initialPage={this.props.ui.page} onChangeTab={this.onChangeTab} locked={true}>
                        <Tab heading="未完成" tabStyle = {styles.tabbk} activeTabStyle = {styles.tabbk}
                             textStyle = {styles.dftxtcolor} activeTextStyle = {styles.activetxtcolor} >
                            <FlatList data={orders} renderItem={({item})=><OneOrder key={item.order_number} cancelOrder={this.props.cancelOrder} delOrder={this.props.delOrder}  buyAgain={this.props.buyAgain} order={item} click = {()=>{this.props.history.push(ORDERDETAIL, {order:item, from:MYORDER})}}/>}
                                      keyExtractor={(item,index)=>{console.log(index);return index.toString()}}
                            onRefresh={()=>this.fetchOrder(page,true,false,true)}
                            refreshing={this.props.loading}
                            onEndReachedThreshold={0.5}
                            onEndReached={()=>this.fetchOrder(page,false,true,false)}
                            />
                        </Tab>
                        <Tab heading="已完成" tabStyle = {styles.tabbk} activeTabStyle = {styles.tabbk}
                             textStyle = {styles.dftxtcolor} activeTextStyle = {styles.activetxtcolor} >
                            <FlatList data={orders}
                                      keyExtractor={(item,index)=>index.toString()}
                                      onRefresh={()=>this.fetchOrder(page,true,false,true)}
                                      refreshing={this.props.loading}
                                      onEndReachedThreshold={0.5}
                                      onEndReached={()=>this.fetchOrder(page,false,true,false)}
                                      renderItem={({item})=><OneOrder key={item.order_number} cancelOrder={this.props.cancelOrder} buyAgain={this.props.buyAgain} delOrder={this.props.delOrder} order={item} click = {()=>{this.props.history.push(ORDERDETAIL, {order:item, from:MYORDER})}}/>}
                            />
                        </Tab>

                    </Tabs>
            </Container>
        )
    }
}
