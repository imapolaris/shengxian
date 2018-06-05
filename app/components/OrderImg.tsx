import * as React from "react";
import {Header,Input,Spinner,Button,Icon, Body,Left, Right,CardItem, Thumbnail, View} from 'native-base';
import {Text, StyleSheet, TouchableHighlight} from "react-native";
import {ADDRLIST, SEARCH} from "../constants/RouterDefine";
import {RouteComponentProps} from "react-router"
import {Order, ItemBase} from "../store/EntitiesState"
import {formatMoney} from "../common/utils/funcs";
import {Config} from "../config/Config";
import {ITEMLIST} from "../constants/RouterDefine";

export interface OrderImgProps extends Partial<RouteComponentProps<any>>{      
    items:ItemBase[],
    price?:number,
    router?:string,
    click?:()=>void          // 增加
}

export const styles = StyleSheet.create({
    pic:   {
        resizeMode: "cover",
        width: 55,
        height: 55
    },
})

export default class OrderImg extends React.Component<OrderImgProps>{

    constructor(props:any){
        super(props);
        this.getTotalMoney = this.getTotalMoney.bind(this)
    }

    GetIMG(items:ItemBase[])
    {
        let rows=[];
        let imgcnt =  items.length > Config.ShowOrderImageCnt ? Config.ShowOrderImageCnt: items.length
        for (let i = 0; i < imgcnt ;i ++)
        {
            rows.push(
                <Thumbnail source={{uri:Config.DomainName+ items[i].thumbnailsurl}} style={styles.pic} key = {i}/>
            )
		}
		if (items.length > Config.ShowOrderImageCnt)
		{
			rows.push(<Text key={imgcnt} style= {{width: 40, fontSize:30, marginLeft: 5}}> ... </Text>)
		}
        return rows;
    }
    getTotalMoney(itemlist:ItemBase[]){
        if(this.props.price){
            return this.props.price;
        }

        let totalmoney = 0;
        for (let i = 0; i < itemlist.length ;i ++)
        {
            totalmoney +=  itemlist[i].price * (itemlist[i].itemcnt || 0)       
        }
        return totalmoney;
    }
    render(){
        let {items, click} = this.props;
        let itemcnt =  items.length;
        return (
            <TouchableHighlight onPress={()=>{click && click()}}>
                <CardItem style={{paddingLeft: 5, paddingRight: 0, flex: 1, marginRight: 0, paddingBottom: 5, paddingTop: 5}} >
					<View style = {{flex:1, flexDirection:'row', alignItems: 'center'}}>
						{this.GetIMG(items)}						
					</View>
                    
                    <View style = {{flexDirection:'column'}}>
                        <Text style={{fontSize: 15,marginBottom: 5}}>{formatMoney(this.getTotalMoney(items))} </Text>
                        <Text style={{fontSize: 12}}>{"共"+ itemcnt + "件"} </Text>
                    </View>                                        
					<Icon name="arrow-forward" style={[Config.styles.ForwardIcon, {textAlign: 'right'}]}/>
                </CardItem>
             </TouchableHighlight>
            );
    }
}