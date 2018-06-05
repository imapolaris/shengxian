import * as React from 'react';
import {StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';

// import {Util} from "../common/utils/util";
import {RouteComponentProps, withRouter} from "react-router"
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import * as ImageMoney from '../../images/moneyImage.gif';

const  ComHeaderWithRouter= withRouter(ComHeader);
import MyStatusBar from "./MyStatusBar";
const screenWidth = Dimensions.get('window').width;

export var rechargeData =
[
    { id: 1, 	  		rmb:  100 	,		ret:  50 	  },
    { id: 2, 	  		rmb:  200 	,		ret:  100     },
    { id: 3, 	  		rmb:  300 	,		ret:  150     },
    { id: 4, 	  		rmb:  500 	,		ret:  250     },
    { id: 5, 	  		rmb:  1000 	,		ret:  500 	  },
    { id: 6, 	  		rmb:  2000 	,		ret:  1000 	  }, 
    { id: 7, 	  		rmb:  5000 	,		ret:  2500 	  }, 
];

export interface reType{
    id:number;
    rmb:number;
    ret:number;
}

export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    fonttxt: {color:'#000', fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },
    btn: {borderRadius:5, margin: 5, width: 100, backgroundColor:'transparent', marginRight: 10, justifyContent: 'center', alignItems: 'center'},
})

export const saddr = StyleSheet.create({
    bk:{flex:1, backgroundColor:'white'},
    box1:{height:146, backgroundColor:'#f3f3f3', margin: 20, borderRadius:10,borderWidth:2 },
    box2:{height:70, backgroundColor:'#fff', flexDirection:"row", borderRadius:10,alignItems:"center"},
    box3:{height:80, backgroundColor:'#f3f3f3'},
    fonttxt: {color:'#000', fontSize:20,margin:10},
    fonticon: {color:'#f3f3f3', fontSize:40,margin:10 },
    fonttag: {backgroundColor:"orange", color:'#fff', fontSize:20, paddingHorizontal:10, margin:20,borderRadius:10},
    blackline: {height:2, backgroundColor:'#f3f3f3'} ,
    chvalue: {flex: 1, textAlign: 'center',fontWeight:'bold', color: '#8fb140', fontSize: 20},
    chtitle: {flex: 1, marginRight: 5, color: '#848484', textAlign: 'center',
    textShadowOffset:{width:5,hegith:2},  
    textShadowRadius:3,  
    textShadowColor:'#e8e8e8',
    fontSize: 20 },
})

export interface RechargeProps{
    
}

export interface RechargeState{
    rmb:number;
    ret:number;
    total:number;
    id:number;
    customCnt:number;
    fanxianMoney: number;
}

export default class Recharge extends React.Component<RechargeProps,RechargeState>{
    constructor(props:RechargeProps){
        super(props)
        this.state = {
            rmb: 100,
            ret: 50,
            total: 150,
            id:     1,
            customCnt: 0,
            fanxianMoney: 0,
        }
    }

    SpecifyCount(id:number) {
        id = id - 1;
        this.setState({
            rmb: rechargeData[id].rmb,
            ret: rechargeData[id].ret,
            total: rechargeData[id].rmb+rechargeData[id].ret,
            id: id+1,
            fanxianMoney: id+1
        });
    }

    //自定义充值
    CustomCount(count:string) {
        let cnt = +count;
        this.setState({
            rmb: cnt,
            ret: cnt/2,
            total: cnt + cnt/2,
        });
    }

    //修改其他金额边框颜色
    ModifyBorder() {
        console.log('获取焦点')
        this.setState({
            rmb: 0,
            ret: 0,
            total: 0,
            id: 8,
        });
    }

    Recharege() {
        //ToDo
        console.log("充值！！！");
    }

    render() {
        return (
            <Container>
            <MyStatusBar />
{/* 头部 */}
                <ComHeaderWithRouter title={this.state.fanxianMoney === 0 ? '账户金额' : '账户金额（￥'+this.state.fanxianMoney.toString()+'）'}/>
{/* 中间 */}
                    <View style={saddr.bk}>
                        <View>
                            {
                                this.state.id ==8 ? <View style={{justifyContent: 'center', alignItems: 'center', height: 150,
                                                                  paddingBottom: 30, paddingTop: 30}}>
                                    <Text style={{color: '#3b3b3b'}}>其他金额</Text>
                                    <Input ref='input' style={{fontSize: 14, textAlign: 'center', marginTop: 20, height: 40, width: screenWidth-60,
                                                   borderRadius: 5, borderWidth:1,borderColor: '#b5b5b5'}}
                                           placeholder='请输入充值金额'      
                                           keyboardType='numeric'                               
                                           onChangeText={(money)=>{
                                               this.CustomCount(money)
                                           }}
                                           underlineColorAndroid={'transparent'}
                                           autoFocus={true}
                                    />
                                </View>  
                                 : 
                                <View style={{flex: 1}}>
                                    <Image style={{width: screenWidth, height: 240}} source={ImageMoney} />
                                </View>
                            }

                            <View style={{flexDirection: 'row', marginTop: this.state.id==8 ? 30 : 180}}>
                                <Text style={saddr.chtitle}>充值</Text>
                                <Text style={saddr.chtitle}></Text>
                                <Text style={saddr.chtitle}>赠送</Text>
                                <Text style={saddr.chtitle}></Text>
                                <Text style={saddr.chtitle}>入账</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginRight: 5, marginTop: 5}}>
                                <Text style={saddr.chvalue}>{this.state.rmb}</Text>
                                <Text style={saddr.chvalue}>+</Text>
                                <Text style={saddr.chvalue}>{this.state.ret}</Text>
                                <Text style={saddr.chvalue}>=</Text>
                                <Text style={saddr.chvalue}>{this.state.total}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row',  flexWrap: 'wrap', marginTop: 20, justifyContent:'flex-start', marginLeft: 35, paddingBottom: 5}}>
                            {
                                rechargeData.map(
                                    (rData) => (
                                        <Button key={rData.id}  style={{
                                            borderRadius:5,
                                            width: 100,
                                            height: 30,
                                            marginRight: 10,
                                            marginTop: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor:'transparent',
                                            borderWidth:1,
                                            borderColor: this.state.id == rData.id ? 'orange' : '#f3f3f3'
                                        }}   onPress={()=>{
                                            this.SpecifyCount(rData.id)                                            
                                        }}>
                                            <Text style={{color: this.state.id == rData.id ? '#ffb001' : '#b5b5b5'}}>{rData.rmb}元</Text>
                                        </Button>
                                    )
                                )
                            }

                            <Button style={{height: 30,borderRadius:5, width:102, backgroundColor: 'transparent',
                                borderWidth:1, borderColor: this.state.id ==8 ? 'orange' : '#f3f3f3',marginTop: 10}} onPress={()=>{
                                    this.setState({
                                        id: 8
                                    });

                            }}>
                                <Text  style={{fontSize: 14,textAlign:'center', color: this.state.id ==8 ? 'orange' : '#b5b5b5'}}>
                                    其他金额
                                </Text>
                            </Button>
                        </View>
                    </View>

                <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute',width:screenWidth,height: 45,bottom: 0}}>
                    <Button style={{height: 40,marginLeft: 10, width:screenWidth-20, backgroundColor: '#ff7e00', borderRadius:5, justifyContent: 'center'}}
                            onPress={()=>this.Recharege()}>
                        <Text>立即充值</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}