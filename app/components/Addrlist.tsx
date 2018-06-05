import * as React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List, Toast} from 'native-base';
import {RouteComponentProps, withRouter} from "react-router"
import {ADDADDR, MAIN_MY, NavScreenKey, SUBMITORDER} from "../constants/RouterDefine";
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import {Address, AddrList, defaultAddress} from "../store/EntitiesState"
import TAGS from "../constants/Tags"
import {PinLocation} from "../store/CurrentUserState";
import MyStatusbar from './MyStatusBar';
import {Config, IS_IPHONE_X, px2dp} from '../config/Config';
import {StringMap} from "../common/utils/types";
import {LocationHelper} from "../util/locationHelper";
const screenWidth = Dimensions.get('window').width;

//const  ComHeaderWithRouter= withRouter(ComHeader)

export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    fonttxt: {color:'#000', fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },

});

export interface AddrlistProps/* extends RouteComponentProps<any>*/{
	addrs:AddrList,
    fetchAddrList:(version:number,force:boolean)=>void,
	setUiAddr:(add:boolean,addr:Address)=>void
	updateLocation?:(locate:PinLocation)=>void
    setSubmitOrderAddr:(addr:Address)=>void
}

export interface AddrlistState{
}


export default class Addrlist extends React.Component<AddrlistProps,AddrlistState>{
    constructor(props:any){
        super(props);

        this.onEditAddr = this.onEditAddr.bind(this);
    }
    getTag(id:number){
        const data =TAGS.find((val)=>val.id === id);
        return data? data.name : ""
    }
    componentDidMount(){
        if(this.props.addrs.addrs.length <= 0){
            this.props.fetchAddrList(this.props.addrs.version,true);
        }else{
            this.props.fetchAddrList(this.props.addrs.version,false);
        }
    }
    onEditAddr(add:boolean,data?:Address){
		this.props.setUiAddr(add,data || defaultAddress);
        let from = this.props.location.state && this.props.location.state.from||"";
		if(add){
			if (this.props.addrs.addrs.length >= Config.MaxAddrNum)
			{
				Toast.show({
					text: '地址数超过上限',
					buttonText: "确定",
					position: "bottom",
					type: "warning",
					duration: 3000
				});
				return;
			}
			this.props.navigation && this.props.navigation.navigate(NavScreenKey.Addaddr)
		}
		else
		{
			if(this.props.location.state.from == MAIN_MY)
			{				
				this.props.navigation.navigate(NavScreenKey.Addaddr)	//修改地址
			}else if(from == SUBMITORDER)
			{
                if(!data) return;
                this.props.setSubmitOrderAddr(data);
                this.props.navigation && this.props.navigation.goBack()
            }
			else
			{
			    if(data){
                    let {lat,lng} = data;
                    let building =data.building || data.address || "";
                    console.log("update location",{name:building, address:data.address, lat:data.lat, lng:data.lng, city:"1"})
                    this.props.updateLocation && this.props.updateLocation({name:building, address:data.address, lat:data.lat, lng:data.lng, city:"1"});
                    LocationHelper.updateLocation({name:building, address:data.address, lat:data.lat, lng:data.lng, city:"1"})
                }
				this.props.navigation && this.props.navigation.goBack()
			}
		}
		
    }
    onEditAddrOnly(add:boolean,data?:Address){
        this.props.setUiAddr(add,data || defaultAddress);
        this.props.navigation.navigate(NavScreenKey.Addaddr)	//修改地址
    }
    render() {
        const {navigation} = this.props;

        return (
            <Container>
             <MyStatusbar />
			 {
				 this.props.navigation.state.params.from == MAIN_MY ?
				 <ComHeader title="收货地址" navigation={navigation}/> :
				 <ComHeader title="选择收货地址" navigation={navigation}/>
			 }
             
                <View style={styles.bk}>
                    <List
                        dataArray = {this.props.addrs.addrs}
                        renderRow =
                        {(aData:Address) =>
                                <TouchableOpacity onPress={()=>{this.onEditAddr(false,aData)}}>
                                    <View style={styles.box1}>

                                        <View style={[styles.box2, { margin: 0}]}>
                                            <Icon name="person" style={styles.fonticon}/>
                                            <Text style={styles.fonttxt}>{aData.name}</Text>
                                            <Text style={[styles.fontaddr]}>{aData.phone}</Text>
											{
                                                !aData.isdefault?
                                                <TouchableOpacity style={[styles.fontmod, {backgroundColor: Config.ColorG3c}]} onPress={()=>{this.onEditAddrOnly(false,aData)}}>
		                                            <Text style={{color:'#fff', fontSize:12, backgroundColor: 'transparent'}}>修改</Text>
                                                </TouchableOpacity>
												: null
											}
                                        </View>

                                        <View style={styles.blackline}  />

                                        <View style={[styles.box2, { margin:0}]}>
                                            <Icon name="pin" style={styles.fonticon}  />

                                            <Text style={[styles.fontaddr,{width: px2dp(265)}]}>{aData.building + aData.address}</Text>
                                                {
                                                    aData.user_address_tag_id>0 ?
                                                    <View style={styles.tag}>
                                                        <Text style={{color:Config.ColorOff, fontSize:12, backgroundColor: 'transparent'}}>{this.getTag(aData.user_address_tag_id)}</Text>
                                                    </View>                                                    
                                                    : null
                                                }                                                
                                        </View>
                                    </View>
                                </TouchableOpacity>
                        }
                    />

					<View style={{height: Config.BtnComHeight, position:'absolute',bottom:IS_IPHONE_X()?24:0,width:screenWidth}}>
                        <TouchableOpacity style={{backgroundColor: Config.ColorG3c, flex: 1, alignItems: 'center',justifyContent: 'center'}}
                                          onPress={()=>{this.onEditAddr(true)}}>
                            <Text style={{color: 'white'}}>新加地址</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity onPress={()=>{this.onEditAddr(true)}}
                        style={{backgroundColor: 'white', height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <Icon style={{color: '#50be07', fontSize: 12}} name='add'/>
                        <Text style={{color: '#50be07', marginLeft: 10, fontSize: 12}}>新加地址</Text>
                    </TouchableOpacity> */}

                </View>

            </Container>
        );
    }
}
export const styles = StyleSheet.create({
    bk:{flex:1, backgroundColor:'#f3f3f3'},
    box1:{borderRadius:10, borderWidth:1,backgroundColor: 'white',marginHorizontal: 10, marginTop: 2, borderColor: '#f3f3f3'},
    box2:{flexDirection:"row", alignItems: 'center'},
    fonttxt: {color:Config.ColorB333,fontSize: Config.FontBase,margin:10},
    fontaddr: {color:Config.ColorB666,fontSize: Config.Font0875, margin:10},
    fonticon: {color:'#b5b5b5', fontSize:20, marginLeft: 10},
	fonttag: {backgroundColor:Config.ColorOff, borderRadius:5, position: 'absolute', right: 10, paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center',alignItems:'center'},
	fontmod: {backgroundColor:Config.ColorOff, borderRadius:5, position: 'absolute', right: 10, paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center',alignItems:'center'},
	fontdef: {backgroundColor:"orange", borderRadius:5, position: 'absolute', right: 10, paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center',alignItems:'center'},
    blackline: {height:1, backgroundColor:'#f3f3f3'} ,
    tag:{borderColor: Config.ColorOff,borderWidth: 1,backgroundColor:'white', borderRadius:5, position: 'absolute', right: 10,
     paddingHorizontal: 10, paddingVertical: 3, justifyContent: 'center',alignItems:'center'},
})