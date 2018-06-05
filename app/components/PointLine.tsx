import * as React from "react";
import {View, Text, Dimensions} from "react-native";
import {RouteComponentProps} from "react-router"
import Line from "./Line"
import Point from "./Point"
import {Config} from "../config/Config";
import {OrderState} from "../store/EntitiesState";
import {number} from "prop-types";



export interface Size{
    width:number;
    height:number;
}

export interface PointLineProps extends Partial<RouteComponentProps<any>>{     
    color?:string,  //颜色
    size:Size,     //尺寸
    endpoint:boolean,
    first:boolean,
    text?:string,

    index:number,
    id:number,
    titles:string[]

    width:number,
    currentStatus:number
}

const acolor    = Config.ColorOf8;     //激活
const uncolor   = Config.ColorBb2;  //未激活

export default class PointLine extends React.Component<PointLineProps>{
    render(){
        let size        = this.props.size   ? this.props.size   : {height: 1, width: 100};
        let count       = this.props.index  ? this.props.index  : 1;
        let id          = this.props.id     ? this.props.id     : 1;

        let point_id    = (id-1)*2+1;
        let line_id     = id*2;

        let point_color = count+1 > point_id    ? acolor : uncolor;  
        point_color     = this.props.first      ? acolor : point_color;
        let line_color  = count >= line_id      ? acolor : uncolor;

        if(count-1 == OrderState.OSCancel)
        {
            point_color = acolor;
            line_color = acolor;
        }
        //
        // this.props = {
        //
        //     titles:[string],
        //     currentStatus:number
        // }

        console.log('current =' + this.props.currentStatus)

        
        return (


            <View style={{paddingTop: 10,paddingBottom: 10}}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'center',paddingBottom: 10}}>
                    {
                        this.props.titles ? this.props.titles.map((item, key) => {
                            return (

                                <View key={key} style={{flexDirection:'row', justifyContent:'center', alignItems:
                                'center'}}>
                                    <View style={{borderRadius: 100, height: 10, width: 10,backgroundColor: key<=this.props.currentStatus?acolor:uncolor}}></View>
                                    {
                                        (key===this.props.titles.length-1)?null
                                        :<View style={{height: 1, width: this.props.currentStatus!=OrderState.OSCancel ? ((this.props.width - 20)/this.props.titles.length) : this.props.width-110, backgroundColor: key<=this.props.currentStatus?acolor:uncolor}}></View>
                                    }

                                </View>

                            )
                        }) : null
                    }
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    {
                        this.props.titles.map((item, key) => {
                            return (
                                <View style={{width:(this.props.width/this.props.titles.length)}} key={key}>
                                    <Text style={{color: key<=this.props.currentStatus?point_color:uncolor, 
                                        textAlign: this.props.currentStatus!=OrderState.OSCancel ? 'center':(key==0?'left': 'right'),
                                        marginLeft:this.props.currentStatus!=OrderState.OSCancel ? 0 :(key==0?30: 0),
                                        marginRight:this.props.currentStatus!=OrderState.OSCancel ? 0 :(key==1?30: 0)}}>{item}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>

        )

        // return (
        //         <View style={{justifyContent: 'center', backgroundColor: Config.ColorW}}>
        //             <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        //                 {this.props.first ? <View style={{width: 20}} /> : null}
        //                 <View style={{borderRadius: 100, height: 10, width: 10, backgroundColor: point_color}}  />
        //                 {
        //                     this.props.endpoint ? null : <View style={{height: size.height, width: size.width, backgroundColor: line_color}}  />
        //                 }
        //             </View>
        //
        //             <View style={{marginTop: 10, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
        //                 <Text style={{color: point_color}}>
        //                     {this.props.text}
        //                 </Text>
        //             </View>
        //         </View>
        //     );
    }
}