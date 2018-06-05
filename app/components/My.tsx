import * as React from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions, ImageBackground ,FlatList, DeviceEventEmitter} from 'react-native';
import {
    Container, Header, Content, Left, Body, Right, Title, Text, Form, Item, Label, Input, Button, Thumbnail, Icon, CardItem, Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, Badge
} from 'native-base';
import { ADDRLIST, MORE, SHOPLIST, COUPON, RECHARGE, MYORDER, PAY, MAIN_MY } from "../constants/RouterDefine";
import { SETUP, HELP, LOGIN, SUBMITORDER, FEEDBACK } from "../constants/RouterDefine";
import { RouteComponentProps } from "react-router";
import MyStatusBar from "./MyStatusBar";
import LinearGradient from 'react-native-linear-gradient';
import { MyData } from "../store/EntitiesState";
import { formatMoney } from "../common/utils/funcs";
import { Config } from "../config/Config";

import * as addr from '../../images/addr.png';
import * as coupon from '../../images/coupon.png';
import * as feedback from '../../images/feedback.png';
import * as head_icon from '../../images/head_icon.png';
import * as help from '../../images/help.png';
import * as my_head_back from '../../images/my_head_back.png';
import * as order from '../../images/order.png';
import * as service from '../../images/service.png';
import * as set from '../../images/set.png';

const SCREEN_WIDTH = Dimensions.get('window').width

// import {Util} from "../common/utils/util";
//const pichead = require("./splashscreen.png");
const pichead = { uri: "screen" }

export const shead = StyleSheet.create({
    head: { backgroundColor: 'transparent', height: 150 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { backgroundColor: 'transparent', color: '#fff', fontSize: 16 },
    fonttxt2: { color: 'orange', fontSize: 20 },
    fontcoupon: { color: 'red', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
})
//f4f4f4
export const saddr = StyleSheet.create({
    bk: { backgroundColor: '#f3f3f3' },
    bk2: { backgroundColor: '#f3f3f3', flexDirection: 'row', height: 80 },
    //bk3:{backgroundColor:'#f3f3f3', flex:1, flexDirection:'row', paddingTop:10},
    bk3: { backgroundColor: '#f3f3f3', flexDirection: 'row', paddingTop: 10 },
    btn: { backgroundColor: '#fff', flex: 1, margin: 1 },
    btn3: { backgroundColor: '#fff', height: 80, flex: 1, flexDirection: 'column', margin: 1 },
    fonticon: { color: '#000', fontSize: 30, textAlign: 'center' },
    vw1: { borderBottomWidth: 0.5, borderColor: '#b2b2b2', width: '25%', height: 100, paddingTop: 10 },
    tx1: { fontSize: Config.FontBase, color: Config.ColorB333, alignSelf: 'center', paddingTop: 15 },
})

export interface MyProps extends RouteComponentProps<any> {
    My: MyData,
    fetchMy: (version: number) => void,
}
export interface MyState {
}

export interface MineCellProps {
    item:any,
    index:number,
    onPress:()=>void,
    MyData:any
}

export interface MineCellState {

}

class MineCell extends React.Component<MineCellProps, MineCellState> {


    render(){

        const {index, item,onPress,MyData} = this.props;

        return (
            <TouchableOpacity
            style={[cellStyles.container,{borderRightWidth:(index == 3)?0:1,borderTopWidth:(index/4 < 1)? 1 : 0}]}
            onPress={onPress}
        >
            {
                index==1 && MyData.couponcnt> 0 ?
                    <Badge info style={{
                        backgroundColor: Config.ColorOff, height: 20, minWidth: 20, paddingLeft: 0, paddingRight: 0,
                        alignSelf: 'center', zIndex: 999, top: 10, position: 'absolute', left: SCREEN_WIDTH / 8 + 5,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ lineHeight: 17, textAlign: 'center', paddingLeft: 0, paddingRight: 0, fontSize: 10 }}>{MyData.couponcnt}</Text></Badge>
                    : null
            }
            <Image style={cellStyles.image} source={item.source}/>
            <Text style={saddr.tx1}>{item.title}</Text>
        </TouchableOpacity>
        )
    }

}


const cellStyles = StyleSheet.create({

    container:{

        width:(SCREEN_WIDTH)/4,
        justifyContent:'center',
        // marginLeft:-0.5,
        alignItems:'center',
        height:(SCREEN_WIDTH)/4,
        backgroundColor:'white',
        borderColor:Config.ColorBf4,
        borderBottomWidth:1
    },
    image: {
        width:40,
        height:40
    }

})


export default class My extends React.Component<MyProps, MyState>{
    constructor(props: any) {
        super(props)

        this.isLogin = this.isLogin.bind(this);
    }

    componentDidMount() {
		// this.props.fetchMy(this.props.My.version);
		
		//tab切换的时候调用
		DeviceEventEmitter.addListener('MyReload',()=>{
            this.props.fetchMy(0);
		} )
        this.props.fetchMy(0);
    }

    isLogin(data: MyData) {
        if (data && (data.data.phone && data.data.phone.length > 0 || data.data.title.length > 0)) {
            return true;
        }

        return false
    }

    data = [
        {
            title:'我的订单',
            source:order,
            route:MYORDER
        },
        {
            title:'优惠券',
            source:coupon,
            route:COUPON
        },
        {
            title:'收货地址',
            source:addr,
            route:ADDRLIST
        },
        {
            title:'客服中心',
            source:service,
            route:SHOPLIST
        },
        {
            title:'意见反馈',
            source:feedback,
            route:FEEDBACK
        },
        {
            title:'帮助中心',
            source:help,
            route:HELP
        },
        {
            title:'设置中心',
            source:set,
            route:SETUP
        },
    ]

    render() {

        let MyData = this.props.My.data
        
        return (
            <Container>
                {/* <MyStatusBar color="#0000EE" /> */}
                <StatusBar backgroundColor='transparent' translucent={true} />
                {/* 头部 */}
                <ImageBackground source={my_head_back} style={{ height: 150, top: 0 }} resizeMode='cover'>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ height: 70, alignContent: 'center', marginTop: 50, marginLeft: 20 }}>
                            {
                                MyData && MyData.headurl ?
                                <Image source={{ uri: MyData.headurl }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                                :
                                <Image source={head_icon} style={{ width: 80, height: 80, borderRadius: 40 }} />
                            }
                            
                        </View>
                        <View style={{ height: 70, justifyContent: 'center', alignSelf: 'center', marginLeft: 15 }}>
                            {
                                this.isLogin(this.props.My) ?
                                    <View>
                                        {MyData && MyData.title && MyData.title.length > 0 ? <Text note style={shead.fonttxt}>{MyData.title}</Text> : null}
                                        {MyData && MyData.phone && MyData.phone.length > 0 ? <Text note style={shead.fonttxt}>{MyData.phone}</Text> : null}
                                    </View>
                                    :
                                    <Text style={{ fontSize: 20, fontWeight: '200', color: Config.ColorW }}>登录 / 注册</Text>
                            }
                        </View>
                    </View>
                </ImageBackground>
                <FlatList
                    scrollEnabled={false}
                    style={{flex:1, width:SCREEN_WIDTH}}
                    keyExtractor={(item, index)=>index.toString()}
                    data={this.data}
                    renderItem= {({item, index, separators})=>(
                        <MineCell item={item}
                                  index={index}
                                  MyData={MyData}
                                  onPress={()=>{
									this.props.history.push(item.route, { from: MAIN_MY })
                                  }}
                        />

                    )}
                    numColumns={4}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        zIndex: 1
    }
});