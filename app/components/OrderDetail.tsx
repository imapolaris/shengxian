import * as React from "react";
import {Alert, Dimensions, StyleSheet, TouchableHighlight, TouchableOpacity,BackHandler} from 'react-native'
import {Container,Header,Title,List,Button,Icon,Text,Content,Footer, CardItem, Body, Right, Image, ListItem,Thumbnail} from 'native-base';
import ViewItem from "./ViewItem";
import BuyItem from "./BuyItem";
import {Item as OrderEntity, ItemMap, Item, Order, OrderState} from "../store/EntitiesState"
// import {OrderDetailItem} from "../actions/OrderDetail";
import {ITEMLIST, PAY,MAIN, ORDERDETAIL} from "../constants/RouterDefine";
import {ListView, ListViewDataSource, View} from "react-native";
import {formatDate, formatMoney, getOrderStateName} from "../common/utils/funcs";
import {RouteComponentProps, withRouter} from "react-router"
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import OrderImg from "./OrderImg"
import PointLine from "./PointLine"
import MyStatusBar from "./MyStatusBar"
const  ComHeaderWithRouter= withRouter(ComHeader);
import {Config, IS_IPHONE_X, MainHelper} from "../config/Config";
import * as moment from "moment";
import * as home2 from '../../images/home2.png';

const screenWidth = Dimensions.get('window').width
let g_from:string;

export const styles = StyleSheet.create({
    otherinfo:   {
        backgroundColor: Config.ColorW,
        height:40,
        flex: 1,
        textAlign: 'right'
    }  ,
    pic:   {
        resizeMode: "cover",
        width: 80,
        height: 80
    },
})

export interface OrderDetailProps extends RouteComponentProps<any>{
    key:number,
    order:Order,
	cancelOrder:(id:string)=>void,
	buyAgain:(id:string)=>void,
}

export interface OrderDetailState{
    lastPayTime:number,
    timeoutID:number,
}

export default class OrderDetail extends React.Component<OrderDetailProps,OrderDetailState>{
    constructor(props:any){
        super(props)

        this.tick = this.tick.bind(this);
        this.payAction = this.payAction.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.payTitle = this.payTitle.bind(this);
        this.getStateStr = this.getStateStr.bind(this);
        
        let order = this.props.location.state.order;
        //待付款
        if(order.state == OrderState.OSUnPay){
            this.state = {
                lastPayTime:Config.GetPayLeftTime(order.created_at), 	//moment(order.created_at).add(Config.PAY_COUNT_DOWN,"m").diff(moment()),
                timeoutID:setInterval(this.tick,1000)
            }
        }

    }

    tick() {
        if (!this.state) return;
		let {lastPayTime,timeoutID} = this.state;
		console.log("lastPayTime=", lastPayTime);
        if(lastPayTime && lastPayTime > 1000){
			this.setState({lastPayTime:(lastPayTime - 1000)})
        }else if(timeoutID){
			this.props.location.state.order.state = OrderState.OSCancel	//修改本地订单状态为 已取消
            clearInterval(timeoutID);
			this.setState({lastPayTime:0,timeoutID:0})			
        }
    }
	componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backListenerOrderDe);
    }
    componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.backListenerOrderDe);
        if(this.state && this.state.timeoutID){
            clearInterval(this.state.timeoutID);
        }
    }

    componentWillReceiveProps(nextpops:OrderDetailProps){
        let order = this.props.location.state.order;
        if(order.state == OrderState.OSUnPay) {
            this.setState({
                lastPayTime: moment(order.created_at).add(30, "m").diff(moment(order.created_at))
            })
        }
	}
	backListenerOrderDe = ()=>{
		console.log('syy---------------backListenerOrderDe----------------------end + ',g_from )
			if (g_from && (g_from == PAY))
			{
				console.log('syy---------------backListenerOrderDe----------------------end 2 + ',g_from )
				// history.push(ORDERDETAIL, {order:g_order, from:PAY})
                return true
			}
			return false;
    }

    payAction(){
        let order = this.props.location.state.order;
        if(order.state == OrderState.OSUnPay){
            this.props.history.push(PAY,  {order:order, from:ORDERDETAIL});
        }
    }

    payTitle(){
        let order = this.props.location.state.order;
        if(order.state == OrderState.OSUnPay) {
            let {lastPayTime} = this.state;
            return lastPayTime && `去支付(剩余${moment.utc(lastPayTime).format("mm:ss")})` || "去支付"
        }
        return ""
    }

    cancelAction(){
        let order = this.props.location.state.order;
		// if(order.state!=OrderState.OSCancel && order.state==OrderState.OSUnPay)
		{
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
    }
    getStateStr(state: OrderState)
    {
        switch(state)
        {
            case OrderState.OSCancel:
                return ['待支付', '已取消'];
            case OrderState.OSCancelVerify:
                return ['待支付','待拣货','待配送','审核中'];
            default:
                return ['待支付','待拣货','待配送','已完成'];
        }
    }
    render(){
		let order = this.props.location.state.order;
		let from = this.props.location.state && this.props.location.state.from||"";
		g_from = from

		console.log("scsscscc +" + screenWidth)
        return(
           <Container>
            <MyStatusBar />
            {/* 头部 */}
			{
				(from == PAY) ?
				<ComHeaderWithRouter title="订单详情" leftImage={home2} backClick={()=>{ MainHelper.selectedTab = "home", this.props.history.push(MAIN)}}/>	:
				<ComHeaderWithRouter title="订单详情" />
			}

            <Content>
                <View style={{height: 10, backgroundColor: '#f4f4f4'}}>

                </View>
                <View style={{flex: 1, backgroundColor: 'white', height: 45}}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{paddingLeft: 17}}>订单编号:</Text>
                            <Text style={{paddingLeft: 17}}>{order.order_number}</Text>
                            <Text style={{paddingLeft: 17, paddingRight: 17}}>{getOrderStateName(order.state)}</Text>
                    </View>		
                </View>               
                <View style={{height: 10, backgroundColor: '#f4f4f4'}} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: Config.ColorW}}>
                    <PointLine endpoint={false} width={screenWidth} titles={this.getStateStr(order.state)} 
                        currentStatus={order.state} index={order.state+1} size={{height:1, width:100}} id={1} first={true} />
	                {/*<PointLine endpoint={false} text="待拣货" index={order.state+1} size={{height:1, width:100}} id={2} />*/}
	                {/*<PointLine endpoint={false} text="待配送" index={order.state+1} size={{height:1, width:100}} id={3} />*/}
	                {/*<PointLine endpoint={true}  text="已完成" index={order.state+1} size={{height:1, width:100}} id={4} />*/}
	            </View>
                <View style={{height: 10, backgroundColor: '#f4f4f4'}} />
                {/* <View style={{paddingLeft: 17, paddingRight: 17, flex: 1}}> */}
                    <OrderImg items = {order.order_item} click = {()=>{this.props.history.push(ITEMLIST, {orderlist:order.order_item, from:ORDERDETAIL})}} price={order.productprice}/>
                {/* </View> */}
                
                <View style={{height: 10, backgroundColor: '#f4f4f4'}} />
                <View style={{flex: 1, backgroundColor: 'white', marginTop: 10}}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between', height: 45}}>
                            <Text style={{paddingLeft: 17}}>商品金额:</Text>
                            <Text style={{paddingLeft: 17}}></Text>
                            <Text style={{paddingLeft: 17, paddingRight: 17}}>{formatMoney(order.productprice)}</Text>
                    </View>		
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between', height: 45}}>
                            <Text style={{paddingLeft: 17}}>配送费:</Text>
                            <Text style={{paddingLeft: 17}}></Text>
                            <Text style={{paddingLeft: 17, paddingRight: 17}}>{formatMoney(order.peiprice)}</Text>
                    </View>	
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between', height: 45}}>
                            <Text style={{paddingLeft: 17}}>优惠券:</Text>
                            <Text style={{paddingLeft: 17}}></Text>
                            <Text style={{paddingLeft: 17, paddingRight: 17}}>-{formatMoney(order.couponprice)}</Text>
                    </View>	
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between', height: 45}}>
                            <Text style={{paddingLeft: 17}}>应付金额:</Text>
                            <Text style={{paddingLeft: 17}}></Text>
                            <Text style={{paddingLeft: 17, paddingRight: 17}}>{formatMoney(order.lastprice)}</Text>
                    </View>		
                    {
                            order.des ? 
                            <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between'}}>
                                    <Text style={{marginLeft: 17}}>其他信息:</Text>
                                <View style={{flex:1}}>
                                    <Text style={{marginLeft: 17, marginRight: 17, textAlign:'left'}}>{order.des}</Text>
                                </View>

                            </View>	: null
                    }
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between', height: 45}}>
                            <Text style={{paddingLeft: 17}}>下单时间:</Text>
                            
                            <Text style={{paddingLeft: 17, paddingRight: 17}}>{formatDate(order.created_at)}</Text>
                    </View>	
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: Config.ColorW, justifyContent: 'space-between', height: 45}}>
                            <Text style={{paddingLeft: 17}}>预约时间:</Text>
                            <Text style={{paddingLeft: 17}}>{}</Text>
                            <Text style={{paddingLeft: 17, paddingRight: 17}}>{formatDate(order.apptime)}</Text>
                    </View>	
                </View>
            </Content>

               <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center', paddingBottom:IS_IPHONE_X()?24+15:15}}>
                   {
                       (order.state == OrderState.OSUnPay)?
                           <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                               borderColor: Config.ColorG2e, borderWidth: 1, marginRight: 10}}
                                             onPress={()=>this.payAction()}>
                               <Text style={{fontSize: Config.Font09375, color: Config.ColorG2e}}>{this.payTitle()}</Text>
                           </TouchableOpacity>
                           :
                           null
				   }
				   {
                       ((order.state == OrderState.OSCancel) || (order.state == OrderState.OSFinish))?
                           <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                               borderColor: Config.ColorG2e, borderWidth: 1, marginRight: 10}}
                                             onPress={()=>this.props.buyAgain(order.order_number)}>
                               <Text style={{fontSize: Config.Font09375, color: Config.ColorG2e}}>再次购买</Text>
                           </TouchableOpacity>
                           :
                           null
                   }
                   {
                       (order.state != OrderState.OSCancel && order.state != OrderState.OSFinish && order.state != OrderState.OSCancelVerify)?
                           <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5,
                               borderColor: Config.ColorG2e, borderWidth: 1, marginRight: 10}}
                                             onPress={()=>this.cancelAction()}>
                               <Text style={{fontSize: Config.Font09375, color: Config.ColorG2e}}>取消订单</Text>
                           </TouchableOpacity>
                           :
                           null
                   }
               </View>

        </Container>);
    }
}