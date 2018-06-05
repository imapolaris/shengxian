"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const Config_1 = require("../../../config/Config");
const screenWidth = react_native_1.Dimensions.get('window').width;
class CategoryLeftItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log("-------------------" , this.props.item.is_Select)
        return (React.createElement(native_base_1.View, { style: [styles.container, { backgroundColor: this.props.item.is_Select === 1 ? 'white' : '#f7f7f7' }] },
            React.createElement(react_native_1.TouchableOpacity, { onPress: () => {
                    this.props.itemClick(this.props.index);
                }, style: styles.buttonStyle },
                this.props.item.is_Select === 1 ? React.createElement(native_base_1.View, { style: {
                        height: 30,
                        width: 2,
                        backgroundColor: Config_1.Config.ColorBf4,
                        marginTop: 5
                    } }) : null,
                React.createElement(native_base_1.Text, { style: (this.props.item.is_Select === 1) ? styles.selectText : styles.defText }, this.props.item.title))));
    }
}
exports.default = CategoryLeftItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        height: Config_1.Config.CategoryLeftHeight,
        justifyContent: 'center',
    },
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth / 4,
        height: 40,
    },
    defText: {
        marginLeft: 5, textAlign: 'center', fontSize: Config_1.Config.Font09375, color: '#666666',
    },
    selectText: {
        marginLeft: 5, textAlign: 'center', fontSize: Config_1.Config.Font10625, color: Config_1.Config.ColorG2e,
    }
});
//# sourceMappingURL=CategoryLeftItem.js.map