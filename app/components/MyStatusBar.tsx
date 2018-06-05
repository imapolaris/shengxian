import * as React from "react";
import {View, StatusBar, StyleSheet, Platform} from "react-native";
import {RouteComponentProps} from "react-router"
import {px2dp} from "../config/Config";
import * as ConstValue from "../constants/iOSScreenAuto";
export interface Size{
    width:number;
    height:number;
}

export interface MyStatusbarProps extends Partial<RouteComponentProps<any>>{     
    color?:string,  //颜色
    size?:Size,     //尺寸
    iconcolor?:"default" | "light-content" | "dark-content",
}

export default class MyStatusbar extends React.Component<MyStatusbarProps>{
    render(){
        let size = this.props.size ? this.props.size:{height:ConstValue.StatusBar_Height, width:'100%'};
        let color = this.props.color ? this.props.color : 'black';
        let iconcolor= this.props.iconcolor ? this.props.iconcolor : 'default';

        return (
            <View>
                <StatusBar backgroundColor='transparent' translucent={true} barStyle={iconcolor}/>
                <View style={[styles.vx, {height:size.height}]} />
            </View>
            );
    }
}

const styles = StyleSheet.create({
    vx: {
        ...Platform.select({
            ios: {
                backgroundColor: 'white',
            },
            android: {
                backgroundColor: 'black',
            },
        }),
    }
});