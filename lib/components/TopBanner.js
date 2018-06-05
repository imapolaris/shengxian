"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_swiper_1 = require("react-native-swiper");
// import {bannerModel} from "../../../store/EntitiesState";
const Config_1 = require("../config/Config");
const screenWidth = react_native_1.Dimensions.get('window').width;
const maxLength = 6;
class HomeBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1
        };
        this.formatterMaxString = this.formatterMaxString.bind(this);
    }
    /*设置字符串的最大长度，多余部分...显示*/
    formatterMaxString(string) {
        return string.length > maxLength ? string.substr(0, maxLength) + '...' : string;
    }
    render() {
        let ImagCnt = this.props.item.length == 0 ? 1 : this.props.item.length;
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_swiper_1.default, { width: screenWidth, height: this.props.imageHeight, autoplay: this.props.autoplay, showsButtons: false, showsHorizontalScrollIndicator: false, loop: true, renderPagination: (index, total, context) => (React.createElement(react_native_1.View, { style: styles.numberStyle },
                    React.createElement(react_native_1.Text, null,
                        index + 1,
                        "/",
                        total))), onIndexChanged: (index) => {
                    this.props.indexChange(index);
                } }, this.props.item.map((item, index) => {
                let url = Config_1.Config.DomainName + item.imgurl;
                return React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.props.indexClick(item.linkurl); }, key: index },
                    React.createElement(react_native_1.Image, { key: item.id, style: { height: this.props.imageHeight, resizeMode: 'cover' }, source: { uri: url } }));
            }))));
    }
}
exports.HomeBanner = HomeBanner;
class TopBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1
        };
    }
    render() {
        let ImagCnt = this.props.item.length == 0 ? 1 : this.props.item.length;
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_swiper_1.default, { width: screenWidth, height: this.props.imageHeight, autoplay: this.props.autoplay, showsButtons: false, showsHorizontalScrollIndicator: true, loop: true, showsPagination: false, onIndexChanged: (index) => {
                    this.props.indexChange(index);
                }, onMomentumScrollEnd: () => {
                    let selectIndex = this.state.currentIndex + 1;
                    selectIndex = selectIndex > ImagCnt ? 1 : selectIndex;
                    this.setState({
                        currentIndex: selectIndex
                    });
                } }, this.props.item.map((url, index) => {
                return React.createElement(react_native_1.TouchableOpacity, { onPress: () => { }, key: index },
                    React.createElement(react_native_1.Image, { key: index, style: { width: screenWidth, height: this.props.imageHeight, resizeMode: 'cover' }, source: { uri: Config_1.Config.DomainName + url } }));
            })),
            React.createElement(react_native_1.View, { style: styles.numberStyle },
                React.createElement(react_native_1.Text, null,
                    this.state.currentIndex,
                    "/",
                    ImagCnt))));
    }
}
exports.TopBanner = TopBanner;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    numberStyle: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 50,
        height: 20,
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    searchText: {
        fontSize: Config_1.Config.Font0875,
        color: Config_1.Config.ColorW,
    },
    searchStyle: {
        marginTop: 25,
        position: 'absolute',
        backgroundColor: 'rgba(243,243,243,0.5)',
        marginLeft: 200,
        marginRight: 10,
        height: Config_1.Config.SearchHeight,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth / 2,
        borderRadius: 15
    },
    viewStyle: {
        marginTop: 15,
        position: 'absolute',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(243,243,243,0.4)',
        borderRadius: 15,
        height: Config_1.Config.SearchHeight,
        paddingLeft: 10,
        width: screenWidth / 2 - 30,
    },
    textStyle: {
        fontSize: 15,
        marginLeft: 5,
    },
    swiperStyle: {
        width: screenWidth,
        height: 200
    }
});
//# sourceMappingURL=TopBanner.js.map