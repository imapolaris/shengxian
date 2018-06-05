import * as React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {Text, Button, View} from 'native-base';
import {leftItemModel} from '../interfaceUtil/DataUtil';
import {Config} from "../../../config/Config";
const screenWidth:number = Dimensions.get('window').width;

export interface CategoryLeftItemProps {
    index: number,
    item: leftItemModel,
    itemClick: (index: number)=>void,
}
export interface CategoryLeftItemState{
}
export default class CategoryLeftItem extends React.Component<CategoryLeftItemProps, CategoryLeftItemState>{
    constructor(props: any) {
        super(props);
    }
    render() {
		// console.log("-------------------" , this.props.item.is_Select)
        return (
			 <View style={[styles.container, {backgroundColor: this.props.item.is_Select === 1 ? 'white' : '#f7f7f7'}]}>			
                <TouchableOpacity onPress={()=>{
                    this.props.itemClick(this.props.index);
                }} style={styles.buttonStyle}>
                    {
                        this.props.item.is_Select === 1 ? <View style={{
                        height: 30,
                        width: 2,
                        backgroundColor: Config.ColorBf4,
                        marginTop: 5}} /> : null
                    }
					<Text style={(this.props.item.is_Select === 1)? styles.selectText : styles.defText}>{this.props.item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height: Config.CategoryLeftHeight,
        justifyContent: 'center',
    },
    buttonStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth / 4,
        height: 40,
	},
	defText:{
        marginLeft: 5, textAlign: 'center', fontSize: Config.Font09375, color: '#666666',
	},
	selectText:{
		marginLeft: 5, textAlign: 'center', fontSize: Config.Font10625, color: Config.ColorG2e,
    }
});
