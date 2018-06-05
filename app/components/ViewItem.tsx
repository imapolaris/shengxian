import * as React from "react";
import {Icon, Button,ListItem, Thumbnail, Text, Body, CheckBox, Right} from 'native-base';
import {View} from "react-native";
import {Item, Item as ItemEntity, ItemBase} from "../store/EntitiesState";
import {formatMoney} from "../common/utils/funcs";
import {Config} from "../config/Config";

export interface ViewItemProps {
// export interface ViewItemProps extends Partial<Item>{    
	Item:ItemBase,
	DynamicPrice:number
}

export default class ViewItem extends React.Component<ViewItemProps>{
    constructor(props:any){
        super(props);
    }
    render(){
        const {Item,DynamicPrice } = this.props;
        let tprice = (Item.itemcnt||0) * (DynamicPrice||0);
        return (
            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginRight: 10, borderWidth:1, borderRadius: 10, borderColor: Config.ColorBf4,
                         justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, backgroundColor: Config.ColorW, height: 90}}>
                 <View style={{flex:1}}>
                    <Thumbnail source={{ uri: Config.DomainName+  Item.thumbnailsurl } } style={{marginLeft:10}}/>
                 </View>

                 <View style={{flex:3, marginLeft: 10}}>
                    <Text style={{fontSize: Config.Font09375, color: Config.ColorB333, marginBottom: 5}}>{Item.title}</Text>
                    <Text style={{fontSize: Config.Font09375, color: Config.ColorB333}}>{'单价: ￥' + formatMoney(DynamicPrice||0) + '   ' + '数量: ' + (Item.itemcnt||"")}</Text>
                 </View>

                 <View style={{marginRight: 0, flex:1}}>
                    <Text style={{color: Config.ColorB333}}>￥{formatMoney(tprice)}</Text>
                 </View>
            </View>
        );
    }
}