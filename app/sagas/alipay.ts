import {fork, put, select, take} from "redux-saga/effects";
import * as ActionTypes from "../constants/ActionTypes";
import {pay} from "react-native-alipay"
import {Action} from "../common/utils/action";
import RootState from "../store/Store";
import Api, {HttpMethod} from "../http/api";
import {Order} from "../store/EntitiesState";
import {MYORDER} from "../constants/RouterDefine";
import {Toast} from "native-base"
import {fetchOrder, ORDER_LIST_TYPE, ORDER_PAGE_COUNT} from "../actions/order";
import {changeMyOrderTab} from "../actions/ui";
import StoreConfig from "../store/ConfigureStore";

/**
 * @function watchAliPay 支付宝支付
 */
export function* watchAliPay(){
    while(true) {
        const action = <Action<any>>(yield take([ActionTypes.USER_PAY_ALI]));
        yield fork(doAliPay,action.payload);
    }
}

function * doAliPay(order:Order){
    try{
        //1.请求服务器state数据
        //获取用户token
        let token:string = yield select((state:RootState)=>state.currentUser.token);
        let config={};
        if(token){
            config = {"headers":{"Authorization":`Bearer ${token}`}}
        }
        const payload = yield Api.request(HttpMethod.GET,
            `/pay?pay_type=alipay&order_number=${order.order_number}`,undefined,undefined,config);
        //2.打开支付页面
        const resp= yield pay(payload.data,true);
        if(resp.resultStatus === "6001"){
            console.log(`支付宝支付,order:${order.order_number},用户取消付款`);
            return;
        }
        if(resp.resultStatus === "9000"){
            //付款成功
            //刷新订单
            yield put(fetchOrder(ORDER_LIST_TYPE.UNFINISHED,1,ORDER_PAGE_COUNT,true));
            yield put(changeMyOrderTab(ORDER_LIST_TYPE.UNFINISHED));
            StoreConfig.history.replace(MYORDER);
            console.log(`支付宝支付,支付成功`);
            return;
        }else if (resp.resultStatus === '8000') {
            Toast.show({
                text: `支付结果确认中,请稍后查看订单状态`,
                buttonText: "确定",
                position: "bottom",
                type: "success",
                duration: 3000
            })
            return;
        }
        console.log(`支付宝支付,order:${order.order_number},用户付款出错,${resp.errCode}:${resp.errStr}`);
        Toast.show({
            text: `支付宝支付错误${resp.errStr}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        })
    }catch (error){
        console.log("支付宝支付错误",error);
        Toast.show({
            text: `支付宝支付出错${error.toString()}!`,
            buttonText: "确定",
            position: "bottom",
            type: "success",
            duration: 3000
        })
    }
}