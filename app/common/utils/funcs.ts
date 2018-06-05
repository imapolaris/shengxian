import {Cart, CartList, Item, ItemDynamic, ItemDynamicArray, OrderState} from "../../store/EntitiesState"
import * as moment from "moment"
import {Alert} from "react-native";
import {MyToast} from "../../config/Config";
/**
 * 格式化金钱,金钱全部是分为单位
 * @param {number} money 金钱
 */
export function formatMoney(money:number){
    return `${(money /100).toFixed(2)}`
}

export function formatLeftCnt(cnt:number){
    if(cnt >10){
        return ""
    }else if(cnt > 0){
        return `库存${cnt}`;
    }else{
        return `已售罄`
    }
}
export function canAddToCart(item:Item,dynamic:ItemDynamic|undefined,carts:Cart[]){
    if(!dynamic || dynamic.leftcnt < 0){
		MyToast(2000, "库存不足");  
        // Alert.alert("提示","库存不足");
        return false;
    }
    let cart = carts.find((cart)=>cart.id == item.id);
    if(item.allow_place_type && cart && cart.count >= item.allow_place_type){
		// Alert.alert("提示","购物车已添加数量超出限购数量");
		MyToast(2000, "购物车已添加数量超出限购数量");  
        return false;
    }
    if(cart && cart.count >= dynamic.leftcnt){
		MyToast(2000, "购物车已添加数量超出商品库存");  
        // Alert.alert("提示","购物车已添加数量超出商品库存");
        return false;
    }
    return true;
}
export function formatMoneyEx(money:number){
    return `${(money /100).toFixed(0)}`
}

/**
 * 格式化时间
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date:Date){
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

// export const formatMoney = ( money:number, count = 2) => {
//     return `￥${money}`
// }


export function getOrderStateName(sState:number){
    
    switch (sState)
    {
        case     OrderState.OSUnPay         :     return '待支付'  ;
        case     OrderState.OSPack          :     return '待拣货'  ;
        case     OrderState.OSPeisoning     :     return '待配送'  ;
        case     OrderState.OSFinish        :     return '已完成'  ;
		case     OrderState.OSCancel        :     return '已取消'  ;
		case     OrderState.OSCancelVerify  :     return '审核中'  ;
    }
}


/**
 * @function template用来处理模版字符串:`a${id}`
 * @param {TemplateStringsArray} strings
 * @param keys
 * @returns {(...values: any[]) => string}
 */
export const template = (strings:TemplateStringsArray,...keys:any[])=>{
    return (...values:any[])=>{
        let dict = values[values.length -1] || {};
        let result = [strings[0]]
        keys.forEach((key,i)=>{
            let value = Number.isInteger(key)?values[key] : dict[key];
            result.push(value,strings[i + 1])
        })
        return result.join('')
    }
}

//组合目录
export const resolvePath = (...paths: Array<string>) =>
    '/' +paths.join('/').split('/').filter(part => part && part !== '.').join('/');


function bytePower(bytes:number, power:number, precision=5) {
    const num = Math.pow(1024, power)
    return (bytes / num).toPrecision(precision)
}

// 格式化字节显示
export function fileSize(bytes:number):string {
    const diff = 1024;
    // if it comes in the TB's
    if (bytes >= diff**4) return `${bytePower(bytes, 4, 10)} TB`;
    // else it is in GB's
    else if (bytes >= diff**3) return `${bytePower(bytes, 3)} GB`;
    // same as above
    else if (bytes >= diff**2) return `${bytePower(bytes, 2)} MB`;
    // same too. here
    else if (bytes >= diff) return `${bytePower(bytes, 1)} KB`;
    // it is definately in bytes now
    else return `${bytes} Bytes`
}

export function checkPhone(phone:string){
    return (/^1[34578]\d{9}$/.test(phone));
}