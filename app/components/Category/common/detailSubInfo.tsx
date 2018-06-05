
import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Config} from "../../../config/Config";
export interface detailSubInfoProps {
    item: any
}
export interface detailSubInfoState{
}

export default class detailSubInfo extends React.Component<detailSubInfoProps, detailSubInfoState>{
    constructor(props:any){
        super(props);

    }

    render(){
        return(
            <View style={styles.container} >
                <View style={{backgroundColor: '#F6F6F9', height: 10}}/>
                <View style={{flexDirection: 'row', flex: 1, borderTopWidth: 1, borderColor:Config.ColorBf4}}>
                    <View style={{width: 110, borderRightWidth: 1, borderColor:Config.ColorBf4}}>
                        <View style={styles.view1}><Text style={styles.text1}>规格</Text></View>
                        <View style={styles.view1}><Text style={styles.text1}>产地</Text></View>
                        <View style={styles.view1}><Text style={styles.text1}>存储方式</Text></View>
                        <View style={styles.view1}><Text style={styles.text1}>营养价值</Text></View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={[styles.view1, { paddingLeft: 25}]}><Text style={styles.text1}>{this.props.item.shortdesc}</Text></View>
                        <View style={[styles.view1, { paddingLeft: 25}]}><Text style={styles.text1}>{this.props.item.from}</Text></View>
                        <View style={[styles.view1, { paddingLeft: 25}]}><Text style={styles.text1}>{this.props.item.storetype}</Text></View>
                        <View style={[styles.view1, { paddingLeft: 25}]}><Text style={styles.text1}>{this.props.item.funceffect}</Text></View>
                    </View>
                </View>
                <View style={{backgroundColor: '#F6F6F9', height: 10}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    view1: {
        height: 40, 
        paddingLeft: 10, 
        borderBottomWidth: 1,
        borderColor: Config.ColorBf4, 
        paddingTop: 10
    },
    text1:{
        fontSize: Config.Font09375,
    }
});