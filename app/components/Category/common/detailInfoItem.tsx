
import * as React from "react";
import {
    StyleSheet,
    View,
} from 'react-native';
import { Text } from 'native-base';
import {formatLeftCnt, formatMoney} from "../../../common/utils/funcs";
import {Config} from "../../../config/Config";
import {ItemDynamic} from "../../../store/EntitiesState";

export interface detailInfoItemProps {
    item: any
    dynamic?:ItemDynamic
}
export interface detailInfoItemState{
}

export default class detailInfoItem extends React.Component<detailInfoItemProps, detailInfoItemState>{
    constructor(props:any){
        super(props);

    }
    getLeftCnt(dynamic:ItemDynamic|undefined){
        if(!dynamic) return 0;
        return dynamic.leftcnt;
    }
    render(){
        let {item,dynamic} = this.props;
        let leftcnt = this.getLeftCnt(dynamic);
		let fmtCnt = formatLeftCnt(leftcnt);
		let price = dynamic ? dynamic.price : 10000
		let marketprice = dynamic ? dynamic.marketprice : 10000
        return(
            <View style={{backgroundColor: 'white'}}>
                <View style={{backgroundColor: '#F6F6F9', height: 10}}/>
                <View style={styles.container} >
					{/* <Text style={{fontSize: 17, fontWeight: 'bold', color: '#0b0b0b'}}>{this.props.item.title}  {this.props.item.shortdesc}</Text> */}
					<Text style={{fontSize: 17, fontWeight: 'bold', color: '#0b0b0b'}}>{this.props.item.title}</Text>
                    <Text style={{fontSize: 14, color: '#848484', marginTop: 5}}>{this.props.item.funceffect}</Text>

                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 10}}>
                            <Text style={{fontWeight:'bold', marginRight: 5, fontSize: Config.Font1125, color: Config.ColorOf8}}>
                                ￥{formatMoney(price)}
                            </Text>
                            <Text style={{fontSize: Config.FontBase, textDecorationLine: 'line-through', 
                                         color:Config.ColorBb2}}>
                                ￥{formatMoney(marketprice)}
                            </Text>
                            {
                                fmtCnt?(
                                    <Text style={{marginLeft:5,fontSize: Config.Font0875,
                                        color:Config.ColorOf8}}>
                                           {fmtCnt}
                                    </Text>
                                ):null
                            }
                            {
                                (item.allow_place_type && item.allow_place_type> 0)? <Text style={{marginLeft:5,fontSize: Config.Font0875,
                                    color:Config.ColorOf8}}>
                                    限购{item.allow_place_type}件
                                </Text>:null
                            }
                        </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5
    },
});