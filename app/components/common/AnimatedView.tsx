/**
 * Created by kerwinliu on 2017/10/20.
 */
import * as React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    View,
    UIManager
} from 'react-native';
import {px2dp} from "../../config/Config";
const {width,height} = Dimensions.get('window')
const ReactNativeComponentTree = require('ReactNativeComponentTree');


class Point {
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}
class Size {
    width:number;
    height:number;
    constructor(width:number, height:number){
        this.width = width;
        this.height = height;
    }
}
class Rect extends Size{
    left:number;
    top:number;
    constructor({left,top,width, height}:any){
        super(width,height);
        this.left = left;
        this.top = top ;
    }
}
export interface ParabolaImageContainerProps{
    endPointX:number,
    endPointY:number,
}
export interface ParabolaImageContainerState {
    element: any,
    visible: boolean,
    defaultAnimatedValues:any,
    uri:any
}
export default class ParabolaImageContainer  extends React.Component<ParabolaImageContainerProps,ParabolaImageContainerState>{
    public static defaultProps: Partial<ParabolaImageContainerProps> = {
        endPointX:width * 0.5,
        endPointY:height - 20
    };
    displayOptions:{};
    constructor(props:any){
        super(props)
        this.state={
            element:null,
            visible:false,
            defaultAnimatedValues: {
                translate: new Animated.ValueXY({x:0,y:0}),
                scale: new Animated.Value(1),
            },
            uri:null
        }
    }
    press(e:any,uri:any){
        let currentT = e.currentTarget
        let cur = ReactNativeComponentTree.getInstanceFromNode(currentT);
        UIManager.measure(currentT, (x, y, width, height, pageX, pageY) => {
            this.start({left:pageX,top:pageY,width,height,element:cur._currentElement,uri});
        });

    }
    start(options:any){
        this.displayOptions = options
        this.setState({
            visible:true,
            uri:options.uri
        })
        this._startAnimation(options,()=>{

        })
    }
    _startAnimation(options:any,callback:any){
        let animDuration = 1000;
        let values = this.state.defaultAnimatedValues;

        let commonConfig = {
            duration: animDuration,
        };
        const {endPointX,endPointY} = this.props;
        Animated.parallel([
            Animated.timing(values.translate, {
                toValue:new Point(endPointX  - options.left  - options.width * 0.5, endPointY - options.top - options.height * 0.5 ),
                ...commonConfig,
            }),
            Animated.timing(values.scale, {
                toValue:0.1,
                ...commonConfig,
            })
        ]).start(()=>{
            this.setState({
                visible: false
            })
            let values = this.state.defaultAnimatedValues;
            values.translate.setValue(new  Point(0, 0));
            values.scale.setValue(1);
            callback && callback()
        });
    }
    render(){
        if(!this.state.visible){
            return null
        }
        const areaOrigin = new Rect(this.displayOptions)
        const contentSize = {height:areaOrigin.height,width:areaOrigin.width}
        const translateOrigin = this.state.defaultAnimatedValues
        const transformContent = {
            transform: [
                {
                    translateY: translateOrigin.translate.y,
                },{
                    translateX: translateOrigin.translate.x,
                },{
                    scale:translateOrigin.scale
                }
            ]
        }
        return(
            <Modal visible={this.state.visible}  transparent={true} onRequestClose={()=>{}}>
                <Animated.Image
                    source={{uri: this.state.uri}}
                    style={[styles.content,{top:areaOrigin.top-px2dp(50),left:areaOrigin.left-px2dp(50)},transformContent]}/>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    content:{
		borderRadius: px2dp(50),
        width:px2dp(50),
        height:px2dp(50)
    }
})



