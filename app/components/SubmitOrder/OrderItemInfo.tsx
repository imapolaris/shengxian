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
import OrderImg from "../OrderImg"
import { Icon } from 'native-base';
import {ItemBase, Order} from "../../store/EntitiesState"
import {ITEMLIST, SUBMITORDER} from "../../constants/RouterDefine";
import {RouteComponentProps, withRouter} from "react-router"
import * as PropTypes from "prop-types";
import {Config} from "../../config/Config";

// export interface OrderItemInfoProps{
export interface OrderItemInfoProps{
	order:ItemBase[],
	allprice:number,
    timeClick?: ()=>void
    selectTime?: string
}

export interface OrderItemInfoState{
}

export default class OrderItemInfo extends React.Component<OrderItemInfoProps, OrderItemInfoState>{
    static contextTypes={
        router:PropTypes.object
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={{justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}>
                    <Text style={{marginLeft: 10, fontSize: Config.Font09375, color:Config.ColorB333}}>到达时间</Text>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}} onPress={()=>{
                        this.props.timeClick&&this.props.timeClick();
                    }}>
                        <Text style={{color: Config.ColorG2e, fontSize: Config.Font09375}}>{this.props.selectTime}</Text>                        
						<Icon name="arrow-forward" style={[Config.styles.ForwardIcon, {marginLeft: 10}]}/>

                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#f5f5f5', height: 1}}/>
				<OrderImg items = {this.props.order} price = {this.props.allprice} click = {()=>{this.context.router.history && this.context.router.history.push(ITEMLIST,  {orderlist:this.props.order, from:SUBMITORDER})}} />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },

});
