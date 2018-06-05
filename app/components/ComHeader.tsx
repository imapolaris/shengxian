import * as React from "react";
import {Header,Input,Spinner,Item,Button,Icon, Body,Left, Right} from 'native-base';
import {Text, StyleSheet, View, Alert, Image} from "react-native";
import {ADDRLIST, SEARCH} from "../constants/RouterDefine";
import {RouteComponentProps} from "react-router"
import Line from "./Line";
import * as goback from '../../images/goback.png';
import {Config, hideKeyboard, px2dp} from "../config/Config";

export interface ComHeaderProps extends Partial<RouteComponentProps<any>>{      
	title?:string,         //当前位置
	leftIcon?:string,         //左边图标
	righttext?:string,         //右边文字
    backClick?:()=>void,          // 点击左边返回 
    leftImage?:any,   
}

export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 44 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    // fonttxt: {color: Config.ColorB333, fontSize:Config.Font1125 },
    // fonticon: {color:Config.ColorB999, fontSize:26 },
})

export  class ComHeader extends React.Component<ComHeaderProps>{
    onGoback()
    {
		hideKeyboard();
		this.props.backClick ?  this.props.backClick() :(this.props.navigation && this.props.navigation.goBack())
        // if(this.props.history)
        // {
        //     this.props.history.goBack();
        // }
    }
    render(){
            // let leftIcon = this.props.leftIcon || goback
            // let leftImage = goback
            let leftImage = this.props.leftImage
        return (
            <View style={{ width: '100%', height: Config.HeadHeight, backgroundColor: Config.ColorW}}>
                <View style={{width: '100%', flexDirection: 'row', height: Config.HeadHeight, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{marginLeft: 5,width:'20%', justifyContent: 'center', alignItems: 'center'}}>
                        <Button transparent onPress={()=>{this.onGoback()}}>
                            {leftImage ? <Image source={leftImage}
                                                style={{height: px2dp(23), width: px2dp(23), marginLeft: 12}}/>
                                : <Image source={goback} style={{height: px2dp(23), width: px2dp(23), marginLeft: 12}}/>
                            }
                        </Button>
                    </View>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{color: Config.ColorB333,  fontSize: Config.Font1125}}>{this.props.title}</Text>
                    </View>

                    <View style={{marginRight: 20,width:'20%', justifyContent: 'center', alignItems: 'center'}}>
						{/* <Text style={{color:'#3b3b3b', fontSize:15,textAlign:'right'}}>{this.props.righttext?this.props.righttext:""}</Text> */}
                        {this.props.righttext ? <Text style={{color: Config.ColorB333,  fontSize: Config.Font1125,}}>{this.props.righttext}</Text> : null}
                    </View>
                </View>

                <Line color = '#f3f3f3'/>
            </View>       
            );
    }
}


export interface ComHeaderBtnProps extends Partial<RouteComponentProps<any>>{      
	title?:string,         //当前位置
	leftIcon?:string,         //左边图标
	btntext?:string,         //右边文字
	btnClick?: ()=>void,
}

export class ComHeaderBtn extends React.Component<ComHeaderBtnProps>{
    render(){
		let leftIcon = this.props.leftIcon || "arrow-back"
        return (
            <View style={{ width: '100%', height: Config.HeadHeight, backgroundColor: 'white'}}>
                <View style={{width: '100%', flexDirection: 'row', height: Config.HeadHeight, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{marginLeft: 5}}>
                        <Button transparent onPress={()=>{this.props.history && this.props.history.goBack()}}>							
                            <Image source={goback} style={{width: px2dp(23),height: px2dp(23), marginLeft: 12}} />
                        </Button>
                    </View>

                    <View style={{justifyContent: 'center'}}>
						<Text style={{color: Config.ColorB333,  fontSize: Config.Font1125}}>{this.props.title}</Text>
                    </View>

					<View style={{marginRight: 20}}>
                        <Button transparent onPress={()=>{   
                            Alert.alert('提示', '确定要删除吗？', [
                                {
                                    text: '取消',
                                    onPress:()=>{}
                                },
                                {
                                    text: '确定',
                                    onPress:()=>{	this.props.btnClick && this.props.btnClick()}
                                }
                            ]);
                        }}>
                            <Text style={{color: Config.ColorG2e}}>{this.props.btntext}</Text>
                        </Button>
                    </View>
                </View>

                <Line color = '#f3f3f3'/>
            </View>       
            );
    }
}