import * as React from 'react';
import {StyleSheet, Image, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, Toast} from 'native-base';

    //const pichead = require("./splashscreen.png");
const pichead ={uri:"screen"};
import {Redirect, RouteComponentProps, withRouter} from "react-router";
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import MyStatusBar from "./MyStatusBar";
const  ComHeaderWithRouter= withRouter(ComHeader);
import {MAIN, PROTOCOL} from "../constants/RouterDefine";
// import * as login_top_icon from '../images/login_top_icon.png';
// import * as login_wechat_icon from '../images/login_weChat_icon.png';
import * as WeChat from "react-native-wechat";
import * as login_top_icon from '../../images/login_top_icon.png';
import * as login_weChat_icon from '../../images/login_weChat_icon.png';

import CountDownButton from './TimerButton';
import {checkPhone} from "../common/utils/funcs";
import {LoginData} from "../actions/login";
import {MyToast, Config, px2dp, MainHelper} from "../config/Config";

export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    fonttxt: {color: Config.ColorB999, fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },
})

export const saddr = StyleSheet.create({
    bk:{flex:1, backgroundColor: Config.ColorW},
    box1:{height:146,  marginTop: 10 , backgroundColor:'#fff'},
    box2:{flexDirection:"row", alignItems:"center"},
    fontkm: {color:'#50be07', fontSize:20,marginRight:10, margin:5},
    fonttxtleft: {color:'#000', fontSize:20,marginLeft:10,margin:5},
    fonticon: {color:'#000', fontSize:30},
    fontgreen: {color:'#50be07' },
    phone: {alignSelf:"center",marginRight:20, marginLeft:20, marginBottom: 10},
    fontservice: {color:Config.ColorG2e, fontSize:13, marginTop: 10},
    blackline: {height:1, backgroundColor:'#f3f3f3'} ,
    
})

export interface LoginProps extends Partial<RouteComponentProps<any>>{
    phone?:string
    msg_id?:string
    logged:boolean
    login:(data:LoginData)=>any
    loginWeChat:()=>any
    getVCode:(phone:string)=>any
}

export interface LoginState{
    phoneError:boolean
    codeError:boolean
    phone:string
    code:string
    isInstallWeChat:boolean

}

export default class Login extends React.Component<LoginProps,LoginState>{
    constructor(props:any){
        super(props);
        this.state={
            phoneError:false,
            codeError:false,
            phone:'',	//	props.phone,
            code:"",
            isInstallWeChat:false
        };
        this.onGetCode = this.onGetCode.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.isPhoneValid = this.isPhoneValid.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.isAble = this.isAble.bind(this);
        this.onBack = this.onBack.bind(this);

    }
    onPhoneChange(phone:string){
        this.setState({phone,phoneError:!this.isPhoneValid(phone)});
    }
    onCodeChange(code:string){
        this.setState({code});
    }

    onGetCode(){
        if(this.isPhoneValid(this.state.phone)){
            this.props.getVCode(this.state.phone);
            return true;
        }
        else
        {
            MyToast(2000, "请输入手机号");  
        }

        return false;
    }

    onBack(){
        // hack:为了解决主页的跳转
        let maintab = this.props.location && this.props.location.state && this.props.location.state.tab || "";
        if(maintab){
            MainHelper.selectedTab = maintab
        }
        this.props.history && this.props.history.goBack()
    }
    onLogin(){ 
        let{phone,code}  = this.state;
        if(this.isPhoneValid(phone))
        {
            if(this.state.code)
            {
                this.props.login({phone,code,msg_id:this.props.msg_id})
            }           
        }
        else
        {
            MyToast(2000, "请输入正确的手机号");    
        }
    }
    isPhoneValid(phone:string){
        return checkPhone(phone);
    }
    
	isAble() {
        let {phone, code} = this.state;
        if(this.isPhoneValid(phone) && code.length>=4)
        {
            return true;
        }

        return false;
    }

    componentDidMount(){

        WeChat.isWXAppInstalled().then(result=>{

            console.log('isinstall +' + !!result)
            this.setState({
                isInstallWeChat:!!result
            })
        })

    }


    render() {
        const { from } = this.props.location && this.props.location.state || { from: { pathname: MAIN } }
        return this.props.logged?<Redirect to={from}/>: (
            <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={-330}>
            <ScrollView>
            <View style={{flex:1}}>
            <Container>
                <MyStatusBar />
{/* 头部 */}
                <ComHeaderWithRouter title="登录/注册" backClick={()=>this.onBack()}/>
{/* 中间 */}
                
                <View style={saddr.bk}>
                    {/* 手机号  */}
                    
                    <View >
                        <Item style={saddr.phone} error={this.state.phoneError}>
                            <Icon active name="phone-portrait"  style={{color: '#999'}}/>
                            <Input style={{color: '#999'}} placeholder="请输入手机号" value={this.state.phone} keyboardType={"numeric"} onChangeText={this.onPhoneChange}/>
                            {/*<Button transparent style={{paddingVertical: 10, paddingHorizontal: 5, marginTop:10}}>*/}
                                {/*<Text style={[saddr.fontgreen, {padding:5, borderRadius:15, borderWidth:1, borderColor:'green'}]}>获取验证码</Text>*/}
                            {/*</Button>*/}
                            <CountDownButton  timerCount={60}
                                             timerTitle='获取验证码' onClick={this.onGetCode} phoneInValid={this.isPhoneValid(this.state.phone)}/>
                        </Item>

                        <Item style={saddr.phone} error={this.state.codeError}>
                            <Icon active name="unlock" style={{color: '#999'}}/>
                            <Input style={{color: '#999'}} placeholder="请输入验证码" keyboardType={"numeric"} value={this.state.code} onChangeText={this.onCodeChange}/>
                        </Item>         

                        <Button full style={{height:Config.BtnComHeight, backgroundColor:this.isAble()?Config.ColorG3c:Config.ColorBb2,
                                             marginHorizontal: 10, marginTop: 30, borderRadius:10}} onPress={this.onLogin}>
                            <Text style={[saddr.fontgreen, {alignSelf:'center',  color:this.isAble()?Config.ColorW:Config.ColorBf2}]}>登录</Text>
                        </Button>
                    </View>
                </View>

                <View style={{position:'absolute',bottom:0,right:0,left:0,paddingBottom:30, alignItems:'center'}}>
                    {
                        this.state.isInstallWeChat?<View style={{flexDirection: 'row', justifyContent: 'center',
                            alignItems: 'center'}}>
                            <View style={{marginLeft: 10, marginRight: 5, flex: 1, height:1, borderBottomWidth: 0.5, borderColor: Config.ColorBb2}}/>
                            <View><Text style={{color: Config.ColorB999}}>第三方帐号登录</Text></View>
                            <View style={{marginRight: 10, marginLeft:5, flex: 1, height:1, borderBottomWidth: 0.5, borderColor: Config.ColorBb2}}/>
                        </View>:null
                    }

                    {

                        (this.state.isInstallWeChat? <TouchableOpacity onPress={()=>{this.props.loginWeChat()}} >
                            {/* <Text style={[shead.fonttxt, {alignSelf:'center',  padding:0, flex:1, margin:5, textAlign:'center', fontSize:13}]}>第三方账号登录</Text> */}
                            <Image source={login_weChat_icon} style={{alignSelf:'center', margin:10}} />
                            <Text style={[shead.fonttxt, {alignSelf:'center',  padding:0, fontSize:13}]}>微信登录</Text>
                        </TouchableOpacity>:null)
                    }

                    <View style={{flexDirection:'row', height:30, justifyContent:'center'}}>
                        <Text style={[saddr.fontservice, {alignSelf:'center', color:'#999', marginTop: 30}]}>点击登录表示您同意</Text>
                        <Button transparent style={{justifyContent:'flex-start'}}
                                onPress={()=>{this.props.history && this.props.history.push(PROTOCOL)}}>
                            <Text style={[saddr.fontservice, {alignSelf:'center',  paddingLeft:0}]}>《生鲜服务协议条款》</Text>
                        </Button>
                    </View>
                </View>


            </Container>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
        );
    }
}