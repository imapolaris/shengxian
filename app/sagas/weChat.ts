import * as ActionTypes from "../constants/ActionTypes";
import {fork, put, select, take} from "redux-saga/effects";
import * as WeChat from "react-native-wechat";
import {Toast} from "native-base";
import Api, {HttpMethod} from "../http/api";
import {AuthResponse, PayPayload, PayResponse} from "react-native-wechat";
import {AsyncActionFlag, createAction} from "../common/utils/action";
import {Config, storage, MyToast} from "../config/Config";
import {Order} from "../store/EntitiesState";
import RootState from "../store/Store";
import {fetchOrder, ORDER_LIST_TYPE, ORDER_PAGE_COUNT} from "../actions/order";
import StoreConfig from "../store/ConfigureStore";
import {MYORDER} from "../constants/RouterDefine";
import {changeMyOrderTab} from "../actions/ui";

const ERR_OK = 0;
const ERR_PAY_CANCEL = -2;

/**
 * @function watchWeChatLogin 微信登录
 */
export function* watchWeChatLogin(){
    while(true) {
        const action = (yield take([ActionTypes.USER_LOGIN_WECHAT]));
        yield fork(doWechatLogin);
    }
}

function * doWechatLogin(){
    try{
        //0.判断有没有安装微信
        const installed = yield  WeChat.isWXAppInstalled();
        if(!installed){
            MyToast(3000, "您未安装微信客户端");
            return
        }
        //1.请求服务器state数据
        const state = yield Api.get("/user/get-weixin-state","");
        //2.请求sendRequest
        const resp:AuthResponse = yield WeChat.sendAuthRequest("snsapi_userinfo",state.data);
        console.log("微信登录失败:",resp);
        if(resp.state !== state.data){
            console.log("state被篡改??",state.data,"返回的:",resp.state)
            return
        }
        if(resp.errCode != ERR_OK){
            console.log("用户授权失败!!,错误码",resp.errCode);
            return
        }
        //3.通知服务器code
        const result = yield Api.post("/user/weixin-signup",{code:resp.code,state:state.data,appid:Config.WECHAT_APP_ID});
        //登录成功
        yield put({type:ActionTypes.FINISH_USER_LOGIN,error:false,payload:result,flag:AsyncActionFlag.FLAG_SUCCESS});
    }catch (error){
        console.log("微信登录错误",error);
        Toast.show({
            text: `微信登录失败${error.toString()}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        })
    }
}
/**
 * @function watchWeChatPay 货到付款
 */
export function* watchDaofuPay(){
    while(true) {
        const action = (yield take([ActionTypes.USER_PAY_DAOFU]));
        yield fork(doDaofu,action.payload);
    }
}

function * doDaofu(order:Order){
    try{
        //1.请求服务器state数据
        //获取用户token
        let token:string = yield select((state:RootState)=>state.currentUser.token);
        let config={};
        if(token){
            config = {"headers":{"Authorization":`Bearer ${token}`}}
        }
        const payload = yield Api.request(HttpMethod.GET,
            `/pay?pay_type=daofu&order_number=${order.order_number}`,undefined,undefined,config);
        yield put(fetchOrder(ORDER_LIST_TYPE.UNFINISHED,1,ORDER_PAGE_COUNT,true));
        yield put(changeMyOrderTab(ORDER_LIST_TYPE.UNFINISHED));
        StoreConfig.history.replace(MYORDER);
    }catch (error){
        console.log("支付错误",error);
        Toast.show({
            text: `支付出错${error.toString()}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        })
    }
}

/**
 * @function watchWeChatPay 微信支付
 */
export function* watchWeChatPay(){
    while(true) {
        const action = (yield take([ActionTypes.USER_PAY_WECHAT]));
        yield fork(doWechatPay,action.payload);
    }
}

function * doWechatPay(order:Order){
    try{
        //1.请求服务器state数据
        //获取用户token
        let token:string = yield select((state:RootState)=>state.currentUser.token);
        let config={};
        if(token){
            config = {"headers":{"Authorization":`Bearer ${token}`}}
        }
        const payload = yield Api.request(HttpMethod.GET,
            `/pay?pay_type=weixinpay&order_number=${order.order_number}`,undefined,undefined,config);
        //2.打开支付页面
        const resp= yield WeChat.pay(payload.data as PayPayload);
        if(resp.errCode == ERR_PAY_CANCEL){
            console.log(`微信支付,order:${order.order_number},用户取消付款`);
            return;
        }
        if(resp.errCode == ERR_OK){
            //付款成功
            //刷新订单
            yield put(fetchOrder(ORDER_LIST_TYPE.UNFINISHED,1,ORDER_PAGE_COUNT,true));
            yield put(changeMyOrderTab(ORDER_LIST_TYPE.UNFINISHED));
            StoreConfig.history.replace(MYORDER);
            console.log(`微信支付,支付成功`);
            return;
        }
        console.log(`微信支付,order:${order.order_number},用户付款出错,${resp.errCode}:${resp.errStr}`);
        Toast.show({
            text: `微信支付错误${resp.errStr}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        })
    }catch (error){
        console.log("微信支付错误",error);
        Toast.show({
             text: `微信支付出错${error.toString()}!`,
             buttonText: "确定",
             position: "bottom",
             type: "success",
             duration: 3000
        })
    }
}