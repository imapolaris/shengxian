"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Config_1 = require("../config/Config");
const SCREEN_WIDTH = react_native_1.Dimensions.get('window').width;
const SCREEN_HEIGHT = react_native_1.Dimensions.get('window').height;
let interval;
class TimerLaunch extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            second: 5,
            visible: true
        };
        this.statTimer = () => {
            interval = setInterval(() => {
                console.log('second' + 1111);
                let second = this.state.second;
                console.log('second' + second);
                this.setState({
                    second: --second
                });
                if (second < 0) {
                    interval && clearInterval(interval);
                    this.setState({
                        visible: false
                    });
                }
            }, 1000);
        };
    }
    componentWillUnmount() {
        interval && clearInterval(interval);
    }
    componentDidMount() {
        this.statTimer();
    }
    render() {
        return (React.createElement(react_native_1.Modal, { visible: this.state.visible, onRequestClose: () => { } },
            React.createElement(react_native_1.View, { style: { flex: 1, position: 'absolute', top: 0, left: 0 } },
                Config_1.IS_IPHONE_X() ? React.createElement(react_native_1.Image, { source: require('../../images/TimerLaunchBG_X.png'), style: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT, resizeMode: 'stretch' } }) :
                    React.createElement(react_native_1.Image, { source: require('../../images/TimerLaunchBG.png'), style: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT, resizeMode: 'stretch' } }),
                React.createElement(react_native_1.View, { style: styles.textView },
                    React.createElement(react_native_1.Text, { style: { color: 'white' }, onPress: () => {
                            interval && clearInterval(interval);
                            this.setState({
                                visible: false
                            });
                        } },
                        "\u8DF3\u8FC7",
                        this.state.second)))));
    }
}
exports.default = TimerLaunch;
const styles = react_native_1.StyleSheet.create({
    textView: {
        position: 'absolute',
        top: Config_1.IS_IPHONE_X() ? 44 : 20,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 3,
        width: 50,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
//# sourceMappingURL=TimerLaunch.js.map