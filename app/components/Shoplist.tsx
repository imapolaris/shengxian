import * as React from 'react';
import {StyleSheet, TouchableOpacity, Alert, Linking} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';
    import {RouteComponentProps, withRouter} from "react-router"
// import {Util} from "../common/utils/util";
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import MyStatusBar from "./MyStatusBar";
import {Shop} from "../store/EntitiesState";
const  ComHeaderWithRouter= withRouter(ComHeader)
import {Config} from "../config/Config";
export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    fonttxt: {color:'#000', fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },
});

export interface ShoplistProps extends RouteComponentProps<any>{
    shops:Shop[]
    changeShop:(id:number)=>void
}
export interface ShoplistState{

}
export default class Shoplist extends React.Component<ShoplistProps,ShoplistState>{
    constructor(props:any){
        super(props);
        this.onChangeShop = this.onChangeShop.bind(this)
    }
    onChangeShop(id:number){
        this.props.changeShop(id);
        this.props.history.goBack();
    }
     //拨打电话  
   linking=(url:string)=>{  
  
    console.log(url);  

    Linking.canOpenURL(url).then(supported => {  
        if (!supported) {  
            console.log('Can\'t handle url: ' + url);  
        } else {  
            return Linking.openURL(url);  
        }  
    }).catch(err => console.error('An error occurred', err));  

    }
    render() {
        let {shops} = this.props
        return (
            <Container>
                <MyStatusBar />
{/* 头部 */}
				<ComHeaderWithRouter title="门店列表"/> 
{/* 中间 */}
                <View style={styles.bk}>
                    <List 
                        dataArray = {shops}
                        renderRow =
                        {
                            (aData:Shop) =>
                                <View style={{padding: 10, backgroundColor: 'white', marginTop: 10, marginLeft: 10, marginRight: 10, borderWidth: 1,
                                            borderColor: Config.ColorBf4, borderRadius: 10}}>
                                    <TouchableOpacity style={{justifyContent: 'space-between',flexDirection: 'row'}}
                                                      onPress={()=>this.onChangeShop(aData.id)}>
                                        <Text style={{fontWeight: 'bold', fontSize: Config.FontBase, color: Config.ColorB333}}>{aData.name}</Text>
                                        <Text style={styles.fontkm}>{aData.dis}km</Text>
                                    </TouchableOpacity>
                                    <Text style={{marginTop: 10, color: Config.ColorB666, fontSize: Config.Font09375}}>{aData.addr}</Text>
                                    <View style={{flexDirection:"row", marginTop: 20}}>
                                        <Text style={{fontSize: Config.Font0875, color: Config.ColorB999}}>门店营业时间：{aData.time}</Text>
                                        <TouchableOpacity style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} 
                                            onPress={ ()=>this.linking('tel:'+aData.phone)
										// 		()=>Alert.alert('', aData.phone, [
                                        //         {
                                        //             text: '取消',
                                        //             onPress:()=>{}
                                        //         },
                                        //         {
                                        //             text: '确定',
                                        //             onPress:()=>{this.linking('tel:'+aData.phone)}
                                        //         }
										// ])
										} >
                                            <Icon style={{fontSize: 14,marginLeft: 20, color: Config.ColorG2e}} name="call" />
                                            <Text style={{fontSize: 12,marginLeft:3, color: Config.ColorG2e}}>联系电话</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    />                   
                </View>
            </Container>
        );
    }
}
export const styles = StyleSheet.create({
    bk:{flex:1, backgroundColor:'#f4f4f4'},
    fontkm: {color: Config.ColorG2e, fontSize: Config.Font0875},    
})