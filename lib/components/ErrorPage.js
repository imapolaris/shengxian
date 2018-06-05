"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const PropTypes = require("prop-types");
class ErrorPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.startGpsLocation = this.startGpsLocation.bind(this);
        this.openGpsLocation = this.openGpsLocation.bind(this);
        this.reload = this.reload.bind(this);
    }
    startGpsLocation() {
        this.props.startGpsLocation && this.props.startGpsLocation();
    }
    openGpsLocation() {
    }
    reload() {
    }
    componentDidMount() {
    }
    render() {
        let props = this.context.router.history.location.state;
        return (React.createElement(native_base_1.Container, { style: exports.styles.container },
            React.createElement(react_native_1.Image, { source: props.image }),
            React.createElement(native_base_1.Text, null, props.desc),
            React.createElement(native_base_1.View, { style: exports.styles.buttons },
                props.showOpenLocation ? React.createElement(native_base_1.Button, { onPress: this.openGpsLocation },
                    React.createElement(native_base_1.Text, null, "\u5F00\u542F\u5B9A\u4F4D")) : null,
                props.showReLocation ? React.createElement(native_base_1.Button, { onPress: this.startGpsLocation },
                    React.createElement(native_base_1.Text, null, "\u91CD\u65B0\u5B9A\u4F4D")) : null,
                props.showReRequest ? React.createElement(native_base_1.Button, { onPress: this.reload },
                    React.createElement(native_base_1.Text, null, "\u91CD\u65B0\u52A0\u8F7D")) : null)));
    }
}
ErrorPage.contextTypes = {
    router: PropTypes.object
};
exports.default = ErrorPage;
exports.styles = react_native_1.StyleSheet.create({
    container: { flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' },
    buttons: { justifyContent: "center", flexDirection: "row" },
});
//# sourceMappingURL=ErrorPage.js.map