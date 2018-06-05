
import * as React from 'react';
import {Text,View,Image,Dimensions, StyleSheet, Modal} from "react-native";
import {is_iPhoneX} from "../constants/iOSScreenAuto";
import {IS_IPHONE_X} from "../config/Config";

const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_HEIGHT  = Dimensions.get('window').height

export interface TimerLaunchProps {

}
export interface TimerLaunchState {

    second:number,
    visible:boolean
}

let interval:number;

export default class TimerLaunch extends React.Component<TimerLaunchProps, TimerLaunchState>{

    state = {
        second:5,
        visible:true
    }

    statTimer = ()=>{

        interval = setInterval(()=>{
            console.log('second' + 1111)
           let second = this.state.second

           console.log('second' + second)
           this.setState({
               second:--second
           })

           if (second < 0) {
               interval&&clearInterval(interval)
               this.setState({
                   visible:false
               })
           }

        },1000)

    }

    componentWillUnmount() {
        interval&&clearInterval(interval)
    }
    componentDidMount (){

        this.statTimer()
    }

    render(){

        return (
            <Modal visible={this.state.visible} onRequestClose={()=>{}}>
                <View style={{flex:1, position:'absolute',top: 0,left:0}}>
                    {
                        IS_IPHONE_X()?<Image source={require('../../images/TimerLaunchBG_X.png')} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT,resizeMode:'stretch'}}/>:
                            <Image source={require('../../images/TimerLaunchBG.png')} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT,resizeMode:'stretch'}}/>
                    }

                    <View style={styles.textView}>
                        <Text style={{color:'white'}}
                              onPress={()=>{
                                  interval&&clearInterval(interval)
                                  this.setState({
                                      visible:false
                                  })
                              }}
                        >跳过{this.state.second}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    textView: {
        position:'absolute',
        top:IS_IPHONE_X()?44 : 20,
        right:10,
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:3,
        width:50,
        height:20,
        justifyContent:'center',
        alignItems:'center'

    }
})