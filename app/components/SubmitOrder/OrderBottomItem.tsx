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

import Line from "../Line"
import {formatMoney} from "../../common/utils/funcs";
import {Config, IS_IPHONE_X} from "../../config/Config";
export interface OrderBottomItemProps {
    real:number
    commitOrderClick: ()=>void
}
export interface OrderBottomItemState{
}

export default class OrderBottomItem extends React.Component<OrderBottomItemProps, OrderBottomItemState>{
    render() {
        return (
            <View>
                <View style={{height: 1, backgroundColor: '#f4f4f4'}} />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Config.ColorOff, width: 120, height: 40}}
                        onPress={()=>{
                            this.props.commitOrderClick();
                        }}
                    >
                        <Text style={{color: 'white'}}>提交订单</Text>
                    </TouchableOpacity>
                    <Text style={{color: Config.ColorOf8, marginRight: 10,marginTop:10, fontSize: Config.Font09375, fontWeight: 'bold'}}>￥{formatMoney(this.props.real)}</Text>
                    <Text style={{color:Config.ColorB333, fontSize: Config.Font09375,marginTop:10, marginRight: 5}}>实付</Text>
                </View>                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: IS_IPHONE_X()?40+24:40,
        flexDirection:'row-reverse',
        alignItems: 'flex-start'
    },

});
