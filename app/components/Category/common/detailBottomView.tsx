
import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';
import {RouteComponentProps} from "react-router"

const screenWidth = Dimensions.get('window').width;

export interface detailBottomViewProps extends Partial<RouteComponentProps<any>>{
    cartCount:number
	addCart: ()=>void,
	clickCart:()=>void,
}
export interface detailBottomViewState{

}

export default class detailBottomView extends React.Component<detailBottomViewProps, detailBottomViewState>{
    constructor(props:any){
        super(props);

    }

    render(){
        return(
            <View style={styles.container} >
                <TouchableOpacity onPress={()=>{this.props.clickCart()}} style={{width: 60, justifyContent: 'center'}}>
                    <Icon style={{marginLeft: 10, marginTop: 10, fontSize: 20}} name="cart" color="black" />
                    <View style={styles.iconSytle}>
                        <Text style={styles.iconTextStyle}>{this.props.cartCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartStyle} onPress={()=>{this.props.addCart();}}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>加入购物车</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3',
        height: 41,
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomStyle:{
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconSytle:{
        position: 'absolute',
        width: 20,
        height: 20,
        top: 5,
        left: 25,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    iconTextStyle:{
        textAlign: 'center',
        backgroundColor: 'transparent',
        color:'white',
        fontSize: 12,
        width: 40,
        position: 'absolute',
        left: -10
    },
    cartStyle:{
        width: 200,
        height: 50,
        backgroundColor: '#F68A0A',
        justifyContent: 'center'
    }

});