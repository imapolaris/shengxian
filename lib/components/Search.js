"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const MyStatusBar_1 = require("./MyStatusBar");
// import {Util} from "../common/utils/util";
const pichead = { uri: "screen" };
const DataUtil_1 = require("./Category/interfaceUtil/DataUtil");
const RouterDefine_1 = require("../constants/RouterDefine");
const Config_1 = require("../config/Config");
const goback = require("../../images/goback.png");
const search_h = require("../../images/search_h.png");
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 30 },
    body: { flexDirection: "row", flex: 1 },
    // fonttxt: {color:'#000', fontSize:15 },
    fonticon: { color: Config_1.Config.ColorB999, fontSize: 20 },
});
//f4f4f4
exports.saddr = react_native_1.StyleSheet.create({
    bk: { backgroundColor: '#f3f3f3' },
    btndel: { backgroundColor: '#fff' },
    fonticon: { color: '#383838', fontSize: 15, height: 20, width: 20 },
    // fonttxt: {backgroundColor:'#f3f3f3',   borderRadius:5},
    fontbtn: { backgroundColor: 'transparent', margin: 5, height: 25, borderWidth: 1, paddingBottom: 10, borderRadius: 10, borderColor: '#b5b5b5' },
});
const screenWidth = react_native_1.Dimensions.get('window').width;
let lastsearchtext = '菜 肉 鱼 米 油';
exports.seachhot = [
    "菜", "肉", "鱼", "蛋", "米", "油", "豆制品", "干货", "水果"
];
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.Search.lastsearchtext,
            //shistory:[],
            shistory: this.props.Search.data,
        };
    }
    // componentDidMount(){
    // 	this.props.fetchSearch(this.props.Search.version);
    // 	console.log("----------componentDidMount111--Coupon-")
    // }
    setSearchName(name) {
        let value = (name.length > 0) ? this.state.shistory.find((SN) => { return SN == name; }) : undefined;
        lastsearchtext = name;
        let shistory = value ? [...this.state.shistory] : [...this.state.shistory, name];
        this.setState({
            title: name,
            shistory: shistory
        });
        this.props.fetchSearch(lastsearchtext, shistory);
        this.props.navigation.navigate(RouterDefine_1.NavScreenKey.SearchResult, { title: name });
    }
    clearHistory() {
        this.props.clearSearch();
        this.setState({
            shistory: [],
        });
    }
    render() {
        let rightDataSource = (this.state.title.length == 0) ? [] : DataUtil_1.searchItem(this.state.title);
        // let shistory = this.props.Search.data
        return (React.createElement(native_base_1.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(native_base_1.View, { style: { width: '100%', height: Config_1.Config.HeadHeight, backgroundColor: Config_1.Config.ColorW, flexDirection: 'row', marginRight: 30,
                    alignItems: 'center', justifyContent: 'center' } },
                React.createElement(native_base_1.Button, { transparent: true, onPress: () => { this.props.navigation.goBack(); } },
                    React.createElement(react_native_1.Image, { source: goback, style: { width: Config_1.px2dp(23), height: Config_1.px2dp(23), marginLeft: 16, marginTop: 13, marginRight: 5 } })),
                React.createElement(native_base_1.Button, { style: { flex: 1, height: Config_1.Config.SearchHeight, flexDirection: 'row', alignItems: 'center', width: '83%',
                        backgroundColor: Config_1.Config.ColorBf2, borderRadius: 15, marginRight: 10, marginTop: 15 } },
                    React.createElement(react_native_1.Image, { source: search_h, style: { height: 20, width: 20, alignItems: 'center', justifyContent: 'center', marginRight: -1, marginLeft: 10, marginTop: 2 }, resizeMode: 'contain' }),
                    React.createElement(native_base_1.Input, { selectTextOnFocus: true, style: { color: Config_1.Config.ColorB999, fontSize: Config_1.Config.Font0875, justifyContent: 'center', alignItems: 'center' }, placeholder: this.state.title, value: this.state.title, onChangeText: (text) => this.setState({ title: text }), onSubmitEditing: (text) => { this.setSearchName(this.state.title); } }))),
            React.createElement(native_base_1.View, { style: { flex: 1, backgroundColor: Config_1.Config.ColorW } },
                React.createElement(native_base_1.View, { style: { flexDirection: 'row', paddingLeft: 10, backgroundColor: Config_1.Config.ColorBf4, alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 30 } },
                    React.createElement(native_base_1.Text, { style: { flex: 1, color: Config_1.Config.ColorB333 } }, "\u5386\u53F2\u641C\u7D22"),
                    React.createElement(react_native_1.TouchableHighlight, { onPress: () => { this.clearHistory(); } },
                        React.createElement(native_base_1.Icon, { name: "trash", style: [exports.saddr.fonticon] }))),
                React.createElement(native_base_1.View, { style: { flexWrap: 'wrap', flexDirection: 'row', marginTop: 10 } }, this.state.shistory.map((name, key) => {
                    return React.createElement(native_base_1.Button, { transparent: true, style: exports.saddr.fontbtn, onPress: () => { this.setSearchName(name); }, key: key },
                        React.createElement(native_base_1.Text, { style: { color: '#8fb140', paddingTop: 5 } }, name));
                })),
                React.createElement(native_base_1.View, { style: { marginTop: 10, height: 30, backgroundColor: Config_1.Config.ColorBf4, justifyContent: 'center', paddingLeft: 10 } },
                    React.createElement(native_base_1.Text, { style: { color: Config_1.Config.ColorB333 } }, "\u70ED\u95E8\u641C\u7D22")),
                React.createElement(native_base_1.View, { style: { flexWrap: 'wrap', flexDirection: 'row', marginTop: 10 } }, exports.seachhot.map((name, key) => {
                    return React.createElement(native_base_1.Button, { transparent: true, style: exports.saddr.fontbtn, onPress: () => { this.setSearchName(name); }, key: key },
                        React.createElement(native_base_1.Text, { style: { color: '#8fb140', paddingTop: 5 } }, name));
                })))));
    }
}
exports.default = Search;
//# sourceMappingURL=Search.js.map