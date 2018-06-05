
import * as React from 'react';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';
import {RouteComponentProps, withRouter} from "react-router";
import { SHOPLIST} from "../constants/RouterDefine";
import {formatMoneyEx} from "../common/utils/funcs";

import {ComHeader, ComHeaderBtn} from "./ComHeader";
import enumerate = Reflect.enumerate;
import {itemDataModel} from "../store/EntitiesState";
import MyStatusBar from "./MyStatusBar";
import {Config, IS_IPHONE_X} from "../config/Config";
import OrderLineItem from './SubmitOrder/OrderLineItem';

const  ComHeaderWithRouter= withRouter(ComHeader);


export const saddr = StyleSheet.create({
    bk:{backgroundColor:'#999'},

})

export interface HelpProps extends RouteComponentProps<any>{
}
export interface HelpState{
    questions:any
}
export default class Help extends React.Component<HelpProps,HelpState>{
    constructor(props:any){
        super(props);
		// `满${formatMoney(lowmoney)}元减${formatMoney(money)}元`
        this.state ={
            questions: [
                {id: 0,select: false, title: 'App订单如何付款?', des: '我们支持支付宝/微信/货到付款'},                
                {id: 1,select: false, title: 'App是免费送货吗?', des: `我们满${formatMoneyEx(Config.NOPEISONGRMBMIN)}元免配送费`},
                // {id: 3,select: false, title: 'App可以开充值发票吗?', des: '其实我也不知道怎么付款4'},
                // {id: 4,select: false, title: 'App怎么下单?', des: '其实我也不知道怎么付款5'},
                // {id: 5,select: false, title: 'App怎么取消订单?', des: '其实我也不知道怎么付款6'},
                // {id: 6,select: false, title: 'App怎么查询订单?', des: '其实我也不知道怎么付款7'},
                // {id: 7,select: false, title: 'App怎么查询优惠券?', des: '其实我也不知道怎么付款8'},
                // {id: 8,select: false, title: 'App怎么使用优惠券?', des: '其实我也不知道怎么付款9'},
                // {id: 9,select: false, title: 'App怎么获取优惠券?', des: '其实我也不知道怎么付款10'},
                // {id: 10,select: false, title: 'App怎么充值?', des: '其实我也不知道怎么付款11'},
                // {id: 11,select: false, title: 'App怎么查询余额?', des: '其实我也不知道怎么付款12'},
                // {id: 12,select: false, title: 'App怎么查询交易明细?', des: '其实我也不知道怎么付款13'},
                // {id: 13,select: false, title: 'App客服电话是多少?', des: '其实我也不知道怎么付款14'},
                // {id: 14,select: false, title: 'App一次能下几单?', des: '其实我也不知道怎么付款15'},
                // {id: 15,select: false, title: 'App怎么和客服妹妹联系?', des: '其实我也不知道怎么付款16'},
                // {id: 16,select: false, title: 'App怎么提意见?', des: '其实我也不知道怎么付款17'},
                // {id: 17,select: false, title: 'App怎么评价?', des: '其实我也不知道怎么付款18'},
                // {id: 18,select: false, title: 'App怎么取消订单?', des: '其实我也不知道怎么付款19'},
            ]
        }
    }
    render() {
        return (
            <Container style={{backgroundColor: '#f5f5f5'}}>
                <MyStatusBar />
                {/* 头部 */}
                <ComHeaderWithRouter title="帮助中心"/>
                
                {/* 下面 */}
                
                <View style={[saddr.bk, {flex:1, backgroundColor: '#f5f5f5', marginTop:10}]}>
                
					<List style={{backgroundColor: '#f5f5f5'}}                     
                        dataArray={this.state.questions}
                        renderRow={( item) =>{
                            return <TouchableOpacity key={item.id} style={{backgroundColor: 'white', borderColor: Config.ColorBf4, 
                                                        borderWidth:1, marginLeft: 5, marginRight: 5, borderRadius: 10}} 
                                                        onPress={()=>{
                                this.setState({
                                    questions: this.state.questions.map((obj:any,i:number)=>{
										return {...obj,select:obj.id == item.id ? !obj.select : false}
									}),
                                })
                            }}>
                                <View style={{flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: 10,
                                    alignItems:'center'
                                }}>
								
                                    <Text style={{color: item.select ? Config.ColorG2e : 'black', marginLeft: 10}}>{item.id + 1 + "、 " + item.title}</Text>
                                    {
                                        item.select ? <Icon style={{marginRight: 10, fontSize: 12, color:Config.ColorB999}} name='arrow-up'/> :
                                            <Icon style={{marginRight: 10, fontSize: 12, color:Config.ColorB999}} name='arrow-down'/>
                                    }
                                </View>
                                <View style={{backgroundColor: '#f5f5f5', height: 1}}/>

                                {
                                    item.select ?  <View style={{padding: 20, backgroundColor: '#f5f5f5'}}>
                                        <Text>{item.des}</Text>
                                    </View> : null
                                }

                            </TouchableOpacity>}
                        }
                        horizontal={false}
                    />

                </View>

                <View style={{height: 65, backgroundColor: 'white', alignItems: 'center',marginBottom:IS_IPHONE_X()?24:0}}>
                    <Text style={{color: '#999', fontSize: 12, marginTop: 5}}>没有我想问的问题?</Text>
                    <TouchableOpacity style={{paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: Config.ColorG3c,
                        marginTop: 5,
                        flexDirection: 'row',
                        marginBottom: 5
                    }} onPress={()=>{this.props.history.push(SHOPLIST)}}>
                        <Icon style={{fontSize: Config.IconSize1, color: Config.ColorG3c}} name='call'/>
                        <Text style={{color: Config.ColorG2e, fontSize: 13, marginLeft: 5}}>客服中心</Text>
                    </TouchableOpacity>
                </View>


            </Container>
        );
    }
}
