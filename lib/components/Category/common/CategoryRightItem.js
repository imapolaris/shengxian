"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const funcs_1 = require("../../../common/utils/funcs");
const Config_1 = require("../../../config/Config");
const screenWidth = react_native_1.Dimensions.get('window').width;
const imageWidth = Config_1.px2dp(100); //100
const imageHeight = Config_1.px2dp(105); //105叮咚，110百果园
class CategoryRightItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectCount: this.props.item.buycnt,
        };
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.getLeftCnt = this.getLeftCnt.bind(this);
    }
    getLeftCnt() {
        if (!this.props.dynamic)
            return 0;
        return this.props.dynamic.leftcnt;
    }
    /*减*/
    remove() {
        if (this.state.selectCount === 0) {
        }
        else {
            this.setState({
                selectCount: this.state.selectCount - 1
            });
        }
    }
    /*加*/
    add(e) {
        this.props.addItemClick(e);
    }
    render() {
        let { item } = this.props;
        let leftcnt = funcs_1.formatLeftCnt(this.getLeftCnt());
        const addItem = React.createElement(react_native_1.TouchableOpacity, { style: styles.addStyle, onPress: (e) => {
                this.add(e);
            } },
            React.createElement(native_base_1.Icon, { style: Config_1.Config.styles.addCircle, name: "md-add-circle" }));
        // let tmimageHeight = imageHeight
        // let addtitle = ""
        // // if (!this.props.isHome)
        // {
        // 	tmimageHeight = 105//	imageHeight+  (this.props.item.id % 5) * 10
        // 	addtitle = tmimageHeight.toString()
        // }
        let price = this.props.dynamic ? this.props.dynamic.price : 10000;
        let marketprice = this.props.dynamic ? this.props.dynamic.marketprice : 10000;
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.TouchableOpacity, { style: styles.subViewStyle, onPress: () => { this.props.itemClick(); } },
                React.createElement(react_native_1.Image, { resizeMode: 'contain', style: this.props.isHome ? styles.imageStyleHome : styles.imageStyle, source: { uri: Config_1.Config.DomainName + '/' + this.props.item.thumbnailsurl } }),
                React.createElement(react_native_1.View, { style: { height: Config_1.Config.CategoryRightHeight } },
                    React.createElement(react_native_1.View, { style: [{ flex: 3 }, { width: this.props.isHome ? screenWidth - imageWidth : screenWidth / 4 * 3 - imageWidth }] },
                        React.createElement(react_native_1.Text, { style: styles.titleStyle }, this.props.item.title),
                        React.createElement(react_native_1.Text, { style: styles.desStyle }, this.props.item.funceffect)),
                    leftcnt ? (React.createElement(react_native_1.Text, { style: {
                            marginLeft: 10, fontSize: Config_1.Config.Font0875,
                            color: Config_1.Config.ColorOf8
                        } }, leftcnt)) : null,
                    (item.allow_place_type && item.allow_place_type > 0) ? React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font0875, marginLeft: 10,
                            color: Config_1.Config.ColorBb2 } },
                        "\u9650\u8D2D",
                        item.allow_place_type,
                        "\u4EF6") : null,
                    React.createElement(react_native_1.View, { style: [{ flex: 2, flexDirection: 'row', marginLeft: 7, marginTop: 5 },
                            { width: this.props.isHome ? screenWidth - imageWidth : screenWidth / 4 * 3 - imageWidth }] },
                        React.createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                            React.createElement(react_native_1.Text, { style: { fontWeight: 'bold', fontSize: Config_1.Config.Font09375, color: Config_1.Config.ColorOf8 } }, "\uFFE5"),
                            React.createElement(react_native_1.Text, { style: styles.priceStyle }, funcs_1.formatMoney(price))),
                        React.createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                            React.createElement(react_native_1.Text, { style: { fontSize: Config_1.Config.Font0875, marginTop: 8, marginLeft: 3, marginRight: 3, height: 20, color: Config_1.Config.ColorBb2 } },
                                React.createElement(react_native_1.Text, { style: { textDecorationLine: 'line-through', color: Config_1.Config.ColorBb2 } },
                                    "\uFFE5",
                                    funcs_1.formatMoney(marketprice)),
                                " "))))),
            React.createElement(react_native_1.View, { style: styles.lineStyle }),
            this.getLeftCnt() > 0 ? addItem : null));
    }
}
exports.default = CategoryRightItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    subViewStyle: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    imageStyle: {
        width: imageWidth,
        height: imageHeight
    },
    imageStyleHome: {
        width: imageWidth,
        height: imageHeight
    },
    titleStyle: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: Config_1.Config.Font09375,
        color: Config_1.Config.ColorB333 //dingdong
    },
    desStyle: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: Config_1.Config.Font075,
        color: Config_1.Config.ColorB999
    },
    priceStyle: {
        color: Config_1.Config.ColorOf8,
        fontSize: Config_1.Config.Font10625,
    },
    utilStyle: {
        marginTop: 7,
        marginLeft: 5,
        color: '#666',
        fontSize: 12
    },
    addStyle: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        height: 30,
        width: 30,
        paddingVertical: 5
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#d9d9d9',
    }
});
/*
 * {
 //<Text style={styles.utilStyle}>{this.props.item.shortdesc}</Text>
 }*/ 
//# sourceMappingURL=CategoryRightItem.js.map