"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by kerwinliu on 2017/10/20.
 */
const React = require("react");
const react_native_1 = require("react-native");
const Config_1 = require("../../config/Config");
const { width, height } = react_native_1.Dimensions.get('window');
const ReactNativeComponentTree = require('ReactNativeComponentTree');
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
class Rect extends Size {
    constructor({ left, top, width, height }) {
        super(width, height);
        this.left = left;
        this.top = top;
    }
}
class ParabolaImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: null,
            visible: false,
            defaultAnimatedValues: {
                translate: new react_native_1.Animated.ValueXY({ x: 0, y: 0 }),
                scale: new react_native_1.Animated.Value(1),
            },
            uri: null
        };
    }
    press(e, uri) {
        let currentT = e.currentTarget;
        let cur = ReactNativeComponentTree.getInstanceFromNode(currentT);
        react_native_1.UIManager.measure(currentT, (x, y, width, height, pageX, pageY) => {
            this.start({ left: pageX, top: pageY, width, height, element: cur._currentElement, uri });
        });
    }
    start(options) {
        this.displayOptions = options;
        this.setState({
            visible: true,
            uri: options.uri
        });
        this._startAnimation(options, () => {
        });
    }
    _startAnimation(options, callback) {
        let animDuration = 1000;
        let values = this.state.defaultAnimatedValues;
        let commonConfig = {
            duration: animDuration,
        };
        const { endPointX, endPointY } = this.props;
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(values.translate, Object.assign({ toValue: new Point(endPointX - options.left - options.width * 0.5, endPointY - options.top - options.height * 0.5) }, commonConfig)),
            react_native_1.Animated.timing(values.scale, Object.assign({ toValue: 0.1 }, commonConfig))
        ]).start(() => {
            this.setState({
                visible: false
            });
            let values = this.state.defaultAnimatedValues;
            values.translate.setValue(new Point(0, 0));
            values.scale.setValue(1);
            callback && callback();
        });
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        const areaOrigin = new Rect(this.displayOptions);
        const contentSize = { height: areaOrigin.height, width: areaOrigin.width };
        const translateOrigin = this.state.defaultAnimatedValues;
        const transformContent = {
            transform: [
                {
                    translateY: translateOrigin.translate.y,
                }, {
                    translateX: translateOrigin.translate.x,
                }, {
                    scale: translateOrigin.scale
                }
            ]
        };
        return (React.createElement(react_native_1.Modal, { visible: this.state.visible, transparent: true, onRequestClose: () => { } },
            React.createElement(react_native_1.Animated.Image, { source: { uri: this.state.uri }, style: [styles.content, { top: areaOrigin.top - Config_1.px2dp(50), left: areaOrigin.left - Config_1.px2dp(50) }, transformContent] })));
    }
}
ParabolaImageContainer.defaultProps = {
    endPointX: width * 0.5,
    endPointY: height - 20
};
exports.default = ParabolaImageContainer;
const styles = react_native_1.StyleSheet.create({
    content: {
        borderRadius: Config_1.px2dp(50),
        width: Config_1.px2dp(50),
        height: Config_1.px2dp(50)
    }
});
//# sourceMappingURL=AnimatedView.js.map