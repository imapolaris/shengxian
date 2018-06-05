import * as React from 'react';
import * as moment from "moment";
import {Toast} from "native-base";
import {StyleSheet,ScrollView, Dimensions,TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';
import {RouteComponentProps, withRouter} from "react-router"

import Picker from 'react-native-picker';
import {PickData, LeftData, autoPeisongDate, GetSelectedDate, formartSelectedDate} from './SubmitOrder/ChooseTimeUtil';

import AddressItem from './SubmitOrder/OrderAddressItem';
import OrderLineItem from './SubmitOrder/OrderLineItem';
import OrderItemInfo from './SubmitOrder/OrderItemInfo';
import OrderItemSubInfo from './SubmitOrder/OrderItemSubInfo';
import OrderItemRemain from './SubmitOrder/OrderRemainItem';
import OrderItemBottom from './SubmitOrder/OrderBottomItem';
import ChooseTimeItem from './SubmitOrder/chooseTimeItem';
import { ADDRLIST, COUPON, SUBMITORDER, MAIN_CART} from "../constants/RouterDefine";
import MyStatusBar from "./MyStatusBar"
import * as _ from "lodash"
import {ComHeader} from "./ComHeader";
import {SubmitOrderUIState} from "../store/UIState";
import {Address, Coupon, CouponArray, initCoupon, ItemBase} from "../store/EntitiesState";
import {Config, MyToast} from "../config/Config";
import {newOrder, OrderRequest} from "../actions/order";
import {formatDate} from "../common/utils/funcs";
import {ItemDynamicArray, ItemDynamic} from "../store/EntitiesState";
import {getDistance} from "../common/utils/distance";

const  ComHeaderWithRouter= withRouter(ComHeader);

const {width, height} = Dimensions.get('window');

// import {Util} from "../common/utils/util";
const pichead = {uri:"screen"};

export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    fonttxt: {color:'#000', fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },
})

//f4f4f4
export const saddr = StyleSheet.create({
    bk:{backgroundColor:'gainsboro'},  
    fontright:{flexDirection:'row', justifyContent:'flex-end'},
    
})

export interface SubmitOrderProps extends RouteComponentProps<any>{   
	ui:SubmitOrderUIState
    coupons:Coupon[]
    setSubmitOrderTime:(time:Date)=>void
    setSubmitOrderMemo:(time:string)=>void
    newOrder:(order:OrderRequest)=>void
    itemDynamics:ItemDynamicArray   //库存
}

export interface SubmitOrderState{
    allPrice:number
    coupon?:Coupon
    isShowTime: boolean,
    selectTime: string,
    showBgView: boolean
}
export default class SubmitOrder extends React.Component<SubmitOrderProps,SubmitOrderState>{
    constructor(props:any){
        super(props);
        this.props.ui.memo = ""         //新打开页面需要清空
        props.ui.time = autoPeisongDate(props.ui.time);
        let allPrice = this.calcPrice()
        this.state = {
            isShowTime: false,
            selectTime: formartSelectedDate(props.ui.time),
            showBgView: false,
            allPrice,
            coupon:this.getValidCoupon(allPrice)
        };
        this.showPick = this.showPick.bind(this);
        this.calcPrice = this.calcPrice.bind(this);
        this.getValidCouponCount = this.getValidCouponCount.bind(this);
        this.getTotalMoney = this.getTotalMoney.bind(this);
        this.commitOrder =this.commitOrder.bind(this);
		this.getValidCoupon = this.getValidCoupon.bind(this);

		this.props.location.state.from = ''			//只用一次 用了删除了
    }
    componentWillReceiveProps(nextProps:SubmitOrderProps){
        let allPrice = this.calcPrice()
        this.setState({selectTime:formartSelectedDate(nextProps.ui.time),allPrice,coupon:this.getValidCoupon(allPrice)});
    }
    getItemDynamic(id:number):ItemDynamic|undefined{
        return this.props.itemDynamics.data.find((item)=>item.id == id);
    }

    calcPrice(){
        let {items} = this.props.ui;
        let allPrice =  _.reduce(items,(sum,item)=>{
            let dynamic = this.getItemDynamic(item.item_id);
            let price = dynamic ? dynamic.price: 10000;
            return sum + item.itemcnt * price;
        },0)
        return allPrice
    }
    getValidCoupon(all:number){
		if (this.props.location.state.from != MAIN_CART)
        {
			let {coupon} = this.props.ui;
	        if(coupon && moment().isBefore(coupon.endtime) && coupon.lowmoney <= all){
	            return coupon
	        }
		}
        let auto =_.filter(this.props.coupons,
            (c)=>{
                console.log(c)
                return moment().isBefore(c.endtime) && c.lowmoney <=all
            })
            .reduce((r:undefined|Coupon,c)=>{
                if(!r) {
                    return c
                }else if(c.money > r.money){
                    return c
                }
                return r
			},undefined);

			this.props.ui.coupon = auto 		//记录选择
        return auto
    }

    getValidCouponCount(all:number){
      return _.reduce(this.props.coupons,(cnt,coupon)=>{
          if(coupon.lowmoney <= all){
              return cnt + 1
          }
          return cnt
      },0)
    }

    commitOrder(){
        let {items,addr,time,memo,coupon} = this.props.ui;
        if(!addr || !addr.id){
            MyToast(3000, "请选择配送地址");
            // Toast.show({
            //     text:`请选择配送地址`,
            //     buttonText:"确定",
            //     position:"bottom",
            //     type:"danger",
            //     duration:3000
            // });
            return;
        }
        let dis = getDistance(addr.lat,addr.lng,Config.SHOP_LOCATION.lat,Config.SHOP_LOCATION.lng);
        if(dis > Config.MAX_PEISONG_DISTANCE){
            Toast.show({
                text: "超出配送距离",
                buttonText: "确定",
                position: "bottom",
                type: "danger",
                duration: 5000
            })
            return
        }
        let  ids = _.map(items,(item)=>item.item_id);
        let order:OrderRequest={
            itemlist:ids,
            addr_id:addr.id,
            apptime:moment(time).format("YYYY-MM-DD HH:mm:ss"),
            coupon_id: coupon ? coupon.id : 0,
            des:memo
		};
		
		this.props.newOrder(order);		
    }

    getTotalMoney(){
        let {coupon} = this.state;
        let couponMoney = 0;
        if(coupon && coupon.id > 0 && coupon.lowmoney < this.state.allPrice){
            couponMoney = - coupon.money;
        }
        let peisong = Config.PEISONGRMB;
        if(this.state.allPrice >= Config.NOPEISONGRMBMIN){
            peisong = 0;
        }
        let total=this.state.allPrice + couponMoney + peisong
        return (total > 0) ? total :0
    }

    showPick(){
        let data = PickData();
        console.log(data)
        Picker.init({
            pickerData: PickData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 17,
            pickerFontColor: [0, 0, 0, 1],
            pickerBg: [255, 255, 255, 1],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择送达时间',
            pickerConfirmBtnColor: [0, 121, 251, 1],
            pickerCancelBtnColor: [137, 137, 137, 1],
            pickerTitleColor: [20, 20, 20, 1],
            pickerToolBarBg: [238, 238, 239, 1],

            onPickerConfirm: data => {
                this.props.setSubmitOrderTime(GetSelectedDate(data[0],data[1]));
                this.setState({
                    showBgView: false
                })
            },
            onPickerCancel: data => {
                this.setState({
                    showBgView: false
                })
            },
            onPickerSelect: data => {
                this.setState({
                    showBgView: false
                })
            }
        });
        Picker.show();
    }
    render() {
		return (
            <Container>
                <MyStatusBar />
                <ComHeaderWithRouter title="提交订单"/>

                <Content ref='scrollView'>
                <OrderLineItem height={10}/>
                    {/* <View style={{height: 20}}/> */}
                    <AddressItem addr={this.props.ui.addr} addressClick={()=>{this.props.history.push(ADDRLIST, {from:SUBMITORDER})}}/>
                    <OrderLineItem height={10}/>
                    <OrderItemInfo order = {this.props.ui.items} allprice = {this.state.allPrice} selectTime={this.state.selectTime} timeClick={()=>{
                       this.showPick();
                       this.setState({
                           showBgView: true
                       })
                    }}/>
                    {/* <OrderLineItem height={10}/> */}
                    <OrderItemSubInfo coupon={this.state.coupon} couponCount={this.getValidCouponCount(this.state.allPrice)} allprice={this.state.allPrice} switchClick={(check)=>{}} CouponClick = {()=>{this.props.history.push(COUPON, {from:SUBMITORDER,all:this.state.allPrice})}} />
                    <OrderLineItem height={10}/>
                    <OrderItemRemain onFocus={()=>{}} changeText={(text)=>{this.props.setSubmitOrderMemo(text)}} memo={this.props.ui.memo}/>
                </Content>
                <OrderItemBottom real={this.getTotalMoney()} commitOrderClick={()=>{
                    this.commitOrder();
                }}/>
                {/* {

                    this.state.isShowTime ? <ChooseTimeItem sureClick={(date)=>{
                        this.setState({
                            isShowTime: !this.state.isShowTime,
                            selectTime: date
                        })
                    }}/> : null
                } */}
                {

                    this.state.showBgView ? <TouchableOpacity style={{
                        backgroundColor: 'black',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: 0.5,
                        width,
                        height
                    }} onPress={()=>{

                        Picker.hide()
                        this.setState({
                            showBgView: false
                        })

                    }}/> : null

                }
            </Container>
        );
    }
}