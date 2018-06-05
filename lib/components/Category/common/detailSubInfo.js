"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Config_1 = require("../../../config/Config");
class detailSubInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.View, { style: { backgroundColor: '#F6F6F9', height: 10 } }),
            React.createElement(react_native_1.View, { style: { flexDirection: 'row', flex: 1, borderTopWidth: 1, borderColor: Config_1.Config.ColorBf4 } },
                React.createElement(react_native_1.View, { style: { width: 110, borderRightWidth: 1, borderColor: Config_1.Config.ColorBf4 } },
                    React.createElement(react_native_1.View, { style: styles.view1 },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, "\u89C4\u683C")),
                    React.createElement(react_native_1.View, { style: styles.view1 },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, "\u4EA7\u5730")),
                    React.createElement(react_native_1.View, { style: styles.view1 },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, "\u5B58\u50A8\u65B9\u5F0F")),
                    React.createElement(react_native_1.View, { style: styles.view1 },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, "\u8425\u517B\u4EF7\u503C"))),
                React.createElement(react_native_1.View, { style: { flex: 1 } },
                    React.createElement(react_native_1.View, { style: [styles.view1, { paddingLeft: 25 }] },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, this.props.item.shortdesc)),
                    React.createElement(react_native_1.View, { style: [styles.view1, { paddingLeft: 25 }] },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, this.props.item.from)),
                    React.createElement(react_native_1.View, { style: [styles.view1, { paddingLeft: 25 }] },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, this.props.item.storetype)),
                    React.createElement(react_native_1.View, { style: [styles.view1, { paddingLeft: 25 }] },
                        React.createElement(react_native_1.Text, { style: styles.text1 }, this.props.item.funceffect)))),
            React.createElement(react_native_1.View, { style: { backgroundColor: '#F6F6F9', height: 10 } })));
    }
}
exports.default = detailSubInfo;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    view1: {
        height: 40,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: Config_1.Config.ColorBf4,
        paddingTop: 10
    },
    text1: {
        fontSize: Config_1.Config.Font09375,
    }
});
//# sourceMappingURL=detailSubInfo.js.map