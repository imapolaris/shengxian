import * as React from "react";

import {View, Image, TouchableHighlight} from "react-native";
import styles from "../styles/index";
import Swiper from "react-native-swiper";

//介绍图片,在drawerbal目录
const intros=[{uri:'intro1'},{uri:'intro2'},{uri:'intro3'},{uri:'intro4'}]

export interface IntroSwiperProps{
    width:number,
    height:number,
    onEndPress:()=>void
}

export default class IntroSwiper extends React.Component<IntroSwiperProps>{
    render(){
        let {width,height} = this.props;
        return (
            <Swiper showsButtons={false} showsHorizontalScrollIndicator loop={false}>
                {intros.map((item,i)=>(
                    <View style={styles.swiperSlide} key={i}>
                        {
                            (i === intros.length)?
                                (<Image source={item} style={[styles.swiperImage,{width,height}]}/>):
                                (<TouchableHighlight onPress={this.props.onEndPress} style={{flex:1}}>
                                    <Image source={item} style={[styles.swiperImage,{width,height}]}/>
                                 </TouchableHighlight>)
                        }
                    </View>
                ))}
            </Swiper>)
    }
}
