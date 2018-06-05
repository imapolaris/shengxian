"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Config_1 = require("../config/Config");
const react_native_1 = require("react-native");
let interval;
class TimerButton extends React.Component {
    constructor(props) {
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
    shouldStartCountting(shouldStart) {
        if (this.state.counting) {
            return;
        }
        if (shouldStart) {
            this.countDownAction();
            this.setState({ counting: true, selfEnable: false });
        }
        else {
            this.setState({ selfEnable: true });
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
            }
            else {
                console.log('---- timer ', timer);
                this.setState({
                    timerCount: timer,
                    timerTitle: `${timer}s`,
                });
            }
        }, 1000);
    }
    render() {
        let { counting, timerTitle, selfEnable } = this.state;
        let enable = counting ? false : this.props.phoneInValid;
        selfEnable = enable;
        //console.log("selfEnable=", selfEnable);
        //console.log("phoneInValid=", this.props.phoneInValid);
        //console.log("counting=", counting);
        return (React.createElement(react_native_1.TouchableOpacity, { disabled: !selfEnable, activeOpacity: counting ? 1 : 0.8, onPress: () => {
                if (!counting && selfEnable) {
                    let ret = this.props.onClick ? this.props.onClick() : false;
                    if (!ret) {
                        return;
                    }
                    this.setState({
                        selfEnable: false,
                        timerTitle: this.state.timerCount.toString() + 's'
                    });
                    this.shouldStartCountting(true);
                    this.props.onClick && this.props.onClick();
                }
            } },
            React.createElement(react_native_1.View, { style: [{
                        width: 120,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: selfEnable ? Config_1.Config.ColorG2e : Config_1.Config.ColorBb2,
                        backgroundColor: selfEnable ? Config_1.Config.ColorG2e : Config_1.Config.ColorBb2,
                    }] },
                React.createElement(react_native_1.Text, { style: [{ fontSize: 14 }, { color: selfEnable ? Config_1.Config.ColorBf2 : Config_1.Config.ColorW }] }, timerTitle))));
    }
}
exports.default = TimerButton;
//# sourceMappingURL=TimerButton.js.map