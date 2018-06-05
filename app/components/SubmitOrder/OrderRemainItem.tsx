/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Config } from "../../config/Config";

export interface OrderRemainItemProps {
    memo:string
    onFocus: ()=>void
    changeText: (text:string)=>void
}
const MAX_MEMO_LEN = 50;
export interface OrderRemainItemState {
    remainds: Array<any>,
    selectRemains: Array<any>
}
export default class OrderRemainItem extends React.Component<OrderRemainItemProps, OrderRemainItemState>{
    constructor(props:any){
        super(props);


        this.state = {
            remainds: [
                {isSelect: false, title: '送点葱吧'},
                {isSelect: false, title: '现金支付，自带零钱'},
                {isSelect: false, title: '如果没有人就房门口'},
                {isSelect: false, title: '到了打电话不要敲门'},
            ],
            selectRemains: [],
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: Config.Font09375, color:Config.ColorB333, flex: 1}}>备注</Text>
                    <View style={{flex: 9, backgroundColor: '#f5f5f5', marginLeft: 5, borderRadius: 5, borderWidth: 1, borderColor: '#fff'}}>
                        <TextInput style={{height: 40, marginLeft: 5, fontSize: Config.Font0875, color:Config.ColorB666}}
                                   placeholder='选填,告诉小二您的特殊要求'
                                   maxLength={MAX_MEMO_LEN}
                                   onFocus={()=>{
                                       this.props.onFocus();
                                   }}
                                   onChangeText={(text) => {
                                       let newStr = text.replace("...", "");
                                       if (newStr.length >= MAX_MEMO_LEN)
                                       {
                                           return;
                                       }
   
                                       this.props.changeText(newStr);
                                   }}
                                   value={this.props.memo}
                                   underlineColorAndroid='transparent'
                                   

                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flexWrap:'wrap', paddingVertical:10}}>
                    {
                        this.state.remainds.map((item: any,i: number)=>{
                            return  (
                               <TouchableOpacity key={i} onPress={()=>{
                                    if (this.props.memo.length >= MAX_MEMO_LEN)
                                    {
                                        return;
                                    }

                                    let strFlag = "";
                                    if (this.props.memo.length > 0)
                                    {
                                        strFlag = "，";
                                    }
                                    let str = this.props.memo + strFlag + item.title;
                                    str = str.length<MAX_MEMO_LEN ? str : (str.substr(0, MAX_MEMO_LEN-3)+"...");
                                    this.props.changeText(str);
                                   {/*let data = this.state.remainds;*/}
                                   {/*data[i].isSelect = !item.isSelect*/}

                                   {/*this.setState({*/}
                                       {/*remainds: data*/}
                                   {/*});*/}

                                   {/*let selectItem: any = [];*/}

                                   {/*this.state.remainds.map((item:any,i)=>{*/}
                                       {/*if (item.isSelect){*/}
                                           {/*selectItem.push(item.title);*/}
                                       {/*}*/}

                                   {/*})*/}
                                   {/*this.setState({*/}
                                       {/*selectRemains: selectItem*/}
                                   {/*}, ()=>{*/}
                                       {/*console.log('selectRemains=', this.state.selectRemains);*/}
                                   {/*});*/}



                               }}>
                                   <View style={[styles.itemStyle, {backgroundColor: item.isSelect ? '#F68A0A' : 'white'}]}>
                                       <Text style={{color: item.isSelect ? 'white' : Config.ColorB666, fontSize:Config.Font0875}}>{item.title}</Text>
                                   </View>
                               </TouchableOpacity>

                            )
                        })


                    }

                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    itemStyle:{
        borderRadius: 15,
        height: 30,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        marginLeft: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5
    }

});
