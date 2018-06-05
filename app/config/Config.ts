import * as _ from "lodash"
import FSStorage,{DocumentDir} from "redux-persist-fs-storage"
import {resolvePath} from "../common/utils/funcs";
import {StyleSheet, Keyboard, Dimensions, Platform} from 'react-native';
//import {Toast} from 'native-base';
import Toast from 'react-native-root-toast';
import * as moment from "moment";
import {PinLocation} from "../store/CurrentUserState";
/**
 * @class Config 配置
 */
const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;
const basePx = 375;

export function px2dp(px:number) {
	//return px;
	return px * deviceW / basePx
};

export class Config{
	static SHOP_LOCATION:{lat:number,lng:number}={lat:31.240528,lng:121.3873663};
	static MAX_PEISONG_DISTANCE = 3;
    /**
     * @field HTTP_BASE_URL http请求地址
     */

	//static HTTP_BASE_URL = "http://13.229.132.26:1111/api";
	static HTTP_BASE_URL_NEI = "http://172.19.64.62:1111/api";
	static HTTP_BASE_URL_WAY = "http://sx.zhangqing.site/api";
	static bNeiWang	= false;

    /**
     * @field HTTP_DEFAULT_TIMEOUT HTTP请求超时时间
     * @type {number}
     */
    static HTTP_DEFAULT_TIMEOUT = 5000;

    /**
     * @field HTTP_DATA_REFRESH_INTERVAL 数据刷新时间间隔,默认30秒
     */
    static HTTP_DATA_REFRESH_INTERVAL = 2000;
    static HTTP_AMAP_WEB_KEY = "6e75cb5ca0ec34a686baa2737a2f1580";
    static HTTP_RE_GEO_URL = _.template("http://restapi.amap.com/v3/geocode/regeo?location=${location}&key=${key}&output=json&batch=${batch}");
    static CACHE_FOLDER_NAME="shengxian_cache"
	static CACHE_PREFIX     ="cache_"
	


	static DomainName				= "http://shengxian.qiniu.zhangqing.site";		//url域名

	static PEISONGRMB           	= 200;		//配送费
	static NOPEISONGRMBMIN      	= 1500;		//满5元包邮
	static IconSize1		      	= px2dp(20);		//图标字体大小
	static IconSize2		      	= px2dp(25);		//图标字体大小
	static IconSize3		      	= px2dp(12);		//图标字体大小
	static MaxAddrNum		      	= 5;		//最多5个地址


	//以下是字体相关
	static HeadHeight		   		= px2dp(50)			;		//标题高度
	static FootHeight		   		= px2dp(50)			;		//下面一排高度
	static BtnComHeight		   		= px2dp(40)			;		//常用按钮高度
	static CategoryLeftHeight		= px2dp(55)			;		//分类左边高度
	static CategoryLeftWidth		= px2dp(85)			;		//分类左边宽度
	static CategoryRightHeight		= px2dp(105)		;		//分类右边高度
	static SearchHeight				= px2dp(30)			;		//搜索栏高度
	static CarItemHeight			= px2dp(80)			;		//购物车物品高度
	static ShowOrderImageCnt		= 4					;		//如果订单图片很多最多显示个数
	

	static FontBase		   		   	= px2dp(16)			;		//基准值
	static Font1125			   		= Config.FontBase * 1.125		;
	static Font10625				= Config.FontBase * 1.0625		;	
	static Font09375		   		= Config.FontBase * 0.9375		;		
	static Font0875		   		   	= Config.FontBase * 0.875		;		
	static Font08125		   		= Config.FontBase * 0.8125		;		
	static Font075		   		   	= Config.FontBase * 0.75		;		
	static Font06875		   		= Config.FontBase * 0.6875		;	

	static FontIcon28		   		= px2dp(28)	;		
	static FontIcon24		   		= px2dp(24)	;		
	static FontIcon22		   		= px2dp(22)	;		
	static FontIcon20		   		= px2dp(20)	;
	static IconMain			   		= px2dp(24)	;		

	static FontHead			   		= Config.Font1125	;		//每个页面标题
	static FontHeadSub		   		= Config.FontBase	;		//每个页面副标题级别(如订单列表 完成/未完成)
	static Font2Menu		   		= Config.Font09375	;		//每个页面二级菜单
	static Font3Menu			   	= Config.Font0875	;		//每个页面三级菜单(二级展开后)
	static Font4Menu			   	= Config.Font08125	;		//每个页面四级菜单(三级展开后)

	static ColorW				   	= "#ffffff"		;			//白色
	static ColorB333			   	= "#333333"		;			//深黑
	static ColorB666			   	= "#666666"		;			//黑
	static ColorB999			   	= "#999999"		;			//灰
	static ColorBc7			   		= "#c7c7c7"		;			//浅灰
	static ColorBb2			   		= "#b2b2b2"		;			//浅灰
	static ColorBf6			   		= "#f6f6f6"		;			//浅灰
	static ColorBf4			   		= "#f4f4f4"		;			//浅灰
	static ColorBf2			   		= "#f2f2f2"		;			//浅灰
	static ColorOf8			   		= "#f85825"		;			//橙色 文字
	static ColorOff			   		= "#ff6e40"		;			//橙色 按钮/背景
	static ColorG2e			   		= "#2eb257"		;			//绿色 文字
	static ColorG3c			   		= "#3cb963"		;			//绿色 按钮/背景

	
    static WECHAT_APP_ID            = "wx271c9733cd23b0bb";
	static PAY_COUNT_DOWN			= 1800;

	static  GetPayLeftTime(createtime:string) {
		// return 60000;
		// return moment(createtime).add(Config.PAY_COUNT_DOWN,"m").diff(moment())
		// var a = moment('2018 16:11:36');
		// var b = moment('2018 16:11:37');
		// let tttt = a.diff(b) // 86400000
		// let tttt22 = b.diff(a) // 86400000
		let leftTime = moment(createtime).add(Config.PAY_COUNT_DOWN,'s').diff(moment()) 
		// let leftTime = moment(createtime).add(Config.PAY_COUNT_DOWN,'s').diff(createtime) 
		leftTime = leftTime < 0 ? 0 : leftTime
		return leftTime
	};


	static styles = StyleSheet.create({
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
		Heard: {color: Config.ColorB333,  fontSize: Config.Font1125, height: px2dp(30)},
		// addCircle: {color: Config.ColorG3c, fontSize: 26, marginTop: 10, marginLeft: 20}
		addCircle: {color: Config.ColorG3c, fontSize: Config.FontIcon28}
	});
}

export function hideKeyboard() {
	Keyboard.dismiss();
}

export function MyToast(duration: number, desc: string){
	
	let toast = Toast.show(desc, {
		duration: Toast.durations.LONG,
		position: Toast.positions.CENTER,
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
		Toast.hide(toast);
	}, duration);  

}

// 本地缓存目录
export const storage = FSStorage(DocumentDir,Config.CACHE_FOLDER_NAME);
export const baseCacheFolder =resolvePath(DocumentDir,Config.CACHE_FOLDER_NAME);
export const basePersistConfig={
    keyPrefix:Config.CACHE_PREFIX,
    storage
};

export class MainHelper {
    static selectedTab = "home"
};

export const IS_IPHONE_X = ()=>{

    return Platform.OS === 'ios'  &&
        (deviceW === 812 || deviceH === 812)

}