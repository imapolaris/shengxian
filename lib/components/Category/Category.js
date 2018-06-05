"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const DataUtil_1 = require("./interfaceUtil/DataUtil");
const RouterDefine_1 = require("../../constants/RouterDefine");
const CategoryLeftItem_1 = require("./common/CategoryLeftItem");
const CategoryRightItem_1 = require("./common/CategoryRightItem");
const Line_1 = require("../Line");
const Config_1 = require("../../config/Config");
const funcs_1 = require("../../common/utils/funcs");
const search_h = require("../../../images/search_h.png");
const iOSScreenAuto_1 = require("../../constants/iOSScreenAuto");
const screenWidth = react_native_1.Dimensions.get('window').width;
const screenHeight = react_native_1.Dimensions.get('window').height;
let currentRow = 0;
const SCREEN_HEIGHT = react_native_1.Dimensions.get('window').height;
const SCREEN_WIDTH = react_native_1.Dimensions.get('window').width;
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.startAnimation = (top, left) => {
            this.state.top.setValue(top);
            this.state.left.setValue(left);
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(this.state.top, {
                    toValue: SCREEN_HEIGHT,
                    easing: react_native_1.Easing.linear,
                    duration: 1000,
                }),
                react_native_1.Animated.timing(this.state.left, {
                    toValue: SCREEN_WIDTH * 3 / 4 - 50,
                    easing: react_native_1.Easing.bezier(0, .16, 0, .85),
                    duration: 1000,
                })
            ]).start(() => {
                console.log('kaishi');
            });
        };
        this.state = {
            selectIndex: 0,
            leftDataSource: [],
            // leftDataSource: props.Category.data,
            // selectCateID: getFirstCategoryID(),
            rightDataSource: [],
            offset: 0,
            // lastItem:null
            top: new react_native_1.Animated.Value(0),
            left: new react_native_1.Animated.Value(0),
            uri: ''
        };
        this.addItem = this.addItem.bind(this);
        this.getItemDynamic = this.getItemDynamic.bind(this);
    }
    addItem(item, e) {
        let { id } = item;
        if (!funcs_1.canAddToCart(item, this.getItemDynamic(item.id), this.props.carts))
            return;
        let cart = this.props.carts.find((val) => val.id === id);
        if (!!e) {
            const target = e.currentTarget;
            react_native_1.UIManager.measure(target, (x, y, width, height, winx, winy) => {
                console.log(target + ' : ' + x + ' : ' + y + ' : ' + ' : ' + width + ' : ' + height + ' : ' + winx + ' : ' + winy);
                this.setState({
                    uri: (Config_1.Config.DomainName + '/' + (item && item.thumbnailsurl || ""))
                });
                this.startAnimation(winy, winx);
            });
        }
        if (!cart) {
            this.props.addCartItem({ id, count: 1 });
        }
        else {
            this.props.editCartItem({ id, count: cart.count + 1 });
        }
    }
    getItemDynamic(id) {
        return this.props.ItemDynamic.data.find((item) => item.id == id);
    }
    componentWillMount() {
    }
    componentDidMount() {
        // this.setState({
        //     leftDataSource: leftItemDataModel(0),		//从本地获取数据
        //     rightDataSource: getAllItemWithCategoryID(getFirstCategoryID()),
        // })
        const { fetchItemDynamic } = this.props;
        react_native_1.DeviceEventEmitter.addListener('CategoryReload', () => {
            console.log('DeviceEventEmitter');
            fetchItemDynamic(this.props.ItemDynamic.version);
        });
        // this.props.fetchCategory(this.props.Category.version);
        this.props.fetchItemDynamic(this.props.ItemDynamic.version);
        react_native_1.AsyncStorage.multiGet(['selectIndex', 'offset'], (errors, result) => {
            console.log('abcsdsdsd');
            if (errors)
                return;
            const selectIndex = result[0][1];
            const offset = result[1][1];
            // console.log('result + ' + result )
            console.log('selectIndex + ' + selectIndex + ',' + 'offset + ' + offset);
            if (selectIndex == null && offset == null) {
                console.log('diyici');
                this.setState({
                    leftDataSource: DataUtil_1.leftItemDataModel(0),
                    rightDataSource: DataUtil_1.getAllItemWithCategoryID(DataUtil_1.getFirstCategoryID()),
                });
            }
            else {
                console.log('disericicic');
                this.setState({
                    leftDataSource: DataUtil_1.leftItemDataModel(selectIndex ? parseInt(selectIndex) : 0),
                    selectIndex: parseInt(selectIndex),
                    rightDataSource: DataUtil_1.getAllItemWithCategoryID(DataUtil_1.getCategoryID(parseInt(selectIndex)))
                });
                setTimeout(() => {
                    this.refs.flatList.scrollToOffset({ offset: parseInt(offset), animated: false });
                }, 50);
            }
        });
    }
    componentWillUnmount() {
        const index = this.state.selectIndex;
        const offset = this.state.offset;
        react_native_1.AsyncStorage.multiSet([['selectIndex', String(index)], ['offset', String(offset)]], error => {
            console.log('error' + JSON.stringify(error));
        });
        react_native_1.DeviceEventEmitter.removeListener('CategoryReload', () => {
            console.log('removeListener');
        });
    }
    componentWillReceiveProps(props) {
        // this.setState({
        // 	leftDataSource: props.Category.data,
        // })
        // this.props.ItemDynamic.data.map((ItemD, index)=>{
        // 	console.log("-------index-------"+ ItemD.id, ", ===="+ ItemD.price)
        // 	console.log('-------index-------${ItemD.id}, ====${ItemD.price}')
        // })
    }
    render() {
        return (React.createElement(native_base_1.Container, { style: styles.container },
            React.createElement(react_native_1.StatusBar, { backgroundColor: 'transparent', translucent: true, barStyle: 'dark-content' }),
            React.createElement(react_native_1.TouchableOpacity, { style: { height: 44, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: react_native_1.Platform.OS == 'ios' ? iOSScreenAuto_1.StatusBar_Height : 15 }, onPress: () => { this.props.navigation.navigate(RouterDefine_1.NavScreenKey.Search, { from: RouterDefine_1.MAIN_CATEGORY }); } },
                React.createElement(native_base_1.View, { style: styles.searchStyle },
                    React.createElement(react_native_1.Image, { source: search_h, style: { alignItems: 'flex-start', height: 20, width: 20, marginRight: -1, marginLeft: 10 }, resizeMode: 'contain' }),
                    React.createElement(native_base_1.Text, { style: { fontSize: Config_1.Config.Font0875, color: Config_1.Config.ColorB999 } }, "\u8BF7\u8F93\u5165\u5546\u54C1\u540D\u79F0"))),
            React.createElement(Line_1.default, { color: '#f3f3f3' }),
            React.createElement(native_base_1.View, { style: { flexDirection: 'row' } },
                React.createElement(react_native_1.FlatList, { style: styles.leftListStyle, keyExtractor: (item, index) => index.toString(), data: this.state.leftDataSource, renderItem: ({ item, index }) => {
                        return (React.createElement(CategoryLeftItem_1.default, { key: index, index: index, item: item, itemClick: (selectIndex) => {
                                // item
                                // 将当前的item 的 is_Select 设置为 1 ，其他的设置为 0
                                this.setState({
                                    leftDataSource: this.state.leftDataSource.map((item, i) => {
                                        return Object.assign({}, item, { is_Select: i == selectIndex ? 1 : 0 });
                                    }),
                                    selectIndex: selectIndex,
                                    rightDataSource: item.list
                                });
                                this.refs.flatList.scrollToOffset({ offset: 0, animated: false });
                            } }));
                    } }),
                React.createElement(react_native_1.FlatList, { ref: "flatList", style: { backgroundColor: 'white', width: screenWidth / 4 * 3, marginBottom: 60 }, scrollEventThrottle: 200, onScroll: (event) => {
                        this.setState({
                            offset: event.nativeEvent.contentOffset.y
                        });
                    }, data: this.state.rightDataSource, keyExtractor: (item, index) => index.toString(), renderItem: ({ item, index }) => {
                        return React.createElement(CategoryRightItem_1.default, { key: item.id, item: item, dynamic: this.getItemDynamic(item.id), addItemClick: (e) => { this.addItem(item, e); }, itemClick: () => {
                                console.log('selectIndex+' + this.state.selectIndex);
                                let section = { id: 1, title: '上海真好吃餐厅', select: true };
                                this.props.navigation.navigate(RouterDefine_1.NavScreenKey.CategoryDetail, {
                                    section: section,
                                    item: item,
                                    dynamic: this.getItemDynamic(item.id),
                                    selectIndex: this.state.selectIndex,
                                    selectProductIndex: index
                                });
                            }, isHome: false });
                    } })),
            this.state.uri ?
                React.createElement(react_native_1.Animated.Image, { source: { uri: this.state.uri }, style: { width: 24, height: 24, borderRadius: 12, position: 'absolute', top: this.state.top, left: this.state.left } })
                : null));
    }
}
exports.default = Category;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    leftListStyle: {
        width: screenWidth / 4,
        backgroundColor: '#f3f3f3',
        height: screenHeight - Config_1.Config.HeadHeight - 49 - 16
    },
    rightListStyle: {
        position: 'absolute',
        width: screenWidth / 4 * 3,
        backgroundColor: '#50be07',
        top: 20,
        bottom: 60,
        left: screenWidth / 4
    },
    searchStyle: {
        backgroundColor: Config_1.Config.ColorBf2,
        marginLeft: 10,
        marginRight: 10,
        height: Config_1.Config.SearchHeight,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth - 20,
        borderRadius: 15,
    },
});
//# sourceMappingURL=Category.js.map