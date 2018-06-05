import * as React from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity , BackHandler} from 'react-native'
import {CheckBox ,Container, Header, Title, List, Button, Icon, Text, Content, Footer, CardItem, Body, Left, Right, Image, ListItem, Thumbnail, Radio } from 'native-base';
import ViewItem from "./ViewItem";
import BuyItem from "./BuyItem";
import * as WeChat from "react-native-wechat";
import { Item as OrderEntity, ItemMap, Item, Order, OrderState } from "../store/EntitiesState"
// import {PayItem} from "../actions/Pay";
import { ITEMLIST, ORDERDETAIL, PAY, SUBMITORDER, MAIN} from "../constants/RouterDefine";
import { ListView, ListViewDataSource, View } from "react-native";
import { formatMoney, getOrderStateName } from "../common/utils/funcs";
import { RouteComponentProps, withRouter } from "react-router"
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import OrderImg from "./OrderImg";
import PointLine from "./PointLine";
import {Config, px2dp} from "../config/Config";
const ComHeaderWithRouter = withRouter(ComHeader);
import * as login_weChat_icon from '../../images/login_weChat_icon.png';
import * as alipay_logo from '../../images/alipay_logo.png';
import * as huodaofukuan from '../../images/huodaofukuan.png';
import {startDaoFuPay} from "../actions/ui";
import MyStatusBar from "./MyStatusBar";
import * as moment from "moment";
import StoreConfig from "../store/ConfigureStore";
let {history} = StoreConfig;

let g_order:Order; 
let g_from:string;
export const PayList = [
    { id: 1, name: "微信支付", 	addr: "上海普陀区金沙江路1518弄2号楼611室", sex: 1, city: "上海", tag: 1, area: "近铁城市广场1", img:login_weChat_icon },
    { id: 2, name: "支付宝", 	addr: "上海普陀区金沙江路1518弄2号楼612室", sex: 2, city: "北京", tag: 2, area: "近铁城市广场2", img:alipay_logo },
    { id: 3, name: "货到付款",  addr: "上海普陀区金沙江路1518弄2号楼614室", sex: 2, city: "广州", tag: 4, area: "近铁城市广场4", img:huodaofukuan },
]
export const styles = StyleSheet.create({
    otherinfo: {
        backgroundColor: 'lightgrey',
        height: 40
    },
    pic: {
        resizeMode: "cover",
        width: 80,
        height: 80
    },
})

export interface PayProps extends RouteComponentProps<any> {
    key: number,
    order: Order,
    startAliPay:(order: Order)=>any
    startWeChatPay:(order: Order)=>any
    startDaoFuPay:(order: Order)=>any
}

export interface PayState {
    activeid: number;
    lastPayTime:number,
    timeoutID:number,
    isInstallWeChat:boolean
}

export default class Pay extends React.Component<PayProps, PayState>{
    private ds: ListViewDataSource
    constructor(props: any) {
        super(props)
        this.ds             = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.tick           = this.tick.bind(this);
        this.payCountdown   = this.payCountdown.bind(this);
        this.onPay          = this.onPay.bind(this);  

        let {order} = this.props.location.state;
        // var now     = moment().valueOf();
        // var create  = moment(order.created_at).valueOf();
        // let count   = (create+Config.PAY_COUNT_DOWN*60*1000-now)/(60*1000)
        // if(count < 0)
        // {
        //     count = 0;
        // }
        // console.log("count = ", count)
        this.state  = {
            activeid: 1,
			// lastPayTime: moment(order.created_at).add(count,"m").diff(moment()),
			lastPayTime:Config.GetPayLeftTime(order.created_at), 	//moment(order.created_at).add(Config.PAY_COUNT_DOWN,"m").diff(moment()),
            timeoutID: setInterval(this.tick, 1000),
            isInstallWeChat:false
        }     
    }
	componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backListenerPay);
        WeChat.isWXAppInstalled().then(result=>{

            console.log('isinstall +' + !!result)
            this.setState({
                isInstallWeChat:!!result
            })
        })
    }
	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.backListenerPay);
        if(this.state && this.state.timeoutID){
            clearInterval(this.state.timeoutID);
        }
	}
	backListenerPay = ()=>{
		console.log('syy---------------backListenerPay----------------------end + ',g_from )
			if (g_from && (g_from == SUBMITORDER))
			{
				history.push(ORDERDETAIL, {order:g_order, from:PAY})
                return true
			}
			return false;
    }
	// backListener1 = ()=>{		
    //     BackHandler.addEventListener('hardwareBackPress', this.backListenerPay);
    // }
    tick() 
    {
        if (!this.state) 
        {
            return;
        }

        let {lastPayTime,timeoutID} = this.state;
        console.log("lastPayTime=", lastPayTime);
        if(lastPayTime && lastPayTime>1000)
        {
			this.setState({lastPayTime:(lastPayTime - 1000)});
        }
        else if(timeoutID)
        {
            clearInterval(timeoutID);
            this.setState({
                           lastPayTime: 0,
                           timeoutID: 0
                        })
            this.props.history.push(MAIN);
        }
    }

    SetChange(id: number) {
        this.setState({
            activeid: id
        });
    }
    onPay() {
        if(!this.props.location.state)return;
        let {order} = this.props.location.state;
        if(this.state.activeid == 1){
            this.props.startWeChatPay(order as Order);
        }else if(this.state.activeid == 2){
            this.props.startAliPay(order as Order);
        }else{
            this.props.startDaoFuPay(order as Order);
        }
    }
    payCountdown() {
        let order = this.props.location.state.order;
        let {lastPayTime} = this.state;
        return lastPayTime && `${moment.utc(lastPayTime).format("mm:ss")}`
	}	
    render() {
        // this.props.match.params.order		
		let order = this.props.location.state && this.props.location.state.order
		// let aa = (order.state == OrderState.OSFinish) ? true : false
		let from = this.props.location.state && this.props.location.state.from||"";
		g_order = order;
		g_from = from
        return (
            <Container>

                {/* 头部 */}
                <MyStatusBar />
				{
					(from == SUBMITORDER)?
					<ComHeaderWithRouter title="支付" backClick ={() => {this.props.history.push(ORDERDETAIL, {order:order, from:PAY})}} />:
					<ComHeaderWithRouter title="支付"  />
				}
				{/* <Content padder> */}
				<Content >
                    <OrderImg items={order.order_item} click={() => { this.props.history.push(ITEMLIST, {orderlist:order.order_item, from:PAY}) }} price={order.lastprice}/>
                    <ListItem itemDivider />
                    <Text style={{alignSelf:'center', fontSize:20}} >支付剩余时间</Text>
                    <Text style={{alignSelf:'center', fontSize:30}}  >{this.payCountdown()}</Text>
                    <Text style={{backgroundColor:'#f3f3f3', marginTop: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 10}}   >第三方支付</Text>

                    {
                        PayList.map (
                            (PayData) => {

                                if (!this.state.isInstallWeChat && PayData.name ==='微信支付') return null

                                return <TouchableOpacity  key={PayData.id} onPress={()=>{
                                    this.setState({activeid:PayData.id});
                                }}>
                                <View style={{height: 5, flex: 1, backgroundColor: '#f3f3f3'}}></View>
                                <View style={{flex: 1, height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                                    <Thumbnail source={PayData.img}
                                                    style={{marginLeft:5, width:35, height: 35}}/>
                                    <Text style={{width: '40%',textAlign: 'left'}}>{PayData.name}</Text>
                                    <View style={{paddingRight:15}}>
                                        <CheckBox checked={this.state.activeid == PayData.id}
                                                  color={Config.ColorOff}
                                                  onPress={()=>{
                                                      this.setState({activeid: PayData.id});
                                                  }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            }
                        )
                    }

                    <Button style={{backgroundColor: Config.ColorOff, borderRadius: 10 , marginTop: px2dp(30), height: Config.BtnComHeight, marginLeft: 10, marginRight: 10}} full onPress={this.onPay}>
                        <Text>确认支付</Text>
                    </Button>

                </Content>
            </Container>);
    }
}