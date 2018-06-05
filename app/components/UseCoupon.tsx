import * as React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, CheckBox} from 'native-base';

import {RouteComponentProps, withRouter} from "react-router"
import {ComHeader, ComHeaderBtn} from "./ComHeader";
const  ComHeaderWithRouter= withRouter(ComHeader);
import MyStatusBar from "./MyStatusBar";
// import {Util} from "../common/utils/util";

export var titles = [
    '通用红包',
    '生鲜红包',
    '',
]

export var coData =
[
    { title: titles[0], 	  		time:  '2017-12-08 12:00' 	,		rmb:  50    , scope: '满100元可用'			    },
    { title: titles[1], 	  		time:  '2017-12-08 12:00'  	,		rmb:  100   , scope: '满200元可用'			    },
    { title: titles[0], 	  		time:  '2017-12-08 12:00'  	,		rmb:  150   , scope: '满300元可用'			    },   
];

export interface coType{
    title:string;
    time:string;
    rmb:number;
    scope:string;
}

export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    fonttxt: {color:'#000', fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },
    btn: {borderRadius:5, margin: 5, width: 100, backgroundColor:'transparent', marginRight: 10, justifyContent: 'center', alignItems: 'center'},
})

export const saddr = StyleSheet.create({
    bk:{flex:1, backgroundColor:'#f3f3f3'},
    box1:{height:146, backgroundColor:'#f3f3f3', margin: 20, borderRadius:10,borderWidth:2 },
    box2:{height:70, backgroundColor:'#fff', flexDirection:"row", borderRadius:10,alignItems:"center"},
    box3:{height:80, backgroundColor:'#f3f3f3'},
    fonttxt: {color:'#000', fontSize:20,margin:10},
    fonticon: {color:'#f3f3f3', fontSize:40,margin:10 },
    fonttag: {backgroundColor:"orange", color:'#fff', fontSize:20, paddingHorizontal:10, margin:20,borderRadius:10},
    blackline: {height:2, backgroundColor:'#f3f3f3'} ,
})

export interface CouponProps{
    
}

export interface CouponState{
    title:string;
    time:string;
    rmb:number;
    scope:string;
}

export default class Coupon extends React.Component<CouponProps,CouponState>{
    constructor(props:CouponProps){
        super(props)
    }

    render() {
        return (
            <Container>
                <MyStatusBar />
{/* 头部 */}
                <ComHeaderWithRouter title="使用优惠券"/> 
{/* 中间 */}
                
                
                <View style={saddr.bk}>
                    <View style={{flexDirection: 'row', height: 40, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, marginTop: 5,
                     paddingRight: 23, paddingLeft:10, marginBottom: 15, borderWidth: 1, alignItems: 'center'}}>
                        <Text>不使用优惠券</Text>

                        <CheckBox />
                    </View>
                    
                    <View style={{flexDirection: 'row', marginLeft: 15,  height: 40}}>
                        <Text style={{marginRight: 80}}>有3个红包不可使用</Text>
                        <Button style={{height: 15, width: 15, borderRadius: 100}}>           
                        </Button>
                        <Text>
                            红包使用说明
                        </Text>
                    </View>

                    <View>
                        <List dataArray={coData}
                            renderRow={(item) =>
                            <ListItem style={{marginRight: 20}}>
                                <View style={{flexDirection: 'row', flex:1}}>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontWeight: 'bold'}}>{item.title}</Text> 
                                        <Text style={{color: '#f3f3f3', marginTop: 10}}>{item.time}</Text>
                                    </View> 
                                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                        <Text style={{color: 'red', textAlign: 'right', fontSize: 25}}>￥{item.rmb}</Text> 
                                        <Text style={{color: '#f3f3f3', textAlign: 'right'}}>{item.scope}</Text>  
                                    </View>
                                    
                                    <CheckBox />
                                </View>   
                            </ListItem>                                         
                            }>
                        </List>
                    </View>               
                </View>                
            </Container>
        );
    }
}