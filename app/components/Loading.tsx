import * as React from 'react'
//let Animation  = require('lottie-react-native');
import {StyleSheet, View} from "react-native";

export default  class Loading extends React.Component<{}>{
    animation:any;
    componentDidMount(){
        this.animation.play();
    }
    render(){
        return <View style={styles.container}>
                {/*<Animation style={styles.animation} ref={(animation:any)=>{animation&&(this.animation=animation)}}*/}
                           {/*source={require('../../static/animates/orange.json')}*/}
                           {/*loop={true}/>*/}
            </View>

    }
}

const styles = StyleSheet.create({
    "container":{
        flex:1,
        position:"absolute",
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems:"center",
        justifyContent:"center"
    },
    "animation":{
        width:200,
        height:200
    }
})