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
    Switch,TouchableOpacity,
} from 'react-native';
import Line from './OrderLineItem';
import { Icon } from 'native-base';
import {formatMoney} from "../../common/utils/funcs";
import {Config} from "../../config/Config";
import {Coupon} from "../../store/EntitiesState";
import {fetchCoupon} from "../../actions/CategoryAction";


export interface OrderItemSubInfoProps {
    allprice:number
    coupon?:Coupon
    couponCount:number
	switchClick: (check: boolean)=>void
	CouponClick: ()=>void

}
export interface OrderItemSubInfoState{
    isCheck: boolean
}

export default class OrderItemSubInfo extends React.Component<OrderItemSubInfoProps, OrderItemSubInfoState>{
    constructor(props: any){
        super(props);
        this.state = {
            isCheck: true
        };
        this.isCouponValid = this.isCouponValid.bind(this)
        this.couponText = this.couponText.bind(this)
    }

    isCouponValid(){
        return this.props.coupon && this.props.coupon.id > 0
    }
    couponText(){
        if(!this.props.coupon){
            return ""
        }
        let {lowmoney,money}=this.props.coupon
        return `满${formatMoney(lowmoney)}元减${formatMoney(money)}元`
    }
    render() {
        let {coupon,couponCount} = this.props
        return (
            <View style={styles.container} >

                <TouchableOpacity style={{justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}
					onPress={()=>{this.props.CouponClick();            }}>
	                    <View style={{flexDirection: 'row'}}>
                            <Text style={{marginLeft: 10, color: Config.ColorB333, fontSize:Config.Font09375}}>优惠券</Text>
                            {this.isCouponValid()?<Text style={{color: Config.ColorB999, fontSize: Config.Font0875}} >{this.couponText()}</Text>:null}
                            {!this.isCouponValid()?<Text style={{color: Config.ColorB999, fontSize: Config.Font0875}}>(可用</Text>:null}
                            {!this.isCouponValid()?<Text style={{color: Config.ColorOf8, fontSize: Config.Font0875}}>{couponCount}张</Text>:null}
                            {!this.isCouponValid()?<Text style={{color: Config.ColorB999, fontSize: Config.Font0875}}>)</Text>:null}
	                    </View>
	                    <Icon name="arrow-forward" style={Config.styles.ForwardIcon}/>
                </TouchableOpacity>
                <Line height={1}/>
                {/* <View style={{justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 10}}>余额</Text>
                        <Text style={{color: '#999', fontSize: 13}}>(可用</Text>
                        <Text style={{color: '#F68A0A', fontSize: 13}}>￥0.00</Text>
                        <Text style={{color: '#999', fontSize: 13}}>)</Text>
                    </View>
                    <Switch style={{marginRight: 10}}
                            onValueChange={()=>{
                                this.setState({
                                    isCheck: !this.state.isCheck
                                },()=>{
                                    this.props.switchClick(this.state.isCheck)
                                });


                            }}
                            value={this.state.isCheck}
                    />
                </View> */}
                <Line height={10}/>
                <View style={{justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 10, fontSize: Config.Font09375}}>商品金额</Text>
                    </View>
                    <Text style={{ fontSize: Config.Font09375, color:Config.ColorB333, marginRight: 10}}>￥{formatMoney(this.props.allprice)}</Text>
                </View>
                <View style={{justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 10, fontSize: Config.Font09375}}>配送费</Text>
                    </View>
                    <Text style={{fontSize: Config.Font09375, color:Config.ColorB333, marginRight: 10}}>￥{this.props.allprice < Config.NOPEISONGRMBMIN?formatMoney(Config.PEISONGRMB):formatMoney(0)}</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },

});
