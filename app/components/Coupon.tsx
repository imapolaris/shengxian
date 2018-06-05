import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
    Container, Header, Content, Left, Body, Right, Title, Text, Form, Item, Label, Input, Button, Thumbnail, Icon, CardItem, Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, CheckBox
} from 'native-base';

import { RouteComponentProps, withRouter } from "react-router"
import {ComHeader, ComHeaderBtn} from "./ComHeader";
const ComHeaderWithRouter = withRouter(ComHeader);
import MyStatusBar from "./MyStatusBar";
import {Coupon as CouponEntry, CouponArray} from "../store/EntitiesState";
import { MAIN_MY, SUBMITORDER } from '../constants/RouterDefine';
import { Config, px2dp, MyToast } from '../config/Config';
import {formatMoney, formatMoneyEx} from "../common/utils/funcs";

export var titles = [
    '通用红包',
    '生鲜红包',
    '',
]
export interface coType {
    title: string;
    time: string;
    rmb: number;
    scope: string;
}

export const shead = StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
    btn: { borderRadius: 5, margin: 5, width: 100, backgroundColor: 'transparent', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
})

export const saddr = StyleSheet.create({
    bk: { flex: 1, backgroundColor: '#f3f3f3' },
    box1: { height: 146, backgroundColor: '#f3f3f3', margin: 20, borderRadius: 10, borderWidth: 2 },
    box2: { height: 70, backgroundColor: '#fff', flexDirection: "row", borderRadius: 10, alignItems: "center" },
    box3: { height: 80, backgroundColor: '#f3f3f3' },
    fonttxt: { color: '#000', fontSize: 20, margin: 10 },
    fonticon: { color: '#f3f3f3', fontSize: 40, margin: 10 },
    fonttag: { backgroundColor: "orange", color: '#fff', fontSize: 20, paddingHorizontal: 10, margin: 20, borderRadius: 10 },
    blackline: { height: 2, backgroundColor: '#f3f3f3' },
})

export interface CouponProps  extends RouteComponentProps<any>{
    Coupon: CouponArray,
    fetchCoupon: (version: number) => void,
    setCouponSelect:(id: number) => any,
    setSubmitOrderCoupon:(c:CouponEntry)=>void
}

export interface CouponState {
   
}


export default class Coupon extends React.Component<CouponProps, CouponState>{
    constructor(props: CouponProps) {
        super(props);

    }

    isCouponValid(coupon:CouponEntry){
        let allmoney = this.props.location.state.all;
        if(allmoney && allmoney < coupon.lowmoney){
            return false;
        }
        return true;
    }
    componentDidMount() {
        this.props.fetchCoupon(this.props.Coupon.version);
        console.log("----------componentDidMount111--Coupon-")
    }

    isOverTime(timestr: string) {
        var moment = require('moment');
        return !moment().isBefore(timestr);
    }

    render() {
        return (
            <Container>
                <MyStatusBar />
                {/* 头部 */}
                <ComHeaderWithRouter title=  {this.props.location.state.from == MAIN_MY ? "我的优惠券" : "选择优惠卷"} />
                {/* 中间 */}

                <Content style={saddr.bk}>
                    {
                        this.props.Coupon.data.map((item, index) => {
                            return <TouchableOpacity  key={index}  disabled={!this.isCouponValid(item)} onPress={()=>{
                                if (this.props.location.state.from == SUBMITORDER)
                                {
                                    if(!this.isCouponValid(item))
                                    {
                                        MyToast(2000, "订单金额不足！");
                                        return;
                                    }

                                    if(this.isOverTime(item.endtime))
                                    {
                                        MyToast(2000, "优惠券已过期！");
                                        return;
                                    }                                    
                                    this.props.setSubmitOrderCoupon(item);
                                    this.props.history.goBack();
                                }                                    
                            }}>
                                <View style={{height: 10}} />
                                <View style={{flex:1, height: px2dp(80), flexDirection: 'row', backgroundColor:Config.ColorW, 
                                              paddingLeft: 15, paddingRight: 15, marginLeft: 10, marginRight: 10, 
                                              borderRadius: 10, borderWidth:1, borderColor: Config.ColorBf4, paddingBottom: 10}}>
                                    <View style={{width:'50%', marginTop:5, justifyContent:'center'}}>
                                        <Text style={{ fontWeight: 'bold' }}> {item.title} </Text>
                                        <Text style={{fontSize: 14, color: this.isOverTime(item.endtime)? 'red':'#b5b5b5', marginTop: 15}}> {this.isOverTime(item.endtime) ? "已过期" : item.endtime} </Text>
                                    </View>

                                    <View  style={{width:'50%', marginTop:5, justifyContent:'center'}}>
                                        <Text style={{ color: Config.ColorOf8, textAlign: 'right', fontSize: px2dp(25), marginBottom: 10}}> ￥{formatMoney(item.money)} </Text>
                                        <Text style={{ fontSize: px2dp(14), color: '#383838', textAlign: 'right', marginBottom: 8}}> 满{formatMoney(item.lowmoney)}元可用 </Text>
                                    </View>
                                </View>  
                            </TouchableOpacity>
                        })
                    }
                </Content>
            </Container>
        );
    }
}