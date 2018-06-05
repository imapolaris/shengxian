import * as React from "react";
import {Icon, Button,ListItem, Thumbnail, Text, Body, CheckBox } from 'native-base';
import {View} from "react-native";
import {Item} from "../store/EntitiesState";
import {formatMoney} from "../common/utils/funcs";
import {Config} from "../config/Config";

export interface BuyItemProps extends Partial<Item>{
    buyCount?:number,
    showSub?:boolean,            //是否显示减数量的按钮
    showCheck?:boolean,          //是否显示选中按钮
    checked?:boolean,            // 是否选中
    onAddItem?:(id:number)=>void;
    onSubItem?:(id:number)=>void;
    onCheckChange?:(id:number)=>void;
}

export default class BuyItem11111111111 extends React.Component<BuyItemProps>{
    constructor(props:any){
        super(props);

        this.onAddItem      = this.onAddItem.bind(this);
        this.onSubItem      = this.onSubItem.bind(this);
        this.onCheckChange  = this.onCheckChange.bind(this);
    }

    onAddItem(){
        const {id,onAddItem} = this.props
        if (id && onAddItem) onAddItem(id);
    }
    onSubItem(){
        const {id,onSubItem} = this.props
        if (id && onSubItem) onSubItem(id);
    }
    onCheckChange(){
        const {id,onCheckChange} = this.props
        if (id && onCheckChange) onCheckChange(id);
    }

    render(){
        const {thumbnailsurl,shortdesc,title,price,funceffect,buyCount,showSub,showCheck,checked } = this.props;
        const needShowSub = showSub && buyCount && buyCount > 0
        return (
            <ListItem style={{marginHorizontal:3,marginVertical:0,paddingVertical:2}}>
        {showCheck? <CheckBox checked={checked} onPress={this.onCheckChange} /> : null}
        <Thumbnail source={{ uri: "default_th" }} style={{marginLeft:10}}/>
        <Body>
            <Text>{title}</Text>
        <Text style={{flex:1,paddingHorizontal:10}} note>{funceffect}</Text>
        <View style={{flexDirection:"row",marginTop:10,alignItems:"center"}}>
        <Text>{formatMoney(price||0)}</Text>
        <Text note style={{flex:1}}>{shortdesc}</Text>
        {
            needShowSub ? (<Button iconLeft onPress={this.onSubItem} transparent><Icon style={Config.styles.addCircle} name="remove-circle"/></Button>):null
    }
        {
            needShowSub ? (<Text>{buyCount}</Text>):null
        }
        <Button onPress={this.onAddItem} transparent>
        <Icon style={Config.styles.addCircle}  name="add-circle"></Icon>
            </Button>
            </View>
            </Body>
            </ListItem>
    );
    }
}