"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const redux_persist_fs_storage_1 = require("redux-persist-fs-storage");
const funcs_1 = require("../common/utils/funcs");
const react_native_1 = require("react-native");
//import {Toast} from 'native-base';
const react_native_root_toast_1 = require("react-native-root-toast");
const moment = require("moment");
/**
 * @class Config 配置
 */
const deviceH = react_native_1.Dimensions.get('window').height;
const deviceW = react_native_1.Dimensions.get('window').width;
const basePx = 375;
function px2dp(px) {
    //return px;
    return px * deviceW / basePx;
}
exports.px2dp = px2dp;
;
class Config {
    static GetPayLeftTime(createtime) {
        // return 60000;
        // return moment(createtime).add(Config.PAY_COUNT_DOWN,"m").diff(moment())
        // var a = moment('2018 16:11:36');
        // var b = moment('2018 16:11:37');
        // let tttt = a.diff(b) // 86400000
        // let tttt22 = b.diff(a) // 86400000
        let leftTime = moment(createtime).add(Config.PAY_COUNT_DOWN, 's').diff(moment());
        // let leftTime = moment(createtime).add(Config.PAY_COUNT_DOWN,'s').diff(createtime) 
        leftTime = leftTime < 0 ? 0 : leftTime;
        return leftTime;
    }
    ;
}
Config.SHOP_LOCATION = { lat: 31.240528, lng: 121.3873663 };
Config.MAX_PEISONG_DISTANCE = 3;
/**
 * @field HTTP_BASE_URL http请求地址
 */
//static HTTP_BASE_URL = "http://13.229.132.26:1111/api";
Config.HTTP_BASE_URL_NEI = "http://172.19.64.62:1111/api";
Config.HTTP_BASE_URL_WAY = "http://sx.zhangqing.site/api";
Config.bNeiWang = false;
/**
 * @field HTTP_DEFAULT_TIMEOUT HTTP请求超时时间
 * @type {number}
 */
Config.HTTP_DEFAULT_TIMEOUT = 5000;
/**
 * @field HTTP_DATA_REFRESH_INTERVAL 数据刷新时间间隔,默认30秒
 */
Config.HTTP_DATA_REFRESH_INTERVAL = 2000;
Config.HTTP_AMAP_WEB_KEY = "6e75cb5ca0ec34a686baa2737a2f1580";
Config.HTTP_RE_GEO_URL = _.template("http://restapi.amap.com/v3/geocode/regeo?location=${location}&key=${key}&output=json&batch=${batch}");
Config.CACHE_FOLDER_NAME = "shengxian_cache";
Config.CACHE_PREFIX = "cache_";
Config.DomainName = "http://shengxian.qiniu.zhangqing.site"; //url域名
Config.PEISONGRMB = 200; //配送费
Config.NOPEISONGRMBMIN = 1500; //满5元包邮
Config.IconSize1 = px2dp(20); //图标字体大小
Config.IconSize2 = px2dp(25); //图标字体大小
Config.IconSize3 = px2dp(12); //图标字体大小
Config.MaxAddrNum = 5; //最多5个地址
//以下是字体相关
Config.HeadHeight = px2dp(50); //标题高度
Config.FootHeight = px2dp(50); //下面一排高度
Config.BtnComHeight = px2dp(40); //常用按钮高度
Config.CategoryLeftHeight = px2dp(55); //分类左边高度
Config.CategoryLeftWidth = px2dp(85); //分类左边宽度
Config.CategoryRightHeight = px2dp(105); //分类右边高度
Config.SearchHeight = px2dp(30); //搜索栏高度
Config.CarItemHeight = px2dp(80); //购物车物品高度
Config.ShowOrderImageCnt = 4; //如果订单图片很多最多显示个数
Config.FontBase = px2dp(16); //基准值
Config.Font1125 = Config.FontBase * 1.125;
Config.Font10625 = Config.FontBase * 1.0625;
Config.Font09375 = Config.FontBase * 0.9375;
Config.Font0875 = Config.FontBase * 0.875;
Config.Font08125 = Config.FontBase * 0.8125;
Config.Font075 = Config.FontBase * 0.75;
Config.Font06875 = Config.FontBase * 0.6875;
Config.FontIcon28 = px2dp(28);
Config.FontIcon24 = px2dp(24);
Config.FontIcon22 = px2dp(22);
Config.FontIcon20 = px2dp(20);
Config.IconMain = px2dp(24);
Config.FontHead = Config.Font1125; //每个页面标题
Config.FontHeadSub = Config.FontBase; //每个页面副标题级别(如订单列表 完成/未完成)
Config.Font2Menu = Config.Font09375; //每个页面二级菜单
Config.Font3Menu = Config.Font0875; //每个页面三级菜单(二级展开后)
Config.Font4Menu = Config.Font08125; //每个页面四级菜单(三级展开后)
Config.ColorW = "#ffffff"; //白色
Config.ColorB333 = "#333333"; //深黑
Config.ColorB666 = "#666666"; //黑
Config.ColorB999 = "#999999"; //灰
Config.ColorBc7 = "#c7c7c7"; //浅灰
Config.ColorBb2 = "#b2b2b2"; //浅灰
Config.ColorBf6 = "#f6f6f6"; //浅灰
Config.ColorBf4 = "#f4f4f4"; //浅灰
Config.ColorBf2 = "#f2f2f2"; //浅灰
Config.ColorOf8 = "#f85825"; //橙色 文字
Config.ColorOff = "#ff6e40"; //橙色 按钮/背景
Config.ColorG2e = "#2eb257"; //绿色 文字
Config.ColorG3c = "#3cb963"; //绿色 按钮/背景
Config.WECHAT_APP_ID = "wx271c9733cd23b0bb";
Config.PAY_COUNT_DOWN = 1800;
Config.styles = react_native_1.StyleSheet.create({
    MidIcon: {
        fontSize: Config.FontIcon20,
        color: Config.ColorB999
    },
    ComIcon: {
        fontSize: Config.FontIcon28,
        color: Config.ColorB999,
        width: px2dp(26),
        height: px2dp(26),
    },
    ForwardIcon: {
        fontSize: Config.FontIcon20,
        color: Config.ColorBc7,
        marginRight: 10
    },
    Heard: { color: Config.ColorB333, fontSize: Config.Font1125, height: px2dp(30) },
    // addCircle: {color: Config.ColorG3c, fontSize: 26, marginTop: 10, marginLeft: 20}
    addCircle: { color: Config.ColorG3c, fontSize: Config.FontIcon28 }
});
exports.Config = Config;
function hideKeyboard() {
    react_native_1.Keyboard.dismiss();
}
exports.hideKeyboard = hideKeyboard;
function MyToast(duration, desc) {
    let toast = react_native_root_toast_1.default.show(desc, {
        duration: react_native_root_toast_1.default.durations.LONG,
        position: react_native_root_toast_1.default.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });
    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
        react_native_root_toast_1.default.hide(toast);
    }, duration);
}
exports.MyToast = MyToast;
// 本地缓存目录
exports.storage = redux_persist_fs_storage_1.default(redux_persist_fs_storage_1.DocumentDir, Config.CACHE_FOLDER_NAME);
exports.baseCacheFolder = funcs_1.resolvePath(redux_persist_fs_storage_1.DocumentDir, Config.CACHE_FOLDER_NAME);
exports.basePersistConfig = {
    keyPrefix: Config.CACHE_PREFIX,
    storage: exports.storage
};
class MainHelper {
}
MainHelper.selectedTab = "home";
exports.MainHelper = MainHelper;
;
exports.IS_IPHONE_X = () => {
    return react_native_1.Platform.OS === 'ios' &&
        (deviceW === 812 || deviceH === 812);
};
//# sourceMappingURL=Config.js.map