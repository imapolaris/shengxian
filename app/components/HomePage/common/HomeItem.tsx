import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import {Config, px2dp} from "../../../config/Config";
import {Item, ItemDynamic} from "../../../store/EntitiesState";
import {formatLeftCnt, formatMoney} from "../../../common/utils/funcs";

export interface HomeItemProps {
    item: Item,
    dynamic?:ItemDynamic,
    itemClick: ()=>void,
    addItemClick: (e:any)=>void,
}

export interface HomeItemState {

}

export default class HomeItem extends React.Component<HomeItemProps, HomeItemState>{
    constructor(props: any) {
        super(props);
        this.getLeftCnt = this.getLeftCnt.bind(this);
    }

    getLeftCnt(){
        if(!this.props.dynamic) return 0;
        return this.props.dynamic.leftcnt;
    }
    render() {
        let {item,dynamic} = this.props;
		let leftcnt= formatLeftCnt(this.getLeftCnt());
		let price = dynamic ? dynamic.price : 10000
		let marketprice = dynamic ? dynamic.marketprice : 10000
        return (
            <TouchableOpacity style={{flex: 1}} onPress={()=>{this.props.itemClick();}}>
                <View style={{flex:1}}>
                    <View style={{flex: 1}}>
                        <Image source={{uri: Config.DomainName + '/' +(item&&item.bigimgurl || "")}} 
                            style={{width: px2dp(165), height: px2dp(165), alignSelf:'center', marginLeft: 10}} />
                    </View>
                    
                    <View style={{marginLeft: 10, marginBottom: 5}}>
                        <Text style={{fontSize: Config.Font09375, color: Config.ColorB333}}>
                            {item && item.title}
                        </Text>
                    </View>
                    <View style={{marginLeft: 10, marginBottom: 5}}>
                        <Text style={{fontSize: Config.Font075, color: Config.ColorB999}}>
                            {item && item.funceffect}
                        </Text>
                    </View>
                    {
                        leftcnt?(
                        <Text style={{marginLeft: 10,marginBottom: 5,fontSize: Config.Font0875,
                            color:Config.ColorBb2}}>
                            {leftcnt}
                        </Text>
                        ):null
                    }
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, alignItems: 'flex-end', 
                                marginRight: 10, marginBottom: 5}}>

                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{fontWeight:'bold', marginRight: 5, fontSize: Config.Font09375, color: Config.ColorOf8}}>
                                ￥{formatMoney(price)}
                            </Text>
                            <Text style={{fontSize: Config.Font0875, textDecorationLine: 'line-through', 
                                         color:Config.ColorBb2}}>
                                ￥{formatMoney(marketprice)}
                            </Text>

                            {
                                (item.allow_place_type && item.allow_place_type> 0)? <Text style={{fontSize: Config.Font0875,
                                    color:Config.ColorBb2}}>
                                       限购${item.allow_place_type}件
                                </Text>:null
                            }
                        </View>
                        <TouchableOpacity  style={{height: px2dp(28), width: px2dp(25), position:'absolute',right:0,bottom:5,}} onPress={(e)=>
                            {this.props.addItemClick(e);}}>
                            <Icon style={Config.styles.addCircle} name="md-add-circle"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
