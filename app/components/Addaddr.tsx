import * as React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, Keyboard,ScrollView, KeyboardAvoidingView} from 'react-native';
import { Container, Text,Input , CheckBox, View, Toast} from 'native-base';
import {Address} from "../store/EntitiesState"
import {RouteComponentProps, withRouter} from "react-router"
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import TAGS from "../constants/Tags"
import {SexType} from "../constants/common";
import {StringMap} from "../common/utils/types";
import {MAP, NavScreenKey} from "../constants/RouterDefine";
import {AddAddrUIState, AMapOpType} from "../store/UIState";
import MyStatusBar from "./MyStatusBar";
import {checkPhone} from "../common/utils/funcs";
import {MyToast, hideKeyboard, Config, px2dp} from "../config/Config";
const  ComHeaderWithRouter= withRouter(ComHeader);
const  ComHeaderBtnWithRouter= withRouter(ComHeaderBtn);
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const saddr = StyleSheet.create({
    bk:{flex:1, backgroundColor:'#f3f3f3', margin: 10},
    inputStyle:{marginLeft: 10,marginRight: 10,fontSize: 14},
    textStyle:{fontWeight: 'bold', marginLeft: 10,width: 50, fontSize: 14},
    box1:{height:146,  marginTop: 10 , backgroundColor:'#fff'},
    box2:{flexDirection:"row", alignItems:"center"},
    fontkm: {color:'#50be07', fontSize:20,marginRight:10, margin:5},
    fonttxtleft: {color:'#000', fontSize:20,marginLeft:10,margin:5},
    fonticon: {color:'#000', fontSize:30},
})

export interface AddaddrProps/* extends RouteComponentProps<any>*/{
    addrState:AddAddrUIState,

    addAddr:(addr:Address)=>any
    editAddr:(addr:Address)=>any
    deleteAddr:(id:number)=>any
    setAMapOpType:(type:AMapOpType)=>any
    updateUiAddr:(addr:Partial<Address>)=>any
}

export interface SexProps {
	data:Address,
	sex:number,
	setSex: ()=>void,
	}
	
export class SexUI extends React.Component<SexProps>{
	constructor(props:any){
		super(props);
	}

	render(){
		let data = this.props.data
		let sex = this.props.sex
		let select = data.sex==sex
		let color = select? Config.ColorG3c : Config.ColorB999
		return (
			<View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft: sex==SexType.Male?50:0}}>
				<CheckBox color={color} checked={select} onPress={() => this.props.setSex()}/>
				<TouchableOpacity onPress={()=>{this.props.setSex()}} >
					<Text style={{marginLeft: 20,fontWeight: 'bold', marginRight: 10,color:color}}>{sex==SexType.Female?'女士':'男士'}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
	
export default class Addaddr extends React.Component<AddaddrProps, AddAddrUIState>{
    constructor(props:any) {
        super(props);

        this.onSave = this.onSave.bind(this);
        this.onLocation = this.onLocation.bind(this);

        this.state = this.props.addrState
    }
    componentWillReceiveProps(nextprops:AddaddrProps){
        // 数据保存成功返回
        if(nextprops.addrState.dataSaved){
            this.props.history && this.props.history.go(-1);
        }else{
            // 更新数据
            this.setState(nextprops.addrState);
        }
    }
    checkAddrInfo(data:Address){
        if(!data.name)
        {
            MyToast(2000, "联系人不能为空"); 
            return false;
        }

        if(data.sex == 0)
        {
            MyToast(2000, "请选择性别"); 
            return false;
        }

        if(!checkPhone(data.phone)) //手机号
        {
            MyToast(2000, "请输入正确的手机号"); 
            return false;
        }  

        if(data.address == "")   //门牌号
        {
            MyToast(2000, "门牌号不能为空");
            return false;
        }

        if(!data.building)  //收货地址
        {
            MyToast(2000, "收货地址不能为空");
            return false;
        }

        return true;
    }

    onSave(){
        //条件判断
        let{ add,addr} = this.state;
        if(!this.checkAddrInfo(addr))
        {
            return;
        }

        hideKeyboard();
        let {addAddr,editAddr} = this.props;
        add? addAddr(addr):editAddr(addr);
    }
    setSex(sex:number) {
        this.props.updateUiAddr({sex});
    }

    setTag(user_address_tag_id:number) {
        this.props.updateUiAddr({user_address_tag_id});
    }

    setName(name:string) {
        this.props.updateUiAddr({name});
    }

    setPhone(phone:string) {
        this.props.updateUiAddr({phone});
    }

    setAddr(address:string) {
        this.props.updateUiAddr({address});
    }

    getTitle(){
        return this.state.add && "新加地址" || "修改地址";
	}
	getBtnTitle(){
        return this.state.add && "保存并使用" || "保存";
    }
    onLocation(){
        this.props.setAMapOpType(AMapOpType.selelctAddAddr);
        this.props.navigation && this.props.navigation.navigate(NavScreenKey.Map, {state:this.state.addr});
    }
    render() {
        let {addr:data} = this.state;
        return (

            <View style={{flex:1}}>
                <MyStatusBar />
                {/* 头部 */}
                {
                    this.state.add?
                        <ComHeaderWithRouter title={this.getTitle()}/>	:
                        <ComHeaderBtnWithRouter title={this.getTitle()} btntext="删除"
                                                btnClick={()=>{this.props.deleteAddr(data.id);		this.props.history && this.props.history.goBack()}}
                        />
                }
                {/* 中间 */}
                <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={-100}>
                    <ScrollView>
                        <Container style={{width:screenWidth,height:screenHeight}}>

                            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                                <View style={{backgroundColor: 'white', marginTop: 10}}>
                                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                                        <Text style={saddr.textStyle}>联系人</Text>
                                        <Input selectTextOnFocus={true} style={saddr.inputStyle} placeholder="收货人姓名"
                                               onChangeText={(text) => this.setName(text)} value={data.name} />
                                    </View>

                                    <View style={{height: 1, backgroundColor: '#f3f3f3', marginLeft: 10}}/>

                                    <View style={{marginLeft: 70,flexDirection: 'row', paddingVertical:20, }}>
                                        <SexUI data = {data} sex = {2} setSex={()=>this.setSex(2)} />
                                        <SexUI data = {data} sex = {1} setSex={()=>this.setSex(1)} />
                                    </View>

                                    <View style={{height: 1, backgroundColor: '#f3f3f3', marginLeft: 10}}/>

                                    <View style={{flexDirection: 'row',  alignItems:'center'}}>
                                        <Text style={saddr.textStyle}>手机号</Text>
                                        <Input selectTextOnFocus={true} style={saddr.inputStyle} placeholder="收货人手机号码" keyboardType={"numeric"}
                                               onChangeText={(text) => this.setPhone(text)} value={data.phone} />
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#f3f3f3', marginLeft: 10}}/>

                                    {/* <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={saddr.textStyle}>城市</Text>
                            <Input selectTextOnFocus={true} style={saddr.inputStyle} placeholder="上海" onFocus={this.onLocation} value={this.getCity()}/>
                        </View> */}
                                    <View style={{height: 1, backgroundColor: '#f3f3f3', marginLeft: 10}}/>

                                    <View style={{flexDirection: 'row',   alignItems:'center'}}>
                                        <Text style={[saddr.textStyle,{width: 70}]}>收货地址</Text>
                                        <Input selectTextOnFocus={true} style={saddr.inputStyle} placeholder="近铁城市广场"
                                               value={data.building} onFocus={this.onLocation} />
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#f3f3f3', marginLeft: 10}}/>

                                    <View style={{flexDirection: 'row',  alignItems:'center'}}>
                                        <Text style={saddr.textStyle}>门牌号</Text>
                                        <Input selectTextOnFocus={true} style={saddr.inputStyle} placeholder="例 16号楼302室"
                                               onChangeText={(text) => this.setAddr(text)} value={data.address} />
                                    </View>
                                    <View style={{height: 1, backgroundColor: '#f3f3f3', marginLeft: 10}}/>

                                    <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',paddingVertical: 10}}>
                                        <Text style={saddr.textStyle}>
                                            标签
                                        </Text>
                                        {
                                            TAGS.map(
                                                (tagData) => (
                                                    <TouchableOpacity key={tagData.id}
                                                                      style={{
                                                                          backgroundColor: data.user_address_tag_id ==tagData.id ? Config.ColorG3c : 'transparent',
                                                                          paddingVertical: 5,
                                                                          paddingHorizontal: 10,
                                                                          borderRadius: 3
                                                                      }}
                                                                      onPress={() => this.setTag(tagData.id)}>
                                                        <Text style={{color: data.user_address_tag_id ==tagData.id ? 'white' : '#383838'}}>
                                                            {tagData.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            )
                                        }

                                    </View>
                                </View>
                                <View style={{height: Config.BtnComHeight, marginTop:px2dp(30),width:screenWidth}}>
                                    <TouchableOpacity style={{backgroundColor: Config.ColorG3c, flex: 1, alignItems: 'center',marginLeft:10,
                                        marginRight:10,borderRadius:10,justifyContent: 'center'}}
                                                      onPress={this.onSave}>
                                        <Text style={{color: 'white'}}>
                                            {this.getBtnTitle()}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Container>
                    </ScrollView>
                </KeyboardAvoidingView>

            </View>


        );
    }
}