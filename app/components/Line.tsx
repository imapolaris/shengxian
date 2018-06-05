import * as React from "react";
import {View} from "react-native";
import {RouteComponentProps} from "react-router"

export interface Size{
    width:number;
    height:number;
}

export interface LineProps extends Partial<RouteComponentProps<any>>{     
    color?:string,  //颜色
    size?:Size,     //尺寸
}

export default class Line extends React.Component<LineProps>{
    render(){
        let size = this.props.size ? this.props.size:{height:1, width:'100%'}
        return (
            <View style={{height:size.height, width: size.width, backgroundColor: this.props.color}}  />  
            );
    }
}