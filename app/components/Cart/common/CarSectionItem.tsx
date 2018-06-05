import * as React from "react";
import {View , Text, Body, CheckBox } from 'native-base';
//import {checkItem} from "../../../actions/cart";
import {TouchableOpacity} from 'react-native'
import {CartSection} from '../DataUtil/DataUtil';
import {Config, px2dp} from "../../../config/Config";
import {formatMoneyEx} from "../../../common/utils/funcs";

export interface CarSectionItemProps{
    sectionData: CartSection,
    sectionID: number,
    sectionClick:(index: number)=>void,
}
export interface CarSectionItemState{

}

export default class CarSectionItem extends React.Component<CarSectionItemProps,CarSectionItemState>{
    constructor(props:any){
        super(props);
    }
    render(){
        return (
            <View style={{flexDirection: 'row', paddingBottom: 10, paddingTop: 10, backgroundColor: Config.ColorW, alignItems:'center'}}>
                <TouchableOpacity style={{width:40}} onPress={()=>{this.props.sectionClick(this.props.sectionID);}}>
                    <View style={{width:20,height:30, justifyContent:'center',alignItems:'center'}}>

                        <CheckBox onPress={()=>{
                            this.props.sectionClick(this.props.sectionID);
                        }} checked={this.props.sectionData.select} color={Config.ColorG3c}/>
                    </View>
                </TouchableOpacity>
              	{/* <Text style={{marginLeft: 15}}>{this.props.sectionData.title}</Text> */}
				<Text style={{marginLeft: 15, fontSize: Config.Font08125, color: Config.ColorB333}}>全选</Text>
                <Text style={{marginLeft: 5, color: Config.ColorOf8, fontSize: Config.Font08125, textAlign: 'center'}}>满￥{formatMoneyEx(Config.NOPEISONGRMBMIN)}元免运费</Text>
            </View>
        );
    }
}