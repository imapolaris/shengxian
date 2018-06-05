import * as React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";

import * as home_shop_icon from '../../../../images/home_shop_icon.png';
import {Config} from "../../../config/Config";
import {formatMoneyEx} from "../../../common/utils/funcs";
import * as peisong from '../../../../images/peisong.png';
import * as yunfei from '../../../../images/yunfei.png';
import * as tuihuo from '../../../../images/tuihuo.png';

export interface HomeChangeShopProps {
    shopName:string,
    changeClick: ()=>void,
}
export interface HomeChangeShopState {
}

export default class HomeChangeShop extends React.Component<HomeChangeShopProps, HomeChangeShopState>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            // <View style={styles.container}>
            //     <Image source={home_shop_icon}/>
            //     <Text style={{marginLeft: 10}}>{this.props.shopName}</Text>
            //     <TouchableOpacity style={styles.changeStyle} onPress={()=>{
            //         this.props.changeClick();
            //     }}>
            //         <Text style={{color: 'green'}}>切换门店</Text>
            //     </TouchableOpacity>
			// </View>
			 <View style={styles.container}>
                <View style={styles.vw1}>
                    <Image source={peisong} style={styles.icon1} />
					<Text style={{color: Config.ColorG3c}}>30分钟送达</Text>
				</View>
				<View style={styles.vw1}>
                    <Image source={yunfei} style={styles.icon1} />
					<Text style={{color: Config.ColorG3c}}>满{formatMoneyEx(Config.NOPEISONGRMBMIN)}元免运费</Text>
				</View>
				<View style={styles.vw1}>
                    <Image source={tuihuo} style={styles.icon1} />
                 	<Text style={{color: Config.ColorG3c}}>无理由退货</Text>
				</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'white',
		alignItems: 'center',
		justifyContent:'space-around'
    },
    changeStyle: {
        position: 'absolute',
        right: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    vw1: {

        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon1: {
        width:20, 
        height: 18, 
        marginRight: 3, 
        alignItems: 'center', 
    }
});

//yarn add git+https://wallel@github.com/wallel/NativeBase.git