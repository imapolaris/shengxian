/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';

import Line from './OrderLineItem';
import {Address} from "../../store/EntitiesState";
import {Config} from "../../config/Config";
export interface OrderAddressItemProps {
    addr:Address
    addressClick: ()=>void
}
export interface OrderAddressItemState{
}

export default class OrderAddressItem extends React.Component<OrderAddressItemProps, OrderAddressItemState>{
    render() {
        let {addr} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{
				// if (!addr.name)
				// {	//请选择收货地址
				// 	return;
				// }
                this.props.addressClick();
            }}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon style={{fontSize: Config.FontIcon20,color: Config.ColorG3c,marginLeft: 10, alignItems: 'center'}} name='locate'/>
                    <View style={{flexDirection: 'row', marginLeft: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: Config.Font09375, color:Config.ColorB333, marginRight: 10}}>{addr.name || "点击选择地址"}</Text>
                        <Text style={{fontSize: Config.Font09375, color:Config.ColorB333}}>{addr.address}</Text>
                    </View>
                </View>
                <Icon name="arrow-forward" style={Config.styles.ForwardIcon}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },

});
