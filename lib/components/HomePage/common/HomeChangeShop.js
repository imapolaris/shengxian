"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Config_1 = require("../../../config/Config");
const funcs_1 = require("../../../common/utils/funcs");
const peisong = require("../../../../images/peisong.png");
const yunfei = require("../../../../images/yunfei.png");
const tuihuo = require("../../../../images/tuihuo.png");
class HomeChangeShop extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        // <View style={styles.container}>
        //     <Image source={home_shop_icon}/>
        //     <Text style={{marginLeft: 10}}>{this.props.shopName}</Text>
        //     <TouchableOpacity style={styles.changeStyle} onPress={()=>{
        //         this.props.changeClick();
        //     }}>
        //         <Text style={{color: 'green'}}>切换门店</Text>
        //     </TouchableOpacity>
        // </View>
        React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.View, { style: styles.vw1 },
                React.createElement(react_native_1.Image, { source: peisong, style: styles.icon1 }),
                React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorG3c } }, "30\u5206\u949F\u9001\u8FBE")),
            React.createElement(react_native_1.View, { style: styles.vw1 },
                React.createElement(react_native_1.Image, { source: yunfei, style: styles.icon1 }),
                React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorG3c } },
                    "\u6EE1",
                    funcs_1.formatMoneyEx(Config_1.Config.NOPEISONGRMBMIN),
                    "\u5143\u514D\u8FD0\u8D39")),
            React.createElement(react_native_1.View, { style: styles.vw1 },
                React.createElement(react_native_1.Image, { source: tuihuo, style: styles.icon1 }),
                React.createElement(react_native_1.Text, { style: { color: Config_1.Config.ColorG3c } }, "\u65E0\u7406\u7531\u9000\u8D27"))));
    }
}
exports.default = HomeChangeShop;
const styles = react_native_1.StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    changeStyle: {
        position: 'absolute',
        right: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    vw1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon1: {
        width: 20,
        height: 18,
        marginRight: 3,
        alignItems: 'center',
    }
});
//yarn add git+https://wallel@github.com/wallel/NativeBase.git
//# sourceMappingURL=HomeChangeShop.js.map