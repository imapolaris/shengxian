
import * as React from 'react';
import {Config} from "../config/Config";
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {RouteComponentProps} from "react-router";

export interface TimerButtonProps{
    timerCount?:number,
    timerTitle?: string,
    phoneInValid:boolean,
    onClick?:()=>void
}
export interface TimerButtonState{
    timerCount: number,
    timerTitle: string,
    counting: boolean,
    selfEnable: boolean,
}

let interval:number;

export default class TimerButton extends React.Component<TimerButtonProps,TimerButtonState>{

    constructor(props:any) {
        super(props);
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            selfEnable: false,
        };
        this.shouldStartCountting = this.shouldStartCountting.bind(this);
        this.countDownAction = this.countDownAction.bind(this);
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    shouldStartCountting(shouldStart:boolean) {
        if (this.state.counting) {
            return;
        }
        if (shouldStart) {
            this.countDownAction();
            this.setState({counting: true, selfEnable: false});
        } else {
            this.setState({selfEnable: true});
        }
    }

    countDownAction() {
        const codeTime = this.state.timerCount;
        interval = setInterval(() => {
            const timer = this.state.timerCount - 1;
            if (timer === 0) {
                interval && clearInterval(interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取验证码',
                    counting: false,
                    selfEnable: true,
                });
            } else {
                console.log('---- timer ', timer);
                this.setState({
                    timerCount: timer,
                    timerTitle: `${timer}s`,
                });
            }
        }, 1000);
    }

    render() {
        let {counting, timerTitle, selfEnable} = this.state;
        let enable = counting ? false : this.props.phoneInValid;

        selfEnable = enable;
        //console.log("selfEnable=", selfEnable);
        //console.log("phoneInValid=", this.props.phoneInValid);
        //console.log("counting=", counting);
        return (
            <TouchableOpacity disabled={!selfEnable}
                activeOpacity={counting ? 1 : 0.8} onPress={() => {
                if (!counting && selfEnable) {
                    let ret = this.props.onClick ? this.props.onClick() : false;
                    if (!ret) {
                        return;
                    }
                    this.setState({
                        selfEnable: false,
                        timerTitle: this.state.timerCount.toString()+'s'
                    });
                    this.shouldStartCountting(true);
                    this.props.onClick&&this.props.onClick();
                }
            }}
            >
                <View style={[{
                    width: 120,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: selfEnable ? Config.ColorG2e:Config.ColorBb2,
                    backgroundColor: selfEnable ? Config.ColorG2e:Config.ColorBb2,
                }]}>
                    <Text
                        style={[{fontSize: 14}, {color: selfEnable ? Config.ColorBf2 : Config.ColorW}]}
                    >{timerTitle}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
