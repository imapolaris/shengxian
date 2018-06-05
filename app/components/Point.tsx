import * as React from "react";
import {View} from "react-native";
import {RouteComponentProps} from "react-router"

export interface PointProps extends Partial<RouteComponentProps<any>>{
    size?:number,   //高度 
    color?:string,  //颜色
}

export default class Point extends React.Component<PointProps>{
    render(){
        return (
            <View style={{borderRadius: 100, height: this.props.size, width: this.props.size, backgroundColor: this.props.color}}  />  
            );
    }
}