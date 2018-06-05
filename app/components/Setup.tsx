import * as React from 'react';
import {StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, Toast} from 'native-base';
import {RouteComponentProps, withRouter} from "react-router"

import {ComHeader, ComHeaderBtn} from "./ComHeader";
import MyStatusBar from "./MyStatusBar"
import ConfigureStore from "../store/ConfigureStore";
import {baseCacheFolder, Config, px2dp} from "../config/Config";
import {fileSize} from "../common/utils/funcs";
const  ComHeaderWithRouter= withRouter(ComHeader);
let RNFS = require('react-native-fs');
// import {Util} from "../common/utils/util";
const pichead = {uri:"screen"}
import axios, {AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';

export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },
    fonttxt: {color:'#000', fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },
})
//f4f4f4
export const saddr = StyleSheet.create({
    bk:{backgroundColor:'#f3f3f3'},
    fontright:{flexDirection:'row', justifyContent:'flex-end'},

})

import * as alipay from "react-native-alipay";

const screenWidth = Dimensions.get('window').width;

const reqest1 = 'app_id=2018041802577856&biz_content={"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http://sx.zhangqing.site/test&sign_type=RSA2&timestamp=2018-04-21 16:10:31&version=1.0&sign=anfC6fYyvq52N8qBhYn0LTD75PPTPrIoiUCEFOcBcNTK0xZ9C/xwJKMvoHMCl3eePOH+PlPiAtZLJe89nCTA1aJJj34SvbXI8ooMIvMqF7thHYQXEyumWFWhPLXe+meTBQeZ9Dib6P6Ig1R8oAB5e3BYIpUHTRVQIt6TS3bdJK6q8NRsscgcfKj3K8/UB5LQT/kRN2SB2PSyCUXbv0+hXwZpxjye9+MH9vCCP3BHs8W0+Q3oi/Hv4ZDnBnGUoOL6nV1c1VHvOE9W2UBZKxexky+bwJr290LNBKtuSy2pV6Jjvaor6L1sVO7f9RcPx08uAhejO+D8RvalEBFMefKodA=='
const requestencod = "app_id%3d2018041802577856%26biz_content%3d%7b%22timeout_express%22%3a%2230m%22%2c%22product_code%22%3a%22QUICK_MSECURITY_PAY%22%2c%22total_amount%22%3a%220.01%22%2c%22subject%22%3a%221%22%2c%22body%22%3a%22%e6%88%91%e6%98%af%e6%b5%8b%e8%af%95%e6%95%b0%e6%8d%ae%22%2c%22out_trade_no%22%3a%22IQJZSRC1YMQB5HU%22%7d%26charset%3dutf-8%26format%3djson%26method%3dalipay.trade.app.pay%26notify_url%3dhttp%3a%2f%2fsx.zhangqing.site%2ftest%26sign_type%3dRSA2%26timestamp%3d2018-04-21+16%3a10%3a31%26version%3d1.0%26sign%3danfC6fYyvq52N8qBhYn0LTD75PPTPrIoiUCEFOcBcNTK0xZ9C%2fxwJKMvoHMCl3eePOH%2bPlPiAtZLJe89nCTA1aJJj34SvbXI8ooMIvMqF7thHYQXEyumWFWhPLXe%2bmeTBQeZ9Dib6P6Ig1R8oAB5e3BYIpUHTRVQIt6TS3bdJK6q8NRsscgcfKj3K8%2fUB5LQT%2fkRN2SB2PSyCUXbv0%2bhXwZpxjye9%2bMH9vCCP3BHs8W0%2bQ3oi%2fHv4ZDnBnGUoOL6nV1c1VHvOE9W2UBZKxexky%2bbwJr290LNBKtuSy2pV6Jjvaor6L1sVO7f9RcPx08uAhejO%2bD8RvalEBFMefKodA%3d%3d"
let app_id = '2018041802577856'
let biz_content = '{"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}'
let notify_url = 'http://sx.zhangqing.site/callback/alipay'
let sign='pC6cy/lyglq4wL/8ZimHBsyE6e+pa+fDR4jvCISVGx0pbo+GUlIYCU4mlPo2VKVu4y2s1y1KZm4G1ZveDu4Gy82McfwL40Wc+ArQQxkf2w6rxS9uZj52hs6E1ZZYlgTi1Hzslk++yxHMDv1d/Z/66C9YDcuCEakEdnKb8rCWJygzyeZufvdA8brpYJcZbJDrP17kWx69mWxrNzJ/ghq5wfe4WdqbTjOdjD0Wd5jIkK5IRlPgYeRJ+PkIFalY2/wIFuInOmzr37/O8iMmcIhoy7JONYzxPrPipPYG50eJ21AjUNjmx/T/v1iymL/tJDAJdzcQ2gmEkuQt48OOilk9PA=='

function getVaue(key:string, value:string, add:boolean = true):string
{
	return (add ? '&': '') + key + '=' + encodeURIComponent(value);
	//'app_id=' + encodeURIComponent(app_id)
}
let orderText = getVaue('app_id', app_id , false) + getVaue('biz_content', biz_content) + getVaue('charset', 'utf-8') + getVaue('format', 'json')+ 
	getVaue('method', 'alipay.trade.app.pay')+ getVaue('notify_url', notify_url)+ getVaue('sign_type', 'RSA2')+ getVaue('timestamp', '2018-04-21 17:10:31')+ 
	getVaue('version', '1.0')+ getVaue('sign', sign)
export interface SetupProps extends RouteComponentProps<any>{
    clearCacheData:()=>void,
    logout:()=>void,
}
export interface SetupState{
    cacheSize:string
}
export default class Setup extends React.Component<SetupProps,SetupState>{
    constructor(props:any){
        super(props)
        this.onResetData = this.onResetData.bind(this);
        this.startCalcCacheSize = this.startCalcCacheSize.bind(this)
        this.state={
            cacheSize:""
        }
    }

    onResetData(){
        //TODO 什么清,什么不清
        ConfigureStore.persist.purge();
        this.props.clearCacheData();
        setTimeout(()=>{this.startCalcCacheSize()},2000);
    }
    componentDidMount(){
        this.startCalcCacheSize();
    }
    startCalcCacheSize(){
        RNFS.readDir(baseCacheFolder) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((results:{path:string,size:number}[]) => {
                let size = results.reduce((size:number,val)=>{
                    size += val.size;
                    return size;
                },0);
                this.setState({cacheSize:fileSize(size)})
            })
            .catch((err:Error) => {
                console.log(err.message);
            });
    }

    Logout()
    {
        this.props.logout();
        this.props.history.goBack();
    }

	testAliPay()
	{
		//const orderInfo = requestencod	;//encodeURIComponent(reqest1);
		
	 	console.log("-----------------testAliPay-orderText:", orderText)
	// console.log("-----------------testAliPay-alipay:", orderInfo)
	// alipay(res){
        let self=this
        alipay.pay(orderText, true).then(function(result){
			console.log("-----------------testAliPayOK-"+result)
            // let data=''
            // if (Platform.OS === 'ios'){
            //     data=result[0].resultStatus
            // }else {
            //     if (typeof result=='string'){
            //         let parse_data_result=parse_data(result)
            //         data=parse_data_result.resultStatus
            //     }
            // }
            // if (data === '9000') {
            //     welog('pay', 'pay_action', {status: 'success',pay_action:'alipay_success',payRes:result,step: '8'})
            // } else if (data === '8000') {
            // } else if (data == '6001') {
            //               } else {
            // }
        }, function (err) {
            console.log(`---alipay--err------${JSON.stringify(err)}`);
        });
		// async function doPay() 
		// {
		// 	// const orderInfo = await post('/createOrder');
		// 	const orderInfo = "fsdfasdfadf";
		// 	console.log("-----------------testAliPay-send")
		// 	const result = await alipay.pay(orderInfo, true);
		// 	console.log("-----------------testAliPay-ret")
		//     if (result.resultStatus === '9000') {
		//         Alert.alert('提示', '支付成功');
		//     } else if (result.resultStatus === '8000') {
		//         Alert.alert('提示', '支付结果确认中,请稍后查看您的账户确认支付结果');
		//     } else if (result.resultStatus !== '6001') {
		//         // 如果用户不是主动取消
		//         Alert.alert('提示', '支付失败');
		//     }
		// }
		// doPay()
	}
    render() {
        return (
            <Container>
            <MyStatusBar />
{/* 头部 */}
                <ComHeaderWithRouter title="设置中心"/>
{/* 下面 */}
                <View style={[saddr.bk, {flex:1}]}>
                {/* <View > */}
                    <List style={[{backgroundColor:'#fff',marginTop:10}]} >
                        <ListItem button onPress = {this.onResetData}>
                            <Text style={{flex:1}} >清除本地缓存</Text>
                            <Right style={{flexDirection:'row', justifyContent:'flex-end', flex: 0.5}}>
                                <Text>{this.state.cacheSize}</Text>
                                <Icon name="arrow-forward" style={Config.styles.ForwardIcon}/>
                            </Right>
                        </ListItem>
                        <ListItem  button onPress = {()=>{
							Toast.show({
								text: '测试提示',
								buttonText: "确定",
								position: "bottom",
								type: "success",
								duration: 3000
							});
						}}>
                            <Text style={{flex:1}}>当前版本号</Text>
                            <Right style={saddr.fontright}>
                                <Text >5.0.1</Text>
                                <Icon name="arrow-forward" style={Config.styles.ForwardIcon}/>
                            </Right>
                        </ListItem>
                        {/* <ListItem  button onPress = {()=>{this.testAliPay()}}>
                            <Text style={{flex:1}}>测试支付宝</Text>
                            <Right style={saddr.fontright}>
								<Icon name="arrow-forward" style={Config.styles.ForwardIcon}/>
                            </Right>
                        </ListItem> */}
						<ListItem  button onPress = {()=>{Config.bNeiWang = !Config.bNeiWang
						axios.defaults.baseURL =Config.bNeiWang?Config.HTTP_BASE_URL_NEI:Config.HTTP_BASE_URL_WAY;
						   Alert.alert('提示', Config.bNeiWang ? '已切换到内网':'已切换到外网', [
									{
										text: '取消',
										onPress:()=>{}
									},
									{
										text: '确定',
										onPress:()=>{ }
									}
								]);
							}}>
							{/* <Text style={{flex:1}}>关于我们</Text> */}
							<Text style={{flex:1}}>内/外网切换</Text>
                            <Right style={saddr.fontright}>
                                <Icon name="arrow-forward" style={Config.styles.ForwardIcon}/>
                            </Right>
                        </ListItem>
                    </List>
                    <View style={{justifyContent: 'center', width:screenWidth, height: 60, marginTop: 10}}>
                        <Button style={{height: Config.BtnComHeight, marginLeft: 10, width:screenWidth-20, 
                                        backgroundColor: Config.ColorOff, borderRadius:5, justifyContent: 'center'}}
                                onPress={()=>this.Logout()}>
                            <Text>退出登录</Text>
                        </Button>
                    </View>
                </View>


            </Container>
        );
    }
}