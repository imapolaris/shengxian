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
    Picker,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const leftAllValue = ()=>{
    return [
        {label: '今天', value: 'today'},
        {label: '明天', value: 'tomorrow'},
        {label: '后天', value: 'aftertomorrow'}
    ]
};

const rightAllValue = ()=>{
    return [
        {label:'09:00-09:30' ,value:'0900'},
        {label:'09:30-10:00' ,value:'0930'},
        {label:'10:00-10:30' ,value:'1000'},
        {label:'10:30-11:00' ,value:'1030'},
        {label:'11:00-11:30' ,value:'1100'},
        {label:'11:30-12:00' ,value:'1130'},
        {label:'12:00-12:30', value:'1200'},
        {label:'12:30-13:00', value:'1230'},
        {label:'13:00-13:30' ,value:'1300'},
        {label:'13:30-14:00' ,value:'1330'},
        {label:'14:00-14:30' ,value:'1400'},
        {label:'14:30-15:00' ,value:'1430'},
        {label:'15:00-15:30' ,value:'1500'},
        {label:'15:30-16:00' ,value:'1530'},
        {label:'16:00-16:30' ,value:'1600'},
        {label:'16:30-17:00' ,value:'1630'},
        {label:'17:00-17:30' ,value:'1700'},
        {label:'17:30-18:00' ,value:'1730'},
        {label:'18:00-18:30' ,value:'1800'},
        {label:'18:30-19:00' ,value:'1830'},
        {label:'19:00-19:30' ,value:'1900'},
        {label:'19:30-20:00' ,value:'1930'},
        {label:'20:00-20:30' ,value:'2000'},
        {label:'20:30-21:00' ,value:'2030'},
        {label:'21:00-21:30' ,value:'2100'},
    ];
};

export interface chooseTimeItemProps {
    sureClick: (date: string)=>void
}
export interface chooseTimeItemState{
    leftSelectValue: string,
    rightSelectValue: string,
    leftValue: Array<any>,
    rightValue: Array<any>,
    leftDateString: string,
    rightDateString: string
}

export default class chooseTimeItem extends React.Component<chooseTimeItemProps, chooseTimeItemState>{
    constructor(props:any) {
        super(props);
        this.state = {
            leftSelectValue: 'today',
            rightSelectValue: 'now',
            leftValue: [],
            rightValue: [],
            leftDateString: '',
            rightDateString: ''
        };

        this.GetDateStr = this.GetDateStr.bind(this);
        this.reloadRightValue = this.reloadRightValue.bind(this);
    }

    componentDidMount() {
        
        this.reloadRightValue();
    }

    /*初始化时间数据*/
    reloadRightValue(){

        let newLeftValue:Array<any> = [];
        leftAllValue().map((item,i)=>{
            newLeftValue.push({label: item.label+'('+this.GetDateStr(i)+')', value: item.value})
        });
        
        this.setState({
            leftValue: newLeftValue,
            leftDateString: newLeftValue[0].label,
        });

        // this.setState({
        //     rightValue: rightAllValue(),
        //     rightSelectValue: '0900'
        // });


        if (this.state.leftSelectValue === 'today'){
            // 获取当前时分
            let dd = new Date();
            let hour = dd.getHours();
            let newhour = '';
            if(hour <= 9){ //如果小于9的话，则需要加上0
                newhour = "0" + hour.toString();
            }else
                newhour = hour.toString();
            let minute = dd.getMinutes();


            let newminute = '';
            if(minute <= 9){ //如果小于9的话，则需要加上0
                newminute = "0" + minute.toString();
            }else
                newminute = minute.toString();
            let nowValue = newhour+newminute;


            let newRightValue:Array<any>  = [];
            let rightV = rightAllValue();

            rightV.map((item)=>{

                if (parseInt(item.value)  > parseInt(nowValue)) {
                    newRightValue.push(item)
                }
            });

            this.setState({
                rightValue: newRightValue,
                rightDateString: newRightValue.length === 0 ? '' : newRightValue[0].label,
                rightSelectValue: '0900',
            });

        }else {

            this.setState({
                rightValue: rightAllValue(),
                rightSelectValue: '0900',
                rightDateString: '09:00-09:30'

            });
        }

    }

    /*格式化左侧时间格式*/
    GetDateStr(AddDayCount: number) {
        
        let dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        let m = dd.getMonth()+1;//获取当前月份的日期
        let newhour = '';
        if(m <= 9){ //如果小于9的话，则需要加上0
            newhour = "0" + m;
        }
        let d = dd.getDate();
        let newday = '';
        if(d <= 9){ //如果小于9的话，则需要加上0
            newday = "0" + d;
        }
        let data = newhour+'月'+newday+'日';
        return data;
    }

    render() {
        
        return (
            <View style={styles.container}>
                <Text style={{marginLeft: 10, marginTop: 20}}>请选择配送日期</Text>
                <View style={{flexDirection: 'row'}}>
                    <Picker style={styles.pickStyle}
                            selectedValue={this.state.leftSelectValue}
                            onValueChange={(value: any)=>{
                                this.setState({
                                    leftSelectValue: value,
                                },()=>{
                                    this.reloadRightValue();

                                    this.state.leftValue.map((item:any)=>{
                                        if(item.value === value){
                                            this.setState({
                                                leftDateString: item.label
                                            })
                                        }
                                    })
                                });
                            }}
                            mode='dialog'
                    >
                        {
                            this.state.leftValue.length !==0 ? this.state.leftValue.map((item:any,i:number)=>{
                                    
                                return <Picker.Item key={i} label={item.label} value={item.value} />
                            }) : null
                        }

                    </Picker>

                    <Picker style={styles.pickStyle}
                            selectedValue={this.state.rightSelectValue}
                            onValueChange={(value:any)=>{
                                
                                this.setState({
                                    rightSelectValue: value
                                },()=>{
                                     this.state.rightValue.map((item:any)=>{
                                        if(item.value === value){
                                            this.setState({
                                                rightDateString: item.label
                                            })
                                        }
                                    })
                                })
                            }}
                            mode='dialog'

                    >
                        {
                            this.state.rightValue.length !==0 ? this.state.rightValue.map((item:any,i:number)=>{

                                return <Picker.Item key={i} label={item.label} value={item.value} />
                            }) : null
                        }

                    </Picker>

                </View>
                <View style={{height: 1, backgroundColor: '#f5f5f5'}}/>
                <TouchableOpacity style={{height: 44, justifyContent: 'center', backgroundColor: 'white', alignItems: 'center'}}
                                  onPress={()=>{
                                      this.props.sureClick(this.state.leftDateString + this.state.rightDateString);
                                  }}>
                    <Text style={{fontSize: 17}}>确定</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0
    },
    pickStyle:{
        width: screenWidth/2,
        height: 216
    }
});
